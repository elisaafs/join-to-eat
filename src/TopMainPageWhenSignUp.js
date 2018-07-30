import React from "react";
import Logo from "./Logo";
import LoginButtonTop from "./LoginButtonTop";

function TopMainPageWhenSignUp({ loginHandler }) {
    return (
        <div className="wrapper-top">
            <Logo />
            <LoginButtonTop loginHandler={loginHandler} />
        </div>
    );
}

export default TopMainPageWhenSignUp;
