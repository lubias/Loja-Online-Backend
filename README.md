# Loja Online Backend
Este projeto foi desenvolvido como resolução para o desafio 6 da formação de Tecnologia da escola DNC.

## Instalação 

##### Clone o repositório:
```
$ git clone https://github.com/lubias/Loja-Online-Backend.git
```

##### Acesse a pasta criada:
```
$ cd Loja-Online-Backend
```

##### Crie o banco de dados MySQL e as tabelas a seguir:
```mysql
CREATE TABLE `clientes` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;
```
```mysql
CREATE TABLE `estoque` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`produto_id` INT(11) NOT NULL,
	`quantidade` INT(11) NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `produto_id_estoque` (`produto_id`) USING BTREE,
	CONSTRAINT `produto_id_estoque` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;
```
```mysql
CREATE TABLE `produtos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`descricao` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`preco` FLOAT NULL DEFAULT '0.00',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;
```
```mysql
CREATE TABLE `produtos_vendas` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`venda_id` INT(11) NOT NULL,
	`produto_id` INT(11) NOT NULL,
	`quantidade` INT(11) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `venda_id` (`venda_id`) USING BTREE,
	INDEX `produto_id` (`produto_id`) USING BTREE,
	CONSTRAINT `produto_id` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `venda_id` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;
```
```mysql
CREATE TABLE `vendas` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`cliente_id` INT(11) NOT NULL,
	`valor_total` FLOAT NOT NULL DEFAULT '0.00',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `cliente_id` (`cliente_id`) USING BTREE,
	CONSTRAINT `cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2;
```

##### Configure o banco de dados no ficheiro conectarBD.js (src/middleware/conectarBD.js):
```javascript
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'desafio_6',
};
```

##### Instale as dependências:
```$ npm install```

##### Inicie o projeto:
```$ npm run dev```

## Documentação da API
#### PRODUTOS
###### Retornar todos os produtos
```
  GET /produtos
```
###### Retornar um produto pelo id
```
  GET /produtos/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |

###### Criar um produto
```
  POST /produtos
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `nome`      | `string`   | **Obrigatório**                                | **Sim**                                |
| `descricao` | `string`   | **Obrigatório**                                | **Sim**                                |
| `preco`     | `float`    | **Obrigatório**                                | **Sim**                                |

###### Exemplo
```json
{
	"nome": "PC Gamer",
	"descricao": "PC Gamer",
	"preco": 1200.55
}
```
###### Editar um produto pelo id
```
  PUT /produtos/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |
| `nome`      | `string`   | **Opcional**                                   | **Sim**                                |
| `descricao` | `string`   | **Opcional**                                   | **Sim**                                |
| `preco`     | `float`    | **Opcional**                                   | **Sim**                                |

###### Exemplo
```json
{
	"preco": 1200.00
}
```
###### Apagar um produto pelo id
```
  DELETE /produtos/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |
