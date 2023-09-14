function routes(app) {
    app.use('/produtos', require('./routes/produtos.js'));
    app.use('/estoque', require('./routes/estoque.js'));
    app.use('/vendas', require('./routes/vendas.js'));
    app.use('/clientes', require('./routes/clientes.js'));
    return;
}

module.exports = routes;