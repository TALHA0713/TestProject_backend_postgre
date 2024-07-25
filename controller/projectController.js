
import Project from '../model/project.js';
import User from '../model/user.js';

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, manager_id } = req.body;

        // Validate input
        if (!name || !manager_id) {
            return res.status(400).json({ message: 'Name and manager_id are required.' });
        }

        // Check if the manager exists
        const manager = await User.findByPk(manager_id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found.' });
        }

        const newProject = await Project.create({
            name,
            manager_id
        });

        return res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update a project by ID
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, manager_id } = req.body;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Check if the manager exists
        if (manager_id) {
            const manager = await User.findByPk(manager_id);
            if (!manager) {
                return res.status(404).json({ message: 'Manager not found.' });
            }
        }

        await project.update({
            name,
            manager_id
        });

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        await project.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
