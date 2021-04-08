import React, { useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Tag from "./Tag";


export default function BlogOpen(props) {

    const [blog, setBlog] = React.useState({
        title: "",
        author: "",
        imgsrc: "",
        date: "",
        tags: [],
        content: ""
    });

    useEffect(() => {
        const axiosPromise = () => {
            const promise = axios.get("https://bloggieserver.herokuapp.com/posts/" + props.id);
            const dataPromise = promise.then((response) => response.data);
            return dataPromise;
        }
        axiosPromise().then(result => {
            const data = result;
            console.log(result)
            setBlog(data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [props.id]);


    return (
        <div style={{paddingTop: "5%"}} className="blog-section">
            <div className="blog-view wrapper">
                <h3>{blog.title}</h3>
                <div className="content">
                    <div><img style={{width: "100%", height: "auto"}} src={blog.imgsrc} alt=""/></div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h5>{blog.author}</h5>
                        <h5>{blog.date}</h5>
                    </div>
                    <div style={{display: "flex"}}>
                        {blog.tags.map((tag, index) => {
                            return <div key={index} style={{paddingRight: "20px", paddingBottom: "20px"}}><Tag text={tag} link={"/blogs/" + tag.toLowerCase()}/></div>
                        })}
                    </div>
                    <p>{blog.content}</p>
                </div>
            </div>
            <Sidebar />
        </div>
    );
}