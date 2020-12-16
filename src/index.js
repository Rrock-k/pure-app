import React from 'react'

import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { contexts } from './config/setup'

import App from './App.js'
import * as serviceWorker from './serviceWorker'

const { HoverContext, LanguageContext } = contexts

const RenderReactDOM = () =>
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <HoverContext>
          <LanguageContext>
            <App />
          </LanguageContext>
        </HoverContext>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  )

RenderReactDOM()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
