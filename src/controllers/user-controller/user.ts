import path from "path";
import saveFile from "../../models/user/user";
import { Request, Response } from "express";

const users = require(path.resolve(process.cwd(), "database", "database.json"));
// console.log(users);

// export const getUsers = (req: Request, res: Response) => {
//   res.status(200).json(users);
// };

// export const createUser = (req: Request, res: Response) => {
//   const user = req.body;
//   users.push(user);
//   res.status(200).json({ message: "user created" });
//   saveFile(users);
// };

export const dashboard = (req: any, res: Response) => {
  try {
    const { email, _id } = req.user;
    if (_id && email) {
      let data = users.find((user: any) => user.email == email);
      res.status(200).render("dashboard", { data });
    } else {
      res.status(400).json({ message: "no access" });
    }
  } catch (error) {
    res.status(400).json({ message: "no access" });
  }
};
