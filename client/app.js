import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'


const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        borderRadius: 3,
        color: '#556B2F',
        border: 1,
        boxShadow: '0 3px 5px 2px rgba(85,107,47,.4)',
        size: 'medium'
      }
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Navbar />
      <Routes />
    </div>
    </ThemeProvider>
  )
}

export default App
