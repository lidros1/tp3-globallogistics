const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint principal que devuelve el Hostname (ID del contenedor)
app.get('/', (req, res) => {
  res.status(200).json({
    empresa: 'GlobalLogistics S.A.',
    servicio: 'tracking-microservice',
    estado: 'OPERATIVO',
    instancia_id: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

// Endpoint de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    instancia_id: os.hostname()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API corriendo en puerto ${PORT} | Instancia: ${os.hostname()}`);
});