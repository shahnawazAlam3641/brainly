import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import rootReducer from "./reducer/index.ts"
import { configureStore } from '@reduxjs/toolkit'
import { Toaster } from 'react-hot-toast'

const store = configureStore({
  reducer:rootReducer
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
    
  </StrictMode>,
)
