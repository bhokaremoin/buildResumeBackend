const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const jwtSecert = process.env.REACT_APP_JWT_SECRET;
const jwtSecert = "securepassword";

router.post("/createuser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(req.body.password, salt);
  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (userData) {
      return res.status(400).json({ errors: "Email already registered." });
    }
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    }).then(res.json({ success: true }));
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userdata = await User.findOne({ email });
    if (!userdata) {
      return res.status(400).json({ errors: "User Not Found" });
    }
    const passwordComp = await bcrypt.compare(
      req.body.password,
      userdata.password
    );
    if (!passwordComp) {
      return res.status(400).json({ errors: "incorrect Password" });
    }
    const data = {
      user: {
        id: userdata.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecert);
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
module.exports = router;
