import detaService from "../services/usersDeta.service";
import { UserModel } from "../models/user.model";
import { NextFunction, Response, Request } from "express";
import { FetchResponse } from "deta/dist/types/types/base/response";

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userModel = new UserModel(req.body);
      let saved = await userModel.save();
      return res.status(200).json(saved);
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.query;
      let userModel = await UserModel.find(key);
      if (userModel) {
        let deleted = await userModel.delete();
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
      let userModel = await UserModel.find(key);
      if (userModel) {
        let updatedUserModel = await userModel.update(req.body);
        return res.status(200).json(updatedUserModel);
      } else {
        return res.status(404).json("Not found");
      }
    } catch (error) {
      return next(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let users: FetchResponse | [] = await detaService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  },
};
