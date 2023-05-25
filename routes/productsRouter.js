const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');


function formatDateTime(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('pt-BR', options);
}

router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        const trimedProducts = products.map(product => ({
            id: product.id_order,
            date: formatDateTime(product.date_of_order),
            sku: product.sku_order.trim(),
            value: product.value,
            title: product.title.trim(),
            stock: product.stock,
          }));
        
        res.render('admin/products', { products: trimedProducts });
    } catch (error) {
        res.status(500).send('erro ao obter os dados do produto: ' + error)
    }


})




module.exports = router