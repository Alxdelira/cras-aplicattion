import mongoose from 'mongoose';
import app from '../app.js';
import request from 'supertest';
import { faker } from '@faker-js/faker';

let server;

beforeEach(() => {
    const port = 3010;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

afterAll(() => {
    mongoose.connection.close();
});
const Usuario = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
};


let usuarioId;
describe('POST /usuarios', () => {
    it('Deve criar um novo usuário', async () => {       
        const response = await request(server)
            .post('/usuarios')
            .send(Usuario);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário criado com sucesso');
        expect(response.body.usuario.email).toBe(Usuario.email);
        expect(response.body.usuario.nome).toBe(Usuario.nome);
        expect(response.body.usuario.ativo).toBe(true);
        expect(response.body.usuario).toHaveProperty('_id');

        usuarioId = response.body.usuario._id;
        console.log(usuarioId)
    });

    it('Deve retornar erro ao tentar criar um usuário com email já cadastrado', async () => {
        const Usuario = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password(),
        };

        await request(server)
            .post('/usuarios')
            .send(Usuario);

        const response = await request(server)
            .post('/usuarios')
            .send(Usuario);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email já cadastrado');
    });

    it('Deve retornar erro ao tentar criar um usuário sem informar o nome', async () => {
        const Usuario = {
            email: faker.internet.email(),
            senha: faker.internet.password(),
        };

        const response = await request(server)
            .post('/usuarios')
            .send(Usuario);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Todos os campos são obrigatórios');
    });

    it('Deve retornar erro ao tentar criar um usuário com senha menor que 8 caracteres', async () => {
        const Usuario = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: '1234567', // Senha com menos de 8 caracteres
        };

        const response = await request(server)
            .post('/usuarios')
            .send(Usuario);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('A senha deve ter no mínimo 8 caracteres');
    });
})

describe('GET /usuarios', () => {
    it('Deve retornar todos os usuários', async () => {
        const response = await request(server)
            .get('/usuarios');

        expect(response.status).toBe(200);
        expect(response.body.docs.length).toBeGreaterThan(0);
    });

    it('Deve retornar erro ao tentar buscar um usuário inexistente', async () => {
        const id = "662ffb39a4ed21be25152f8b";

        const response = await request(server)
            .get(`/usuarios/${id}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Usuário não encontrado');
    });

    it('Deve retornar um usuário por id', async () => {
        const responseUsuario = await request(server)
            .get(`/usuarios/${usuarioId}`);

        expect(responseUsuario.status).toBe(200);
        expect(responseUsuario.body._id).toBe(usuarioId);
        expect(responseUsuario.body.email).toBe(Usuario.email);
        expect(responseUsuario.body.nome).toBe(Usuario.nome);
        expect(responseUsuario.body.ativo).toBe(true);
    });
});

describe('PUT /usuarios', () => {
    it('Deve atualizar um usuário', async () => {
        const UsuarioAtualizado = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password(),
        };

        const responseUsuarioAtualizado = await request(server)
            .put(`/usuarios/${usuarioId}`)
            .send(UsuarioAtualizado);
            console.log(usuarioId)

        expect(responseUsuarioAtualizado.status).toBe(200);
        expect(responseUsuarioAtualizado.body._id).toBe(usuarioId);
        expect(responseUsuarioAtualizado.body.email).toBe(UsuarioAtualizado.email);
        expect(responseUsuarioAtualizado.body.nome).toBe(UsuarioAtualizado.nome);
        expect(responseUsuarioAtualizado.body.ativo).toBe(true);
    });

    it('Deve retornar erro ao tentar atualizar um usuário inexistente', async () => {
        const id = "662ffb39a4ed21be25152f8b";

        const UsuarioAtualizado = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password(),
        };

        const response = await request(server)
            .put(`/usuarios/${id}`)
            .send(UsuarioAtualizado);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Usuário não encontrado');
    });

    it('Deve retornar erro ao tentar atualizar um usuário com senha menor que 8 caracteres', async () => {
        const UsuarioAtualizado = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: '1234567', // Senha com menos de 8 caracteres
        };

        const responseUsuarioAtualizado = await request(server)
            .put(`/usuarios/${usuarioId}`)
            .send(UsuarioAtualizado);

        expect(responseUsuarioAtualizado.status).toBe(400);
        expect(responseUsuarioAtualizado.body.message).toBe('A senha deve ter no mínimo 8 caracteres');
    });
});





