
import { verifyToken } from '../utils/auth.js';

const authenticateToken = (req, res, next) => {
    console.log('headers are htisdwe::', req.headers)
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  const token = authHeader ? authHeader.split(' ')[1] : undefined;

  console.log('Extracted Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Token not found or incorrect format' });
  }


  if (token == null) return res.sendStatus(401);

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

export {authenticateToken}
