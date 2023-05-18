const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const sequelize = require('../database/db');
const { body, validationResult } = require('express-validator');


// Rota para renderizar a página HTML
router.get('/', (req, res) => {
    res.render('admin/index');
});

// Rota Customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        const trimedCustomers = customers.map(customer => ({
            id: customer.id,
            name: customer.name.trim(),
            email: customer.email.trim(),
            cpf: customer.cpf.trim(),
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt
          }));
        
        res.render('admin/customers', { customers: trimedCustomers });
    } catch (error) {
        req.flash('error_msg', )
        res.status(500).send('erro ao obter os dados do cliente: ' + error)
    }
})

router.get('/customers/add', (req, res) => {
    res.render('admin/customers_add')
})

router.post('/customers/new', [
    body('name').notEmpty().withMessage({text: 'O nome é obrigatório' }),
    body('email').notEmpty().withMessage({text: 'O email é obrigatório'}).isEmail().withMessage({ text: 'Email inválido' }),
    body('cpf').notEmpty().withMessage({text: 'O CPF é obrigatório'})    
], async (req, res) => {

    const errors = validationResult(req)
    const {name, email, cpf} = req.body
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        console.log(errorMessages);
        res.render('admin/customers_add' , { errors: errorMessages })
    } else {

        try {
    
            await Customer.create({name, email, cpf});
            req.flash('success_msg', 'Adicionado com sucesso!')
            res.status(200).redirect('/admin/customers')
        } catch (error) {
            req.flash('error_msg', 'Houve um erro ao adicionar um cliente: ' + error)
            res.status(500).redirect('/admin')
        }

    }
})

router.get('/customers/edit/:id', async (req,res) => {

    try {
        
        const customerId = req.params.id
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(400).send('cliente não encontrado');
        }
        res.render('admin/customers_edit', { customer })
    } catch (error) {
        res.status(500).send('Erro ao buscar o cliente ' + error)
    }

})

router.post('/customers/edit', [
    body('name').notEmpty().withMessage('O nome é obrigatório'),
    body('email').notEmpty().withMessage('O email é obrigatório').isEmail().withMessage('Email inválido'),
    body('cpf').notEmpty().withMessage('O CPF é obrigatório')
  ], async (req, res) => {
    try {
        const { id } = req.para;

        const customer = await Customer.findByPk(id);

        !customer ? res.status(404).send('Cliente não encontrado') : true 

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.render('admin/customers', { customer, errors: errorMessages });
        }

        await customer.update(req.body);

        req.flash('success', 'Cliente atualizado com sucesso!');
        res.redirect('/admin/customers');
    } catch (error) {
        res.status(500).send('Erro ao atualizar o cliente: ' + error);
    }
});  





module.exports = router

