const db = require('../config/db');

// Função para obter todos os produtos
const getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erro ao obter produtos:', err);
      res.status(500).send('Erro ao obter produtos');
      return;
    }
    res.json(results);
  });
};

// Função para adicionar um novo produto
const addProduct = (req, res) => {
  const { name, description, category, price, stock, expiry_date } = req.body;

  // Verificar se o produto já existe
  db.query(
    'SELECT * FROM products WHERE name = ? AND description = ? AND expiry_date = ?',
    [name, description, expiry_date],
    (err, results) => {
      if (err) {
        console.error('Erro ao verificar produto:', err);
        res.status(500).send('Erro ao verificar produto');
        return;
      }
      if (results.length > 0) {
        res.status(400).send('Produto duplicado');
        return;
      }

      // Se o produto não existe, insira-o no banco de dados
      db.query(
        'INSERT INTO products (name, description, category, price, stock, expiry_date) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, category, price, stock, expiry_date],
        (err, results) => {
          if (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).send('Erro ao adicionar produto');
            return;
          }
          res.status(201).send('Produto adicionado com sucesso');
        }
      );
    }
  );
};

// Função para atualizar um produto existente (substituição completa)
const updateProductPut = (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, stock, expiry_date } = req.body;
  db.query(
    'UPDATE products SET name = ?, description = ?, category = ?, price = ?, stock = ?, expiry_date = ? WHERE id = ?',
    [name, description, category, price, stock, expiry_date, id],
    (err, results) => {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send('Produto não encontrado');
        return;
      }
      res.send('Produto atualizado com sucesso');
    }
  );
};

// Função para atualizar um produto existente (atualização parcial)
const updateProductPatch = (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const query = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    query.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  db.query(
    `UPDATE products SET ${query.join(', ')} WHERE id = ?`,
    values,
    (err, results) => {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send('Produto não encontrado');
        return;
      }
      res.send('Produto atualizado com sucesso');
    }
  );
};

// Função para deletar um produto existente
const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).send('Erro ao deletar produto');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Produto não encontrado');
      return;
    }
    res.send('Produto deletado com sucesso');
  });
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProductPut,
  updateProductPatch,
  deleteProduct
};
