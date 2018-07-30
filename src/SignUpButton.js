import React from "react";

function SignUpButton({ signupHandler }) {
    return (
        <div className="signup-button" onClick={signupHandler}>
            Get Started
        </div>
    );
}

export default SignUpButton;
