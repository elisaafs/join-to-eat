import React from "react";
import Logo from "../Logo";
import ReasonToJoin from "../ReasonToJoin";
import LoginButtonTop from "../LoginButtonTop";
import SignUpButtonTopGreen from "../SignUpButtonTopGreen";

function GeenPage({
    loginHandler,
    signupHandler,
    showLoginForm,
    showSignupForm
}) {
    return (
        <div className="green-page">
            <div className="wrapper-top">
                <Logo />
                <div className="buttons-right">
                    <LoginButtonTop />
                    <SignUpButtonTopGreen />
                </div>
            </div>
            <div className="green-page-reasons">
                <ReasonToJoin
                    imageUrl="/image/1.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/2.png"
                    text="Join for an outside event."
                />
                <ReasonToJoin
                    imageUrl="/image/3.png"
                    text="Join for a drink."
                />
                <ReasonToJoin
                    imageUrl="/image/6.png"
                    text="Join to try a new restaurant."
                />
                <ReasonToJoin
                    imageUrl="/image/5.png"
                    text="Join to share recipes."
                />
                <ReasonToJoin
                    imageUrl="/image/7.png"
                    text="Join to discover hot spots in different countries."
                />
                <ReasonToJoin
                    imageUrl="/image/4.png"
                    text="Join to chat with more passionates about food."
                />
            </div>
            <div className="green-title">
                If you have ever thought of anything related to eating, we
                thought of it before.
            </div>
            <div className="green-call-to-action">
                Sign up now and find your company for the next meal.
            </div>
        </div>
    );
}

export default GeenPage;
