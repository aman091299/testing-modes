const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
         trim:true,
         unique:true,
         lowercase:true,
    },
    password:{
        type:String,
        required:true,
         trim:true,
        
    },
    role:{
        enum:['student','admin'],
        default:'student'
    }
})

const User=mongoose.model("User",userSchema);
 
module.exports=User;