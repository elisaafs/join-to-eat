import React from "react";
import Logo from "./Logo";
import SignUpButtonTopMain from "./SignUpButtonTopMain";

function TopMainPageWhenLogin({ signupHandler }) {
    return (
        <div className="wrapper-top">
            <Logo />
            <SignUpButtonTopMain signupHandler={signupHandler} />
        </div>
    );
}

export default TopMainPageWhenLogin;
