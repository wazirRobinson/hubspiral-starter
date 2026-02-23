const { Pool } = require('pg')

// Create ONE pool for the entire app process.
// Pool manages connections efficiently.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // If your DB is hosted and requires SSL, set PGSSL=true in .env
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
})

module.exports = pool
