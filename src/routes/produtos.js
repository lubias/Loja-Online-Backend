const express = require('express');
const router = express.Router();
const connectDatabase = require('../middleware/conectarBD');

router.use(express.json());
router.use(connectDatabase);

router.post('/criar', (req, res) => {
  const db = req.dbConnection;
  const { nome, descricao, preco } = req.body;
  
  sql = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)';
  const values = [nome, descricao, preco];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao criar produto no banco de dados:', err);
      return res.status(500).json({ error: err });
    }
    
    const novoProdutoId = results.insertId;

    const sql2 = 'INSERT INTO estoque (produto_id) VALUES (?)';

    db.query(sql2, [novoProdutoId], (err2, results2) => {
      if (err2) {
        console.error('Erro na segunda consulta ao banco de dados:', err2);
        return res.status(500).json({ error: err2 });
      }

      res.json({ data: { novoProdutoId } });
      
      db.release();
    });
  });
});


router.get('/obter', (req, res) => {
  const db = req.dbConnection;

  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

router.get('/obter/:id', (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = 'SELECT * FROM produtos WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

router.put('/editar/:id', (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = 'UPDATE produtos SET ? WHERE id = ?';
  const values = [updatedFields, id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao editar produto no banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

router.delete('/apagar/:id', (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = 'DELETE FROM produtos WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir produto do banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

module.exports = router;
