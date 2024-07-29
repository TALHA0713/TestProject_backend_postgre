// routes/projectRoutes.js
import express from 'express';
import {
    createProject,
    getProjectsForUser,
    getProjectById,
    updateProject,
    deleteProject,
    getAllProjects

} from '../controller/projectController.js';

const router = express.Router();

router.post('/addProject', createProject);
router.get('/getProjectsForUser/:id', getProjectsForUser);
router.get('/getSingleProject/:id', getProjectById);
router.put('/updateSingleProject/:id', updateProject);
router.delete('/deleteSingleProject/:id', deleteProject);
router.get('/getProject', getAllProjects);
export default router;
