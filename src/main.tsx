import ReactDOM from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import App from './App'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssVarsProvider theme={theme} defaultMode="light">
    <CssBaseline />
    <App />
  </CssVarsProvider>
)
