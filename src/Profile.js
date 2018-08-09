import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import ProfileWhite from "./ProfileWhite";
import CoverPic from "./CoverPic";
import Bio from "./Bio";
import Uploader from "./Uploader";
import Wallposts from "./Wallposts";
import EditProfile from "./EditProfile";
import UploaderCover from "./UploaderCover";
import { Link } from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.showEditProfile = this.showEditProfile.bind(this);
        this.showUploaderCover = this.showUploaderCover.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setCover = this.setCover.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
        this.setFriendshipStatus = this.setFriendshipStatus.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.closeEditProfile = this.closeEditProfile.bind(this);
        this.closeCoverUploader = this.closeCoverUploader.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true,
            uploaderCoverIsVisible: false
        });
    }

    showEditProfile() {
        this.setState({
            editProfileIsVisible: true,
            uploaderCoverIsVisible: false,
            uploaderIsVisible: false
        });
    }

    setFriendshipStatus(status) {
        this.setState({
            friendshipStatus: status
        });
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    closeEditProfile() {
        this.setState({
            editProfileIsVisible: false
        });
    }

    showUploaderCover() {
        this.setState({
            uploaderCoverIsVisible: true,
            uploaderIsVisible: false
        });
    }

    closeCoverUploader() {
        this.setState({
            uploaderCoverIsVisible: false
        });
    }

    setImage(url) {
        this.setState({
            uploaderIsVisible: false
        });
        this.props.setProfilePic(url);
    }

    setCover(coverUrl) {
        this.setState({
            uploaderCoverIsVisible: false
        });
        this.props.setCoverPic(coverUrl);
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
        axios.get("/bio").then(({ data }) => {
            this.setState({
                bio: data.bio
            });
        });
    }

    render() {
        const { firstName, lastName, profilePic, coverPic, id } = this.props;
        const { bio, showBio } = this.state;

        return (
            <div id="profile">
                <div className="big-wrapper">
                    <div className="wrapper-relative">
                        <CoverPic
                            image={coverPic}
                            first={firstName}
                            last={lastName}
                            clickHandler={this.showUploaderCover}
                        />
                        <ProfilePic
                            image={profilePic}
                            first={firstName}
                            last={lastName}
                            clickHandler={this.showUploader}
                        />
                    </div>
                    <div className="white-wrapper">
                        <Link to="/" className="names-white first screen">
                            Timeline
                        </Link>

                        <a className="names-white" href="/about">
                            About
                        </a>
                        <ProfileWhite
                            firstName={firstName}
                            lastName={lastName}
                        />
                        <Link to="/friends" className="names-white">
                            Friends
                        </Link>

                        <a className="names-white last" href="/Chat">
                            Chat
                        </a>
                    </div>
                    <div className="bio-wallpost-wrapper">
                        <Bio
                            bio={bio}
                            showBio={showBio}
                            clickHandler={this.showEditProfile}
                        />
                        {id ? <Wallposts id={id} /> : null}
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeUploader={this.closeUploader}
                    />
                )}
                {this.state.editProfileIsVisible && (
                    <EditProfile
                        setBio={this.setBio}
                        closeEditProfile={this.closeEditProfile}
                    />
                )}
                {this.state.uploaderCoverIsVisible && (
                    <UploaderCover
                        setCover={this.setCover}
                        closeCoverUploader={this.closeCoverUploader}
                    />
                )}
            </div>
        );
    }
}

export default Profile;
