import React, { useContext } from "react";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { userContext } from "./UserContext";


export default function Login() {

    let history = useHistory();
    let user = JSON.parse(localStorage.getItem("user"));
    const { setUserName } = useContext(userContext);

    const [newUser, setNewUser] = React.useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setNewUser(previousValues => {
            return {
                ...previousValues,
                [name]: value
            }
        })
    }

    function sendData() {
        axios.post("https://bloggieserver.herokuapp.com/login", newUser)
        .then(response => {
            if(response.data === "Incorrect Username or Password. Please try again." || response.data === "This email is not registered. Please signup to proceed.") {
                window.alert(response.data);
            }
            else {
                localStorage.setItem("user", JSON.stringify(response.data));
                setUserName(response.data.fName);
                
                history.push("/");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    function submitUser(event) { 
        event.preventDefault();
        sendData();
        setNewUser({
            username: "",
            password: ""
        });
    }

    if(user) {
        return <Redirect to="/"/>
    }

    return (
        <div className="login loginbox wrapper">
            <h5 style={{marginBottom: "10px", color: "#f13b3b"}}>LOGIN TO PUBLISH A BLOG</h5>
            <form action="/login" method="post">
                <input placeholder="Enter your Username or email" onChange={handleChange} value={newUser.username} name="username"  type="text" className="form-input"/>
                <input placeholder="Enter password" onChange={handleChange} value={newUser.password} name="password" type="password" className="form-input"/>
                <SubmitBtn submitForm={submitUser} text="Login"/>
                <p style={{marginTop: "0"}}>New user <a href="/signup">Signup</a> </p>
            </form>
        </div>
    );
}