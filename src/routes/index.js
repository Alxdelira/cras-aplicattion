import * as dotenv from 'dotenv';
import express from 'express';
import usuarios from './UsuariosRouter.js'



dotenv.config();

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send('Welcome to the homepage');
    });

    app.use(
        usuarios,
    )
}




export default routes; 