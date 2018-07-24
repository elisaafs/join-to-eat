import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import Logo from "./Logo";

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<Logo />, document.querySelector("main"));
}
