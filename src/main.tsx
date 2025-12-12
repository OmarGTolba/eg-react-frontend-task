import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
)
