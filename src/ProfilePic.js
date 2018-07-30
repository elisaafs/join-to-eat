import React from "react";

function ProfilePic({ image, first, last, clickHandler }) {
    return (
        <div className="img-wrapper">
            <img
                className="profile-pic"
                src={image}
                alt={`${first} ${last}`}
                onClick={clickHandler}
            />
            <div className="change-picture">
                <div className="text-change-picture" onClick={clickHandler}>
                    <i className="fas fa-camera camera" /> Update Profile
                    Picture
                </div>
            </div>
        </div>
    );
}

export default ProfilePic;
