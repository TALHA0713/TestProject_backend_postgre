
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('postgres', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433 
});

async function connectToDatabase() {
    try {
      // Authenticate connection
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  connectToDatabase();

export { sequelize };
