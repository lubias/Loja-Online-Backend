const express = require("express");
const router = express.Router();
const connectDatabase = require("../middleware/conectarBD");

router.use(express.json());
router.use(connectDatabase);

router.post("/", (req, res) => {
  const db = req.dbConnection;
  const { nome, email, password } = req.body;

  sql = "INSERT INTO clientes (nome, email, password) VALUES (?, ?, ?)";
  const values = [nome, email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar cliente no banco de dados:", err);
      return res.status(500).json({ error: err });
    }

    res.json({ cliente_id: results.insertId });

    db.release();
  });
});

router.get("/", (req, res) => {
  const db = req.dbConnection;

  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

router.get("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "SELECT * FROM clientes WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

router.put("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE clientes SET ? WHERE id = ?";
  const values = [updatedFields, id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar cliente no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

router.delete("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "DELETE FROM clientes WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir cliente do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

module.exports = router;
