const jwt = require('jsonwebtoken');
const loginModel = require('../Models/loginModel');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await loginModel.findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, 'mysecretkey');
  res.json({ token });
}
