import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.helper.js";
import Faculty from "../models/faculty.model.js";
import { generateAccessToken } from "../utils/jwt.js";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;

    // Check if email is empty
    if (email.trim() === "") {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // hashing the password
    req.body.password =
      req.body.password && (await hashPassword(req.body.password));

    let { name, age, contact, password } = req.body;

    // Check if any field is empty
    if (!name || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Check if user is created
    const createdUser = await User.findById(user.id).select("-password");
    console.log(createdUser);

    // Add a return statement here to send a response
    if (createdUser) {
      console.log("User created successfully");
      const { password, ...userWithoutPassword } = createdUser.toObject();

      return res.status(201).json({
        message: "User created successfully",
        success: true,
        user: userWithoutPassword,
      });
    }

    return res.status(400).json({
      message: "User not created",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res
        .status(400)
        .json({ message: "Unauthorized access", success: false });
    }

    const student = await User.findOne({ email });
    if (student && (await comparePassword(password, student.password))) {
      console.log("Student Logged in successfully");

      const accessToken = await generateAccessToken({
        id: student._id,
        email,
        role: "student",
      });

      return res.status(200).json({
        message: "Login successful",
        success: true,
        token: accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
