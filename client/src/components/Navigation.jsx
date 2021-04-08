import React, { useEffect } from "react";
import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Compose from "./Compose";
import Home from "./Home";
import BlogOpen from "./BlogOpen";
import TagBlogs from "./TagBlogs";
import Tag from "./Tag";
import Signup from "./Signup";
import Logout from "./LogoutMenu";
import { userContext } from "./UserContext";
import Drawer from "./Drawer";


const newBlog = ({match}) => {
    const id = match.params.idOfBlog;
    return <BlogOpen id={id} />
}

const tagBlogs = ({match}) => {
    const tagName = match.params.tag
    return <TagBlogs tagName={tagName}/>;
}

function Navigation() {

    let user = JSON.parse(localStorage.getItem("user"));
    const [userName, setUserName] = React.useState("LOGIN");

    const [windowSize, setWindowSize] = React.useState({
        width: undefined,
        height: undefined,
      });
    useEffect(() => {
    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    useEffect(() => {
        if(user) {
            setUserName(user.fName);
        }
        else {
            setUserName("Login");
        }
    }, [user]);

    return (
        <userContext.Provider value = {{userName, setUserName}}>
            <Router>
                <nav className="site-nav">
                    <span><a href="/">Bloggie</a></span>
                    {windowSize.width > 800 ? 
                    <ul>
                        <Link to="/" >HOME</Link>
                        <Link to="/about">ABOUT</Link>
                        <Link to="/contact">CONTACT</Link>
                        <Link to="/compose">COMPOSE</Link>
                        { !user ? <Tag link = "/login" text="LOGIN"/> : <Logout fName={userName}/> }
                    </ul>
                    : <Drawer />}
                </nav> 
                <Switch>
                    <Route path="/" exact strict component={Home} />
                    <Route path="/about" exact strict component={About} />
                    <Route path="/contact" exact strict component={Contact} />
                    <Route path="/compose" exact strict component={Compose} />
                    <Route path="/login" exact strict component={Login} />
                    <Route path="/posts/:idOfBlog" exact strict component={newBlog}/>
                    <Route path="/blogs/:tag" exact strict component={tagBlogs}/>
                    <Route path="/signup" exact strict component={Signup} />
                </Switch>
            </Router>
        </userContext.Provider>

    );
}

export default Navigation;