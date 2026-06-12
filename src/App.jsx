import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

function App() {
  const [modelUrl, setModelUrl] = useState('/model.glb')
  const [sceneInfo, setSceneInfo] = useState(null)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setModelUrl(url)

    const formData = new FormData()
    formData.append('model', file)

    const res = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    setSceneInfo(data)
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: '#1a1a1a', color: '#fff', padding: 16, overflowY: 'auto' }}>
        <input type="file" accept=".glb,.gltf" onChange={handleFile} style={{ marginBottom: 16 }} />
        {sceneInfo && (
          <>
            <h3 style={{ margin: '0 0 8px' }}>{sceneInfo.filename}</h3>
            <Section title="Meshes" items={sceneInfo.meshes} />
            <Section title="Materials" items={sceneInfo.materials} />
            <Section title="Nodes" items={sceneInfo.nodes} />
          </>
        )}
      </div>

      {/* Viewer */}
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <Model url={modelUrl} />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

function Section({ title, items }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <strong>{title}</strong>
      <ul style={{ margin: '4px 0', paddingLeft: 16 }}>
        {items.length === 0
          ? <li style={{ color: '#888' }}>none</li>
          : items.map((item, i) => <li key={i}>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default App