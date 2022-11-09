import express, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../controllers/user-controller/user";
const user = express.Router();

user.get("/", getUsers);

user.post("/", createUser);

user.put("/:email", updateUser);

user.delete("/:email", deleteUser);

export default user;
