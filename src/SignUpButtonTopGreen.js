import React from "react";

function SignUpButtonTopGreen({ signUpHandler }) {
    return (
        <div className="signup-button-top-green" onClick={signUpHandler}>
            Sign Up
        </div>
    );
}

export default SignUpButtonTopGreen;
