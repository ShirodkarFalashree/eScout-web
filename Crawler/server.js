import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';

const app = express();
const PORT = 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to handle JSON requests
app.use(express.json());

// Endpoint to run scripts
app.post('/run-scripts', (req, res) => {
  // Execute start.js and index.ts
  exec(`node ${join(__dirname, 'start.js')}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing start.js: ${error.message}`);
      return res.status(500).json({ error: `Error executing start.js: ${error.message}` });
    }

    exec(`node ${join(__dirname, 'index.js')}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing index.js: ${error.message}`);
        return res.status(500).json({ error: `Error executing index.js: ${error.message}` });
      }

      // Run generate.js separately and return its output
      exec(`node ${join(__dirname, 'generate.js')}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing generate.js: ${error.message}`);
          return res.status(500).json({ error: `Error executing generate.js: ${error.message}` });
        }

        // Send the output of generate.js as the response
        return res.json({ message: 'Process completed successfully.', output: stdout });
      });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
