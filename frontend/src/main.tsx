import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store.ts'

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root!)
reactRoot.render(
    <React.StrictMode>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </React.StrictMode>,
)
