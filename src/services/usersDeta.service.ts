import { Deta } from "deta";
import { DetaType, ObjectType } from "deta/dist/types/types/basic";
import {
  FetchResponse,
  GetResponse,
  PutResponse,
} from "deta/dist/types/types/base/response";
import { UserModel } from "../models/user.model";

const deta = Deta("a0ptbkqc_iTJobrSoJCgxhDNnHJq5M1qG3CXrx8Sw");

const db = deta.Base("users");

export default {
  getUsers: async (): Promise<FetchResponse | []> => {
    try {
      let users = await db.fetch();
      return users ? users : [];
    } catch (error) {
      throw error;
    }
  },
  createUser: async (UserModel: UserModel): Promise<ObjectType> => {
    try {
      let response = await db.insert(UserModel as unknown as DetaType);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserObject: async (key: string) => {
    try {
      let user = await db.get(key);
      if (user) {
        return new UserModel(user);
      }
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (key: any) => {
    try {
      let response = await db.delete(key);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (userModel: UserModel) => {
    try {
      if (userModel.key) {
        let response = await db.put(UserModel as unknown as ObjectType);
        return response;
      }
    } catch (error) {
      throw error;
    }
  },
};
