import { sequelize } from "../db.js";
import { Sequelize, DataTypes } from "sequelize";

const Registration = sequelize.define('Registration', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique:true
    },
    DateOfBirth: {
      type: DataTypes.DATE,
    },
    Phone: {
      type: DataTypes.STRING(15),
      allowNull:false
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull:false,
    },
    RegistrationDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }
  );
  
  sequelize.sync()
  .then(()=>{
    console.log('DataBase synced')
  })
  .catch(()=>{
    console.error('Error while syncying')
  })


  export {Registration}; 