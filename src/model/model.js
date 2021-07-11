const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const dataSchema=new mongoose.Schema({
   name:{
       type:String,
       required:true,
       uppercase:true,
       minlength:3
   },
   email:{
       type:String,
       unique:true,
       required:true,
       validate(value){
           if(!validator.isEmail(value))
           throw new Error("Invalid email id")
       }
   },
//    password:{
//        type:String,
//        required:true,
//        minlength:8
//    },
//    confirmpassword:{
//     type:String,
//     required:true,
//     minlength:8
//    },
   phone:{
       type:Number,
       min:10,
       required:true
   },
   message:{
       type:String,
       required:true
   },
   date:{
       type:Date,
       default: new Date(Date.now())
   }
});

// dataSchema.pre("save",async function(next){
//     if(this.isModified("password"))
//     {
//     this.password=await bcrypt.hash(this.password,10);
//     this.confirmpassword=await bcrypt.hash(this.password,10);
//     console.log(this.password);
//     }
//     next();
// })
const Dataofuser=new mongoose.model("Dataofuser",dataSchema);
module.exports=Dataofuser;