import express from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = 'AIzaSyB7fB6fgWAnIVK4NM7VNsIiBqrUkzp-bsw'; // Replace with your actual API key

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
    // Run the `start.js` script to scrape and store the text, with a 10-second limit
    exec('node start.js', { timeout: 10000 }, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
      }

      // Proceed even if there's an error
      const textFilePath = path.join(process.cwd(), 'output', 'scrapedText.txt');
      const imageFilePath = path.join(process.cwd(), 'output', 'images.json');

      try {
        // Read the scraped text if available
        let data = '';
        if (fs.existsSync(textFilePath)) {
          data = await fs.promises.readFile(textFilePath, 'utf8');
        } else {
          console.warn('scrapedText.txt not found, using a default message.');
          data = 'Default scraped content.';
        }

        // Step 3: Take only the first 600 characters from the scraped text
        // const prompt = `${data.slice(0, 600)} write all text in bullet points in deep at least 20 neat explained bullet points also give suitable title for it`;
        const prompt = `${data.slice(0, 600)}. Please provide a point-wise explanation where each point starts with an asterisk (*), and do not use any other symbols like hyphens (-) before any point. Format all points and subpoints with only asterisks (*).explaination should be of 2 lines of each sub point `;

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

        const result = await chat.sendMessage(prompt);
        const responseText = result.response.text();

        // Get image URLs from images.json
        const imageUrls = await getImageUrls(imageFilePath);

        // Send the summarized response along with image URLs back to the client
        res.json({ response: responseText, images: imageUrls });
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
