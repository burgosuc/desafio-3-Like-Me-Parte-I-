require('dotenv').config()
const { Pool } = require('pg')

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const readPosts = async () => {
  const result = await pool.query('SELECT * FROM  posts;')
  return result.rows
}

const createPosts = async ({ id, titulo, url, descripcion }) => {
  const query = 'INSERT INTO posts (id, titulo, img, descripcion) values ($1, $2, $3, $4) RETURNING *;'
  const values = [id, titulo, url, descripcion]
  const result = await pool.query(query, values)
  return result.rows
}

module.exports = { readPosts, createPosts }
