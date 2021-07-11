require('dotenv').config();
const express=require('express');
const app=express();
require("./db/conn");
const Register=require("./model/model");
const path=require("path");
const hbs=require("hbs");
const port=process.env.PORT || 3000;
const viewPath=path.join(__dirname,"../template/views");
const partialPath=path.join(__dirname,"../template/partials");
// console.log(partialPath);
// console.log(viewPath)
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(path.join(__dirname,"../public")));

hbs.registerPartials(partialPath);

app.set("view engine", "hbs");
app.set("views",viewPath);

app.get("/",(req,res)=>{
    res.render("index");
})

//to read Data
// app.get("/contact",async (req,res)=>{
//     const allData=await Register.find();
//     res.render("contact",{dataa:allData});
//     console.log(allData);
// });
app.post("/contact",async (req,res)=>{
    try{
        const password =req.body.password;
        const cpassword =req.body.confirmpassword;
        if(password === cpassword)
        {
const newData= new Register({
    name:req.body.name,
    email:req.body.email,
    // password:password,
    // confirmpassword:cpassword,
    phone:req.body.phone,
    message:req.body.message
});
//we will use middleware
const result =await newData.save();
console.log(result);
res.status(201).render("index");
        }
    }
    catch(e){
        res.status(500).send(e);
    }

})
app.get("*",(req,res)=>{
    res.render("404");
})
app.listen(port,"127.0.0.1",()=>console.log(`listening to ${port}`));