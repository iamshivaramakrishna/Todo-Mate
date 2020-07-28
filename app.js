const express =require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname+"/date.js");


let items =["Food","Read","movie"];
let workItems =[];

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) => {

let day = date.getDate();

    res.render("list",
      {listTitle : day, newListItems : items});
});

app.post("/", (req,res) => {
    item = req.body.newItem;
    if (req.body.list === "work"){ //for redirect Category title
      workItems.push(item);
      res.redirect("/work");
    }else{
      items.push(item);
      res.redirect("/");
}

});

// for work
app.get("/work", (req,res) =>  {
  res.render("list",{listTitle:"work list",newListItems:workItems});
});

//to use layout of root for about.ejs
app.get("/about", (req,res) => {
  res.render("about");
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
