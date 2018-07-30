import React from "react";

function SignUpButtonTopMain({ signupHandler }) {
    return (
        <div className="signup-button-top-main" onClick={signupHandler}>
            Sign Up
        </div>
    );
}

export default SignUpButtonTopMain;
