import React from "react";
import { connect } from "react-redux";
import { withRouter, Link, Route } from "react-router-dom";

import Logo from "./Logo";
import ProfilePicTop from "./ProfilePicTop";
import ProfileTop from "./ProfileTop";

const mapStateToProps = state => {
    return {
        profilePic: state.me.profilePic,
        firstName: state.me.firstName,
        lastName: state.me.lastName
    };
};

function Header({ profilePic, firstName, lastName }) {
    const createMenu = active => {
        return [
            <Link key="logo" to="/">
                <Logo />
            </Link>,
            <div key="menu" className="wrapper-app">
                <Link to="/">
                    <i
                        className={`fas fa-home icons-app ${
                            active === "home" ? "onscreen" : ""
                        }`}
                    />
                </Link>
                <Link to="/friends">
                    <i
                        className={`fas fa-user-friends icons-app ${
                            active === "friends" ? "onscreen" : ""
                        }`}
                    />
                </Link>
                <a href="/chat">
                    <i
                        className={`fas fa-comments icons-app ${
                            active === "chat" ? "onscreen" : ""
                        }`}
                    />
                </a>
                <ProfilePicTop
                    image={profilePic}
                    first={firstName}
                    last={lastName}
                />
                <ProfileTop firstName={firstName} lastName={lastName} />
            </div>
        ];
    };

    return (
        <div className="wrapper-top-app">
            <Route exact path="/" render={() => createMenu("home")} />
            <Route path="/user/:id" render={() => createMenu("friends")} />
            <Route
                exact
                path="/friends/"
                render={() => createMenu("friends")}
            />
        </div>
    );
}

export default withRouter(connect(mapStateToProps)(Header));
