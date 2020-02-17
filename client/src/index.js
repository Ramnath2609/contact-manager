import configureStore from './store/configStore'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.js'
import { startSetUser } from './actions/user'

const store = configureStore()
store.subscribe(() => {
    console.log(store.getState())
})

if(localStorage.getItem('authToken')) {
    store.dispatch(startSetUser())
}

const ele = (
    <Provider store = { store }>
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'))