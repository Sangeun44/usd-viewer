# USD Viewer

A browser-based 3D asset viewer and scene graph inspector built with React, Three.js, and Node.js.

## Features
- Upload and view GLB/glTF files directly in the browser
- Inspect scene graph data including meshes, materials, and nodes
- Node/Express backend for server-side asset parsing
- Orbit controls for rotating and zooming the model

## Live Demo
https://Sangeun44.github.io/usd-viewer

## Tech Stack
- React + Vite
- Three.js / @react-three/fiber / @react-three/drei
- Node.js + Express
- Multer for file handling

## Running Locally

**Frontend:**
```bash
cd usd-viewer
npm install
npm run dev
```

**Backend:**
```bash
cd usd-viewer/server
npm install
node index.js
```

Then open http://localhost:5173 in your browser.

## Background
Built as a portfolio piece exploring 3D asset delivery pipelines — the same domain as Adobe's 3D Workflows team and Foundry's Griptape platform. Inspired by production USD/glTF pipeline work in virtual production and digital twin contexts.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
