
import User from '../model/user.js';
import Project from '../model/project.js';
import Bug from '../model/bug.js';


User.hasMany(Project, { foreignKey: 'manager_id' });
Project.belongsTo(User, { foreignKey: 'manager_id' });


Project.hasMany(Bug, { foreignKey: 'project_id' });
Bug.belongsTo(Project, { foreignKey: 'project_id' });


User.hasMany(Bug, { foreignKey: 'assigned_to' }); 
Bug.belongsTo(User, { foreignKey: 'assigned_to' });

User.hasMany(Bug, { foreignKey: 'created_by' }); 
Bug.belongsTo(User, { foreignKey: 'created_by' });

export { User, Project, Bug };
