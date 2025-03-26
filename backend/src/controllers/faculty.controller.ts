import express, { Request, Response } from "express";
import Faculty from "../models/faculty.model.js";
import { comparePassword, hashPassword } from "../utils/hash.helper.js";
import User from "../models/user.model.js";
import { generateAccessToken } from "../utils/jwt.js";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }

    const existingFaculty = await Faculty.findOne({ email });
    const existingStudent = await User.findOne({ email });

    // Check if user already exists
    if (existingFaculty || existingStudent) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // hashing the password
    req.body.password =
      req.body.password && (await hashPassword(req.body.password));

    let { name, password } = req.body;

    // Check if any field is empty
    if (!name || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const faculty = await Faculty.create({
      name,
      password,
      email,
    });

    const createdFaculty = await Faculty.findById(faculty._id).select(
      "-password"
    );
    console.log(createdFaculty);

    if (createdFaculty) {
      return res.status(200).json({
        message: "Faculty created successfully",
        success: true,
        data: createdFaculty,
      });
    }

    return res.status(400).json({ message: "Failed to create faculty" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error : \n", error });
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

    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Unauthorized access", success: false });
    }

    const faculty = await Faculty.findOne({ email });
    if (faculty && (await comparePassword(password, faculty.password))) {
      console.log("Faculty Logged in successfully");

      const accessToken = await generateAccessToken({
        id: faculty._id,
        email,
        role: "faculty",
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
