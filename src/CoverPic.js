import React from "react";

function CoverPic({ image, first, last, clickHandler }) {
    return (
        <div className="img-wrapper-cover">
            <img
                className="profile-cover-pic"
                src={image}
                alt={`${first} ${last}`}
                onClick={clickHandler}
            />
            <div className="change-cover">
                <div className="text-change-cover" onClick={clickHandler}>
                    <i className="fas fa-camera camera" /> Update Cover Photo
                </div>
            </div>
        </div>
    );
}

export default CoverPic;
