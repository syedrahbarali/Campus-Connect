import crypto from "crypto";

export const generateCryptoKey = async (): Promise<void> => {
  console.log(crypto.randomBytes(32).toString("hex"));
};

generateCryptoKey();

export default generateCryptoKey;
