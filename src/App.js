import React, { Component } from "react";
import TopAppPage from "./TopAppPage";
import OtherPersonsProfile from "./OtherPersonsProfile";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import ProfileWhite from "./ProfileWhite";
import CoverPic from "./CoverPic";
import Profile from "./Profile";
import Uploader from "./Uploader";
import UploaderCover from "./UploaderCover";
import ProfilePicTop from "./ProfilePicTop";
import ProfileTop from "./ProfileTop";
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.showUploaderCover = this.showUploaderCover.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setCover = this.setCover.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true,
            uploaderCoverIsVisible: false
        });
    }
    showUploaderCover() {
        this.setState({
            uploaderCoverIsVisible: true,
            uploaderIsVisible: false
        });
    }
    setImage(url) {
        this.setState({
            uploaderIsVisible: false,
            profilePic: url
        });
    }

    setCover(coverUrl) {
        this.setState({
            uploaderCoverIsVisible: false,
            coverPic: coverUrl
        });
    }

    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        });
    }
    setBio(value) {
        axios.post("/bio", { bio: value }).then(({ data }) => {
            this.setState({ bio: data.bio });
        });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                id: data.id,
                firstName: data.first_name,
                lastName: data.last_name,
                profilePic: data.profile_pic || "/default.png",
                coverPic: data.cover_pic || "/defaultcover.png"
            });
        });

        axios.get("/bio").then(({ data }) => {
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
            coverPic,
            bio,
            showBio
        } = this.state;
        if (!this.state.id) {
            return null;
        }

        return (
            <div id="app">
                <TopAppPage>
                    <ProfilePicTop
                        image={profilePic}
                        first={firstName}
                        last={lastName}
                        clickHandler={this.showUploader}
                    />
                    <ProfileTop firstName={firstName} lastName={lastName} />
                </TopAppPage>
                <CoverPic
                    image={coverPic}
                    first={firstName}
                    last={lastName}
                    clickHandler={this.showUploaderCover}
                />
                <div className="white-wrapper">
                    <a className="names-white first screen" href="/">
                        Timeline
                    </a>
                    <a className="names-white" href="/about">
                        About
                    </a>
                    <ProfileWhite firstName={firstName} lastName={lastName} />
                    <a className="names-white" href="/Friends">
                        Friends
                    </a>
                    <a className="names-white last" href="/Chat">
                        Chat
                    </a>
                </div>

                <ProfilePic
                    image={profilePic}
                    first={firstName}
                    last={lastName}
                    clickHandler={this.showUploader}
                />

                <BrowserRouter>
                    <div>
                        <Route
                            exact
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
                                    coverPic={coverPic}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            component={OtherPersonsProfile}
                        />
                    </div>
                </BrowserRouter>
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
                {this.state.uploaderCoverIsVisible && (
                    <UploaderCover setCover={this.setCover} />
                )}
            </div>
        );
    }
}

export default App;
