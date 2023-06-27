import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { PostType } from "./post.schema.js";
import PostSchema from '../models/post.model.js'

export const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    photoUrl: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args){
        return PostSchema.find({authorId: parent.id})
      }
    }
  }),
});
