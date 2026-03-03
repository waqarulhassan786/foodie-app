import React from 'react'
import Home from '../../pages/home/Home'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Loader from './Loader'

export default function HomeSection() {
  return (
    <div>
        <Home/>
        {/* <Loader/> */}
        <Footer/>
        
    </div>
  )
}
