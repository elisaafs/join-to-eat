import React from "react";
import Registration from "../Registration";
import SignUpButton from "../SignUpButton";
import LoginButton from "../LoginButton";
import Login from "../Login";
import SignupTextBbqPage from "../SignupTextBbqPage";
import LoginTextBbqPage from "../LoginTextBbqPage";

function BbqPage({
    loginHandler,
    signupHandler,
    switchHandler,
    showLoginForm,
    showSignupForm
}) {
    let form;
    let text;
    if (showLoginForm) {
        form = <Login />;
        text = <SignupTextBbqPage signupHandler={signupHandler} />;
    } else if (showSignupForm) {
        form = <Registration />;
        text = <LoginTextBbqPage loginHandler={loginHandler} />;
    } else {
        form = [
            <SignUpButton key="signup" signupHandler={signupHandler} />,
            <LoginButton key="login" loginHandler={loginHandler} />
        ];
    }
    return (
        <div className="bbq-page">
            <div className="wrapper-video">
                <video
                    className="video-bbq-page"
                    width="100%"
                    height="100%"
                    autoPlay="true"
                    loop="true"
                    muted="true"
                >
                    <source src="./image/Night-BBQ.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="wrapper-infos">
                <div className="subwrapper-bbq">
                    <div className="text-big-bbq-page">
                        We are pretty sure you must be already hungry at this
                        point.
                    </div>
                    <div className="text-bbq-page">
                        And ready to come on in, of course.
                    </div>
                    {form}
                    <div className="text-bottom-bbq">{text}</div>
                </div>
            </div>
            <div className="bbq-top" onClick={switchHandler.bind(null, 2)}>
                Why sign up for Join to Eat?
            </div>
        </div>
    );
}

export default BbqPage;
