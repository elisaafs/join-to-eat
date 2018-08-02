import React, { Component } from "react";

class Bio extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { bio, showBio, toggleShowBio, setBio } = this.props;
        return (
            <div className="wrapper-bio">
                <div className="wrapper-intro-profile">
                    <div className="profile-intro">Profile Intro</div>
                    <div className="wrapper-three">
                        <i className="fas fa-ellipsis-h three"> </i>
                        <div className="big-wrapper-three">
                            <div className="wrapper-three-menu">
                                <div className="menu-three">Edit Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="linha" />
                <div className="about-me">About Me:</div>
                {bio && this.handleChange ? (
                    <div className="bio">
                        {bio} <span onClick={toggleShowBio}>Edit</span>{" "}
                    </div>
                ) : (
                    <p className="text-bio" onClick={toggleShowBio}>
                        You still do not have a bio.
                    </p>
                )}

                {showBio && (
                    <textarea
                        onChange={this.handleChange}
                        name="bio"
                        id=""
                        cols="30"
                        rows="10"
                    />
                )}

                {showBio && (
                    <button
                        onClick={() => {
                            setBio(this.state.bio);
                            toggleShowBio();
                        }}
                    >
                        SAVE
                    </button>
                )}
            </div>
        );
    }
}

export default Bio;
