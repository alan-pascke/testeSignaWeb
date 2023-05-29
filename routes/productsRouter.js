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

router.get('/products/add', (req, res) => {
    res.render('admin/products_add')
})

router.post('/products/new', [
    body('title').notEmpty().withMessage({ text: 'O campo *titulo é obrigatório' }),
    body('sku_order').notEmpty().withMessage({ text: 'O campo *sku é obrigatório' }),
    body('value').notEmpty().withMessage({ text: 'O campo *valor é obrigatório' }).isFloat().withMessage({ text: 'Valor Inválido' }),
    body('stock').notEmpty().withMessage({ text: 'O campo *estoque é obrigatório' }).isInt().withMessage({ text: 'Erro no campo estoque' })    
], async (req, res) => {

    const errors = validationResult(req)
    const {title, sku_order, value, stock} = req.body
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        res.render('admin/products_add' , { errors: errorMessages })
    } else {

        try {
            await Product.create({title, sku_order, value, stock});
            res.redirect('/admin/products')
        } catch (error) {
            console.log('houve um erro');
            res.redirect('/admin/products')
        }

    }
})

router.get('/products/edit/:id', async (req,res) => {
        
    await Product.findByPk(req.params.id)
        .then((product) =>{
            res.render('admin/products_edit', { product: product.toJSON() })
        })
        .catch((error) =>{
            res.status(500).send('Erro ao buscar o produto. Erro: ' + error)
        })
})

router.post('/products/edit/:id', [
    body('title').notEmpty().withMessage({text: 'O campo *nome é obrigatório' }),
    body('sku').notEmpty().withMessage({text: 'O campo *sku é obrigatório' }),
    body('value').notEmpty().withMessage({text: 'O campo *valor é obrigatório' }).isFloat().withMessage({ text: 'Valor Inválido'}),
    body('stock').notEmpty().withMessage({ text: 'O campo *estoque é obrigatório' }).isInt().withMessage({ text: 'Estoque inválido' })    
], async (req, res) => {
    const errors = validationResult(req);
    const {id_order, title, sku, value, stock} = req.body
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        res.render('admin/products_edit', { product: req.body, errors: errorMessages});
    } else {
    
        try {
            await Product.update(
                {title, sku_order: sku , value, stock}, 
                {where: { id_order }}
            );
            res.redirect('/admin/products')
        } catch (error) {
            res.redirect('/admin/products')
        }
    }
});  

router.post('/products/delete' , async (req, res) => {
    const selectedProducts = req.body.products
    try {

        await Product.destroy({
            where: {
                id_order: selectedProducts
            }
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router