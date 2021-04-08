import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import { Link } from 'react-router-dom';
import Tag from "./Tag";
import LogoutBtn from './LogoutBtn';

const useStyles = makeStyles({
    list: {
        width: 350,
    },
    fullList: {
        width: 'auto',
    },
});

export default function Drawer() {

    const user = JSON.parse(localStorage.getItem("user"));

    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if(event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
    }

    setState({ ...state, [anchor]: open });
  };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        > 
            <List style={{color: "black", display: "flex", flexDirection: "column"}}>
                <ListItem><Link  className="drawer-link" to="/" >HOME</Link></ListItem>
                <ListItem><Link className="drawer-link" to="/about" >ABOUT</Link></ListItem>
                <ListItem><Link className="drawer-link" to="/compose" >COMPOSE</Link></ListItem>
                <ListItem><Link className="drawer-link" to="/contact" >CONTACT</Link></ListItem>
                <ListItem>
                    { !user ? <Tag link = "/login" text="LOGIN"/> : <LogoutBtn /> }
                </ListItem>
            </List>
        </div>
    );

  return (
    <div>
        {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button style={{paddingTop: "12px"}} onClick={toggleDrawer(anchor, true)}><i style={{fontSize: "2.1rem", color: "#f13b3b"}} className="fas fa-bars"></i></Button>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        ))}
    </div>
  );
}