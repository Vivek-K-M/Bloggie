import React, { useEffect } from "react";
import axios from "axios";
import Blogcard from "./Blogcard";

export default function TagBlogs (props) {

    const [arr, setArr] = React.useState([]);
    
    useEffect(() => {
        const axiosPromise = () => {
            const promise = axios.get("https://bloggieserver.herokuapp.com/blogs/" + props.tagName);
            const dataPromise = promise.then((response) => response.data);
            return dataPromise;
        } 
        axiosPromise().then(data => {
            setArr(data);
        }).catch(err => {
            console.log(err)
        })
    }, [props.tagName]);
    

    return (
        <div className="blog-wrap-2 wrapper">
            {arr.map((blog, index) => {
                return <Blogcard id={blog._id} link={"/posts/"+ blog._id} key={index} imgsrc={blog.imgsrc} title={blog.title} author={blog.author} date={blog.date}/>;
            })}
        </div>
    );
}