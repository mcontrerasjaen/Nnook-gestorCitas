const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initializeDatabase() {
  const db = await open({
    filename: './database.db', // El archivo real donde se guarda todo
    driver: sqlite3.Database
  });

 await db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    servicio TEXT,
    hora TEXT,
    duracion TEXT,
    bloques TEXT,
    empleadoId INTEGER,
    salonType TEXT 
  )
`);

  return db;
}

module.exports = { initializeDatabase };