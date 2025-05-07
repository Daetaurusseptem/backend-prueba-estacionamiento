import dotenv from 'dotenv';
dotenv.config();
import server from './server/server';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

server.start(PORT);