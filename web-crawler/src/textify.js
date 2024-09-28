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

    // Return the bullet points instead of saving to a file
    return bulletPoints;

  } catch (error) {
    console.error("Error extracting important points:", error);
    return [];
  }
};

// Export the function for use in other files
export { extractImportantPoints };
