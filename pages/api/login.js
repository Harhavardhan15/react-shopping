import connectDB from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();
 export default async (req,res) => {
    const{email,password} = req.body;
     try {
        //check if email is already registered
        const user = await User.findOne({email}).select('+password');
      //if not return error
        if(!user){
return res.status(404).send("No User exists with provided email id ")
        }
        
        //check user password match
      const passwordsmatch =  await bcrypt.compare(password,user.password);

        //generate token
        if(passwordsmatch){
          const token =  jwt.sign({userId:user._id}, process.env.JWT_SECRET,{
                expiresIn:'7d'
            });
            res.status(200).json(token);
        }
        else{
            res.status(401).send("Password Incorrect")
        }
        //send token to client
         
     } catch (error) {
         console.error(error);
         res.status(500).send("Server error while logging in please try again later")
     }
 }