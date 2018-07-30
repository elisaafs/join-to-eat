import React from "react";

function LoginTextBbqPage({ loginHandler }) {
    return (
        <div className="go-to-login-button">
            If you are already registered,{" "}
            <div className="link" onClick={loginHandler}>
                click here
            </div>{" "}
            to login.
        </div>
    );
}

export default LoginTextBbqPage;
