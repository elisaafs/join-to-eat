import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Pager from "./Pages/Pager";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import reduxPromise from "redux-promise";
import mainReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";
import { loadMyProfile } from "./actions";

const store = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

store.dispatch(loadMyProfile());

const elem = (init(store),
(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
));

const mainElement = document.querySelector("main");

if (location.pathname == "/welcome") {
    ReactDOM.render(<Pager />, mainElement);
} else {
    ReactDOM.render(elem, mainElement);
}
