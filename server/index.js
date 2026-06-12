import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const upload = multer({ dest: 'uploads/' })

app.use(cors())

app.post('/upload', upload.single('model'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  try {
    const fileBuffer = fs.readFileSync(req.file.path)
    const gltf = JSON.parse(
      Buffer.from(fileBuffer).toString('utf8').includes('glTF')
        ? extractGLTFJson(fileBuffer)
        : fileBuffer
    )

    res.json({
      filename: req.file.originalname,
      size: req.file.size,
      meshes: gltf.meshes?.map(m => m.name || 'unnamed') ?? [],
      materials: gltf.materials?.map(m => m.name || 'unnamed') ?? [],
      nodes: gltf.nodes?.map(n => n.name || 'unnamed') ?? []
    })
  } catch (err) {
    res.json({
      filename: req.file.originalname,
      size: req.file.size,
      meshes: [],
      materials: [],
      nodes: [],
      note: 'Binary GLB - scene extraction coming next'
    })
  }
})

function extractGLTFJson(buffer) {
  const jsonLength = buffer.readUInt32LE(12)
  return buffer.slice(20, 20 + jsonLength).toString('utf8')
}

app.listen(3001, () => console.log('Server running on port 3001'))