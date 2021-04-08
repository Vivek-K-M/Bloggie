import React from "react";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";


export default function Compose (props) {

    let history = useHistory();
    let user = JSON.parse(localStorage.getItem("user"));

    const d = new Date();
    let dateString = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" + d.getFullYear();

    const [newBlog, setNewBlog] = React.useState({
        title: "",
        author: "",
        imgsrc: "",
        date: dateString,
        tags: "",
        content: ""
    });

    function handleChange (event) {
        const {name, value} = event.target;
        setNewBlog( previousValues => {
            return {
                ...previousValues, 
                [name]: value
            };
        });
    }

    function sendData() {
        axios.post("https://bloggieserver.herokuapp.com/compose", newBlog)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function submitBlog(event) {
        event.preventDefault();
        sendData();
        setNewBlog({
            title: "",
            author: "",
            imgsrc: "",
            date: dateString,
            tags: "",
            content: ""
        });
        history.push("/");
    }

    if(!user) {
        return <Redirect to="/login" />
    }

    return (
        <div className="compose wrapper">
            <form action="/compose" method="post">
                <div><label className="Compose-label">Blog Title</label></div>
                <input name="title" value={newBlog.title} onChange={handleChange} type="text" className="form-input"/>
                <div><label className="Compose-label">Blog Image</label></div>
                <input name="imgsrc" value={newBlog.imgsrc} onChange={handleChange} type="text" className="form-input"/>
                <div><label className="Compose-label">Give Tags to your blog</label></div>
                <input name="tags" value={newBlog.tags} onChange={handleChange} type="text" className="form-input"/>
                <div><label className="Compose-label">Blog Content</label></div>
                <textarea name="content" value={newBlog.content} onChange={handleChange} className="form-input" cols="30" rows="10" maxLength="10000"></textarea>
                <div><label className="Compose-label">Author Name</label></div>
                <input name="author" value={newBlog.author} onChange={handleChange} type="text" className="form-input"/>
                <SubmitBtn submitForm = {submitBlog} text="Publish"/>
            </form>
        </div>
    );
}