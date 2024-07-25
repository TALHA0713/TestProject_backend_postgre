import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { v4 as uuidv4 } from 'uuid';
import User from './user.js';

const UpdateBug = sequelize.define('UpdateBug', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },

    bug_id:{
    type : DataTypes.STRING,
    allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('new', 'started', 'completed', 'resolved'),
        allowNull: false
    },
    assigned_to: {
        type: DataTypes.UUID,
        references: {
            model: User, 
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'update_bugs'
});

export default UpdateBug;
