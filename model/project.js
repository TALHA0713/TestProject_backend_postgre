// project.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { v4 as uuidv4 } from 'uuid';
import User from './user.js';

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    manager_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'projects'
});


export default Project;
