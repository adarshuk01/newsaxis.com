const path = require('path');
const { uploadAllImages } = require('../config/cloudnaryConfig');
const crypto = require('crypto');
const { postToInstagram } = require('../services/instagramPost');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer-core');
const chrome = require('chrome-aws-lambda');
require('dotenv').config(); // Secure access token

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const postedHashes = new Set();

const hashContent = (content) => crypto.createHash('md5').update(content).digest('hex');

(async () => {
    const imagesDir = path.join(__dirname, 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir);
    }

    const browser = await puppeteer.launch({
        args: chrome.args, // Arguments to launch Chromium
        executablePath: await chrome.executablePath, // Path to Chromium
        headless: chrome.headless, // Ensure headless mode is set
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2,
    });

    const url = 'https://newsaxis.vercel.app/instapost';
    const timeSelector = `#root > div > div > div > div.absolute.top-0.left-0.w-full.p-4.flex.justify-between.items-center.text-white.z-10 > time`;
    const summarySelector = `#root > div > div > div > div.absolute.bottom-0.left-0.w-full.bg-black.text-yellow-300.text-center.z-10 > div > p.hidden`;
    const screenshotSelector = `#root > div > div > div`;

    const checkAndTakeScreenshot = async () => {
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });

            await page.waitForSelector(timeSelector, { timeout: 10000 });
            const content = await page.content();
            const $ = cheerio.load(content);

            const newContent = $(timeSelector).html();
            if (!newContent) {
                console.error(`Element not found for this selector: ${timeSelector}`);
                return;
            }
            const newContentHash = hashContent(newContent.trim());

            if (!postedHashes.has(newContentHash)) {
                postedHashes.add(newContentHash);

                const description = $(summarySelector).text().trim();

                await page.waitForSelector(screenshotSelector);

                // Adding a delay before taking the screenshot to ensure content is fully loaded
                await delay(5000); // You can adjust this delay as needed, e.g., 5000ms = 5 seconds

                const element = await page.$(screenshotSelector);
                const screenshotPath = path.join(imagesDir, `element-screenshot.png`);

                await element.screenshot({ path: screenshotPath });
                console.log(`Screenshot saved: ${screenshotPath}`);

                await delay(3000);
                const uploadedUrls = await uploadAllImages(imagesDir);
                console.log('Uploaded Image URLs:', uploadedUrls);

                if (uploadedUrls.length > 0) {
                    await postToInstagram(uploadedUrls[0], description);
                }

                // Clean up the screenshot after upload
                fs.unlinkSync(screenshotPath);
            } else {
                console.log('Content did not change, skipping post.');
            }
        } catch (error) {
            console.error('Error while taking screenshot:', error);
        }
    };

    const intervalId = setInterval(checkAndTakeScreenshot, 30000);

    setTimeout(() => {
        clearInterval(intervalId);
        console.log('Stopped monitoring.');
        browser.close();
    }, 7600000);
})();
