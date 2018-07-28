import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";
import axios from "./axios";

import Pager from "./Pages/Pager";

const mainElement = document.querySelector("main");
ReactDOM.render(<Pager />, mainElement);

/*
if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, mainElement);
} else {
    ReactDOM.render(<App />, mainElement);
}
*/
