import React from "react"

export default function LargeBtn (props) {
    return (
        <a className="lg-btn" href={props.link}>{props.text}</a>
    );
}