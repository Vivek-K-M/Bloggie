import React, { useContext } from "react";
import axios from "axios";
import SubmitBtn from "./SubmitBtn"
import { Redirect, useHistory } from "react-router-dom";
import { userContext } from "./UserContext";


export default function Signup () {

    let history = useHistory();
    const { setUserName } = useContext(userContext);
    let user = JSON.parse(localStorage.getItem("user"));
    
    const [newUser, setNewUser] = React.useState({
        fName: "",
        lName: "",
        email: "",
        password: ""
    });

    function handleChange (event) {
        const {name, value} = event.target;
        setNewUser(previousValues => {
            return {
                ...previousValues,
                [name]: value
            }
        })
    }

    function sendData() {
        axios.post("https://bloggieserver.herokuapp.com/signup", newUser)
        .then(response => {
            if(response.data === "This email is already registered. Login to proceed further.") {
                window.alert(response.data);
            }
            else {
                localStorage.setItem("user", JSON.stringify(response.data));
                setUserName(newUser.fName);
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
            fName: "",
            lName: "",
            email: "",
            password: ""
        });
    }

    if(user) {
        return <Redirect to="/"/>
    }

    return (
        <div className="signupbox wrapper">
            <h5 style={{marginBottom: "10px", color: "#f13b3b"}}>REGISTER HERE TO PUBLISH YOUR BLOG</h5>
            <form action="/signup" method="post">
                <div className="namebox">
                    <input onChange={handleChange} placeholder="First Name" value={newUser.fName} name="fName"  type="text" className="form-input"/>
                    <input onChange={handleChange} placeholder="Last Name" value={newUser.lName} name="lName" type="text" className="form-input"/>
                </div>
                <input onChange={handleChange} placeholder="Enter your Email" value={newUser.email} name="email" type="email" className="form-input"/>
                <input onChange={handleChange} placeholder="Enter Password" value={newUser.password} name="password" type="password" className="form-input"/>
                <SubmitBtn submitForm={submitUser} text="Signup"/>
                <p style={{marginTop: "0"}}>Already a user <a href="/login"> Login</a> </p>
            </form>
        </div>
    );
}