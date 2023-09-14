const express = require('express');
const routes = require('./src/routes');
const app = express();

routes(app);

app.listen(4000, () => {
    console.log("Servidor rodando");
});

module.exports = app;