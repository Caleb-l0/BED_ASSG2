const bcrypt = require("bcryptjs");
const signupModel = require("../Models/signupModel");

async function signupUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await signupModel.CreateUser(name, email, hashedPassword);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
}

module.exports = { signupUser };