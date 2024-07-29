import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import Project from './project.js';
import User from './user.js';
import { v4 as uuidv4 } from 'uuid';

const Bug = sequelize.define('Bug', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull : true
    },
    screenshot: {
        type: DataTypes.STRING, 
        // validate: {
        //     is: /\.(png|gif)$/i 
        // },
        allowNull :true
    },
    type: {
        type: DataTypes.ENUM('feature', 'bug'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('new', 'started', 'completed', 'resolved'),
        allowNull: false
    },
    project_id: {
        type: DataTypes.UUID,
        references: {
            model: Project,
            key: 'id'
        }
    },
    assigned_to: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    created_by: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'bugs'
});

export default Bug;
