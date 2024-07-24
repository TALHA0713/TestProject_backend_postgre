
import express from 'express';
import { sequelize } from './connection.js';
import userRoutes from './view/userRoutes.js';

const app = express();
const port = 3333;

app.use(express.json()); 


app.use('/users', userRoutes);

const initializeDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

initializeDatabase();
