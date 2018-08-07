import React from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";
import OnlineUsers from "./OnlineUsers";
import Profile from "./Profile";
import OtherPersonsProfile from "./OtherPersonsProfile";
import Friends from "./Friends";
import Chat from "./Chat";
import { setMyCoverPic, setMyProfilePic } from "./actions";

const mapStateToProps = state => {
    return {
        profilePic: state.me.profilePic,
        coverPic: state.me.coverPic,
        firstName: state.me.firstName,
        lastName: state.me.lastName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProfilePic: url => dispatch(setMyProfilePic(url)),
        setCoverPic: url => dispatch(setMyCoverPic(url))
    };
};

function Main({
    profilePic,
    firstName,
    lastName,
    coverPic,
    setProfilePic,
    setCoverPic
}) {
    return (
        <div className="wrapper-main">
            <Route
                exact
                path="/"
                render={() => (
                    <Profile
                        profilePic={profilePic}
                        firstName={firstName}
                        lastName={lastName}
                        coverPic={coverPic}
                        setProfilePic={setProfilePic}
                        setCoverPic={setCoverPic}
                    />
                )}
            />
            <Route
                path="/user/:id"
                render={props => (
                    <OtherPersonsProfile
                        match={props.match}
                        history={props.history}
                    />
                )}
            />
            <Route exact path="/friends/" render={() => <Friends />} />
            <Route exact path="/chat/" render={() => <Chat />} />
            <Route exact path="/online-users/" render={() => <OnlineUsers />} />
        </div>
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
