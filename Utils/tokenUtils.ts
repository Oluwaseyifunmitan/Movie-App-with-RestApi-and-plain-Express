import jwt, { JsonWebTokenError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function genToken(input: { email: string; _id: string }) {
  const accessToken = jwt.sign(
    input,
    process.env.SECRETKEY_TOKEN_KEY ?? "secret"
  );
  return accessToken;
}

export async function validateToken(token: any) {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.log(error);
  }
}
