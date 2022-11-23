import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.post("/", userController.create);
userRouter.delete("/", userController.delete);
userRouter.put("/", userController.update);

export default userRouter;
