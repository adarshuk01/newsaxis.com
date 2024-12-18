const newsService = require('../services/newsService');
const reelsService=require('../services/reelsService')

exports.getNews = async (req, res) => {
  const { type } = req.params;
console.log(type);

  try {
    let news;
    switch (type) {
      case 'latest':
        news = await newsService.fetchLatestNews();
        break;
      case 'sports':
        news = await newsService.fetchSportsNews();
        break;
        case 'entertainment':
          news = await newsService.fetchEntertainmentNews();
          break;
          case 'technology':
          news = await newsService.fetchTechNews();
          break;
          case 'premium':
          news = await newsService.fetchNewsPlus();
          break;
      default:
        return res.status(400).json({ error: 'Invalid news type' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};


exports.getReels=async(req,res)=>{
const {type}=req.params;
try {
  let reels
  switch (type) {
    case 'All':
      reels= await reelsService.fetchShortzData();
      break;
      case 'Entertainment':
      reels= await reelsService.fetchEntertainmentReel();
      break;
      case 'Technology':
      reels= await reelsService.fetchTechnologyReel();
      break;
      case 'Travel':
      reels= await reelsService.fetchTravelReel();
      break;
      case 'Pachakam':
      reels= await reelsService.fetchCookingReel();
      break;
      case 'Premium':
      reels= await reelsService.fetchPremiumReel();
      break;
    default:
      return res.status(400).json({ error: 'Invalid news type' });
  }
  res.json(reels);
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch news' });

}
}



exports.getBanner=async(req,res)=>{
  const {type}=req.params;
  try {
    let banner
    switch (type) {
      case 'breakingbanner':
        banner= await newsService.fetchBannerData();
        break;
      default:
        return res.status(400).json({ error: 'Invalid news type' });
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bannner' });
  
  }
  }


