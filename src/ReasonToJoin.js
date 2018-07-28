import React from "react";

function ReasonToJoin({ imageUrl, text }) {
    return (
        <div className="reason-to-join">
            <img src={imageUrl} />
            <div>{text}</div>
        </div>
    );
}

export default ReasonToJoin;
