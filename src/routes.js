const express = require('express');
const db = require('./db');
const router = express.Router();

router.post('/register', (req, res) => {
    const { nome, email, telefone, nascimento, profissao, empresa, mensagem } = req.body;
    db.run(
        'INSERT INTO users (nome, email, telefone, nascimento, profissao, empresa, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, email, telefone, nascimento, profissao, empresa, mensagem],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, nome, email, telefone, nascimento, profissao, empresa, mensagem });
        }
    );
});

router.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;