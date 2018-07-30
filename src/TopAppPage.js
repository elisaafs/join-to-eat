import React from "react";
import Logo from "./Logo";

function TopAppPage({ children }) {
    return (
        <div className="wrapper-top-app">
            <Logo />
            <div className="wrapper-app">
                <a href="/">
                    <i className="fas fa-home icons-app onscreen" />
                </a>
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
