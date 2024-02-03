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
  try {
    const result = await pool.query('SELECT * FROM  posts;')
    return result.rows
  } catch (error) {
    console.error('Error en readPosts:', error)
    return { error: { code: error.code, message: error.message } }
  }
}
const createPosts = async ({ id, titulo, url, descripcion }) => {
  const query = 'INSERT INTO posts (id, titulo, img, descripcion) values ($1, $2, $3, $4) RETURNING *;'
  try {
    const values = [id, titulo, url, descripcion]
    const result = await pool.query(query, values)
    return result.row
  } catch (error) {
    console.error('Error en createPosts:', error)
    return { error: { code: error.code, message: error.message } }
  }
}

const updatePost = async (id) => {
  const query = 'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *;'
  try {
    const result = await pool.query(query, [id])
    return result.rows
  } catch (error) {
    console.error('Error en updatePosts:', error)
    return { error: { code: error.code, message: error.message } }
  }
}

const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *;'
  try {
    const result = await pool.query(query, [id])
    return result.rows
  } catch (error) {
    console.error('Error en deletePosts:', error)
    return { error: { code: error.code, message: error.message } }
  }
}

module.exports = { readPosts, createPosts, updatePost, deletePost }
