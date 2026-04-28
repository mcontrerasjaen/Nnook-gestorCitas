const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

let citas = [];

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Aura Backend API Running 🚀');
});

const { initializeDatabase } = require('./database');
let db;

initializeDatabase().then(database => {
  db = database;
  console.log("🗄️ Nnook Database: Sistema de persistencia listo.");
});

app.post('/api/setup-salon', (req, res) => {
  const { type } = req.body;
  console.log(`[SERVER] Configurando nuevo salón: ${type}`);

  res.status(200).json({
    success: true,
    message: `Modo ${type} activado`
  });
});

app.post('/api/appointments', async (req, res) => {
  const cita = req.body;

  if (!cita.cliente) {
    console.log("⚠️ Intento de guardar cita vacía bloqueado");
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const pythonRes = await fetch('http://127.0.0.1:5000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita)
    });

    const analisis = await pythonRes.json();
    console.log("🧠 Python analizó el servicio:", analisis.bloques);

    await db.run(
      'INSERT INTO appointments (cliente, servicio, hora, duracion, bloques, empleadoId, salonType) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        cita.cliente,
        cita.servicio,
        cita.hora,
        cita.duracion,
        JSON.stringify(analisis.bloques),
        cita.empleadoId,
        cita.salonType
      ]
    );

    console.log(`✅ Cita de ${cita.cliente} guardada para empleado ID: ${cita.empleadoId}`);
    res.status(201).json({ success: true });

  } catch (error) {
    console.error("❌ Error al procesar la cita:", error);
    await db.run(
      'INSERT INTO appointments (cliente, servicio, hora, duracion, bloques, empleadoId) VALUES (?, ?, ?, ?, ?, ?)',
      [cita.cliente, cita.servicio, cita.hora, cita.duracion, '[]', cita.empleadoId]
    );
    res.status(201).json({ success: true, warning: "Python offline, cita básica guardada" });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM appointments');
    console.log(`📤 Enviando ${rows.length} citas al frontend`);

    const citasFinales = rows.map(r => ({
      ...r,
      bloques: JSON.parse(r.bloques || '[]')
    }));

    res.json(citasFinales);
  } catch (error) {
    console.error("❌ Error al leer de BD:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM appointments');

    const citasFinales = rows.map(r => ({
      ...r,
      bloques: JSON.parse(r.bloques || '[]')
    }));

    res.json(citasFinales);
  } catch (error) {
    res.status(500).json({ error: "Error al leer la base de datos" });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM appointments WHERE id = ?', [id]);
    console.log(`🗑️ Cita ${id} eliminada con éxito`);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la cita" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n✨ Servidor de Aura listo en puerto ${PORT}`);
  console.log(`Pulsar una card en el frontend para probar la conexión...\n`);
});