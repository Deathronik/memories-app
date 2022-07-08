import React from "react";

import {BrowserRouter as Router} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {SnackbarProvider} from "notistack";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import postsReducer from "./features/posts/postsSlice"
import authReducer from "./features/auth/authSlice"

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <SnackbarProvider anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}>
        <Provider store={store}>
            <Router>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <App/>
                </GoogleOAuthProvider>
            </Router>
        </Provider>
    </SnackbarProvider>
)
