import { render } from 'preact'
import App from './app.jsx'
import '@fontsource-variable/inter'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/base.css'

render(<App />, document.getElementById('app'))
