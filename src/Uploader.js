import React, { Component } from "react";
import axios from "./axios";

class Uploader extends Component {
    constructor(props) {
        super(props);

        this.imageSelected = this.imageSelected.bind(this);
        this.upload = this.upload.bind(this);
    }
    imageSelected(e) {
        this.setState({
            imageFile: e.target.files[0]
        });
    }
    upload() {
        var formData = new FormData();
        // if (this.state.imageFile == "") {
        //     this.setState({
        //         error: "Please, select a file to upload."
        //     });
        // } else {
        formData.append("file", this.state.imageFile);
        axios.post("/upload", formData).then(res => {
            // console.log(this.state.imageFile);
            // if (res.data.success) {
            this.props.setImage(res.data.url);
        });
    }
    // }
    render() {
        return (
            <div id="uploader">
                <div className="uploader-modal">
                    <i className="fas fa-times icon-modal" />
                    <h3>Update Profile Picture</h3>
                    <label id="file-label" htmlFor="file-field">
                        Select a Image
                    </label>
                    <input
                        id="file-field"
                        type="file"
                        onChange={this.imageSelected}
                        name=""
                        value=""
                    />
                    <div className="content-box">
                        <button
                            id="upload-button"
                            onClick={this.upload}
                            name="button"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
