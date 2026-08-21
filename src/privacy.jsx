import React from 'react'
import { createRoot } from 'react-dom/client'

import PrivacyNotice from './components/PrivacyNotice'
import './App.css'
import './components/Footer.css'

function PrivacyPage() {
  return (
    <div className="app">
      <PrivacyNotice />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <PrivacyPage />
)
