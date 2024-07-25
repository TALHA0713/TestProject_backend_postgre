
import Bug from '../model/bug.js';
import Project from '../model/project.js';
import User from '../model/user.js';

export const createBug = async (req, res) => {
    try {
        const { title, description, deadline, screenshot, type, status, project_id, assigned_to, created_by } = req.body;
        const existingBug = await Bug.findOne({
            where: {
                title,
                project_id
            }
        });
        
        if (existingBug) {
            return res.status(400).json({ message: 'Bug title must be unique within the project.' });
        }
        
        const newBug = await Bug.create({
            title,
            description,
            deadline,
            screenshot,
            type,
            status,
            project_id,
            assigned_to,
            created_by
        });

        return res.status(201).json(newBug);
    } catch (error) {
        console.error('Error creating bug:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all bugs
export const getAllBugs = async (req, res) => {
    try {
        const bugs = await Bug.findAll({
            include: [Project, User] // Include related models if needed
        });

        return res.status(200).json(bugs);
    } catch (error) {
        console.error('Error fetching bugs:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get a single bug by ID
export const getBugById = async (req, res) => {
    try {
        const { id } = req.params;
        const bug = await Bug.findByPk(id, {
            include: [Project, User] // Include related models if needed
        });

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        return res.status(200).json(bug);
    } catch (error) {
        console.error('Error fetching bug:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update a bug by ID
export const updateBug = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, screenshot, type, status, project_id, assigned_to, created_by } = req.body;

        const bug = await Bug.findByPk(id);

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        await bug.update({
            title,
            description,
            deadline,
            screenshot,
            type,
            status,
            project_id,
            assigned_to,
            created_by
        });

        return res.status(200).json(bug);
    } catch (error) {
        console.error('Error updating bug:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete a bug by ID
export const deleteBug = async (req, res) => {
    try {
        const { id } = req.params;
        const bug = await Bug.findByPk(id);

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        await bug.destroy();

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting bug:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
