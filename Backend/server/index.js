require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createPosts, readPosts } = require('../utils/pg')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_, res) => {
  try {
    const result = await readPosts()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/posts', async (req, res) => {
  try {
    const result = await createPosts(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})

module.exports = app
