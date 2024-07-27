import User from '../model/user.js';

import { generateToken, hashPassword, comparePassword } from '../utils/auth.js'

const registerUser = async (req, res) => {
  try {
    const { name, email, password,user_type,phone } = req.body;

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword,phone,user_type });
    console.log(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
