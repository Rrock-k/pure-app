import React from 'react'
import './utils/langReactPatch'

import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './index.css'
import App from './App.js'
import * as serviceWorker from './serviceWorker'
import { HoverContextWrapper } from './pure-common/HoverContextWrapper'
import { LanguageContextWrapper } from './components/LanguageContextWrapper'

console.log('index.js started execution')

const RenderReactDOM = () =>
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <HoverContextWrapper>
          <LanguageContextWrapper setRerender={() => {}}>
            <App />
          </LanguageContextWrapper>
        </HoverContextWrapper>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  )

RenderReactDOM()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
