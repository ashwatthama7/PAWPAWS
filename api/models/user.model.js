import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true,
        
    },
    email: {
        type : String,
        required: true,
        unique: true,

    },
    password: {
        type : String,
        required: true,
      
    },
    avatar:{
       type : String,
       default:"https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg?semt=ais_hybrid"
    },
    
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
