import jwt from "jsonwebtoken";

export const generateAccessToken = async (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
};
