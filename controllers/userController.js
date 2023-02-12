import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  signUpBodyValidation,
  logInBodyValidation,
} from "../utils/validationSchema.js";
const signUp = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ error: true, message: "ConfirmPassword does not match" });
    }
    const email = req.body.email.replace(/\//g, "").toLowerCase();
    req.body = { ...req.body, email };

    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(409).json({
        error: true,
        message: "User with given email already exist",
      });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({ ...req.body, password: hashPassword });
    const token = await generateToken(user);

    res.status(201).json({
      error: false,
      success: true,
      token,
      user,
      message: "Account created sucessfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { error } = logInBodyValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    const email = req.body.email.replace(/\//g, "").toLowerCase();

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "No User found with given email" });

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    const token = await generateToken(user);
    res.status(200).json({
      error: false,
      success: true,
      token,
      user,
      message: "Logged in sucessfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const generateToken = async (user) => {
  try {
    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "30d",
    });

    return Promise.resolve(token);
  } catch (err) {
    return Promise.reject(err);
  }
};
export { signUp, login };
