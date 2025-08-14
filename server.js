const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});