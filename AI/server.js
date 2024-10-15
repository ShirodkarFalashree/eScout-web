import express from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = 'AIzaSyDFXuIjWt3EpBDJujAbRYt8NuN6fdPMn0g'; // Replace with your actual API key

app.use(cors());
app.use(express.json());

// Initialize GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Function to read image URLs from images.json
const getImageUrls = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData.images || [];
    } else {
      console.warn('images.json not found, returning an empty array.');
      return [];
    }
  } catch (error) {
    console.error('Error reading images.json:', error.message);
    return [];
  }
};

// Endpoint to scrape and summarize content
app.post('/summarize', async (req, res) => {
  try {
    // Run the `start.js` script with a 15-second timeout
    exec('node start.js', { timeout: 15000 }, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
      }

      const textFilePath = path.join(process.cwd(), 'output', 'scrapedText.txt');
      const imageFilePath = path.join(process.cwd(), 'output', 'images.json');
      const outputDirPath = path.join(process.cwd(), 'output');

      try {
        // Read the scraped text if available
        let data = '';
        if (fs.existsSync(textFilePath)) {
          data = await fs.promises.readFile(textFilePath, 'utf8');
        } else {
          console.warn('scrapedText.txt not found, using a default message.');
          data = 'Default scraped content.';
        }

        // Prepare the prompt for the AI
        const summaryPrompt = `${data.slice(0, 600)}. Please provide a point-wise explanation where each point starts with an asterisk (*), and do not use any other symbols like hyphens (-) before any point. Format all points and subpoints with only asterisks (*). Explanation should be of 2 lines per sub-point.`;

        // Set up generation config and safety settings
        const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];

        // Send the prompt to the Generative AI API and get the response
        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
        });

        const summaryResult = await chat.sendMessage(summaryPrompt);
        const summaryText = summaryResult.response.text();

        // Generate a short title based on the summary
        const titlePrompt = `Based on the following summary: "${summaryText}". Provide a short and attractive four-word title that captures the essence.`;
        const titleResult = await chat.sendMessage(titlePrompt);
        const titleText = titleResult.response.text();

        // Get image URLs from images.json
        const imageUrls = await getImageUrls(imageFilePath);

        // Send the summarized response, title, and image URLs back to the client
        res.json({ title: titleText.trim(), response: summaryText, images: imageUrls });

        // Delete the output directory after the response is sent
        fs.rm(outputDirPath, { recursive: true, force: true }, (delError) => {
          if (delError) {
            console.error(`Error deleting output directory: ${delError.message}`);
          } else {
            console.log('Output directory deleted successfully.');
          }
        });
      } catch (readError) {
        console.error(`Error reading or processing the file: ${readError.message}`);
        res.status(500).json({ error: 'Error reading scraped text or generating summary' });
      }
    });
  } catch (apiError) {
    console.error('Error in the API request:', apiError.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
