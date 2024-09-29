import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from "fs";
import path from "path"
import { URL } from "url";
import { load } from 'cheerio';

const seenUrls: { [key: string]: boolean } = {};

const getUrl = (link: string, baseUrl: string): string => {
  try {
    const url = new URL(link, baseUrl);
    return url.href;
  } catch (err) {
    console.error("Invalid URL:", link);
    return "";
  }
};

const downloadImage = async (url: string, filepath: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${url}`);
    }

    if (response.body) {
      const dest = fs.createWriteStream(filepath);
      response.body.pipe(dest);

      response.body.on("error", (err) => {
        console.error("Error in response body", err);
      });

      dest.on("error", (err) => {
        console.error("Error writing to file", err);
      });

      dest.on("finish", () => {
        console.log(`Downloaded ${url} to ${filepath}`);
      });
    } else {
      console.error(`No body found for ${url}`);
    }

  } catch (error) {
    console.error("Error occurred while downloading image:", error);
  }
};

const appendTextToFile = (text: string, filepath: string) => {
  fs.appendFile(filepath, text, (err) => {
    if (err) {
      console.error("Error appending to text file:", err);
    } else {
      console.log(`Text content appended to ${filepath}`);
    }
  });
};

const crawl = async ({ url }: { url: string }) => {
  try {
    if (seenUrls[url]) return;
    console.log("crawling", url);
    seenUrls[url] = true;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = load(html);
    const links = $("a").map((i, link) => $(link).attr("href")).get();
    const imageUrls = $("img").map((i, img) => $(img).attr("src")).get();
    
    // Scrape all <p> tag text content
    const pText = $("p").map((i, p) => $(p).text()).get().join("\n");

    // Append the <p> tag text content to a file
    fs.mkdirSync("output", { recursive: true }); // Create directory if not exists
    appendTextToFile(pText + "\n", path.join("output", "scrapedText.txt"));

    // Download images
    fs.mkdirSync("images", { recursive: true });
    await Promise.all(imageUrls.map(async (imageUrl) => {
      if (imageUrl) {
        await downloadImage(getUrl(imageUrl, url), path.join("images", path.basename(imageUrl)));
      }
    }));

    const { host } = new URL(url);

    await Promise.all(links.filter((link) => link && new URL(link, url).host === host).map(async (link) => {
      if (link) {
        await crawl({ url: getUrl(link, url) });
      }
    }));

  } catch (error) {
    console.error("Error occurred while fetching the URL:", error);
  }
};

crawl({
  // url: "https://www.geeksforgeeks.org/django-tutorial/"
  url: "https://www.betterhealth.vic.gov.au/yoga-health-benefits"
  // url: "https://en.wikipedia.org/wiki/Yoga"
  // url: "https://cn-info.vercel.app/"
  // url: "https://www.geeksforgeeks.org/what-is-computer-networking/"
}).catch(error => {
  console.error("Unhandled error in crawl function:", error);
});
