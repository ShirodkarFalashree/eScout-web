import fs from "fs";
import natural from "natural";
import stopword from "stopword";

const extractImportantPoints = async (filePath, topN = 5) => {
  try {
    // Read text from file
    const rawText = fs.readFileSync(filePath, "utf8");

    // Split text into sentences
    const tokenizer = new natural.SentenceTokenizer();
    const sentences = tokenizer.tokenize(rawText);

    // Tokenize words from the text
    const wordTokenizer = new natural.WordTokenizer();
    let allWords = wordTokenizer.tokenize(rawText.toLowerCase());

    // Remove stopwords (commonly used but unimportant words)
    allWords = stopword.removeStopwords(allWords);

    // Count word frequency
    const wordFrequency = {};
    allWords.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    // Sort words by frequency
    const sortedWords = Object.keys(wordFrequency).sort(
      (a, b) => wordFrequency[b] - wordFrequency[a]
    );

    // Take the top N most frequent words
    const mostFrequentWords = sortedWords.slice(0, topN);

    // Extract sentences that contain the most frequent words
    const bulletPoints = [];
    mostFrequentWords.forEach((word) => {
      sentences.forEach((sentence) => {
        if (sentence.toLowerCase().includes(word) && !bulletPoints.includes(sentence)) {
          bulletPoints.push(sentence); // Only unique sentences
        }
      });
    });

    // Display the bullet points
    console.log("Most Important Points:");
    bulletPoints.forEach((point) => console.log(`• ${point}`));

    // Optionally, save the points to a file
    fs.writeFileSync("important_points.txt", bulletPoints.join("\n• "));

  } catch (error) {
    console.error("Error extracting important points:", error);
  }
};

// Call the function with the path to the .txt file
extractImportantPoints("../output/scrapedText.txt", 5); // top 5 common points
