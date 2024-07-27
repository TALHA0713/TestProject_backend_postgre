import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '4h' });
};


const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};


const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { generateToken, verifyToken, hashPassword, comparePassword };
