const express = require('express'); // Usamos 'require' en lugar de la sintaxis de importación
// console.log("prueba");

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log('Server listen on port', 8080);
});
console.log('Server listen on port', 8080);
