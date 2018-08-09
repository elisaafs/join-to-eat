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
        const { bio, chef, city, food, clickHandler } = this.props;
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
                <div className="linha" onClick={clickHandler} />
                <div className="about-me">About Me:</div>
                {bio ? (
                    <div className="bio">{bio}</div>
                ) : (
                    <p className="text-bio">You still do not have this info.</p>
                )}
                <div className="about-me">City:</div>
                {city ? (
                    <div className="bio">Lives in {city}</div>
                ) : (
                    <p className="text-bio">You still do not have this info.</p>
                )}
                <div className="about-me">Favorite Food:</div>
                {food ? (
                    <div className="bio">{food}</div>
                ) : (
                    <p className="text-bio">You still do not have this info.</p>
                )}
                <div className="about-me">Favorite Chef:</div>
                {chef ? (
                    <div className="chef">{chef}</div>
                ) : (
                    <p className="text-bio">You still do not have this info.</p>
                )}
            </div>
        );
    }
}

export default Bio;
