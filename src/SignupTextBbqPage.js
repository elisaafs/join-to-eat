import React from "react";

function SignupTextBbqPage({ signupHandler }) {
    return (
        <div className="go-to-login-button">
            If you are not registered,{" "}
            <div className="link" onClick={signupHandler}>
                click here
            </div>{" "}
            to signup.
        </div>
    );
}

export default SignupTextBbqPage;
