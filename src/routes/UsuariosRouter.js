import express from 'express';
import UsuariosController from '../controllers/UsuarioController.js';


const router = express.Router();

router
    .get("/usuarios", UsuariosController.listarUsuarios)
    .get("/usuarios/:id", UsuariosController.buscarUsuarioPorId)
    .post("/usuarios", UsuariosController.criarUsuario)
    .patch("/usuarios/:id", UsuariosController.atualizarUsuario)
    .delete("/usuarios", UsuariosController.deletarUsuario);


export default router;