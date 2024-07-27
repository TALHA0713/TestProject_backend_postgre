
import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controller/UserController.js';

import {authenticateToken}  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addUser', createUser);
router.get('/getUser',authenticateToken,getAllUsers);
router.get('/getSingleUser/:id', getUserById);
router.post('/updateSingleUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;
