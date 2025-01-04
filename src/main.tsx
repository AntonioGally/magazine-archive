// Libs
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Components
import Router from './routes/index.tsx';
import { Provider } from 'react-redux';
// Scriptrs
import { store } from './store/index.ts';
// Css
import "./style/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>,
)
