import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store.ts'
import ThemeProvider from "./components/themeProvider"

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root!)
reactRoot.render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </PersistGate>
)
