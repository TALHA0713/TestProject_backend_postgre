// routes/bugRoutes.js
import express from 'express';
import {
    createBug,
    getAllBugs,
    getBugById,
    updateBug,
    deleteBug
} from '../controller/bugController.js';

const router = express.Router();

router.post('/bugs', createBug);
router.get('/bugs', getAllBugs);
router.get('/bugs/:id', getBugById);
router.put('/bugs/:id', updateBug);
router.delete('/bugs/:id', deleteBug);

export default router;
