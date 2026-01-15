# Brick Text Builder

A 3D text renderer that builds words out of interlocking toy bricks using Three.js and React.

## Running the App

Start a local web server in the project directory:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser.

## Usage

1. Enter text in the input field
2. Choose a color mode (rainbow, random, or solid colors)
3. Click "Build" to watch bricks animate into place
4. Use mouse to interact with the 3D scene:
   - **Drag** - Rotate camera
   - **Scroll** - Zoom in/out
   - **Shift+Drag** or **Right-click drag** - Pan
   - **Double-click** - Reset camera to front view

## Requirements

No installation required. The app loads all dependencies from CDN:
- React 18
- Three.js
- Tailwind CSS
- Babel (for JSX transformation)
