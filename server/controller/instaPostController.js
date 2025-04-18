const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { postToInstagram } = require('../services/instagramPost'); // Import the postToInstagram function

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

async function captureAndPostToInstagram() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    const url = 'http://localhost:3000/instapost'; // Change as needed
    const screenshotSelector = '#root > div > div > div'; // Adjust to your target element

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector(screenshotSelector);
        const element = await page.$(screenshotSelector);
        const screenshotPath = path.join(imagesDir, 'screenshot.png');

        await element.screenshot({ path: screenshotPath });
        console.log(`[INFO] Screenshot saved: ${screenshotPath}`);

        // Step 3: Post the screenshot to Instagram
        const imageUrl = `file://${screenshotPath}`; // Use the local file path
        const description = 'Check out this screenshot!'; // Customize the description
        console.log(imageUrl);
        
        await postToInstagram(imageUrl, description);
        console.log('[INFO] Screenshot posted to Instagram successfully.');
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
    } finally {
        await browser.close();
    }
}

// Export the function
module.exports = captureAndPostToInstagram;