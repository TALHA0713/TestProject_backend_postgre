// models/user.js
import { DataTypes } from 'sequelize';
import {sequelize} from '../connection.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
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
