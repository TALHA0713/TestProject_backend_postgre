// routes/bugRoutes.js
import express from 'express';
import {
    createBug,
    getAllBugs,
    getBugByProjectId,
    updateBug,
    deleteBug,
    getBugsForDeveloper
} from '../controller/bugController.js';

const router = express.Router();

router.post('/addBug', createBug);
router.get('/getBugs', getAllBugs);
router.get('/getBugByProjectId/:id', getBugByProjectId);
router.put('/updateSingleBug/:id', updateBug);
router.delete('/deleteBug/:id', deleteBug);
router.get('/getBugsForDeveloper/:id', getBugsForDeveloper);

export default router;
