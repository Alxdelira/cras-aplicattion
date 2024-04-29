import * as dotenv from 'dotenv';
import express from 'express';



dotenv.config();

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to the homepage');
    });
}


// destinado as rotas a sertem criadas depois usando app.use('/api', routes); ex.

export default routes; 