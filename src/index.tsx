import React from 'react'
import ReactDOM from 'react-dom'

import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()

import PrincipalView from './views/Principal'

import './style/style.scss'



const App = () => 
    <Router history={history}>
        <PrincipalView/>
    </Router>

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'))
