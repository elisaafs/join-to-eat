import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function TopAppPage({ children }) {
    return (
        <div className="wrapper-top-app">
            <Link to="/">
                <Logo />
            </Link>

            <div className="wrapper-app">
                <Link to="/">
                    <i className="fas fa-home icons-app onscreen" />
                </Link>

                <a href="/friends">
                    <i className="fas fa-user-friends icons-app" />
                </a>
                <a href="/chat">
                    <i className="fas fa-comments icons-app" />
                </a>
                {children}
            </div>
        </div>
    );
}

export default TopAppPage;
