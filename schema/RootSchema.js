import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { UserType } from "./user.schema.js";
import { PostType } from "./post.schema.js";
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";
import { CommentType } from "./comment.schema.js";
import CommentModel from "../models/comment.model.js";

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return UserModel.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find({});
      },
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return PostModel.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return PostModel.find({});
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    user: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        photoUrl: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let { name, email, photoUrl } = args;
        let user = new UserModel({ name, email, photoUrl });
        return user.save();
      },
    },
    post: {
      type: PostType,
      args: {
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: new GraphQLNonNull(GraphQLString) },
        photoUrl: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let { authorId, title, desc, photoUrl, category } = args;
        let post = new PostModel({ authorId, title, desc, photoUrl, category });
        return post.save();
      },
    },
    comment: {
      type: CommentType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let { comment, userId, postId } = args;
        let cmnt = new CommentModel({ comment, userId, postId });
        return cmnt.save();
      },
    },
  },
});

const RootType = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});

export default RootType;
