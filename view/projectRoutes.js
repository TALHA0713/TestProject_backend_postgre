// routes/projectRoutes.js
import express from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from '../controller/projectController.js';

const router = express.Router();

router.post('/addProject', createProject);
router.get('/getProjects', getAllProjects);
router.get('/getSingleProject/:id', getProjectById);
router.put('/UpdateSingleProject/:id', updateProject);
router.delete('/deleteSingleProject/:id', deleteProject);

export default router;
