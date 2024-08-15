const express=require("express");
const app=express();
const port=8080;
const path=require("path");
//methoed override 
const methodoverride=require('method-override');


const { v4 : uuidv4 }=require('uuid');
app.use(express.urlencoded({extended:true}));
app.listen(port,()=>{
    console.log("we are listing the port number is :8080");
});


// we creating arrary to store the data
let posts=[{
    id:uuidv4(),
    username:"shaik Rahmath",
    content:"I love to code"
},
{
    id:uuidv4(),
    username:"shaik sohel",
    content:"he is a software tester"
}
,{
    id:uuidv4(),
    username:"appan collage ",
    content:"best paltfrom to learn codeing"
}];

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodoverride('_method'));



//main page
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


//get request which we store the form data
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

// the post request page and we sending the info to main by push the data into array
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let{username ,content}=req.body;
    let id=uuidv4();// it is function
     posts.push({id,username,content,});
    res.redirect("/posts");//redirect will redirect to specified path

});
 
//now the impelments/posts/:id
app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   console.log(id);
   let post=posts.find((p)=> id ===p.id);
   res.render("show.ejs",{post});
});


//now by useing the patch
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id ===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
 let {id}=req.params;
  posts=posts.filter((p)=> id!==p.id);
 res.redirect("/posts");

});