import React from 'react'
import Hero from './component/Hero'
import Newarrivals from './component/Newarrivals'
import Ourcategories from './component/Ourcategories'
import Bestsellers from './component/Bestsellers'
import Timer from './component/Timer'
import Reviews from './component/Reviews'
import Howitworks from './component/Howitworks'
import Get10off from './component/Get10off'
import Features from './component/Features'

const Home = () => {
  return (
    <div>
        <Hero />
        <Newarrivals />
        <Ourcategories />
        <Bestsellers />
        <Timer />
        <Reviews />
        <Howitworks />
        <Get10off />
        <Features />
    </div>
  )
}

export default Home