
import express from 'express';
import {sequelize }from './connection.js';
import bugRoutes from './view/bugRoutes.js'
import projeectRoutes from './view/projectRoutes.js'
import userRoutes from './view/userRoutes.js'


const app = express();
const port = 3333;

app.use(express.json()); 

app.use('/api', bugRoutes);
app.use('/api', projeectRoutes);
app.use('/api', userRoutes);



const initializeDatabase = async () => {
    try {
       
        await sequelize.sync({ force: true }); 
        console.log('Database synchronized successfully.');

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

initializeDatabase();
