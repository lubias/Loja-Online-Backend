const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'desafio_6',
};

const pool = mysql.createPool(dbConfig);

async function connectDatabase(req, res, next) {
  await pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    req.dbConnection = connection;
    next();
  });
}

module.exports = connectDatabase;
