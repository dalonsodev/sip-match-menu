import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'
import './styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element. Ensure index.html has a <div id="root"></div>')
}

const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
