import React, { Component } from "react";
import axios from "./axios";

class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { setBio, closeEditProfile } = this.props;
        return (
            <div id="uploader">
                <div className="uploader-modal">
                    <div className="uploader-inlet">
                        <div className="wrapper-inlet">
                            <h3 className="text-upload">Edit Profile</h3>
                            <i
                                className="fas fa-times icon-modal"
                                onClick={closeEditProfile}
                            />
                        </div>
                        <div className="linha2" />
                        <div className="wrapper-inlet-2">
                            <textarea
                                onChange={this.handleChange}
                                name="bio"
                                className="textarea-bio"
                            />
                            <button
                                onClick={() => {
                                    setBio(this.state.bio);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;
