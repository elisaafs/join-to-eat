import React, { Component } from "react";
import axios from "./axios";
import ProfilePicOPP from "./ProfilePicOPP";
import ProfileWhite from "./ProfileWhite";
import CoverPicOPP from "./CoverPicOPP";
import FriendButton from "./FriendButton";

class OtherPersonsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeUploader = this.closeUploader.bind(this);
        this.showUploader = this.showUploader.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id + ".json")
            .then(({ data }) => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        bio: data.data.bio || "This user doesn't have a bio.",
                        id: data.data.id,
                        first_name: data.data.first_name,
                        last_name: data.data.last_name,
                        profile_pic: data.data.profile_pic || "/default.png",
                        cover_pic: data.data.cover_pic || "/defaultcover.png"
                    });
                }
            });
    }
    render() {
        const {
            first_name,
            last_name,
            profile_pic,
            cover_pic,
            bio
        } = this.state;
        return (
            <div id="other-persons">
                <div className="big-wrapper">
                    <div className="wrapper-relative">
                        <CoverPicOPP
                            image={cover_pic}
                            first={first_name}
                            last={last_name}
                        />
                        <ProfilePicOPP
                            image={profile_pic}
                            first={first_name}
                            last={last_name}
                        />
                        <FriendButton
                            otherUserId={this.props.match.params.id}
                        />
                    </div>
                    <div className="white-wrapper">
                        <a className="names-white first screen" href="/user:id">
                            Timeline
                        </a>
                        <a className="names-white" href="/about">
                            About
                        </a>
                        <ProfileWhite
                            firstName={first_name}
                            lastName={last_name}
                        />
                        <a className="names-white" href="/Friends">
                            Friends
                        </a>
                        <a className="names-white last" href="/Chat">
                            Chat
                        </a>
                    </div>
                    <div className="wrapper-bio">
                        <div className="profile-intro-opp">Profile Intro</div>
                        <div className="linha" />
                        <div className="about-me">About Me:</div>
                        <div className="bio-opp">{bio}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherPersonsProfile;
