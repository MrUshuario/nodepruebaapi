const express = require('express');
const morgan = require("morgan");
const database = require("./database");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

//RUTA
const apisrutas = require('./routes/apis.js');

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//SEGURIDAD CORPS
// Lista negra de dominios/IPs no permitidos (personaliza según tus necesidades)
const blockedOrigins = [
  'evilbot.com',
  'scraper.example',
  '123.456.789.10', // IP maliciosa
  /.*hacker.*/, // Bloquea cualquier URL que contenga "hacker"
];

// Middleware CORS personalizado
const corsOptionsDelegate = (req, callback) => {
  const requestOrigin = req.header('Origin');
  let isBlocked = false;

  // Verifica si el origen está en la lista negra
  if (requestOrigin) {
    isBlocked = blockedOrigins.some(origin => {
      if (typeof origin === 'string') {
        return requestOrigin.includes(origin);
      } else if (origin instanceof RegExp) {
        return origin.test(requestOrigin);
      }
      return false;
    });
  }

  // Si está bloqueado, deniega CORS
  if (isBlocked) {
    callback(new Error('Acceso no permitido por CORS'), { origin: false });
  } else {
    // Permite cualquier dominio (o puedes restringir solo a algunos)
    callback(null, { 
      origin: true, // Permite todos los orígenes no bloqueados
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ajusta según necesites
    });
  }
};



//MIDDLEWARE
app.use(express.json()); //// Middleware para parsear JSON
app.use(morgan("dev"));
app.use(cors(corsOptionsDelegate));

// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });

  //VERIFICAR CORREO
  app.use('/api', apisrutas);


  //GUARDAR DATOS
  app.post('/datos', async (req, res) => {
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


    // DATA DE EJEMPLO
    /*
    app.get('/correo', async (req, res) => {
    try {
    const connection = await database.getConnection();
    const result =  await connection.query("SELECT * from correos");
    console.log(result)
    res.json(result);

} catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
  }); */
 