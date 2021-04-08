import React from "react";
import Team from "./Team/Team";

export default function About() {
    return (
        <div className="about wrapper">
            <h3 style={{color: "#f13b3b", fontWeight: "600", textAlign: "center", paddingBottom: "0"}} className="title">About Our Team</h3>
            <Team />
        </div>
    );
}