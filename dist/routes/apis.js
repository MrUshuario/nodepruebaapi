const express = require('express');
const router = express.Router();
const database = require("../database");
const {
  sendRegistrationEmail
} = require('../emailService');

//PRUEBA
// Rutas
router.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

//CONFIRMAR EXISTENCIA DE CORREO
router.get('/correoverificar/:email', async (req, res) => {
  try {
    const connection = await database.getConnection();
    const email = req.params.email;
    const result = await connection.query("SELECT `Correo` FROM correos WHERE Correo = ?", [email]);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(200).json({
      data: {
        success: false,
        correo: "Problemas para extraer los datos"
      }
    });
  }
});

//GUARDAR DATOS
router.post('/datos', async (req, res) => {
  try {
    const connection = await database.getConnection();
    // Extraer los datos del cuerpo de la petición
    const {
      fields
    } = req.body;

    // Validar que los datos requeridos existan
    if (!fields || !fields.Correo || !fields.Nombres ||
    //!fields.NIF       ||
    !fields.Telefono ||
    //!fields.Direccion ||
    !fields.Edificio ||
    //!fields.Puntaje   ||
    !fields.MetrosTerreno || !fields.Comentario) {
      return res.status(200).json({
        success: false,
        mensaje: "Faltan campos"
      });
    }

    // 1. Verificar si el correo ya existe (NO ESTA FUNCIONADNO LA IA NO SABE)

    const correoExistente = await connection.query('SELECT Correo FROM correos WHERE Correo = ? LIMIT 1', [fields.Correo]);
    if (correoExistente.length > 0) {
      return res.status(200).json({
        data: {
          success: false,
          mensaje: "El correo ya se encuentra registrado"
        }
      });
    }
    const query = `INSERT INTO correos (
      Correo, 
      Nombres, 
      NIF, 
      Telefono, 
      Direccion, 
      Edificio, 
      MetrosTerreno, 
      Comentario, 
      Puntaje
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Parámetros para la consulta
    const params = [fields.Correo, fields.Nombres, fields.NIF, fields.Telefono, fields.Direccion, fields.Edificio || null, fields.MetrosTerreno || null, fields.Comentario || null, fields.Puntaje || 0 // Valor por defecto 0 si no se especifica
    ];

    //ENVIO DE CORREO

    // 3. Enviar correo de confirmación
    const emailResult = await sendRegistrationEmail(fields.Correo, fields);
    console.log("termino de enviar correo");
    if (!emailResult.success) {
      console.warn('Registro exitoso pero falló el envío de correo');
      // Puedes decidir si esto es un error crítico o no
    }
    const result = await connection.query(query, params);
    console.log(result);
    return res.status(200).json({
      data: {
        success: true,
        mensaje: "Se ha registrado el correo con éxito, revise el correo para aceptar"
      }
    });
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(200).json({
      data: {
        success: false,
        mensaje: "Problemas al insertar los datos"
      }
    });
  }
});
module.exports = router;