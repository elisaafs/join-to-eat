import React from "react";

function LoginButtonTop({ loginHandler }) {
    return (
        <div className="login-button-top" onClick={loginHandler}>
            Login
        </div>
    );
}

export default LoginButtonTop;
