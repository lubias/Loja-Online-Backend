const express = require("express");
const router = express.Router();
const connectDatabase = require("../middleware/conectarBD");

router.use(express.json());
router.use(connectDatabase);

router.put("/corrigir/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE estoque SET ? WHERE produto_id = ?";
  const values = [updatedFields, id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao excluir produto do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

router.put("/atualizar/:id", (req, res) => {
  const db = req.dbConnection;
  const productId = req.params.id;
  const { quantidade } = req.body;

  db.query(
    "SELECT quantidade FROM estoque WHERE produto_id = ?",
    [productId],
    (err, results) => {
      if (err) {
        console.error("Erro ao consultar o estoque:", err);
        res.status(500).send("Erro ao consultar o estoque");
      } else {
        if (results.length === 0) {
          res.status(404).send("Produto não encontrado no estoque");
        } else {
          const estoqueAtual = results[0].quantidade;

          if (estoqueAtual < quantidade) {
            res.status(400).send("Quantidade insuficiente em estoque");
          } else {
            const novoEstoque = estoqueAtual - quantidade;

            db.query(
              "UPDATE estoque SET quantidade = ? WHERE produto_id = ?",
              [novoEstoque, productId],
              (err, results) => {
                if (err) {
                  console.error("Erro ao atualizar o estoque:", err);
                  res.status(500).send("Erro ao atualizar o estoque");
                } else {
                  console.log("Estoque atualizado com sucesso");
                  res.status(200).send("Estoque atualizado com sucesso");
                }
              }
            );
          }
        }
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "SELECT * FROM estoque WHERE produto_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ status:"OK", mensagem: "Sucesso ao consultar estoque", result: results[0]});

    db.release();
  });
});

router.get("/", (req, res) => {
  const db = req.dbConnection;

  db.query("SELECT * FROM estoque", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    console.log(results)

    res.json({ status:"OK", mensagem: "Sucesso ao consultar estoque", data: results});

    db.release();
  });
});

module.exports = router;
