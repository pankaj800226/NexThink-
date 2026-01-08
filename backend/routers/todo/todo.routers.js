import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import {
  createTodo,
  deleteTask,
  getTask,
} from "../../controllers/todo/todo.controllers.js";
const router = express.Router();

router.post("/createTodo", isAuthentication, createTodo);
router.get("/getTask", isAuthentication, getTask);
router.delete('/deleteTask/:id',deleteTask)
// router.put("/taskStatus/:id", statusChange);

export default router;
