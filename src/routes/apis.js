const express = require('express');
const router = express.Router();
const database = require("../database");

//CONFIRMAR EXISTENCIA DE CORREO
  router.get('/correoverificar/:email', async (req, res) => {
    try {
    const connection = await database.getConnection();
    const email = req.params.email;
    const result =  await connection.query("SELECT `Correo` FROM correos WHERE Correo = ?", [email]);
    console.log(result)
    res.json(result);

    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: 'Error al verificar correo' });
    }
    });

    




module.exports = router;