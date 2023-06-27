import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import { UserType } from "./user.schema.js";
import UserModel from "../models/user.model.js";
import {CommentType} from './comment.schema.js'
import CommentModel from "../models/comment.model.js";

export const PostType = new GraphQLObjectType({
  name: "post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    photoUrl: { type: GraphQLString },
    category: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args){
        return CommentModel.find({postId: parent.id})
      }
    }
  }),
});
