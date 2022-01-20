//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const { forEach } = require("lodash");

const homeStartingContent = "Welcome! to this blog website. You can add any blog you want which follows our guidelines(visit about page to see guidelines). Hope you enjoy this website.If you can't find your blog hit refresh";
const aboutContent = "This blog website is free for all,add as many as blogs you want. This website is made by Ankush Goel for contacting creator check Contact page.";
const contactContent = "Thanks for visiting contact page!";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/blogdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const blogSchema = new mongoose.Schema({
    title:String,
    content:String
});

const Blog = mongoose.model("Blog",blogSchema);



let dbs=[];

app.get("/home",function(req,res){
     if(dbs.length==0){
      Blog.find(function(err,blogs){
        if(err)
        console.log(err);

        blogs.forEach(function(blog){
            var post={
                title:blog.title,
                content:blog.content
                };
                dbs.push(post);
        })
    });
}

    res.render("home.ejs",{home:homeStartingContent,
    posts:dbs
    });
   
});

app.get("/",function(req,res){
    if(dbs.length==0){
        Blog.find(function(err,blogs){
            if(err)
            console.log(err);
    
            blogs.forEach(function(blog){
                var post={
                    title:blog.title,
                    content:blog.content
                    };
                    dbs.push(post);
            })
        });
    }
    
        res.render("home.ejs",{home:homeStartingContent,
            posts:dbs
        });
});

app.get("/about",function(req,res){
    res.render("about.ejs",{about:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact.ejs",{contact:contactContent});
});

app.get("/compose",function(req,res){
    res.render("compose.ejs");
    
});
app.get("/posts/:topic",function(req,res){
    Blog.findOne({title :req.params.topic},function(err,blogs){
        if(err)
        console.log(err);
         var post={
                title:blogs.title,
                content:blogs.content
                };
         res.render("post.ejs",{posts:post});
    
     });
});


app.post("/compose",function(req,res){
    var post={
        title:req.body.newp,
        content:req.body.posbod
        };
        
        const blog = new Blog(post);
        blog.save();
        dbs=[];
    res.redirect("/home");
});



app.listen(3000, function() {
  console.log("Server online!");
});
