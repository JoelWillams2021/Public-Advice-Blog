const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-amogh:test1234@cluster0.rfhsf.mongodb.net/postDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = mongoose.Schema({
    Title: {
        type :String,
        required: true
      },
      message: {
        type: String,
        required: true
    }
  });

  const Post = mongoose.model("Post", postSchema);

  const p = new Post({
      Title: "Place the title of your advice in this header",
      message: "Place the message/content of your advice in this paragraph section"

  });

  defaultItems = [p];



app.get('/', function (req, res) {

    Post.find({}, function (err, foundPosts){
        if (foundPosts.length == 0){
        Post.insertMany(defaultItems, function(err){
            if (err){
              console.log(err);
            } else{
              console.log("Sucessfully saved all the titles to the db");
            }
          });
          res.redirect("/");
        } else {
            res.render("index.ejs", {
                postTitle : foundPosts
            })

          }
        });
       
    });

    app.post('/', function (req, res) {
        const title = req.body.title;
        const message = req.body.message;

        const p = new Post({
            Title: title,
            message: message
      
        });

        p.save();
        res.redirect("/");
    
           
        });

app.post("/delete", function(req, res){
    const itemDelete = req.body.Delete;

    Post.findByIdAndRemove(itemDelete, function(err){
        if (!err){
          console.log("Sucessfully deleted the item!");
          res.redirect("/");
        }
    
      });

});
    
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
});                       
 
