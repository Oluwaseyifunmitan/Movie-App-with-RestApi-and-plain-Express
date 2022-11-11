import path from "path";
import saveFile from "../../models/user/user";
import { Request, Response } from "express";

const users = require(path.resolve(process.cwd(), "database", "database.json"));
// console.log(users);

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const createUser = (req: Request, res: Response) => {
  const user = req.body;
  users.push(user);
  res.status(200).json({ message: "user created" });
  saveFile(users);
};

export const updateUser = (req: Request, res: Response) => {
  const userUpdated = users.filter(
    (file: any) => file.email === req.params.email
  );
  console.log(userUpdated);
  users.name.push(req.body.name);
  res.status(200).json({ message: "updated" });
  saveFile(users);
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const deleteUser = users.filter(
      (user: any) => user.email != req.body.emails
    );
    res.status(200).json({ message: "user deleted" });
    saveFile(deleteUser);
  } catch (error) {
    res.status(400).json({ message: "user nor deleted" });
  }
};
