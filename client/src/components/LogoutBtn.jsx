import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { userContext } from "./UserContext";
import { useHistory } from "react-router-dom";

export default function LogoutBtn() {

    let history = useHistory();
    const { setUserName} = useContext(userContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    function logout(event) {
        event.preventDefault();
        setUserName("Login");
        // console.log(userName);
        localStorage.clear();
        handleClose();
        history.push("/");
    }

    return (
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={logout}
                style={{paddingTop: "5px", backgroundColor: "#f13b3b", color: "white", borderRadius: "10px"}}>
                <strong>LOGOUT</strong>
        </Button>
    );
}