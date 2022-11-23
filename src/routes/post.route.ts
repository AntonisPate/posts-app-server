import express from "express";
import postController from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.get("/", postController.getAll);
postRouter.post("/", postController.create);
postRouter.delete("/", postController.delete);
postRouter.put("/", postController.update);

export default postRouter;
