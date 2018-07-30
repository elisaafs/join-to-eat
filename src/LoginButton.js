import React from "react";

function LoginButton({ loginHandler }) {
    return (
        <div className="login-button" onClick={loginHandler}>
            Login
        </div>
    );
}

export default LoginButton;
