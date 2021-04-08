import React from "react";


function Blogcard(props) {
    return (
        <div className="blog-box card">
            <div><a href={props.link}><img src={props.imgsrc} alt="blogImage"/></a></div>
            <a className="title" href={props.link}><h5>{props.title}</h5></a>
            <div className="lower-content">
                <h5>{props.author}</h5>
                <p>{props.date}</p>
            </div>
        </div>            
    );
}

export default Blogcard;