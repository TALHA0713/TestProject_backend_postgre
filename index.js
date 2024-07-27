
import express from 'express';
import {sequelize }from './connection.js';
import bugRoutes from './view/bugRoutes.js'
import projeectRoutes from './view/projectRoutes.js'
import userRoutes from './view/userRoutes.js'
import setupAssociations from './Relation/association.js';
import authRoutes from './view/authRoutes.js'
const app = express();
const port = 4444;
import cors from 'cors'


// Configure CORS
app.use(cors({
  origin: 'http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));


app.use(express.json()); 

app.use('/api', bugRoutes);
app.use('/api', projeectRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);


setupAssociations();

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
