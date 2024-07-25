import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { v4 as uuidv4 } from 'uuid'; 

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: uuidv4, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.ENUM('manager', 'qa', 'developer'),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'users'
});


export default User;
