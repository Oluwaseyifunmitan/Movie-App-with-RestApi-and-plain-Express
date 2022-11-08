import crypto from "crypto";
export default class generateId {
  gen() {
    return crypto
      .createHash("sha256")
      .update(crypto.randomBytes(2000))
      .digest("hex");
  }
}
