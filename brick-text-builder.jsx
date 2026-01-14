const { useState, useEffect, useRef, useCallback } = React;

// ============================================
// FONT DEFINITIONS - 8 wide x 12 tall
// Designed for structural integrity:
// - Every character is one connected piece
// - Rows designed for proper brick interlocking
// ============================================

const FONT_WIDTH = 8;
const FONT_HEIGHT = 12;

const FONT = {
  'A': [
    '01111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011'
  ],
  'B': [
    '11111110',
    '11111111',
    '11000011',
    '11000011',
    '11111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111110'
  ],
  'C': [
    '01111111',
    '11111111',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11111111',
    '01111111'
  ],
  'D': [
    '11111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111110'
  ],
  'E': [
    '11111111',
    '11111111',
    '11000000',
    '11000000',
    '11111110',
    '11111110',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11111111',
    '11111111'
  ],
  'F': [
    '11111111',
    '11111111',
    '11000000',
    '11000000',
    '11111110',
    '11111110',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000'
  ],
  'G': [
    '01111111',
    '11111111',
    '11000000',
    '11000000',
    '11000000',
    '11001111',
    '11001111',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '01111110'
  ],
  'H': [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011'
  ],
  'I': [
    '11111111',
    '11111111',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '11111111',
    '11111111'
  ],
  'J': [
    '01111111',
    '01111111',
    '00000110',
    '00000110',
    '00000110',
    '00000110',
    '00000110',
    '00000110',
    '00000110',
    '11000110',
    '11111110',
    '01111100'
  ],
  'K': [
    '11000011',
    '11000110',
    '11001100',
    '11011000',
    '11110000',
    '11111000',
    '11011100',
    '11001110',
    '11000111',
    '11000011',
    '11000011',
    '11000011'
  ],
  'L': [
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11111111',
    '11111111'
  ],
  'M': [
    '11000011',
    '11100111',
    '11111111',
    '11111111',
    '11011011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011'
  ],
  'N': [
    '11000011',
    '11100011',
    '11110011',
    '11111011',
    '11011111',
    '11001111',
    '11000111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011'
  ],
  'O': [
    '01111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '01111110'
  ],
  'P': [
    '11111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111110',
    '11000000',
    '11000000',
    '11000000',
    '11000000',
    '11000000'
  ],
  'Q': [
    '01111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11001111',
    '11000111',
    '11111111',
    '01111111'
  ],
  'R': [
    '11111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111110',
    '11001100',
    '11000110',
    '11000011',
    '11000011',
    '11000011'
  ],
  'S': [
    '01111111',
    '11111111',
    '11000000',
    '11000000',
    '11111110',
    '11111111',
    '00000011',
    '00000011',
    '00000011',
    '00000011',
    '11111111',
    '11111110'
  ],
  'T': [
    '11111111',
    '11111111',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000'
  ],
  'U': [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '01111110'
  ],
  'V': [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '01100110',
    '01100110',
    '00111100',
    '00111100',
    '00011000',
    '00011000'
  ],
  'W': [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11011011',
    '11011011',
    '11111111',
    '11111111',
    '01100110',
    '01100110'
  ],
  'X': [
    '11000011',
    '11000011',
    '01100110',
    '01100110',
    '00111100',
    '00011000',
    '00011000',
    '00111100',
    '01100110',
    '01100110',
    '11000011',
    '11000011'
  ],
  'Y': [
    '11000011',
    '11000011',
    '11000011',
    '01100110',
    '00111100',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000'
  ],
  'Z': [
    '11111111',
    '11111111',
    '00000110',
    '00001100',
    '00011000',
    '00110000',
    '01100000',
    '11000000',
    '11000000',
    '11000000',
    '11111111',
    '11111111'
  ],
  '0': [
    '01111110',
    '11111111',
    '11000011',
    '11000111',
    '11001111',
    '11011011',
    '11110011',
    '11100011',
    '11000011',
    '11000011',
    '11111111',
    '01111110'
  ],
  '1': [
    '00011000',
    '00111000',
    '01111000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '11111111',
    '11111111'
  ],
  '2': [
    '01111110',
    '11111111',
    '11000011',
    '00000011',
    '00000111',
    '00011110',
    '01111000',
    '11100000',
    '11000000',
    '11000000',
    '11111111',
    '11111111'
  ],
  '3': [
    '11111111',
    '11111111',
    '00000011',
    '00000011',
    '01111111',
    '01111111',
    '00000011',
    '00000011',
    '00000011',
    '00000011',
    '11111111',
    '11111111'
  ],
  '4': [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11111111',
    '00000011',
    '00000011',
    '00000011',
    '00000011',
    '00000011',
    '00000011'
  ],
  '5': [
    '11111111',
    '11111111',
    '11000000',
    '11000000',
    '11111110',
    '11111111',
    '00000011',
    '00000011',
    '00000011',
    '00000011',
    '11111111',
    '11111110'
  ],
  '6': [
    '01111111',
    '11111111',
    '11000000',
    '11000000',
    '11111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '01111110'
  ],
  '7': [
    '11111111',
    '11111111',
    '00000011',
    '00000110',
    '00001100',
    '00011000',
    '00110000',
    '00110000',
    '00110000',
    '00110000',
    '00110000',
    '00110000'
  ],
  '8': [
    '01111110',
    '11111111',
    '11000011',
    '11000011',
    '01111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '01111110'
  ],
  '9': [
    '01111110',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '01111111',
    '00000011',
    '00000011',
    '00000011',
    '11111111',
    '11111110'
  ],
  ' ': [
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000'
  ],
  '!': [
    '00011000',
    '00111100',
    '00111100',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00000000',
    '00000000',
    '00011000',
    '00111100',
    '00011000'
  ],
  '.': [
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00011000',
    '00111100',
    '00111100',
    '00011000'
  ],
  '?': [
    '01111110',
    '11111111',
    '11000011',
    '00000011',
    '00000110',
    '00011100',
    '00011000',
    '00011000',
    '00000000',
    '00011000',
    '00111100',
    '00011000'
  ],
  '-': [
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '11111111',
    '11111111',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '00000000'
  ]
};

