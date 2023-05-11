const express = require('express');
const router = express.Router();


// Rota para renderizar a página HTML
router.get('/', (req, res) => {
    res.render('pages/admin/index');
});


module.exports = router

