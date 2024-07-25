
import Project from '../model/project.js';
import User from '../model/user.js';

export const createProject = async (req, res) => {
    try {

        const { name, manager_id } = req.body;
        if (!name || !manager_id) {
            return res.status(400).json({ message: 'Name and manager_id are required.' });
        }

        const manager = await User.findByPk(manager_id);
        
        console.log('hello manger',manager);
        if (!manager) { 
            return res.status(404).json({ message: 'Manager not found.' });
        }

        if (manager.user_type !== 'manager') {
            return res.status(400).json({ message: 'The specified user is not a manager.' });
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

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id,{
            include:[User]
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, manager_id } = req.body;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        if (manager_id) {
            const manager = await User.findByPk(manager_id);
            if (!manager) {
                return res.status(404).json({ message: 'Manager not found.' });
            }
            if (manager.user_type !== 'manager') {
                return res.status(400).json({ message: 'The specified user is not a manager.' });
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


export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        await project.destroy();
        return res.status(200).json({ message: 'Project successfully deleted.' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};  
