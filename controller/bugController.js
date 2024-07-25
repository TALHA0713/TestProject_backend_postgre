
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

        const user = await User.findByPk(created_by);  
        const developer = await User.findByPk(assigned_to);

        if (!user||!developer) { 
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.user_type !== 'manager' && user.user_type !== 'qa' ) {
            console.log(user.user_type);
            return res.status(400).json({ message: 'The specified user is not a Manager or QA.' });
        }

        if(developer.user_type!=="developer"){
            return res.status(400).json({ message: 'The specified user is not a developer.' });
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

export const getAllBugs = async (req, res) => {
    try {
        const bugs = await Bug.findAll({
            include: [
                {
                    model: Project,
                    attributes: ['id', 'name'] 
                },
                {
                    model: User,
                    as: 'assignedDeveloper', 
                    attributes: ['id', 'name', 'email'] 
                },
                {
                    model: User,
                    as: 'creator', 
                    attributes: ['id', 'name', 'user_type'] 
                }
            ]
        });

        return res.status(200).json(bugs);
    } catch (error) {
        console.error('Error fetching bugs:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};



export const getBugById = async (req, res) => {
    try {
        const { id } = req.params;
        const bug = await Bug.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'assignedDeveloper', 
                    attributes: ['id', 'name', 'email'] 
                },
            ]
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


export const updateBug = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, screenshot, type, status, project_id, assigned_to, created_by } = req.body;

        const bug = await Bug.findByPk(id,{
            include:[
                {
                    model: User,
                    as: 'assignedDeveloper', 
                    attributes: ['id', 'name', 'email'] 
                },   
            ]
        });

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        const developer = await User.findByPk(assigned_to);

        if (!developer) { 
            return res.status(404).json({ message: 'User not found.' });
        }

        if(developer.user_type!=="developer"){
            return res.status(400).json({ message: 'The specified user is not a developer.' });
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


export const deleteBug = async (req, res) => {
    try {
        const { id } = req.params;
        const bug = await Bug.findByPk(id);

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        if(bug.status=="complete" || bug.status=="resolved"){
            await bug.destroy();
            return res.json({message:"Bug Deleted Successfully resolved"})
        }
        else{
            return res.json({message:"bug should be completed or resolved"})
        }

        

    } catch (error) {
        console.error('Error deleting bug:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
