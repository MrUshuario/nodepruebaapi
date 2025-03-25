const express = require('express');
const morgan = require("morgan");
const database = require("./database");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//RUTA
const apisrutas = require('./routes/apis.js');

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});

//SEGURIDAD CORPS
// Lista negra de dominios/IPs no permitidos (personaliza según tus necesidades)
const blockedOrigins = ['evilbot.com', 'scraper.example', '123.456.789.10',
// IP maliciosa
/.*hacker.*/ // Bloquea cualquier URL que contenga "hacker"
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
    callback(new Error('Acceso no permitido por CORS'), {
      origin: false
    });
  } else {
    // Permite cualquier dominio (o puedes restringir solo a algunos)
    callback(null, {
      origin: true,
      // Permite todos los orígenes no bloqueados
      methods: ['GET', 'POST', 'PUT', 'DELETE'] // Ajusta según necesites
    });
  }
};

//MIDDLEWARE
app.use(express.json()); //// Middleware para parsear JSON
app.use(morgan("dev"));
app.use(cors(corsOptionsDelegate));

//VERIFICAR CORREO
app.use('/api', apisrutas);

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