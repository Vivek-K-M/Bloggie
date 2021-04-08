require("dotenv").config()

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const blogs = require("./assets/blogs");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(res => {
    // console.log(res);
}).catch(err => {
    console.log(err);
})


const blogSchema = {
    title: String,
    author: String,
    imgsrc: String,
    date: String,
    tags: [],
    content: String
}

const Blog = mongoose.model("Blog", blogSchema);

const userSchema = {
    fName: String,
    lName: String,
    email: String,
    password: String
}

const User = mongoose.model("User", userSchema);

const contactSchema = {
    name: String,
    email: String,
    message: String
}

const Contact = mongoose.model("Contact", contactSchema);

app.get("/getblogs", (req, res) => {
    Blog.find({}, (err, foundList) => {
        if(!err) {
            res.send(foundList);
        }
        else {
            console.log(err);
        }
    })
})


app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    Blog.findOne({_id: id}, (err, foundBlog) => {
        if(!err) {
            if(foundBlog) {
                res.send(foundBlog);
            }
            else {
                res.send("<h3>OOPS!!! The Blog may have been deleted :) </h3>")
            }
        }
        else {
            console.log(err);
        }
    })
})


app.get("/blogs/:tagName", (req, res) => {
    const tag = _.capitalize(req.params.tagName);
    Blog.find({tags: tag}, (err, foundList) => {
        if(!err) {
            if(foundList.length > 0) {
                res.send(foundList);
            }
            else {
                console.log("no tagblogs found!!!");
            }
        }
        else console.log(err);
    })
})


app.post("/compose", (req, res) => {
    const b = req.body
    const t = b.tags.split(" ");
    const tags = [];
    t.forEach(tag => {
        tags.push(_.capitalize(tag));
    })
    const newBlog = new Blog({
        title: b.title,
        author: b.author,
        imgsrc: b.imgsrc,
        date: b.date,
        tags: tags,
        content: b.content
    })
    console.log(newBlog)
    Blog.insertMany([newBlog], err => {
        if(err) {
            console.log(err);
        }
    })
})


app.post("/contact", (req, res) => {
    const data = req.body;
    const newcontact = new Contact({
        name: data.name,
        email: data.email,
        message: data.message
    });
    Contact.insertMany([newcontact], err => {
        if(err) {
            console.log(err);
        }
    })
})


app.post("/login", (req, res) => {
    const data = req.body;
    User.findOne({email: _.toLower(data.username)}, (err, foundUser) => {
        if(!err) {
            if(!foundUser) {
                res.send("This email is not registered. Please signup to proceed.")
            }
            else {
                bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                    if(result === true) {
                        res.send(foundUser);
                    }
                    else {
                        res.send("Incorrect Username or Password. Please try again.");
                    }
                });
            }
        }
        else {
            console.log(err);
        }
    })
})

app.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const data = req.body;
        User.findOne({email: _.toLower(data.email)}, (err, foundUser) => {
            if(err) {
                console.log(err);
            }
            else {
                if(!foundUser) {
                    const newUser = new User({
                        fName: data.fName,
                        lName: data.lName,
                        email: _.toLower(data.email),
                        password: hash
                    })
                    User.insertMany([newUser], err => {
                        if(err) {
                            console.log(err);
                        }
                    })
                    res.send(newUser);
                }
                else {
                    res.send("This email is already registered. Login to proceed further.");
                }
            }
        })
    });
})


app.listen(process.env.PORT || 5000, function () {
    console.log("server started...");
})