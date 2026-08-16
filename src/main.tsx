import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './ui/App'
import './ui/styles.css'
import './ui/word-history.css'
import './ui/blast-effects.css'
import './ui/palettes.css'
import './ui/mobile-interaction.css'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
