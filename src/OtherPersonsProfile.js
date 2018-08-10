import React, { Component } from "react";
import axios from "./axios";
import ProfilePicOPP from "./ProfilePicOPP";
import ProfileWhite from "./ProfileWhite";
import { Link } from "react-router-dom";
import CoverPicOPP from "./CoverPicOPP";
import FriendButton from "./FriendButton";
import FriendsOfFriends from "./FriendsOfFriends";
import Wallposts from "./Wallposts";

class OtherPersonsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { id: this.props.match.params.id };
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
                        bio:
                            data.data.bio ||
                            "This user doesn't have this info.",
                        id: data.data.id,
                        city:
                            data.data.city ||
                            "This user doesn't have this info.",
                        food:
                            data.data.food ||
                            "This user doesn't have this info.",
                        chef:
                            data.data.chef ||
                            "This user doesn't have this info.",
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
            id,
            first_name,
            last_name,
            profile_pic,
            cover_pic,
            bio,
            chef,
            food,
            city
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
                        <Link
                            className={`names-white first ${
                                this.props.specialView === "wall"
                                    ? "screen"
                                    : ""
                            }`}
                            to={`/user/${id}`}
                        >
                            Timeline
                        </Link>

                        <a className="names-white" href="/about">
                            About
                        </a>
                        <ProfileWhite
                            firstName={first_name}
                            lastName={last_name}
                        />
                        <Link
                            className={`names-white ${
                                this.props.specialView === "friends"
                                    ? "screen"
                                    : ""
                            }`}
                            to={`/friends/${id}`}
                        >
                            Friends
                        </Link>
                        <a className="names-white last" href="/Chat">
                            Chat
                        </a>
                    </div>
                    <div className="wrapper-friendsof">
                        <div className="wrapper-bio">
                            <div className="profile-intro-opp">
                                Profile Intro
                            </div>
                            <div className="linha" />
                            <div className="about-me">About Me:</div>
                            <div className="bio-opp">{bio}</div>
                            <div className="about-me">City:</div>
                            <div className="bio-opp">{city}</div>
                            <div className="about-me">Favorite Food:</div>
                            <div className="bio-opp">{food}</div>
                            <div className="about-me">Favorite Chef:</div>
                            <div className="chef-opp">{chef}</div>
                        </div>
                        {this.props.specialView === "wall" && id ? (
                            <Wallposts id={id} />
                        ) : null}
                        {this.props.specialView === "friends" && id ? (
                            <FriendsOfFriends id={id} />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherPersonsProfile;
