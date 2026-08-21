import React from 'react'
import { createRoot } from 'react-dom/client'

import PrivacyNotice from './components/PrivacyNotice'

const root = document.getElementById('root')

createRoot(root).render(
  <PrivacyNotice />
)
