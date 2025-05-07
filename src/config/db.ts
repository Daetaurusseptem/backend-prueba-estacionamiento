import { Sequelize } from 'sequelize-typescript';
import { Vehiculo } from '../models/vehiculos';
import { Estancia } from '../models/estancia';


export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Vehiculo, Estancia],
  logging: false,
  
});
 