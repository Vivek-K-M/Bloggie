import React from "react";

export default function SubmitBtn (props) {
    return <div><button onClick={props.submitForm} className="submit-btn" type="submit">{props.text}</button></div>;
}