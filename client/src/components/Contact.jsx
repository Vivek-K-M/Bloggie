import React from "react";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Contact() {

    let history = useHistory();

    const [newMessage, setNewMessage] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    function handleChange (event) {
        const {name, value} = event.target;
        setNewMessage( previousValues => {
            return {
                ...previousValues, 
                [name]: value
            };
        });
    }

    function sendData() {
        axios.post("https://bloggieserver.herokuapp.com/contact", newMessage)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function submitMessage(event) {
        event.preventDefault();
        sendData();
        setNewMessage({
            name: "",
            email: "",
            message: "",
        });
        history.push("/");
    }

    return (
        <div className="wrapper">
            <h3 style={{textAlign: "center"}} className="title">Contact Us</h3>
            <div className="inputs">
                <form action="">
                    <input onChange={handleChange} value={newMessage.name} className="form-input" type="text" name="name" placeholder="Enter Your Name" />
                    <input onChange={handleChange} value={newMessage.email} className="form-input" type="email" name="email" placeholder="Enter Your Email" />
                    <textarea onChange={handleChange} value={newMessage.message} className="form-input" name="message" maxLength="500" rows="10" placeholder="Message"></textarea>
                    <SubmitBtn submitForm={submitMessage} text="Message Us"/>
                </form>
            </div>
        </div>
    );
}