const COLORS = [
  '#e53935', // red
  '#1e88e5', // blue  
  '#43a047', // green
  '#fdd835', // yellow
  '#fb8c00', // orange
  '#8e24aa', // purple
  '#00acc1', // cyan
];

// ============================================
// BRICK DIMENSIONS (relative units)
// ============================================
const STUD_UNIT = 0.8;
const BRICK_HEIGHT = 0.96;
const PLATE_HEIGHT = 0.32;

// ============================================
// MAIN COMPONENT
// ============================================
function BrickTextBuilder() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const bricksRef = useRef([]);
  const baseplateRef = useRef(null);
  const buildIntervalRef = useRef(null);

  const [inputText, setInputText] = useState('ABCDEFGHIJ');
  const [colorMode, setColorMode] = useState('rainbow');
  const [selectedColor, setSelectedColor] = useState('#e53935');
  const [speed, setSpeed] = useState(80);
  const [instantMode, setInstantMode] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalBricks, setTotalBricks] = useState(0);

  // ============================================
  // THREE.JS SETUP
  // ============================================
  useEffect(() => {
    if (!containerRef.current) return;

    const initScene = () => {
      const THREE = window.THREE;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#1a1a2e');

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 20, 50);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(20, 40, 20);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.left = -50;
      directionalLight.shadow.camera.right = 50;
      directionalLight.shadow.camera.top = 50;
      directionalLight.shadow.camera.bottom = -50;
      scene.add(directionalLight);


      sceneRef.current = { scene, camera, renderer, THREE };

      // Camera controls
      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };
      let camAngle = { theta: 0, phi: Math.PI / 5 };
      let camDist = 50;

      const onMouseDown = (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        camAngle.theta -= (e.clientX - prevMouse.x) * 0.01;
        camAngle.phi += (e.clientY - prevMouse.y) * 0.01;
        camAngle.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, camAngle.phi));
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => { isDragging = false; };

      const onWheel = (e) => {
        camDist = Math.max(15, Math.min(150, camDist + e.deltaY * 0.05));
      };

      renderer.domElement.addEventListener('mousedown', onMouseDown);
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      renderer.domElement.addEventListener('mouseup', onMouseUp);
      renderer.domElement.addEventListener('mouseleave', onMouseUp);
      renderer.domElement.addEventListener('wheel', onWheel);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Update dropping bricks
        bricksRef.current.forEach((brick) => {
          if (brick.userData.isDropping) {
            brick.userData.velocity += 0.025;
            brick.position.y -= brick.userData.velocity;
            if (brick.position.y <= brick.userData.targetY) {
              brick.position.y = brick.userData.targetY;
              brick.userData.isDropping = false;
              brick.userData.bounce = 0.15;
            }
          } else if (brick.userData.bounce > 0.005) {
            brick.position.y = brick.userData.targetY + Math.sin(Date.now() * 0.02) * brick.userData.bounce;
            brick.userData.bounce *= 0.9;
            if (brick.userData.bounce <= 0.005) {
              brick.position.y = brick.userData.targetY;
            }
          }
        });

        // Update camera
        camera.position.x = Math.sin(camAngle.theta) * Math.cos(camAngle.phi) * camDist;
        camera.position.y = Math.sin(camAngle.phi) * camDist;
        camera.position.z = Math.cos(camAngle.theta) * Math.cos(camAngle.phi) * camDist;
        camera.lookAt(0, 5, 0);

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const onResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);
    };

    if (window.THREE) {
      initScene();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initScene;
      document.head.appendChild(script);
    }
  }, []);

  // ============================================
  // CREATE BRICK STUD
  // ============================================
  const createStud = useCallback((THREE, material) => {
    const geo = new THREE.CylinderGeometry(STUD_UNIT * 0.3, STUD_UNIT * 0.3, STUD_UNIT * 0.17, 16);
    const stud = new THREE.Mesh(geo, material);
    stud.position.y = STUD_UNIT * 0.085;
    stud.castShadow = true;
    return stud;
  }, []);

  // ============================================
  // CREATE BRICK (2xN where N = 1,2,3,4)
  // ============================================
  const createBrick = useCallback((THREE, widthStuds, color) => {
    const group = new THREE.Group();
    const depthStuds = 2;

    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.4,
      metalness: 0.1
    });

    // Body
    const bodyW = widthStuds * STUD_UNIT - 0.04;
    const bodyD = depthStuds * STUD_UNIT - 0.04;
    const bodyGeo = new THREE.BoxGeometry(bodyW, BRICK_HEIGHT - 0.02, bodyD);
    const body = new THREE.Mesh(bodyGeo, mat);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Studs
    for (let x = 0; x < widthStuds; x++) {
      for (let z = 0; z < depthStuds; z++) {
        const stud = createStud(THREE, mat);
        stud.position.x = (x - (widthStuds - 1) / 2) * STUD_UNIT;
        stud.position.y = BRICK_HEIGHT / 2;
        stud.position.z = (z - (depthStuds - 1) / 2) * STUD_UNIT;
        group.add(stud);
      }
    }

    return group;
  }, [createStud]);

  // ============================================
  // CREATE BASEPLATE
  // ============================================
  const createBaseplate = useCallback((THREE, widthStuds, depthStuds) => {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: '#107C10',
      roughness: 0.5,
      metalness: 0.1
    });

    // Plate body
    const plateW = widthStuds * STUD_UNIT;
    const plateD = depthStuds * STUD_UNIT;
    const plateGeo = new THREE.BoxGeometry(plateW, PLATE_HEIGHT, plateD);
    const plate = new THREE.Mesh(plateGeo, mat);
    plate.receiveShadow = true;
    group.add(plate);

    // Studs
    for (let x = 0; x < widthStuds; x++) {
      for (let z = 0; z < depthStuds; z++) {
        const stud = createStud(THREE, mat);
        stud.position.x = (x - (widthStuds - 1) / 2) * STUD_UNIT;
        stud.position.y = PLATE_HEIGHT / 2;
        stud.position.z = (z - (depthStuds - 1) / 2) * STUD_UNIT;
        group.add(stud);
      }
    }

    return group;
  }, [createStud]);

  // ============================================
  // BRICK PLANNING ALGORITHM
  // Builds bottom-up, placing bricks to span
  // across seams in the row below
  // ============================================
  const planBricks = useCallback((grid, color) => {
    const height = grid.length;
    const width = grid[0].length;
    const bricks = [];
    
    // Track seam positions for each row (seam = gap between bricks)
    // seamsBelow[col] = true means there's a seam at position col in row below
    let seamsBelow = new Array(width + 1).fill(false);
    
    // Process rows from bottom to top
    for (let row = height - 1; row >= 0; row--) {
      const rowStr = grid[row];
      const used = new Array(width).fill(false);
      let rowBricks = [];
      
      // Find all runs of filled pixels in this row
      const runs = [];
      let runStart = -1;
      for (let col = 0; col <= width; col++) {
        if (col < width && rowStr[col] === '1') {
          if (runStart === -1) runStart = col;
        } else {
          if (runStart !== -1) {
            runs.push({ start: runStart, end: col - 1, length: col - runStart });
            runStart = -1;
          }
        }
      }
      
      // For each run, place bricks to cover seams from below
      for (const run of runs) {
        let col = run.start;
        
        while (col <= run.end) {
          const remaining = run.end - col + 1;
          
          if (remaining <= 0) break;
          
          // Find seams below within our remaining range
          const seamsInRange = [];
          for (let c = col + 1; c <= run.end && c < col + 4; c++) {
            if (seamsBelow[c]) seamsInRange.push(c);
          }
          
          let brickW = 0;
          
          if (seamsInRange.length > 0) {
            // There's a seam below - we want our brick to span across it
            // Find the rightmost seam we can cover
            const targetSeam = seamsInRange[seamsInRange.length - 1];
            const minWidthToSpan = targetSeam - col + 1;
            
            // Use smallest brick that spans the seam, but at least 2
            if (minWidthToSpan <= 2 && remaining >= 2) {
              brickW = 2;
            } else if (minWidthToSpan <= 3 && remaining >= 3) {
              brickW = 3;
            } else if (minWidthToSpan <= 4 && remaining >= 4) {
              brickW = 4;
            } else if (remaining >= 4) {
              brickW = 4;
            } else if (remaining >= 3) {
              brickW = 3;
            } else if (remaining >= 2) {
              brickW = 2;
            } else {
              brickW = 1;
            }
          } else {
            // No seam below in range - check if we should offset from row below
            // to create alternating pattern
            // Prefer: 4 > 3 > 2 > 1, but try to offset seams
            
            // Look ahead: where would our seam be with different brick sizes?
            // Choose size that doesn't create seam at same position as below
            
            let bestWidth = 0;
            for (const tryWidth of [4, 3, 2]) {
              if (remaining >= tryWidth) {
                const wouldSeamAt = col + tryWidth;
                // Check if this seam position conflicts with seam below
                if (!seamsBelow[wouldSeamAt]) {
                  bestWidth = tryWidth;
                  break;
                }
              }
            }
            
            if (bestWidth === 0) {
              // All options create aligned seams, just use largest
              if (remaining >= 4) brickW = 4;
              else if (remaining >= 3) brickW = 3;
              else if (remaining >= 2) brickW = 2;
              else brickW = 1;
            } else {
              brickW = bestWidth;
            }
          }
          
          // Place the brick
          for (let c = col; c < col + brickW && c <= run.end; c++) {
            used[c] = true;
          }
          
          rowBricks.push({
            row,
            col,
            width: brickW,
            color
          });
          
          col += brickW;
        }
      }
      
      // Post-process: consolidate adjacent bricks
      // 2x1 + 2x2 -> 2x3
      // 2x2 + 2x1 -> 2x3
      // 2x2 + 2x2 -> 2x4
      // 2x1 + 2x3 -> 2x4
      // 2x3 + 2x1 -> 2x4
      // 2x1 + 2x1 -> 2x2
      let consolidated = true;
      while (consolidated) {
        consolidated = false;
        const newRowBricks = [];
        let i = 0;
        
        while (i < rowBricks.length) {
          const current = rowBricks[i];
          const next = rowBricks[i + 1];
          
          // Check if current and next are adjacent (same run)
          if (next && current.col + current.width === next.col) {
            const combinedWidth = current.width + next.width;
            
            // Check if we should merge
            let shouldMerge = false;
            
            if (combinedWidth <= 4) {
              // 1+1=2, 1+2=3, 2+1=3, 1+3=4, 3+1=4, 2+2=4
              if (current.width === 1 || next.width === 1) {
                // Any combo with 2x1 should merge if result <= 4
                shouldMerge = true;
              } else if (current.width === 2 && next.width === 2) {
                // 2x2 + 2x2 -> 2x4
                shouldMerge = true;
              }
            }
            
            if (shouldMerge) {
              newRowBricks.push({
                row: current.row,
                col: current.col,
                width: combinedWidth,
                color: current.color
              });
              i += 2; // Skip both bricks
              consolidated = true;
              continue;
            }
          }
          
          newRowBricks.push(current);
          i++;
        }
        
        rowBricks = newRowBricks;
      }
      
      // Calculate seams for this row (to be used by row above)
      const newSeams = new Array(width + 1).fill(false);
      
      // Mark positions where there's no brick (gaps in the row)
      for (let col = 0; col < width; col++) {
        if (rowStr[col] !== '1') {
          newSeams[col] = true;
        }
      }
      
      // Mark seams between bricks
      let lastEnd = -1;
      for (const brick of rowBricks) {
        if (lastEnd >= 0 && brick.col > lastEnd) {
          // Gap between bricks
          for (let c = lastEnd; c < brick.col; c++) {
            newSeams[c] = true;
          }
        }
        // Mark the seam at the end of this brick
        newSeams[brick.col + brick.width] = true;
        lastEnd = brick.col + brick.width;
      }
      
      seamsBelow = newSeams;
      bricks.push(...rowBricks);
    }
    
    return bricks;
  }, []);

  // ============================================
  // BUILD WORD
  // ============================================
  const buildWord = useCallback(() => {
    if (!sceneRef.current) return;

    const { scene, THREE } = sceneRef.current;

    // Clear previous
    if (buildIntervalRef.current) clearInterval(buildIntervalRef.current);
    bricksRef.current.forEach(b => scene.remove(b));
    bricksRef.current = [];
    if (baseplateRef.current) scene.remove(baseplateRef.current);
    setProgress(0);

    const text = inputText.toUpperCase();
    const letterSpacing = 2;
    const totalPixelWidth = text.length * FONT_WIDTH + (text.length - 1) * letterSpacing;

    // Create baseplate
    const bpWidth = Math.max(totalPixelWidth + 8, 20);
    const bpDepth = 6;
    const baseplate = createBaseplate(THREE, bpWidth, bpDepth);
    baseplate.position.y = 0;
    scene.add(baseplate);
    baseplateRef.current = baseplate;

    // Plan all bricks
    const allBricks = [];
    const startX = -totalPixelWidth / 2;

    text.split('').forEach((char, charIdx) => {
      const pattern = FONT[char];
      if (!pattern) return;

      const color = colorMode === 'rainbow'
        ? COLORS[charIdx % COLORS.length]
        : colorMode === 'single'
          ? selectedColor
          : COLORS[Math.floor(Math.random() * COLORS.length)];

      const charBricks = planBricks(pattern, color);
      const charStartX = startX + charIdx * (FONT_WIDTH + letterSpacing);

      charBricks.forEach(brick => {
        const worldX = (charStartX + brick.col + brick.width / 2) * STUD_UNIT;
        const worldY = PLATE_HEIGHT / 2 + BRICK_HEIGHT / 2 + (FONT_HEIGHT - 1 - brick.row) * BRICK_HEIGHT;

        allBricks.push({
          ...brick,
          charIdx,
          worldX,
          worldY,
          // Store pixel range for overlap checking
          pixelStart: charStartX + brick.col,
          pixelEnd: charStartX + brick.col + brick.width - 1
        });
      });
    });

    // ============================================
    // CONNECTIVITY-AWARE ORDERING
    // A brick can be placed if:
    // 1. It's on baseplate (bottom row), OR
    // 2. It overlaps with at least one already-placed brick
    // ============================================
    const orderedBricks = [];
    const placed = new Set();
    const remaining = new Set(allBricks.map((_, i) => i));
    
    // Helper: check if two bricks overlap horizontally (adjacent counts as overlap for stability)
    const overlapsOrAdjacent = (b1, b2) => {
      // Same character only
      if (b1.charIdx !== b2.charIdx) return false;
      // Must be adjacent rows
      if (Math.abs(b1.row - b2.row) !== 1) return false;
      // Check horizontal overlap
      return b1.pixelStart <= b2.pixelEnd && b2.pixelStart <= b1.pixelEnd;
    };
    
    // Helper: check if brick can be placed (connected to structure)
    const canPlace = (brickIdx) => {
      const brick = allBricks[brickIdx];
      
      // Bottom row is always placeable (on baseplate)
      if (brick.row === FONT_HEIGHT - 1) return true;
      
      // Check if any placed brick overlaps (row above or below)
      for (const placedIdx of placed) {
        const placedBrick = allBricks[placedIdx];
        if (overlapsOrAdjacent(brick, placedBrick)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Main ordering loop - keep finding placeable bricks
    while (remaining.size > 0) {
      let foundOne = false;
      
      // Find the best placeable brick (prefer bottom-up, left-to-right)
      let bestIdx = null;
      let bestRow = -1;
      let bestCol = Infinity;
      
      for (const idx of remaining) {
        if (canPlace(idx)) {
          const brick = allBricks[idx];
          // Prefer higher row number (lower in space = bottom), then leftmost
          if (brick.row > bestRow || (brick.row === bestRow && brick.col < bestCol)) {
            bestRow = brick.row;
            bestCol = brick.col;
            bestIdx = idx;
          }
        }
      }
      
      if (bestIdx !== null) {
        orderedBricks.push(allBricks[bestIdx]);
        placed.add(bestIdx);
        remaining.delete(bestIdx);
        foundOne = true;
      }
      
      if (!foundOne) {
        // No placeable brick found - this means disconnected pieces
        // Force place remaining (structural issue in font)
        console.warn('Disconnected bricks found:', remaining.size);
        for (const idx of remaining) {
          orderedBricks.push(allBricks[idx]);
        }
        break;
      }
    }

    setTotalBricks(orderedBricks.length);

    if (instantMode) {
      // Place all instantly
      orderedBricks.forEach(bd => {
        const brick = createBrick(THREE, bd.width, bd.color);
        brick.position.set(bd.worldX, bd.worldY, 0);
        brick.userData = { targetY: bd.worldY, isDropping: false, bounce: 0 };
        scene.add(brick);
        bricksRef.current.push(brick);
      });
      setProgress(orderedBricks.length);
    } else {
      // Animate
      setIsBuilding(true);
      let idx = 0;
      buildIntervalRef.current = setInterval(() => {
        if (idx >= orderedBricks.length) {
          clearInterval(buildIntervalRef.current);
          setIsBuilding(false);
          return;
        }

        const bd = orderedBricks[idx];
        const brick = createBrick(THREE, bd.width, bd.color);
        brick.position.set(bd.worldX, 30, 0);
        brick.userData = { targetY: bd.worldY, isDropping: true, velocity: 0, bounce: 0 };
        scene.add(brick);
        bricksRef.current.push(brick);

        idx++;
        setProgress(idx);
      }, 200 - speed * 1.5);
    }
  }, [inputText, colorMode, selectedColor, speed, instantMode, createBrick, createBaseplate, planBricks]);

  // Initial build
  useEffect(() => {
    if (sceneRef.current) {
      const timer = setTimeout(buildWord, 500);
      return () => clearTimeout(timer);
    }
  }, [sceneRef.current]);

  // ============================================
  // UI
  // ============================================
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-4">🧱 Brick Text Builder</h1>

        {/* Input row */}
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 20).toUpperCase())}
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none uppercase w-48"
            maxLength={20}
            onKeyDown={(e) => e.key === 'Enter' && !isBuilding && buildWord()}
          />

          <button
            onClick={buildWord}
            disabled={isBuilding}
            className={`px-5 py-2 rounded font-bold ${isBuilding ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'} text-white`}
          >
            {isBuilding ? '🔨 Building...' : '🔨 Build'}
          </button>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={instantMode}
              onChange={(e) => setInstantMode(e.target.checked)}
              className="w-4 h-4"
            />
            Instant
          </label>

          <select
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="rainbow">🌈 Rainbow</option>
            <option value="single">🎨 Single</option>
            <option value="random">🎲 Random</option>
          </select>

          {colorMode === 'single' && (
            <div className="flex gap-1">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-7 h-7 rounded ${selectedColor === c ? 'ring-2 ring-white' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-gray-400 text-sm">Presets:</span>
          {[
            ['A-J', 'ABCDEFGHIJ'],
            ['K-T', 'KLMNOPQRST'],
            ['U-Z', 'UVWXYZ'],
            ['0-9', '0123456789'],
            ['HELLO', 'HELLO'],
            ['BRICK', 'BRICK']
          ].map(([label, text]) => (
            <button
              key={label}
              onClick={() => { setInputText(text); }}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Speed & progress */}
        <div className="flex flex-wrap gap-4 items-center">
          {!instantMode && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Speed:</span>
              <input
                type="range"
                min="10"
                max="120"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-24"
              />
            </div>
          )}

          {isBuilding && (
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-700 rounded overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${(progress / totalBricks) * 100}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm">{progress}/{totalBricks}</span>
            </div>
          )}

          <span className="text-gray-500 text-sm">
            {totalBricks} bricks • Drag to rotate • Scroll to zoom
          </span>
          <span className="text-gray-600 text-xs ml-4">
            Fan project • Not affiliated with any brick manufacturer
          </span>
        </div>
      </div>

      <div ref={containerRef} className="flex-1" />
    </div>
  );
}
