import { createRoot } from 'react-dom/client'
import './main.scss'
import './root.scss';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
