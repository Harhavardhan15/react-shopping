import connectDB from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import Cart from "../../models/Cart";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDB();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Signup requirements
    if (!isLength(name, { min: 3, max: 15 })) {
      return res.status(422).send("Name must be 3 to 15 characters");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be min 6 characters");
    } else if (!isEmail(email)) {
      return res.status(422).send("Please enter a valid email");
    }

    //Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email : ${email}`);
    }
    //if not hash password using bcrypt
    const hash = await bcrypt.hash(password, 10);

    //create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
  //  console.log({ newUser }); 
//create cart for new user
await new Cart({user: newUser._id}).save();

    //create token

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send token
    res.status(201).send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error failed to signup please try again");
  }
};
