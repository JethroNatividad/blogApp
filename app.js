const express = require("express"),
     mongoose = require("mongoose"),
   bodyParser = require("body-parser"),
methodOverride = require("method-override"),
          app = express();
          
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//Mongoose setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://jethrosama:undeadban07@master-2viyl.mongodb.net/BlogApp?retryWrites=true&w=majority");

const blogSchema = new mongoose.Schema({
  title:{type: String, default: "My Blog"},
  image: String,
  body: String,
  date: {type: Date, default: Date.now}
}),
Blog = mongoose.model("blog", blogSchema);


//routes
  app.get("/", (req, res)=>{
    res.redirect("/blogs");
  })
  //Index
  app.get("/blogs", (req, res)=>{
    Blog.find({}, (err, data)=>{
      if(err){
        console.log("err");
      } else{
        res.render("index", {blogs: data});
      }
    });
  });
  //New
  app.get("/blogs/new", (req, res)=>{
    res.render("new");
  })
  //Create
  app.post("/blogs", (req, res)=>{
    Blog.create(req.body.blog, (err, data)=>{
      if(err){
        res.redirect("/blogs/new");
      } else{
        res.redirect("/blogs");
      }
    });
  });
  //Show
  app.get("/blogs/:id", (req, res)=>{
    const id = req.params.id;
    Blog.findById(id, (err, data)=>{
      if(err){
        console.log(err)
      } else{
        res.render("show", {blog: data});
      }
    });
  });
  //edit
  app.get("/blogs/:id/edit", (req, res)=>{
    Blog.findById(req.params.id, (err, data)=>{
      if(err){
        res.redirect("/blogs");
      } else{
        res.render("edit", {blog: data});
      } 
    });
  });

  //update
  app.put("/blogs/:id", (req, res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, data)=>{
      if(err){
        res.redirect("/");
      } else{
        res.redirect("/blogs/" + req.params.id)
      }
    });
  });

  //delete
  app.delete("/blogs/:id", (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
      if(err){
        res.redirect("/blogs");
      } else{
        res.redirect("/blogs");
      }
    });
  });
  
//start server
app.listen(3000, ()=>{
  console.log("server started at http://localhost:3000");
});
