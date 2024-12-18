import React from 'react'
import Hero from '../components/heroSection/HeroSection'
import NewsHeader from '../components/header/Newsheader'
import ArticleCard from '../components/cards/ArticleCard'
import LatestNews from '../components/sections/LatestNews'
import BulletinStory from '../components/sections/BulletinStory'
import MustRead from '../components/sections/MustRead'
import EntertainmentNews from '../components/cards/ArticleCard'
import NewsReels from '../components/sections/NewsReels'
import NewsBanners from '../components/sections/NewsBanners'
import Subscribe from '../components/sections/Subscribe'

function HomePage() {
 
  return (
    <div className='space-y-8'>
     <NewsBanners />
     <BulletinStory />
     <MustRead /> 
     <NewsReels />
     <Subscribe />
    </div>
  )
}

export default HomePage
