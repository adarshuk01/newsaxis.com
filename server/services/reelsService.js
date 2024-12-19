const axios = require('axios');
const cheerio = require('cheerio');


const fs = require('fs');
const FormData = require('form-data');

const defaultIcon = 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/3f/56/503f5669-704b-5689-b68b-88ce6dd7d7e9/AppIcon4NormalUsers-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg';

const scrapeData = async (url, selector) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const items = [];

    $(selector).each((i, element) => {
      const title = $(element).find('a').attr('title');
      const link = 'https://www.manoramaonline.com' + $(element).find('h2 a').attr('href');
      const image = $(element).find('.cmp-story-list__image-block > a > img').attr('data-websrc');
      const summary = $(element).find('.cmp-story-list__dispn').text().trim();
      const timeElement = $(element).find('.cmp-story-list__date.en-font.text-sub-color');
      const timeText = timeElement.text().trim();
      const timeAttr = timeElement.attr('data-publish-date');

      let readableTime = timeText;
      if (!readableTime && timeAttr) {
        const date = new Date(parseInt(timeAttr));
        readableTime = date.toLocaleString();
      }

      if (title && link) {
        items.push({
          title: title ? title.trim() : 'No title available',
          link: link ? link.trim() : 'No link available',
          image: image ? image.trim() : 'No image available',
          summary: summary ? summary.trim() : 'No description available',
          readableTime,
          icon: defaultIcon,
          channel: 'Manorama'
        });
      }
    });

    return items;
  } catch (error) {
    console.error(`Error fetching the page: ${error}`);
    throw error;
  }
};

exports.fetchShortzData = async () => {
  const reelurl = 'https://www.manoramaonline.com/shortz.html';
  const selector = '#Shortz > div > div > ul > li';
  return await scrapeData(reelurl, selector);
};

exports.fetchEntertainmentReel = async () => {
  const entertainmentUrl = 'https://www.manoramaonline.com/shortz/entertainment.html';
  const selector = '#Entertainment > div > div > ul > li';
  return await scrapeData(entertainmentUrl, selector);
};

exports.fetchTechnologyReel = async () => {
  const technologyUrl = 'https://www.manoramaonline.com/shortz/technology.html';
  const selector = '#Technology > div > div > ul > li';
  return await scrapeData(technologyUrl, selector);
};

exports.fetchTravelReel = async () => {
  const travelUrl = 'https://www.manoramaonline.com/shortz/travel.html';
  const selector = '#Travel > div > div > ul > li';
  return await scrapeData(travelUrl, selector);
};

exports.fetchCookingReel = async () => {
  const CookingUrl = 'https://www.manoramaonline.com/shortz/pachakam.html';
  const selector = '#Pachakam > div > div > ul > li';
  return await scrapeData(CookingUrl, selector);
};

exports.fetchPremiumReel = async () => {
  const premiumUrl = 'https://www.manoramaonline.com/shortz/premium.html';
  const selector = '#Premium > div > div > ul > li';
  return await scrapeData(premiumUrl, selector);
};



// const path = require('path');
// const { uploadAllImages } = require('../config/cloudnaryConfig');
// const crypto = require('crypto');
// const { postToInstagram } = require('./instagramPost');

// require('dotenv').config(); // Secure access token

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// const postedHashes = new Set();

// const hashContent = (content) => crypto.createHash('md5').update(content).digest('hex');
// (async () => {
//     const imagesDir = path.join(__dirname, 'images');
//     if (!fs.existsSync(imagesDir)) {
//         fs.mkdirSync(imagesDir);
//     }

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.setViewport({
//         width: 1920,
//         height: 1080,
//         deviceScaleFactor: 2,
//     });

//     const url = 'http://localhost:3000/instapost';
//     const timeSelector = `#root > div > div > div > div.absolute.top-0.left-0.w-full.p-4.flex.justify-between.items-center.text-white.z-10 > time`;
//     const screenshotSelector = `#root > div > div > div`;

//     const checkAndTakeScreenshot = async () => {
//       try {
//           await page.goto(url, { waitUntil: 'domcontentloaded' });
  
//           await page.waitForSelector(timeSelector, { timeout: 10000 });
//           const content = await page.content();
//           const $ = cheerio.load(content);
  
//           const newContent = $(timeSelector).html();
//           if (!newContent) {
//               console.error(`Element not found for selector: ${timeSelector}`);
//               return;
//           }
//           const newContentHash = hashContent(newContent.trim());
  
//           if (!postedHashes.has(newContentHash)) {
//               postedHashes.add(newContentHash);
  
//               await page.waitForSelector(screenshotSelector);
//               const element = await page.$(screenshotSelector);
//               const screenshotPath = path.join(imagesDir, `element-screenshot.png`);
  
//               await element.screenshot({ path: screenshotPath });
//               console.log(`Screenshot saved: ${screenshotPath}`);
  
//               await delay(3000);
//               const uploadedUrls = await uploadAllImages(imagesDir);
//               console.log('Uploaded Image URLs:', uploadedUrls);
  
//               if (uploadedUrls.length > 0) {
//                   await postToInstagram(uploadedUrls[0]);
//               }
//           } else {
//               console.log('Content did not change, skipping post.');
//           }
//       } catch (error) {
//           console.error('Error while taking screenshot:', error);
//       }
//   };
  

//     const intervalId = setInterval(checkAndTakeScreenshot, 30000);

//     setTimeout(() => {
//         clearInterval(intervalId);
//         console.log('Stopped monitoring.');
//         browser.close();
//     }, 7600000);
// })();




