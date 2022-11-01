import User from '../models/User.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

// .env
ENV.config();

export const register = async (req, res) => {
  const { username, nickname, password, confirmPassword } = req.body;

  // Simple Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing username and/or password',
    });
  }
  try {
    //Check for existing User
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Username already exist' });

    //Check password == confirmPassword

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password is not equal Confirm password',
      });
    }

    //All Success
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword, nickname });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userName: newUser.nickname, userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Simple Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing username and/or password',
    });
  }

  try {
    //Check for existing User
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    //Check valid password
    let isValidPassword = false;
    isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { userName: user.nickname, userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: 'Login successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find({})
    return res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
