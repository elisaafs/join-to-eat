import React from "react";

function ProfilePicTop({ image, first, last, clickHandler }) {
    return (
        <div className="wrapper-img-top">
            <img
                className="profile-pic-top"
                src={image}
                alt={`${first} ${last}`}
                onClick={clickHandler}
            />
        </div>
    );
}

export default ProfilePicTop;
