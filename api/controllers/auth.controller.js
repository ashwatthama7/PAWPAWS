import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    
    try{

    await newUser.save();
    res.status(201).json("User created sucessfully!");
   
    } catch(error){
        next(error);
    }
};
/*
export const signin = async (req, res, next) => {
    const{email, password} = req.body;

    try {
        const validUser = await User.findOne({email});
        if(!validUser) 
            return next(errorHandler(404, 'User not found!'));
        
        const vaildPassword = bcryptjs.compareSync(password, validUser.password);
        
        if(!vaildPassword)
            return next(errorHandler(401,'Wrong Credentials'));
        const token = jwt.sign{id: validUser._id }, process.env.JWT_SECRET;
    } catch (error) {
        next(error);
    }
   
};
*/