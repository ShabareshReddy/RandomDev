const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");

// ---------- SIGNUP ----------
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, gender } = req.body;

    // Basic validation for required fields
    if (!firstName || !lastName || !emailId || !password) {
        return res.status(400).json({ message: "Name, Email and Password are required!" });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email!" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
    });

    const savedUser = await newUser.save();
    const token = await savedUser.getJWT();

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).json({ message: "ERROR : " + err.message });
  }
});

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email!");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      const isProd = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).json({ message: "ERROR : " + err.message });
  }
});

router.post('/logout',async(req,res)=>{
   const isProd = process.env.NODE_ENV === "production";
   res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
   })
   res.send("Logout Successful!!")
})

module.exports = router;
