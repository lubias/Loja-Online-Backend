const express = require("express");
const router = express.Router();
const connectDatabase = require("../middleware/conectarBD");
const axios = require("axios");

router.use(express.json());
router.use(connectDatabase);

router.post("/gravar", async function (req, res) {
  const db = req.dbConnection;
  const { produtos, cliente_id } = req.body;
  let estoque_ok = true;

  for (const element of produtos) {
    try {
      const response = await axios.get(
        `http://localhost:4000/estoque/obter/${element.produto_id}`
      );
      const result = response.data.result;
      const quantidade = result.quantidade;

      if (element.quantidade > quantidade) {
        estoque_ok = false;
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  if (!estoque_ok) {
    res.status(401).send("Estoque abaixo do solicitado");
  } else {
    sqlVendas = "INSERT INTO vendas (cliente_id, valor_total) VALUES (?, ?)";
    const valuesVendas = [cliente_id, 0];

    db.query(sqlVendas, valuesVendas, (err, results) => {
      if (err) {
        console.error("Erro ao criar produto no banco de dados:", err);
        return res.status(500).json({ error: err });
      }

      const vendaId = results.insertId;
      let valorTotal = 0;

      for (const produto of produtos) {
        sqlProdVenda =
          "INSERT INTO produtos_vendas (venda_id, produto_id, quantidade) VALUES (?, ?, ?)";
        const valuesProdVenda = [
          vendaId,
          produto.produto_id,
          produto.quantidade,
        ];
        db.query(sqlProdVenda, valuesProdVenda, (err, results) => {
          if (err) {
            console.error("Erro ao criar produto no banco de dados:", err);
            return res.status(500).json({ error: err });
          }
        });
        valorTotal += produto.preco * produto.quantidade;

        const requestBody = {
          quantidade: produto.quantidade,
        };

        axios
          .put(
            `http://localhost:4000/estoque/atualizar/${produto.produto_id}`,
            requestBody
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(
                `Estoque atualizado com sucesso para o produto ${produto.produto_id}`
              );
            } else {
              console.error(
                `Erro ao atualizar o estoque para o produto ${produto.produto_id}`
              );
            }
          })
          .catch((error) => {
            console.error(
              `Erro ao fazer a requisição para atualizar o estoque: ${error.message}`
            );
          });
      }

      db.query("UPDATE vendas SET valor_total = ? WHERE id = ?", [
        valorTotal,
        vendaId,
      ]);

      res.status(200).send("Venda inserida com sucesso!");
    });
  }
});

router.get("/obter/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "SELECT * FROM vendas WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.status(200).json({
      status: "OK",
      mensagem: "Sucesso ao consultar venda",
      result: results[0],
    });

    db.release();
  });
});

router.get("/obter", (req, res) => {
  const db = req.dbConnection;

  db.query("SELECT * FROM estoque", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    console.log(results);

    res.status(200).json({
      status: "OK",
      mensagem: "Sucesso ao consultar vendas",
      data: results,
    });

    db.release();
  });
});

module.exports = router;
