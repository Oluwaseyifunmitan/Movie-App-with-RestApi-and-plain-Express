//authenticate the user using
// email password
import path from "path";
import { Request, Response } from "express";
import { genPassword } from "../../../Utils/passwordUtils";
import saveFile from "../../models/user/user";
import user from "../../routes/user_route/user_route";

const users = require(path.resolve(process.cwd(), "database", "database.json"));

export const Login = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("Login");
  } else {
    // console.log(req.body);
    const { email, password } = req.body;
    const loggedIn = users.filter((user: any) => user.email == email);
    //hash the incomming password
    // compare the new hased password with the old one of the user in the database
    if (loggedIn.length > 0) {
      let hash = await genPassword(password);
      if (hash == loggedIn[0].password) {
        return res.send("you have successfully logged in");
      } else {
        return res.send("not logged in");
      }
    } else {
      return res.send("no user with this account");
    }
    // return res.send(loggedIn);
  }
};

export const Register = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("Register");
  } else {
    //validate input with joi
    const { password, email } = req.body;
    let hash = await genPassword(password);
    req.body.password = hash;
    const registeredUser = users.filter((user: any) => user.email == email);
    if (registeredUser.length > 0) {
      res.status(400).json({ code: 400, message: "user exists" });
    } else {
      let user = req.body;
      users.push(user);
      saveFile(users);
      // console.log(req.body);

      return res.status(200).json({ code: 200, user });
    }
  }
};
