import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./user.schema.js";
import UserModel from "../models/user.model.js";
import { PostType } from "./post.schema.js";
import PostModel from "../models/post.model.js";

export const CommentType = new GraphQLObjectType({
    name: "comment",
    fields: ()=> ({
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return UserModel.findById(parent.userId)
            }
        },
        post: {
            type: PostType,
            resolve(parent, args){
                return PostModel.findById(parent.postId)
            }
        }
    })
})