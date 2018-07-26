import React from "react";

function ProfilePic({ image, first, last, clickHandler }) {
    return <img src={image} alt={`${first} ${last}`} onClick={clickHandler} />;
}

export default ProfilePic;
