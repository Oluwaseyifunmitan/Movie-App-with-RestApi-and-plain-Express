import { Request, Response } from "express";
import { extractUser } from "../../Utils/tokenUtils";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: Function
): Promise<void> => {
  console.log(req.headers);
  let cookie = req.headers.cookie?.split("=")[1];
  let user = await extractUser(cookie);
  if (user) {
    req.user = user;
    next();
  } else {
    req.user = null;
    res.redirect("/auth/login");
  }

  //console.log(user);
  //   let user = next();
};
