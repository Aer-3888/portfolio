# 3D Interactive Portfolio "The Stage" 🎭

>## About
>This is an interactive 3D portfolio website built as a third-person game. Users explore a "Creator's Loft"—an indoor stage that physically manifests my personality and skills.

## 🗺️ The World Concept
The scene is a single, detailed rectangular room (The Stage) with distinct zones:
* **The Command Center (Gaming):** A desk setup acting as the spawn point and "About Me" hub.
* **The Bouldering Wall:** An indoor climbing wall installation where holds represent specific technical skills.
* **The Secret Archive (Escape Game):** A puzzle-locked safe/door containing complex case studies.
* **The Studio (Photography):** A backdrop setup with lighting equipment serving as the photo gallery.

## 🛠️ Tech Stack & Tools

### Core Engine
* **React:** UI logic and component management.
* **Vite:** High-performance build tool.
* **Three.js:** WebGL 3D rendering engine.
* **React Three Fiber (R3F):** React renderer for Three.js.

### Gameplay & Physics
* **@react-three/rapier:** Physics engine (handling collisions, gravity, and rigid bodies).
* **Ecctrl:** Character controller for robust 3rd-person movement (WASD + Jump).

### Helpers & State
* **@react-three/drei:** Utility library for R3F (Loaders, HTML overlays, Text).
* **Zustand:** Global state management (handling UI triggers when Game Events occur).
* **Leva:** GUI for real-time debugging and tweaking.

### Styling
* **Tailwind CSS:** For the 2D "Heads Up Display" (HUD) and Pop-up cards (Glassmorphism style).

### Assets
* **Models:** Sourced from Kenney.nl, Poly Pizza, and custom low-poly edits.
* **Animations:** Mixamo (Adobe).

## 🎮 Controls
* **W / A / S / D:** Move Character
* **Space:** Jump
* **Mouse:** Rotate Camera
* **Left Click:** Interact with NPCs/Objects
* **Esc:** Close Pop-ups

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```