import express from "express";
import commentController from "../controller/comment.controller.js";

const router = express.Router();

router.post("/", commentController.createComment);
router.get("/", commentController.getComments);
router.delete("/:_id", commentController.deleteComment);

export default router;