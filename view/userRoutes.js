
import express from 'express';
const router = express.Router();
import { addUser,getAllUser,getSingleUser,updateUser,deleteUser } from '../controller/UserController.js';

router.post('/add', addUser)
router.get('/get', getAllUser)
router.get('/getSingle/:id', getSingleUser)
router.put('/updateSingle/:id', updateUser)
router.delete('/deleteSingle/:id', deleteUser)

export default router;
