import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";

function Welcome() {
    return (
        <div className="big-container-top">
            <div className="infos-top">
                <img className="logo" src="/Untitled.png" />
                <h1 className="title">You will never eat alone</h1>
                <div className="line" />
                <p className="subtitle">
                    Sign up for free and find your company for the next meal
                </p>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                </div>
            </HashRouter>
            <div className="infos-bottom">
                For those who <span>believe</span> that eating is a social act
            </div>
            <div className="line2" />
            <div className="infos-bottom2">
                Connecting people from <span>all over the world</span> around a
                table
            </div>
            <div className="line3" />
        </div>
    );
}

export default Welcome;
