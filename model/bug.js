// models/bug.js
import { DataTypes } from 'sequelize';
import {sequelize} from '../connection.js';
import Project from './project.js';
import User from './user.js';

const Bug = sequelize.define('Bug', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true
    },
    screenshot: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('feature', 'bug'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            'new', 'started', 'completed', // Feature statuses
            'resolved' // Bug status
        ),
        allowNull: false
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
