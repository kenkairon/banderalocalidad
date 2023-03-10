/*Instalaciones previas */
/*npm init -y, npm install express, npm install handlebars*/
const express = require('express');
const app = express();
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// Configurar Handlebars como motor de plantillas
// app.engine('.hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');

// Cargar los datos de los países desde el archivo JSON
const paisesPath = path.join(__dirname, 'data', 'paises.json');
const paisesJson = fs.readFileSync(paisesPath, 'utf-8');
const paises = JSON.parse(paisesJson);

// Cargar la plantilla Handlebars desde el archivo "country-card.hbs"
const source = fs.readFileSync('./views/country-card.hbs', 'utf8');
const compiledTemplate = handlebars.compile(source);

// Generar las cards dinámicas para cada país
const cardsHtml = Object.values(paises).map((pais) => {
    return compiledTemplate({
        bandera: pais.Bandera,
        pais: pais.País,
        continente: pais.Continente,
        capital: pais.Capital
    });
}).join('\n');

// Ruta principal que muestra todas las cards generadas
app.get('/', (req, res) => {
  res.send(cardsHtml);
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, function () {
  console.log('Servidor iniciado en el puerto 3000');
});
