import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  loaction: String,
});

//mongoose middleware
//this function act before(pre) user created by userSchema is saved
userSchema.pre("save", async function () {
  //in this case (this.) reffers to user being created
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
