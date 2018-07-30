import React from "react";
import Logo from "../Logo";
import LogoNew from "../LogoNew";
import LoginButtonTop from "../LoginButtonTop";
import SignUpButtonTopBlue from "../SignUpButtonTopBlue";

function BluePage({
    loginHandler,
    signupHandler,
    showLoginForm,
    showSignupForm
}) {
    return (
        <div className="blue-page">
            <div className="wrapper-top">
                <Logo />
                <div className="buttons-right">
                    <LoginButtonTop />
                    <SignUpButtonTopBlue />
                </div>
            </div>
            <div className="wrapper-guirlanda">
                <img className="guirlanda-food" src="./image/nova.png" />
                <div className="wrapper-logo-inlet">
                    <LogoNew />
                </div>
            </div>
            <div className="wrapper-texts-blue">
                <div className="text-blue-big">
                    Join to Eat takes food very seriously.
                </div>
                <div className="text-blue">
                    We created it to connect people from all over the world
                    around a table in a restaurant, kitchen, bar or on a
                    barbecue in a park. Feel free, gluttony is not a sin here.
                </div>
            </div>
        </div>
    );
}

export default BluePage;
