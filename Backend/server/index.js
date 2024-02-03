require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createPosts, readPosts, updatePost, deletePost } = require('../utils/pg')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_, res) => {
  try {
    const result = await readPosts()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error en la ruta /get:', error)
    res.status(500).json({ error: 'Error en la base de datos', details: error.message })
  }
})

app.post('/posts', async (req, res) => {
  try {
    if (!req.body.id || !req.body.titulo || !req.body.url || !req.body.descripcion) {
      return res.status(400).json({ error: 'Faltan datos obligatorios para crear el post.' })
    }
    const result = await createPosts(req.body)
    return res.status(201).json(result)
  } catch (error) {
    console.error('Error en la ruta /post:', error)
    return res.status(500).json({ error: 'Error en la base de datos', details: error.message })
  }
})

app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await updatePost(id)
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error en la ruta /put:', error)
    return res.status(500).json({ error: 'Error en la base de datos', details: error.message })
  }
})

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await deletePost(id)
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error en la ruta /delete:', error)
    return res.status(500).json({ error: 'Error en la base de datos', details: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})

module.exports = app
