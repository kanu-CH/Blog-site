const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const blog= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt adipisci, maxime eveniet nulla architecto perspiciatis ipsa eius nobis, repellendus saepe odio id totam alias dignissimos. Exercitationem iste blanditiis quisquam vitae repellat. Facilis nisi optio cum. Eos cumque esse aut atque.";
const app = express();
const _ = require("lodash");
const mongoose= require("mongoose");
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-kanika:kanikaCH2512@cluster0.x26aykd.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const postSchema = {
  title: String,
  content: String
 };
const Post = mongoose.model("Post", postSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
    res.render("home");
});
app.get("/about",function(req,res){
res.render("about");
});
app.get("/contact",function(req,res){
res.render("contact");
});
app.get("/compose",function(req,res){
res.render("compose");
});
app.post("/compose", function(req,res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
});
post.save()
.then(function(err,posts){
  if (!err){
    res.redirect("/blogs");
  }
  });
}); 
app.get("/blogs",function(req,res){
  Post.find({})
  .then(function(post){
    res.render("blogs", {
      blog: blog,
      posts: post
      });
    });
});
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId})
    .then(function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content 
      });
    });
  
  });
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
