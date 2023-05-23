const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
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
        res.render('admin/customers_add' , { errors: errorMessages })
    } else {

        try {
    
            await Customer.create({name, email, cpf});
            req.flash('success_msg', 'Adicionado com sucesso!')
            res.redirect('/admin/customers')
        } catch (error) {
            req.flash('error_msg', 'Houve um erro ao adicionar um cliente: ' + error)
            res.redirect('/admin/customers')
        }

    }
})

router.get('/customers/edit/:id', async (req,res) => {
        
    await Customer.findByPk(req.params.id)
        .then((customer) =>{
            res.render('admin/customers_edit', { customer: customer.toJSON() })
        })
        .catch((error) =>{
            res.status(500).send('Erro ao buscar o cliente. Erro: ' + error)
        }) 
})

router.post('/customers/edit/:id', [
    body('name').notEmpty().withMessage({text: 'O nome é obrigatório' }),
    body('email').notEmpty().withMessage({text: 'O email é obrigatório'}).isEmail().withMessage({ text: 'Email inválido' }),
    body('cpf').notEmpty().withMessage({text: 'O CPF é obrigatório'})    
  ], async (req, res) => {
    const errors = validationResult(req);
    const {id} = req.params
    const {name, email, cpf} = req.body

    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.render('admin/customers_edit', { errors: errorMessages });
    } else {
    
        try {
            await Customer.update(
                {name, email, cpf}, 
                {where: { id }}
            );
            req.flash('success_msg', 'Adicionado com sucesso!')
            res.redirect('admin/customers')
        } catch (error) {
            req.flash('error_msg', 'Houve um erro ao adicionar um cliente: ' + error)
            res.redirect('admin/customers')
            console.log(error);
        }
    }
});  




module.exports = router

