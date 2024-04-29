import express from 'express';
import cors from 'cors';
import db from './config/db_config.js';
import routes from './routes/index.js';


function connectDB(){
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Database connected successfully'));
}

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
routes(app);

export default app;