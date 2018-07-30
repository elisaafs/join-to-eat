import React from "react";
import BigLogo from "../BigLogo";
import LogoMain from "../LogoMain";
import SignUpButton from "../SignUpButton";
import LoginButton from "../LoginButton";
import Login from "../Login";
import Registration from "../Registration";
import TopMainPageWhenLogin from "../TopMainPageWhenLogin";
import TopMainPageWhenSignUp from "../TopMainPageWhenSignUp";

function MainPage({
    loginHandler,
    signupHandler,
    switchHandler,
    showLoginForm,
    showSignupForm
}) {
    let form;
    let icons;
    if (showLoginForm) {
        form = <Login />;
        icons = <TopMainPageWhenLogin signupHandler={signupHandler} />;
    } else if (showSignupForm) {
        form = <Registration />;
        icons = <TopMainPageWhenSignUp loginHandler={loginHandler} />;
    } else {
        form = [
            <SignUpButton key="signup" signupHandler={signupHandler} />,
            <LoginButton key="login" loginHandler={loginHandler} />
        ];
        icons = <LogoMain />;
    }

    return (
        <div className="main-page">
            <div className="wrapper-video">
                <video
                    className="video-main-page"
                    width="100%"
                    height="100%"
                    autoPlay="true"
                    loop="true"
                    muted="true"
                >
                    <source src="./image/video.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="wrapper-infos">
                <div className="subwrapper-info">
                    <BigLogo />
                    <div className="text-main-page">
                        For those who believe that eating is a social act.
                    </div>
                    {form}
                </div>
            </div>
            <div className="blue-bottom" onClick={switchHandler.bind(null, 1)}>
                What is Join to Eat?
            </div>
            <div className="logo-top">{icons}</div>
        </div>
    );
}

export default MainPage;
