import { Deta } from "deta";
import { DetaType, ObjectType } from "deta/dist/types/types/basic";
import {
  FetchResponse,
  GetResponse,
  PutResponse,
} from "deta/dist/types/types/base/response";
import { PostModel } from "../models/post.model";

const deta = Deta("a0ptbkqc_iTJobrSoJCgxhDNnHJq5M1qG3CXrx8Sw");

const db = deta.Base("posts");

export default {
  getPosts: async (): Promise<FetchResponse | []> => {
    try {
      let posts = await db.fetch();
      return posts ? posts : [];
    } catch (error) {
      throw error;
    }
  },
  createPost: async (postModel: PostModel): Promise<ObjectType> => {
    try {
      let response = await db.insert(postModel as unknown as DetaType);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getPostObject: async (postKey: string) => {
    try {
      let post = await db.get(postKey);
      if (post) {
        return new PostModel(post);
      }
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (postKey: any) => {
    try {
      let response = await db.delete(postKey);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updatePost: async (postModel: PostModel) => {
    try {
      if (postModel.key) {
        let response = await db.put(postModel as unknown as ObjectType);
        console.log(response);
        return response;
      }
    } catch (error) {
      throw error;
    }
  },
};
