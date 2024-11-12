import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { URL } from "url";

const seenUrls = {};

// Mapping queries to URLs
const queryToUrlMap = {
  idli: "https://en.wikipedia.org/wiki/Idli",
  yoga: "https://www.rishikulyogshalarishikesh.com/blog/health-benefits-of-yoga/",
  java: "https://aws.amazon.com/what-is/java/",
  news: "https://bbc.com/news",
};

// Function to get a URL based on keywords found in the query
const getUrlFromQuery = (query) => {
  query = query.toLowerCase();
  // Search for a keyword in the sentence that matches a key in queryToUrlMap
  for (const keyword in queryToUrlMap) {
    if (query.includes(keyword)) {
      return queryToUrlMap[keyword];
    }
  }
  return null;
};

// Crawl function remains the same
const crawl = async ({ url }) => {
  try {
    if (seenUrls[url]) return;
    console.log("Crawling", url);
    seenUrls[url] = true;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const links = [];
    $("a").each((i, link) => {
      const href = $(link).attr("href");
      if (href) links.push(href);
    });

    const imageUrls = [];
    $("img").each((i, img) => {
      const src = $(img).attr("src");
      if (src) imageUrls.push(src);
    });

    const pText = [];
    $("p").each((i, p) => {
      pText.push($(p).text());
    });
    const combinedText = pText.join("\n");

    fs.mkdirSync("output", { recursive: true });
    fs.writeFileSync(path.join("output", "scrapedText.txt"), combinedText);
    fs.writeFileSync(path.join("output", "images.json"), JSON.stringify({ images: imageUrls }, null, 2));
  } catch (error) {
    console.error("Error occurred while fetching the URL:", error);
  }
};

// Main execution block
(async () => {
  const query = process.argv[2]; // Get query from command-line arguments
  if (!query) {
    console.error("No query provided!");
    process.exit(1);
  }

  const url = getUrlFromQuery(query);
  if (!url) {
    console.error("No matching URL found for the query.");
    process.exit(1);
  }

  console.log(`Query: ${query}, URL: ${url}`);
  await crawl({ url });
})();
