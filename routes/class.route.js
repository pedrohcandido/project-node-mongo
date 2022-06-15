import express from "express";
import classController from "../controller/class.controller.js";

const router = express.Router();

router.post("/", classController.createClass);
router.get("/", classController.getClasses);
router.get("/:id", classController.getClass);
router.put("/:_id", classController.updateClass);
router.delete("/:_id", classController.deleteClass);

export default router;