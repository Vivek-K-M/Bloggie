import React from "react";

export default function Tag (props) {
    return (
        <div className="tagbox"><a className="tag-btn" href={props.link}>{props.text}</a></div>
    );
}