import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  role: {
    type: String,
    require: true,
    default: "user",
    enum: ["user", "admin", "root"],
  },
},
{
    timestamps: true
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
