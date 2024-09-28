import express from 'express';
import { exec } from 'child_process'; // To run shell commands
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { extractImportantPoints } from './src/textify.js'; // Import the function
import cors from "cors"

// Create an instance of the express app
const app = express();
const PORT = 3000;

app.use(cors())

// Manually define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint
app.post('/api/run-crawler', async (req, res) => {
    // Path to the start.js file
    const startScriptPath = path.join(__dirname, 'start.js');
    const textFilePath = path.join(__dirname, 'output', 'scrapedText.txt'); // Change to the correct path

    // Execute start.js
    console.log("Starting start.js script...");
    const startProcess = exec(`node ${startScriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing start.js: ${error.message}`);
            return res.status(500).json({ error: 'start.js execution failed.' });
        }
        if (stderr) {
            console.error(`start.js stderr: ${stderr}`);
            return res.status(500).json({ error: 'start.js produced an error output.' });
        }
        console.log("start.js executed successfully.");
    });

    // Set a timeout to kill the start.js process after 10 seconds
    setTimeout(async () => {
        console.log("Stopping start.js script...");
        startProcess.kill(); // Terminate the start.js process

        // Execute textify.js and extract important points
        console.log("Extracting important points...");
        const importantPoints = await extractImportantPoints(textFilePath, 5); // Get top 5 points

        // Check if any points were extracted
        if (importantPoints.length === 0) {
            return res.status(500).json({ error: 'No important points extracted.' });
        }

        console.log("Extraction completed successfully.");
        // Send the output as the response
        res.json({
            message: 'Crawling and extraction completed successfully.',
            importantPoints
        });
    }, 10000); // Wait for 10 seconds before executing the next step
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
