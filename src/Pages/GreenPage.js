import React from "react";

import ReasonToJoin from "../ReasonToJoin";

function GeenPage({ loginHandler, signupHandler }) {
    return (
        <div className="green-page">
            <div className="green-page-reasons">
                <ReasonToJoin
                    imageUrl="/image/1.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/2.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/3.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/4.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/5.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/6.png"
                    text="Join to invite people for a meal made by you."
                />
                <ReasonToJoin
                    imageUrl="/image/7.png"
                    text="Join to invite people for a meal made by you."
                />
            </div>

            <div className="green-title">
                If you have ever thought of anything related to eating, we
                thought of it before.
            </div>
            <div className="green-call-to-action">
                Sign up now and find your company for the next meal.
            </div>
        </div>
    );
}

export default GeenPage;
