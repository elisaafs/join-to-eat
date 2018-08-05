import React from "react";

function ProfilePicTop({ image, first, last }) {
    return (
        <div className="wrapper-img-top">
            <img
                className="profile-pic-top"
                src={image}
                alt={`${first} ${last}`}
            />
        </div>
    );
}

export default ProfilePicTop;
