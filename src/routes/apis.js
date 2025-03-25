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

      //GUARDAR DATOS
    router.post('/datos', async (req, res) => {
    try {
    const connection = await database.getConnection();
    // Extraer los datos del cuerpo de la petición
    console.log('RECIBIDO:', JSON.stringify(req.body, null, 2));
    const { fields } = req.body;

    // Validar que los datos requeridos existan
    if (!fields         ||
      !fields.Correo    ||
      !fields.Nombres   ||
      //!fields.NIF       ||
      !fields.Telefono  ||
      //!fields.Direccion ||
      !fields.Edificio  ||
      //!fields.Puntaje   ||
      !fields.MetrosTerreno ||
      !fields.Comentario        
    ) {
      return res.status(400).json({ error: 'Faltan campos' });
    }

        // 1. Verificar si el correo ya existe (NO ESTA FUNCIONADNO LA IA NO SABE)
        /*
    const [correoExistente] = await connection.query(
    'SELECT 1 FROM correos WHERE Correo = ? LIMIT 1',
    [fields.Correo]
  );
  const correoCount = correoExistente[0]?.count || 0;


    if (correoCount) {
      console.log("PRUEBA CONSOLE")
      return res.status(409).json({ 
        error: 'El correo electrónico ya está registrado',
        field: 'Correo'
      });
    } */

    // 2. Verificar si el NIF ya existe
    /*
    const [nifExistente] = await connection.query(
      'SELECT 1 FROM correos WHERE NIF = ? LIMIT 1',
      [fields.NIF]
    );

    if (nifExistente.length > 0) {
      return res.status(409).json({ 
        error: 'El NIF ya está registrado',
        field: 'NIF'
      });
    } */

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
  const params = [
    fields.Correo,
    fields.Nombres, 
    fields.NIF,
    fields.Telefono, 
    fields.Direccion, 
    fields.Edificio || null,
    fields.MetrosTerreno || null,
    fields.Comentario || null,
    fields.Puntaje || 0 // Valor por defecto 0 si no se especifica
  ];

  const result = await connection.query(query, params);
  console.log("GUARDADO")
  console.log(result)
  res.json(result);

  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al guardar los datos' });
    }
    });




module.exports = router;