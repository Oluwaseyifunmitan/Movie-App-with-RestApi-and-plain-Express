import { json } from "body-parser";
import crypto from "crypto";

export async function genPassword(input: string) {
  // console.log(input);
  let hash512 = crypto.createHash("sha512");
  let hashData = hash512.update(JSON.stringify(input), "utf-8");
  let hashPassword = hashData.digest("hex");
  return hashPassword;
}

export function validatePassword(email: any, password: any) {}
