import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to scrape and summarize content
app.post("/summarize", (req, res) => {
  const { query } = req.body; // Get query from the frontend

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  // Execute the index.js script and pass the query as an argument
  const childProcess = exec(
    `node ./src/index.js "${query}"`,
    { timeout: 15000 },
    async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return res.status(500).json({ error: "Error executing script" });
      }

      const textFilePath = path.join(process.cwd(), "output", "scrapedText.txt");
      const imageFilePath = path.join(process.cwd(), "output", "images.json");

      try {
        // Read the scraped text if available
        let data = "Default scraped content.";
        if (fs.existsSync(textFilePath)) {
          data = await fs.promises.readFile(textFilePath, "utf8");
        }

        // Read image URLs
        let images = [];
        if (fs.existsSync(imageFilePath)) {
          const imageJson = await fs.promises.readFile(imageFilePath, "utf8");
          images = JSON.parse(imageJson).images || [];
        }

        res.json({ query, response: data, images });

        // Optionally delete the output directory
        fs.rm(path.join(process.cwd(), "output"), { recursive: true, force: true }, (err) => {
          if (err) {
            console.error(`Error deleting output directory: ${err.message}`);
          }
        });
      } catch (err) {
        console.error("Error reading results:", err.message);
        res.status(500).json({ error: "Error reading results" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
