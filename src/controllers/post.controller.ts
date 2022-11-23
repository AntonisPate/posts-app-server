import detaService from "../services/postsDeta.service";
import { PostModel } from "../models/post.model";
import { NextFunction, Response, Request } from "express";
import { FetchResponse } from "deta/dist/types/types/base/response";

const { updatePosts } = require("../utils/socket-io");

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let postModel = new PostModel(req.body);
      let saved = await postModel.save();
      updatePosts();
      return res.status(200).json(saved);
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.query;
      let postModel = await PostModel.find(key);
      if (postModel) {
        let deleted = await postModel.delete();
        return res.status(200).json("Deleted");
      } else {
        return res.status(404).json("Not found");
      }
    } catch (error) {
      return next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.query;
      let postModel = await PostModel.find(key);
      if (postModel) {
        let updatedPostModel = await postModel.update(req.body);
        return res.status(200).json(updatedPostModel);
      } else {
        return res.status(404).json("Not found");
      }
    } catch (error) {
      return next(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let posts: FetchResponse | [] = await detaService.getPosts();
      return res.status(200).json(posts);
    } catch (error) {
      return next(error);
    }
  },
};
