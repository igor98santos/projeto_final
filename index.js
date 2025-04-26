require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
    console.log(" Conectado ao MongoDB");
}
connectDB();

const database = client.db("TCC");
const loginCollection = database.collection("login");

//  [GET] - Buscar todos os usuários
app.get("/usuarios", async (req, res) => {
    const usuarios = await loginCollection.find().toArray();
    res.json(usuarios);
});

// [POST] - Cadastrar novo usuário
app.post("/usuarios", async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios!" });
    }

    const novoUsuario = await loginCollection.insertOne({ email, senha });
    res.status(201).json({ mensagem: "Usuário cadastrado!", id: novoUsuario.insertedId });
});

//  [PUT] - Atualizar usuário por ID
app.put("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const { email, senha } = req.body;

    await loginCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { email, senha } }
    );

    res.json({ mensagem: "Usuário atualizado!" });
});

//  [DELETE] - Remover usuário por ID
app.delete("/usuarios/:id", async (req, res) => {
    const id = req.params.id;

    await loginCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ mensagem: "Usuário deletado!" });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
