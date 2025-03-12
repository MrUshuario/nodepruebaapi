const express = require('express');
const morgan = require("morgan");
const database = require("./database");


const app = express();
const PORT = process.env.PORT || 4000;
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//MIDDLEWARE
//app.use(express.json()); //// Middleware para parsear JSON
app.use(morgan("dev"));

// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });

  app.get('/productos', async (req, res) => {
    const connection = await database.getConnection();
    const result =  await connection.query("SELECT * from productos");
    console.log(result)
    

  });