const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');


// Rota para renderizar a página HTML
router.get('/', (req, res) => {
    res.render('admin/index');
});


router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.render('admin/customers', { customers });
    } catch (error) {
        res.status(500).send('erro ao obter os dados do cliente: ' + error)
    }
})


module.exports = router

