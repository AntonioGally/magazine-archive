// Libs
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Components
import Router from './routes/index.tsx';
// Css
import "./style/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
