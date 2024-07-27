
import Project from '../model/project.js';
import User from '../model/user.js';
import Bug from '../model/bug.js';


export const createProject = async (req, res) => {
    try {

        const { name, manager_id,ss,detail,project_assignto } = req.body;
        if (!name || !manager_id || !detail ) {
            return res.status(400).json({ message: 'Name and manager_id are required.' });
        }

        const manager = await User.findByPk(manager_id);
        if (!manager) { 
            return res.status(404).json({ message: 'Manager not found.' });
        }

        if (manager.user_type !== 'manager') {
            return res.status(400).json({ message: 'The specified user is not a manager.' });
        }

        const newProject = await Project.create({
            name,
            manager_id,
            ss,
            detail,
            project_assignto
        });

        return res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


export async function getProjectsForUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let projects;
        if (user.user_type === 'manager') {
            projects = await Project.findAll();
        } else if (user.user_type === 'developer' || user.user_type === 'qa') {
            projects = await Project.findAll({ 
                where: { project_assignto: id }
            });
        } else {
            return res.status(400).json({ error: 'No projects exist for this user' });
        }

        const projectDetails = await Promise.all(projects.map(async (project) => {
            const totalBugCount = await Bug.count({ 
                where: { project_id: project.id } 
            });

            const completedBugCount = await Bug.count({
                where: {
                    project_id: project.id,
                    status: ['completed','resolved'] 
                }
            });

            return {
                ...project.toJSON(),
                totalBugCount,
                completedBugCount
            };
        }));

        return res.json(projectDetails);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
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
        const { name, manager_id,ss,detail,project_assignto } = req.body;

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
            manager_id,
            detail,
            ss,
            project_assignto
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
