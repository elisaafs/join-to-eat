import React from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";
import Profile from "./Profile";
import OtherPersonsProfile from "./OtherPersonsProfile";
import Friends from "./Friends";
import Chat from "./Chat";
import EditInfos from "./EditInfos";
import { setMyCoverPic, setMyProfilePic } from "./actions";

const mapStateToProps = state => {
    return {
        profilePic: state.me.profilePic,
        coverPic: state.me.coverPic,
        firstName: state.me.firstName,
        lastName: state.me.lastName,
        bio: state.me.bio,
        city: state.me.city,
        age: state.me.age,
        food: state.me.food,
        chef: state.me.chef,
        email: state.me.email,
        password: state.me.hashedPassword,
        id: state.me.id
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
    setCoverPic,
    age,
    chef,
    bio,
    id,
    food,
    city,
    password,
    email
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
                        id={id}
                    />
                )}
            />
            <Route
                exact
                path="/editprofile"
                render={() => (
                    <EditInfos
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        age={age}
                        city={city}
                        password={password}
                        chef={chef}
                        food={food}
                        bio={bio}
                    />
                )}
            />
            <Route
                path="/user/:id"
                render={props => (
                    <OtherPersonsProfile
                        match={props.match}
                        history={props.history}
                        specialView="wall"
                    />
                )}
            />
            <Route
                path="/friends/:id"
                render={props => (
                    <OtherPersonsProfile
                        match={props.match}
                        history={props.history}
                        specialView="friends"
                    />
                )}
            />
            <Route exact path="/friends/" render={() => <Friends />} />
            <Route exact path="/chat/" render={() => <Chat />} />
        </div>
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
