import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: String,
    postId: String,
    comment: String
})

const CommentModel = new mongoose.model("comment",CommentSchema);

export default CommentModel;