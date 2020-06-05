const mongoose = require("mongoose"),
Blog = require("./models/blog"),
Comment = require("./models/comment");

let blogseed = {
  title: "World state",
  image: "https://images.pexels.com/photos/1309587/pexels-photo-1309587.jpeg?cs=srgb&dl=tents-on-the-ground-1309587.jpg&fm=jpg",
  body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed in eros in ligula lobortis suscipit. Nulla sagittis, velit eget cursus pretium, sem lorem mollis elit, in ultricies erat purus vitae leo. Cras volutpat tortor tortor, id sagittis lorem venenatis id. Phasellus et nisi nec nibh egestas semper sit amet sed ex. Mauris ultricies orci eu magna porttitor convallis. Fusce eu ultricies sem. Maecenas vehicula"
}

function seedDB(){
  Blog.deleteMany({}, (err)=>{
    if(err){
      return console.log(err);
    }
    console.log("Removed all")
    Blog.create(blogseed, (err, blog)=>{
      if (err) {
        return console.log(err)
      }
      console.log("added blog")
      Comment.create({
        text: "eros in ligula lobortis, velit eget cursus pretium, sem lorem mollis elit, in ultricies erat purus vitae leo. Cras volutpat tortor tortor, id sagittis lorem venenatis id. Phasellus et nisi nec nibh egestas semper sit amet sed ex. Mauris ultricies orci eu magna porttitor convallis. Fusc",
        author: "Admin"
      }, (err, comment)=>{
        if (err) {
          console.log(err);
        } else{
          blog.comments.push(comment);
          blog.save((err, blog)=>{
            if (err) {
              return console.log(err);
            }
            console.log("added comment");
            console.log(blog);
          });
        }
      });
    });
  });
}

module.exports = seedDB;