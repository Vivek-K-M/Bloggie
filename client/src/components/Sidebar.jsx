import React from "react";
import SubmitBtn from "./SubmitBtn";

export default function Sidebar () {

    return (
        <div className="sidebar">
            <div className="subscribe-chart chart">
                <h5>Newsletter</h5>
                <p>Make sure to subscribe to our newsletter and be the first to know the news.</p>
                <form action="">
                    <input type="email" placeholder="Enter your email" className="form-input"/>
                    <SubmitBtn text="Subscribe"/>
                </form>
            </div>
            <div className="social-chart chart">
                <h5>Let's get social</h5>
                <p>We are a team of dedicated professionals delivering high quality WordPress themes and plugins.</p>
                <div className="icons">
                    <a href="/"><i className="fab fa-facebook"></i></a>
                    <a href="/"><i className="fab fa-twitter"></i></a>
                    <a href="/"><i className="fab fa-pinterest"></i></a>
                    <a href="/"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    );
}