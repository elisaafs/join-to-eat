import React, { Component } from "react";
import TopAppPage from "./TopAppPage";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import ProfileWhite from "./ProfileWhite";
import CoverPic from "./CoverPic";
import Bio from "./Bio";
import Uploader from "./Uploader";
import UploaderCover from "./UploaderCover";
import ProfilePicTop from "./ProfilePicTop";
import ProfileTop from "./ProfileTop";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                <Bio
                    bio={bio}
                    showBio={showBio}
                    toggleShowBio={this.toggleShowBio}
                    setBio={this.setBio}
                />
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

export default Profile;
