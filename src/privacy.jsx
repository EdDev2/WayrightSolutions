import React from 'react'
import { createRoot } from 'react-dom/client'

import PrivacyNotice from './components/PrivacyNotice'
import './privacy.css'

createRoot(document.getElementById('root')).render(
  <PrivacyNotice />
)
