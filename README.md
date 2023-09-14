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

## Tecnologias
![Node.JS](https://img.shields.io/badge/-node.js-43853d?style=for-the-badge&logo=node.js&logoColor=FFFFFF&labelColor=026e00)&nbsp;
![Express.JS](https://img.shields.io/badge/-express.js-868686?style=for-the-badge&logo=express&logoColor=FFFFFF&labelColor=4f4f4f)&nbsp;
![MySQL](https://img.shields.io/badge/-mysql-00758f?style=for-the-badge&logo=mysql&logoColor=FFFFFF&labelColor=005d72)&nbsp;

## Documentação da API

#### CLIENTES
###### Retornar todos os clientes
```
  GET /clientes
```
###### Retornar um cliente pelo id
```
  GET /clientes/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |

###### Criar um cliente
```
  POST /clientes
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `nome`      | `string`   | **Obrigatório**                                | **Sim**                                |
| `email`     | `string`   | **Obrigatório**                                | **Sim**                                |
| `password`  | `float`    | **Obrigatório**                                | **Sim**                                |

###### Exemplo
```json
{
	"nome": "Teste",
	"email":"teste@teste.com",
	"password":"12345678"
}
```
###### Editar um cliente pelo id
```
  PUT /clientes/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |
| `nome`      | `string`   | **Opcional**                                   | **Sim**                                |
| `email`     | `string`   | **Opcional**                                   | **Sim**                                |
| `password`  | `float`    | **Opcional**                                   | **Sim**                                |

###### Exemplo
```json
{
	"email":"teste2@teste.com"
}
```
###### Apagar um cliente pelo id
```
  DELETE /clientes/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |

---

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

---

#### ESTOQUE
###### Retornar o estoque de todos os produtos
```
  GET /estoque
```

###### Retornar o estoque de um produto pelo seu id
```
  GET /estoque/${id}
```
| Parâmetro    | Tipo       | Descrição                                      | Body?                                  |
| :----------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`         | `int`      | **Obrigatório** - ID do produto                | **Não**                                |


###### Corrigir o estoque de um produto pelo id
```
  PUT /estoque/corrigir/${id}
```
| Parâmetro    | Tipo       | Descrição                                      | Body?                                  |
| :----------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`         | `int`      | **Obrigatório**                                | **Não**                                |
| `quantidade` | `int`      | **Obrigatório**                                | **Sim**                                |

###### Exemplo
```json
{
	"quantidade": 5
}
```

###### Atualizar o estoque de um produto pelo id
```
  PUT /estoque/atualizar/${id}
```
| Parâmetro    | Tipo       | Descrição                                      | Body?                                  |
| :----------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`         | `int`      | **Obrigatório**                                | **Não**                                |
| `quantidade` | `int`      | **Obrigatório**                                | **Sim**                                |

###### Exemplo
```json
{
	"quantidade": 2
}
```

---
#### VENDAS
###### Retornar todos as vendas
```
  GET /vendas
```
###### Retornar uma venda pelo id
```
  GET /vendas/${id}
```
| Parâmetro   | Tipo       | Descrição                                      | Body?                                  |
| :---------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `id`        | `int`      | **Obrigatório**                                | **Não**                                |

###### Criar uma venda
```
  POST /vendas
```
| Parâmetro    | Tipo       | Descrição                                      | Body?                                  |
| :----------- | :--------- | :--------------------------------------------- | :------------------------------------- |
| `produtos`   | `array`   | **Obrigatório**                                | **Sim**                                |
| `produto_id` | `int`      | **Obrigatório**                                | **Sim**                                |
| `quantidade` | `int`      | **Obrigatório**                                | **Sim**                                |
| `preco`      | `float`    | **Obrigatório**                                | **Sim**                                |
| `cliente_id` | `int`      | **Obrigatório**                                | **Sim**                                |

###### Exemplo
```json
{
	"produtos":[
		{
			"produto_id": 2,
			"quantidade":1,
			"preco": 1000.00
		}
	],
	"cliente_id": 1
}
```

## Modelo entidade relacionamento
