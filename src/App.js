import React, { Component } from "react";
import Logo from "./Logo";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import Uploader from "./Uploader";
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    showUploader() {
        console.log("working");
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(url) {
        this.setState({
            image: url,
            uploaderIsVisible: false
        });
    }
    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        });
    }
    setBio(value) {
        axios.post("/bio", { bio: value }).then(({ data }) => {
            console.log("bio DATA: ", data.bio);
            this.setState({ bio: data.bio });
        });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("are you working?");
            this.setState({
                id: data.id,
                firstName: data.first_name,
                lastName: data.last_name,
                profilePic: data.profile_pic || "/default.jpg"
            });
        });

        axios.get("/bio").then(({ data }) => {
            console.log("are you working?");
            this.setState({
                bio: data.bio
            });
        });
    }
    render() {
        const {
            firstName,
            lastName,
            id,
            profilePic,
            bio,
            showBio
        } = this.state;
        if (!this.state.id) {
            console.log("no state id");
            return null;
        }
        console.log("has state id");
        return (
            <div id="app">
                <Logo />
                <ProfilePic
                    image={profilePic}
                    first={firstName}
                    last={lastName}
                    clickHandler={this.showUploader}
                />
                <BrowserRouter>
                    <div>
                        <Route
                            path="/"
                            render={() => (
                                <Profile
                                    profilePic={profilePic}
                                    firstName={firstName}
                                    lastName={lastName}
                                    id={id}
                                    bio={bio}
                                    showBio={showBio}
                                    toggleShowBio={this.toggleShowBio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>
                <Logo />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}

export default App;
