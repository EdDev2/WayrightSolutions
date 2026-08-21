import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import Testimonial from './components/Testimonial'
import WaitingList from './components/WaitingList'
import Contact from './components/Contact'
import PrivacyNotice from './components/PrivacyNotice'
import Footer from './components/Footer'

import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <About />
      <Services />
      <HowWeWork />
      <Testimonial />
      <WaitingList />
      <Contact />
      <PrivacyNotice />
      <Footer />
    </div>
  )
}

export default App
