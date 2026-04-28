const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔹 REGISTER
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      age,
      address,
      gender,
      role,
    } = req.body;

    // validation
    if (!fullName || !username || !email || !password || !confirmPassword || !age) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      age,
      address,
      gender,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 🔹 LOGIN
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // find user
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Cookie (client side)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
    });

    // Session (server side)
    req.session.user = {
      id: user._id,
      role: user.role,
    };

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};