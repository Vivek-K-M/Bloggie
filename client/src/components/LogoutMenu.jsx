import React, { useContext } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { userContext} from "./UserContext";


export default function Logout(props) {

    let history = useHistory();
    let user = JSON.parse(localStorage.getItem("user"));
    
    const  { setUserName } = useContext(userContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                style={{paddingTop: "0", backgroundColor: "#f13b3b", color: "white", borderRadius: "10px"}}>
                <strong>{user && user.fName}</strong>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><a style={{color: "black"}} href="/">Home</a></MenuItem>
                <MenuItem onClick={handleClose}><a style={{color: "black"}} href="/compose">Publish</a></MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
