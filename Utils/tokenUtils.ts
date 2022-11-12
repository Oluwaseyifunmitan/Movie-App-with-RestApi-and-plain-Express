import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
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
    let userToken = jwt.decode(token);
    console.log(userToken);
    return userToken;
  } catch (error) {
    console.log(error);
  }
}

export const extractUser = async (token: any) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};
