const express = require('express'); // Importa o framework Express
const router = express.Router(); // Cria um novo roteador
const productsController = require('../controllers/productsController'); // Importa o controlador de produtos

// Definindo uma rota para obter todos os produtos
router.get('/', productsController.getAllProducts);

// Definindo uma rota para adicionar um novo produto
router.post('/', productsController.addProduct);

// Definindo uma rota para atualizar um produto existente (substituição completa)
router.put('/:id', productsController.updateProductPut);

// Definindo uma rota para atualizar um produto existente (atualização parcial)
router.patch('/:id', productsController.updateProductPatch);

// Definindo uma rota para deletar um produto existente
router.delete('/:id', productsController.deleteProduct);

// Exportando o roteador
module.exports = router;
