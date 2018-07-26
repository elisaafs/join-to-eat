import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";
import axios from "./axios";

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<App />, document.querySelector("main"));
}
