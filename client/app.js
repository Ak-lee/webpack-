import ReactDom from 'react-dom'
import React from 'react'
import App from './App.jsx'

ReactDom.render(<App />, document.getElementById('root'))

if(module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default
        ReactDom.hydrate(<NextApp />, document.getElementById('root'))
    })
}