import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASWWORD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
  });

const db=async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Connected to databse");
    } catch (error) {
        console.error("Some thimg went wrong in connection",error);
    }
}

export {db,sequelize};