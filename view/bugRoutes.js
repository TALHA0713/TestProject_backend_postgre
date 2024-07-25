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

router.post('/addBug', createBug);
router.get('/getBugs', getAllBugs);
router.get('/getSingleBug/:id', getBugById);
router.put('/updateSingleBug/:id', updateBug);
router.delete('/deleteBug/:id', deleteBug);

export default router;
