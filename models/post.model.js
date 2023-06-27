import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  authorId: String,
  title: String,
  desc: String,
  photoUrl: String,
  category: String,
});

const PostModel = new mongoose.model("Post", PostSchema);

export default PostModel;
