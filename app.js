const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simulación de datos del GPS (esto debería ser reemplazado por la comunicación real con el GPS 303F)
let currentLocation = { lat: 0, lng: 0 };

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Enviar la ubicación actual al cliente cuando se conecta
  socket.emit('updateLocation', currentLocation);

  // Simulación de actualización de ubicación (esto debería ser reemplazado por la comunicación real con el GPS 303F)
  setInterval(() => {
    currentLocation = {
      lat: currentLocation.lat + 0.001,
      lng: currentLocation.lng + 0.001
    };
    io.emit('updateLocation', currentLocation);
  }, 5000);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});