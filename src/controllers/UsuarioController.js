import UsuarioModel from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";
import { buildQuery, getPagination } from "../utils/queryOptions.js";




export default class UsuarioController {
    static criarUsuario = async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
            const novoUsuario = new UsuarioModel({ nome, email, senha });
            if (!nome || !email || !senha) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }
            if (senha.length < 8) {
                return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
            }
            const usuario = await UsuarioModel.findOne({ email });
            if (usuario) {
                return res.status(400).json({ message: "Email já cadastrado" });
            }
            let senhaCriptografada = await bcrypt.hashSync(senha, 10);
            novoUsuario.senha = senhaCriptografada;
            await novoUsuario.save();

            return res.status(201).json({ message: "Usuário criado com sucesso", usuario: novoUsuario});

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static listarUsuarios = async (req, res) => {
        try {
            const { nome, email, ativo, page, perPage } = req.query;
            const query = buildQuery({
                nome,
                email,
                ativo
            });

            const options = getPagination(page, perPage);

            const usuarios = await UsuarioModel.paginate(query, options);
            if (usuarios.docs.length === 0) {
                return res.status(404).json({ message: "Nenhum usuário encontrado" });
            }
            return res.status(200).json(usuarios);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }

    static buscarUsuarioPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findById(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static atualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, email, ativo, senha } = req.body;
            const usuario = await UsuarioModel.findById(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            let camposAtualizados = {};

            if (nome) camposAtualizados.nome = nome;
            if (email) camposAtualizados.email = email;
            if (senha) {
                if (senha.length < 8) {
                    return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
                }
                let senhaCriptografada = await bcrypt.hash(senha, 10);
                camposAtualizados.senha = senhaCriptografada;
            }
            if(ativo !== undefined) camposAtualizados.ativo = ativo;

            const usuarioAtualizado = await UsuarioModel.findByIdAndUpdate(id, camposAtualizados, { new: true });

            return res.status(200).json(usuarioAtualizado);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static deletarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findByIdAndDelete(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}