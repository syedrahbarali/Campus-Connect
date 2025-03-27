import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
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

//  d7c14972e4a617a15e2084f059ce5165809a715403ea8eeecd46ec92150aa02d
