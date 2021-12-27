//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome! to this blog website . You can add any blog you want which contains no hatefull or adult content. Hope you enjoy my website";
const aboutContent = "This blog website is free for all,add as many as blogs you want. This website is made by Ankush Goel for contacting creator check Contact page.";
const contactContent = "Thanks for visiting contact page!";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const store=[];
app.get("/home",function(req,res){

    res.render("home.ejs",{home:homeStartingContent,
    posts:store
    });
   
});

app.get("/",function(req,res){

    res.render("home.ejs",{home:homeStartingContent,
    posts:store
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
    store.forEach(function(s){
        if(s.title=== req.params.topic)
        {
            res.render("post.ejs",{posts:s});
        }
        else
        console.log("Nope!");
    });
   
});

app.post("/compose",function(req,res){
    var post={
        title:req.body.newp,
    content:req.body.posbod
        };
        store.push(post);
    
    res.redirect("/home");
});





app.listen(3000, function() {
  console.log("Server online!");
});
