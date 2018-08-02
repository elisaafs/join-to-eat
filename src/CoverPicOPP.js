import React from "react";

function CoverPicOPP({ image, first, last }) {
    return (
        <div className="img-wrapper-cover">
            <img
                className="profile-cover-pic-opp"
                src={image}
                alt={`${first} ${last}`}
            />
        </div>
    );
}

export default CoverPicOPP;
