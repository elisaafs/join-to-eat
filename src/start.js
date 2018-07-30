import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "./axios";
import Pager from "./Pages/Pager";

const mainElement = document.querySelector("main");

if (location.pathname == "/welcome") {
    ReactDOM.render(<Pager />, mainElement);
} else {
    ReactDOM.render(<App />, mainElement);
}
