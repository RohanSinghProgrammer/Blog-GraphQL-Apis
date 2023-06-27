import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    photoUrl: String
})

const UserModel = new mongoose.model("User", UserSchema);

export default UserModel;