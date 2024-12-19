const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer=require('puppeteer-core')
const chrome = require('chrome-aws-lambda');

const BASE_URL = 'https://www.manoramaonline.com';
const DEFAULT_ICON = 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/3f/56/503f5669-704b-5689-b68b-88ce6dd7d7e9/AppIcon4NormalUsers-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg';

/**
 * Helper function to fetch and parse news from a given URL.
 * @param {string} url - The URL to fetch news from.
 * @param {string} selector - The selector to locate news items.
 * @returns {Promise<Array>} - A list of news items.
 */
const fetchNews = async (url, selector) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const news = [];

    $(selector).each((_, element) => {
      const title = $(element).find('h2 a').text().trim();
      const link = BASE_URL + $(element).find('h2 a').attr('href');
      const summary = $(element).find('.cmp-story-list__dispn').text().trim();
      const image = $(element).find('.cmp-story-list__image-block > a > img').attr('data-src')
        || $(element).find('.cmp-story-list__image-block > a > img').attr('data-websrc');
      const timeElement = $(element).find('.cmp-story-list__date.en-font.text-sub-color');
      const timeText = timeElement.text().trim();
      const timeAttr = timeElement.attr('data-publish-date');

      const readableTime = timeText || (timeAttr ? new Date(parseInt(timeAttr)).toLocaleString() : '');

      if (title && link) {
        news.push({
          title,
          link,
          summary,
          image,
          readableTime,
          icon: DEFAULT_ICON,
          channel: 'Manorama'
        });
      }
    });

    return news;
  } catch (error) {
    console.error(`Error fetching news from ${url}:`, error);
    throw error;
  }
};

// Fetch latest news
exports.fetchLatestNews = () => fetchNews(
  `${BASE_URL}/news/latest-news.html`,
  '#Just_in_Slot > div > ul > li'
);

// Fetch technology news
exports.fetchTechNews = () => fetchNews(
  `${BASE_URL}/technology/technology-news.html`,
  '#Tech___Gadgets_SubsectionPage_Technology_News > div > ul > li'
);


const sportsUrl = 'https://www.mediaoneonline.com/sports';

exports.fetchSportsNews = async () => {
  try {
    const response = await axios.get(sportsUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.d-flex.flex-wrap').each((i, element) => {
      const title = $(element).find('.list-item-right h3.story-title').text().trim();
      const link = $(element).find('a').attr('href');
      const summary = $(element).find('.list-item-right p').text().trim();
      const image = $(element).find('.story-img img').attr('data-src');
      const category = $(element).find('.sports-header a').text().trim();
      const readableTime = $(element).find('.time-as-duration').text().trim();
      console.log(`time: ${readableTime}`);

      if (title && link) {
        articles.push({ 
          title, 
          link: `https://www.mediaoneonline.com${link}`, 
          summary, 
          image: image.startsWith('https') ? image : `https://www.mediaoneonline.com${image}`, 
          category, 
          readableTime,
          icon:'https://upload.wikimedia.org/wikipedia/commons/6/62/Media_One_Logo.png' ,
          channel:'MediaOne'
        });
      }

    });

    return articles;
    
  } catch (error) {
    console.error(`Error fetching the page: ${error}`);
  }
};

const entertainmentUrl = 'https://www.madhyamam.com/entertainment';

exports.fetchEntertainmentNews = async () => {
  try {
    const response = await axios.get(entertainmentUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.block-grid.h-block.h-block-phone.no-gap').each((i, element) => {
      const title = $(element).find('.heading h3.hd a').text().trim();
      const link = $(element).find('.story-image a').attr('href');
      const summary = $(element).find('.description p a').text().trim();
      const image = $(element).find('.story-image img').attr('data-src');
      const category = $(element).find('.section-title a').text().trim();
      const readableTime = $(element).find('.post-time span.time-as-duration').text().trim();

      if (title && link) {
        articles.push({ 
          title, 
          link: `https://www.madhyamam.com${link}`, 
          summary, 
          image: image.startsWith('https') ? image : `https://www.madhyamam.com${image}`, 
          category, 
          readableTime ,
          icon:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBOxq1TeTL36dJpEuZWWgRvReBDLwG5V8MFQ&s',
          channel:'Madhyamam'
        });
      }
    });

    return articles;
  } catch (error) {
    console.error(`Error fetching the page: ${error}`);
  }
};





const bannerUrl = 'https://www.mathrubhumi.com/';

exports.fetchBannerData = async () => {
  const browser = await puppeteer.launch({
    args: chrome.args, // Arguments to launch Chromium
    executablePath: await chrome.executablePath, // Path to Chromium for serverless environments
    headless: chrome.headless, // Ensure headless mode is set
  });

  const page = await browser.newPage();
  
  try {
    // Navigate to the page
    await page.goto('your_banner_url_here', { waitUntil: 'networkidle2' });

    // Wait for the banners to load (adjust selector if needed)
    await page.waitForSelector('body > div.mpp-container > div.wide-top.mt-2.mb-2', {
      timeout: 10000,
    });

    // Extract banner data
    const banners = await page.$$eval(
      '#slick167311 > div > div > div',
      (elements) =>
        elements.map((el) => {
          const image = el.querySelector('img')?.getAttribute('src');
          const title = el.querySelector('h3 a')?.innerText || 'No title available';
          const description = el.querySelector('p')?.innerText || 'No description available';

          return {
            title: title.trim(),
            description: description.trim(),
            image: image ? (image.startsWith('http') ? image : `https://www.mathrubhumi.com${image}`) : 'No image available',
          };
        })
    );

    if (banners.length === 0) {
      console.error('No banners were found. Please verify the selector.');
    }

    // Remove duplicate banners by comparing stringified objects
    const uniqueBanners = [...new Set(banners.map(b => JSON.stringify(b)))].map(b => JSON.parse(b));
  
    return uniqueBanners;
    
  } catch (error) {
    console.error('Error fetching banners:', error.message);
  } finally {
    await browser.close();
  }
};

// To fetch and log the banner data, use this function
exports.fetchBannerData();



const urpremiumurl = 'https://www.manoramaonline.com/premium/news-plus.html';

exports.fetchNewsPlus = async () => {
  try {
    const response = await axios.get(urpremiumurl);
    const html = response.data;
    const $ = cheerio.load(html);
    const newsPlus = [];

    $('#Premium_SubsectionPage_NewsPlus > div > ul > li').each((i, element) => {
      const title = $(element).find('.cmp-story-list__title a').text().trim();
      const link = 'https://www.manoramaonline.com' + $(element).find('.cmp-story-list__title a').attr('href');
      const summary = $(element).find('.cmp-story-list__dispn').text().trim();
      const icon = 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/3f/56/503f5669-704b-5689-b68b-88ce6dd7d7e9/AppIcon4NormalUsers-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg';
      
      const image = $(element).find('.cmp-story-list__image-block img').attr('data-src')
        || $(element).find('.cmp-story-list__image-block img').attr('data-websrc');
      
      const timeElement = $(element).find('.cmp-story-list__date.en-font.text-sub-color');
      const timeText = timeElement.text().trim();
      const timeAttr = timeElement.attr('data-publish-date');

      let readableTime = timeText;
      if (!readableTime && timeAttr) {
        const date = new Date(parseInt(timeAttr));
        readableTime = date.toLocaleString();
      }

      if (title && link) {
        newsPlus.push({ title, link, summary, image, readableTime, icon, channel: 'Manorama' });
      }
    });

    return newsPlus;
  } catch (error) {
    console.error(`Error fetching the page: ${error}`);
    throw error;
  }
};















