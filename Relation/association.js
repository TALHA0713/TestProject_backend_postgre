
import User from '../model/user.js';
import Project from '../model/project.js';
import Bug from '../model/bug.js';


export default function setupAssociations() {
    User.hasMany(Project, { foreignKey: 'manager_id', as: 'projects' });
    Project.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });
    // because maanger can manage the project just developer fix it 
    
    Project.hasMany(Bug, { foreignKey: 'project_id' });
    Bug.belongsTo(Project, { foreignKey: 'project_id' });
    
    User.hasMany(Bug, { foreignKey: 'assigned_to', as: 'assignedBugs' });
    Bug.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignedDeveloper' });
    
    User.hasMany(Bug, { foreignKey: 'created_by', as: 'createdBugs' });
    Bug.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
}
