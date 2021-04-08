import React from "react";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <p>Bloggie Designed by Vivek and Ashish</p>
            <p>copyright © {currentYear}</p>
        </div>
    );
}

export default Footer;