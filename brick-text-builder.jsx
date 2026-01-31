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
  '#ff0000', // bright red
  '#0057a8', // bright blue
  '#00852b', // bright green
  '#ffd700', // bright yellow
  '#ff7800', // bright orange
  '#a5499b', // bright purple / magenta
  '#00bcd4', // bright cyan / medium azure
  '#ffffff', // white
  '#1b1b1b', // black
];

const SEASONAL_COLORS = {
  spring: [
    '#ff69b4', // pink (cherry blossom)
    '#ff91a4', // salmon pink
    '#98fb98', // pale green
    '#00c853', // vivid green
    '#ffeb3b', // yellow
    '#e040fb', // light purple (lilac)
    '#ffffff', // white
  ],
  summer: [
    '#ff1744', // vivid red
    '#ff9100', // orange
    '#ffea00', // bright yellow
    '#00c853', // green
    '#00b0ff', // sky blue
    '#2979ff', // ocean blue
    '#00e5ff', // turquoise
  ],
  fall: [
    '#d84315', // burnt orange
    '#bf360c', // rust
    '#f9a825', // golden yellow
    '#ff6f00', // amber
    '#6d4c41', // brown
    '#8d6e63', // tan
    '#c62828', // dark red
  ],
  winter: [
    '#e3f2fd', // ice blue
    '#90caf9', // light blue
    '#42a5f5', // medium blue
    '#1565c0', // dark blue
    '#ffffff', // snow white
    '#b0bec5', // silver grey
    '#ce93d8', // frost purple
  ],
};

// ============================================
// BRICK DIMENSIONS (relative units)
// ============================================
const STUD_UNIT = 0.8;
const BRICK_HEIGHT = 0.96;
const PLATE_HEIGHT = 0.32;
const PIECE_PLATE_HEIGHT = BRICK_HEIGHT / 3; // height of a single plate piece

// ============================================
// MAIN COMPONENT
// ============================================
function BrickTextBuilder() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const bricksRef = useRef([]);
  const baseplateRef = useRef(null);
  const buildIntervalRef = useRef(null);
  const minifigRef = useRef(null);
  const minifigStateRef = useRef({
    phase: 'idle', // 'idle', 'walking', 'turning', 'waving'
    targetX: 0,
    startX: 0,
    walkStartTime: 0,
    turnStartTime: 0,
    waveStartTime: 0
  });

  const [inputText, setInputText] = useState('ABCDEFGHIJ');
  const [colorMode, setColorMode] = useState('rainbow');
  const [selectedColor, setSelectedColor] = useState('#e53935');
  const [brickSize, setBrickSize] = useState('all');
  const [pieceType, setPieceType] = useState('brick');
  const [speed, setSpeed] = useState(80);
  const [instantMode, setInstantMode] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalBricks, setTotalBricks] = useState(0);
  const [partsList, setPartsList] = useState([]);
  const [expandedShapes, setExpandedShapes] = useState(new Set());

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
      let isPanning = false;
      let prevMouse = { x: 0, y: 0 };
      let camAngle = { theta: 0, phi: 0 };
      let camDist = 50;
      let camTarget = { x: 0, y: 6, z: 0 };

      const onMouseDown = (e) => {
        prevMouse = { x: e.clientX, y: e.clientY };
        // Right click or middle click or shift+left click = pan
        if (e.button === 2 || e.button === 1 || e.shiftKey) {
          isPanning = true;
          e.preventDefault();
        } else {
          isDragging = true;
        }
      };

      const onMouseMove = (e) => {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;

        if (isPanning) {
          // Pan the camera target
          const panSpeed = 0.05 * (camDist / 50); // Scale pan speed with zoom level
          camTarget.x -= deltaX * panSpeed;
          camTarget.y += deltaY * panSpeed;
          // Clamp target to reasonable bounds
          camTarget.x = Math.max(-50, Math.min(50, camTarget.x));
          camTarget.y = Math.max(-10, Math.min(30, camTarget.y));
        } else if (isDragging) {
          // Rotate camera
          camAngle.theta -= deltaX * 0.01;
          camAngle.phi += deltaY * 0.01;
          camAngle.phi = Math.max(-Math.PI / 4, Math.min(Math.PI / 2 - 0.1, camAngle.phi));
        }

        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
        isPanning = false;
      };

      const onWheel = (e) => {
        camDist = Math.max(10, Math.min(200, camDist + e.deltaY * 0.05));
      };

      const onContextMenu = (e) => {
        e.preventDefault(); // Prevent right-click menu
      };

      const onDblClick = () => {
        // Reset camera to default position
        camAngle = { theta: 0, phi: 0 };
        camDist = 50;
        camTarget = { x: 0, y: 6, z: 0 };
      };

      renderer.domElement.addEventListener('mousedown', onMouseDown);
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      renderer.domElement.addEventListener('mouseup', onMouseUp);
      renderer.domElement.addEventListener('mouseleave', onMouseUp);
      renderer.domElement.addEventListener('wheel', onWheel);
      renderer.domElement.addEventListener('contextmenu', onContextMenu);
      renderer.domElement.addEventListener('dblclick', onDblClick);

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

        // Update minifigure animation
        const minifig = minifigRef.current;
        const state = minifigStateRef.current;
        if (minifig && state.phase !== 'idle') {
          const { leftArmPivot, rightArmPivot, leftLegPivot, rightLegPivot } = minifig.userData;
          const now = Date.now();

          if (state.phase === 'walking') {
            const walkDuration = 3000; // 3 seconds to walk
            const elapsed = now - state.walkStartTime;
            const progress = Math.min(elapsed / walkDuration, 1);

            // Move position
            minifig.position.x = state.startX + (state.targetX - state.startX) * progress;

            // Walking animation (swing arms and legs)
            const walkCycle = Math.sin(elapsed * 0.01) * 0.5;
            leftLegPivot.rotation.x = walkCycle;
            rightLegPivot.rotation.x = -walkCycle;
            leftArmPivot.rotation.x = -walkCycle * 0.7;
            rightArmPivot.rotation.x = walkCycle * 0.7;

            // Check if reached destination
            if (progress >= 1) {
              // Reset to neutral pose
              leftLegPivot.rotation.x = 0;
              rightLegPivot.rotation.x = 0;
              leftArmPivot.rotation.x = 0;
              rightArmPivot.rotation.x = 0;
              // Start turning to face front
              state.phase = 'turning';
              state.turnStartTime = now;
            }
          } else if (state.phase === 'turning') {
            const turnDuration = 300; // 0.3 seconds for quick turn
            const elapsed = now - state.turnStartTime;
            const progress = Math.min(elapsed / turnDuration, 1);

            // Simple 90-degree turn: from facing right to facing front (camera)
            // Use easing for smoother motion
            const eased = 1 - Math.pow(1 - progress, 2); // ease-out
            minifig.rotation.y = Math.PI / 2 - (Math.PI / 2) * eased;

            if (progress >= 1) {
              minifig.rotation.y = 0; // Face front
              state.phase = 'waving';
              state.waveStartTime = now;
            }
          } else if (state.phase === 'waving') {
            const waveDuration = 2500; // 2.5 seconds of waving
            const elapsed = now - state.waveStartTime;

            // Raise right arm and wave
            rightArmPivot.rotation.x = -Math.PI * 0.6; // Arm up
            rightArmPivot.rotation.z = Math.sin(elapsed * 0.012) * 0.4; // Wave back and forth

            if (elapsed >= waveDuration) {
              // Done waving, return to idle
              rightArmPivot.rotation.x = 0;
              rightArmPivot.rotation.z = 0;
              state.phase = 'idle';
            }
          }
        }

        // Update camera (position relative to pan target)
        camera.position.x = camTarget.x + Math.sin(camAngle.theta) * Math.cos(camAngle.phi) * camDist;
        camera.position.y = camTarget.y + Math.sin(camAngle.phi) * camDist;
        camera.position.z = camTarget.z + Math.cos(camAngle.theta) * Math.cos(camAngle.phi) * camDist;
        camera.lookAt(camTarget.x, camTarget.y, camTarget.z);

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
  // CREATE PLATE PIECE (1/3 height of a brick)
  // ============================================
  const createPlate = useCallback((THREE, widthStuds, color) => {
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
    const bodyGeo = new THREE.BoxGeometry(bodyW, PIECE_PLATE_HEIGHT - 0.02, bodyD);
    const body = new THREE.Mesh(bodyGeo, mat);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Studs
    for (let x = 0; x < widthStuds; x++) {
      for (let z = 0; z < depthStuds; z++) {
        const stud = createStud(THREE, mat);
        stud.position.x = (x - (widthStuds - 1) / 2) * STUD_UNIT;
        stud.position.y = PIECE_PLATE_HEIGHT / 2;
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
  // CREATE MINIFIGURE
  // Real LEGO minifigure proportions: ~4 studs tall
  // ============================================
  const createMinifigure = useCallback((THREE) => {
    const group = new THREE.Group();
    // Scale to match real LEGO proportions (4 studs tall = 4 * STUD_UNIT)
    const s = STUD_UNIT; // base unit

    // Colors
    const skinMat = new THREE.MeshStandardMaterial({ color: '#ffcc00', roughness: 0.4 });
    const torsoMat = new THREE.MeshStandardMaterial({ color: '#e53935', roughness: 0.4 });
    const legMat = new THREE.MeshStandardMaterial({ color: '#1e88e5', roughness: 0.4 });
    const handMat = new THREE.MeshStandardMaterial({ color: '#ffcc00', roughness: 0.4 });
    const hairMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.6 });
    const glassesMat = new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3 });
    const lensMat = new THREE.MeshStandardMaterial({ color: '#88ccff', roughness: 0.1, transparent: true, opacity: 0.4 });

    // Head (cylinder with stud on top) - about 1.2 studs diameter, 1 stud tall
    const headGroup = new THREE.Group();
    const headGeo = new THREE.CylinderGeometry(0.6 * s, 0.6 * s, 0.8 * s, 16);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.castShadow = true;
    headGroup.add(head);

    // Head stud
    const headStudGeo = new THREE.CylinderGeometry(0.2 * s, 0.2 * s, 0.15 * s, 16);
    const headStud = new THREE.Mesh(headStudGeo, skinMat);
    headStud.position.y = 0.475 * s;
    headStud.castShadow = true;
    headGroup.add(headStud);

    // Black hair (bowl cut style for Asian male)
    const hairGeo = new THREE.SphereGeometry(0.62 * s, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 0.15 * s;
    hair.castShadow = true;
    headGroup.add(hair);

    // Hair front fringe
    const fringeGeo = new THREE.BoxGeometry(0.9 * s, 0.15 * s, 0.25 * s);
    const fringe = new THREE.Mesh(fringeGeo, hairMat);
    fringe.position.set(0, 0.3 * s, 0.45 * s);
    headGroup.add(fringe);

    // Eyes (slightly narrower for Asian features)
    const eyeMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a' });
    const eyeGeo = new THREE.BoxGeometry(0.1 * s, 0.05 * s, 0.02 * s);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.18 * s, 0.05 * s, 0.6 * s);
    headGroup.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.18 * s, 0.05 * s, 0.6 * s);
    headGroup.add(rightEye);

    // Nose (small cylinder pointing forward)
    const noseGeo = new THREE.CylinderGeometry(0.04 * s, 0.06 * s, 0.1 * s, 8);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.02 * s, 0.6 * s);
    nose.rotation.x = Math.PI / 2;
    headGroup.add(nose);

    // Mouth (simple curved line using a flat box)
    const mouthGeo = new THREE.BoxGeometry(0.2 * s, 0.03 * s, 0.02 * s);
    const mouth = new THREE.Mesh(mouthGeo, eyeMat);
    mouth.position.set(0, -0.15 * s, 0.58 * s);
    headGroup.add(mouth);

    // Simple rectangular glasses
    const glassesGroup = new THREE.Group();

    // Left lens (rectangular frame with lens)
    const lensW = 0.24 * s;
    const lensH = 0.16 * s;
    const frameThick = 0.025 * s;

    // Left frame outline (using EdgesGeometry-like approach with boxes)
    const leftFrameOuter = new THREE.BoxGeometry(lensW, lensH, frameThick);
    const leftFrame = new THREE.Mesh(leftFrameOuter, glassesMat);
    leftFrame.position.set(-0.2 * s, 0.05 * s, 0.62 * s);
    glassesGroup.add(leftFrame);

    // Left lens (slightly smaller, inset)
    const leftLensGeo = new THREE.BoxGeometry(lensW - frameThick * 2, lensH - frameThick * 2, frameThick * 0.5);
    const leftLens = new THREE.Mesh(leftLensGeo, lensMat);
    leftLens.position.set(-0.2 * s, 0.05 * s, 0.625 * s);
    glassesGroup.add(leftLens);

    // Right frame
    const rightFrame = new THREE.Mesh(leftFrameOuter.clone(), glassesMat);
    rightFrame.position.set(0.2 * s, 0.05 * s, 0.62 * s);
    glassesGroup.add(rightFrame);

    // Right lens
    const rightLens = new THREE.Mesh(leftLensGeo.clone(), lensMat);
    rightLens.position.set(0.2 * s, 0.05 * s, 0.625 * s);
    glassesGroup.add(rightLens);

    // Bridge connecting the two lenses
    const bridgeGeo = new THREE.BoxGeometry(0.16 * s, frameThick, frameThick);
    const bridge = new THREE.Mesh(bridgeGeo, glassesMat);
    bridge.position.set(0, 0.05 * s, 0.62 * s);
    glassesGroup.add(bridge);

    // Temple arms (sides going to ears)
    const templeGeo = new THREE.BoxGeometry(0.35 * s, frameThick, frameThick);
    const leftTemple = new THREE.Mesh(templeGeo, glassesMat);
    leftTemple.position.set(-0.48 * s, 0.05 * s, 0.45 * s);
    glassesGroup.add(leftTemple);
    const rightTemple = new THREE.Mesh(templeGeo, glassesMat);
    rightTemple.position.set(0.48 * s, 0.05 * s, 0.45 * s);
    glassesGroup.add(rightTemple);

    headGroup.add(glassesGroup);

    headGroup.position.y = 2.35 * s;
    group.add(headGroup);

    // Torso - about 1.25 studs wide, 1.2 studs tall
    const torsoGeo = new THREE.BoxGeometry(1.0 * s, 0.95 * s, 0.6 * s);
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 1.5 * s;
    torso.castShadow = true;
    group.add(torso);

    // Left arm pivot (at shoulder)
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.65 * s, 1.85 * s, 0);
    const leftArmGeo = new THREE.BoxGeometry(0.3 * s, 0.8 * s, 0.3 * s);
    const leftArm = new THREE.Mesh(leftArmGeo, skinMat);
    leftArm.position.y = -0.4 * s;
    leftArm.castShadow = true;
    leftArmPivot.add(leftArm);
    // Left hand
    const leftHandGeo = new THREE.CylinderGeometry(0.1 * s, 0.1 * s, 0.2 * s, 8);
    const leftHand = new THREE.Mesh(leftHandGeo, handMat);
    leftHand.position.y = -0.9 * s;
    leftHand.rotation.x = Math.PI / 2;
    leftArmPivot.add(leftHand);
    group.add(leftArmPivot);

    // Right arm pivot (at shoulder)
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.65 * s, 1.85 * s, 0);
    const rightArmGeo = new THREE.BoxGeometry(0.3 * s, 0.8 * s, 0.3 * s);
    const rightArm = new THREE.Mesh(rightArmGeo, skinMat);
    rightArm.position.y = -0.4 * s;
    rightArm.castShadow = true;
    rightArmPivot.add(rightArm);
    // Right hand
    const rightHandGeo = new THREE.CylinderGeometry(0.1 * s, 0.1 * s, 0.2 * s, 8);
    const rightHand = new THREE.Mesh(rightHandGeo, handMat);
    rightHand.position.y = -0.9 * s;
    rightHand.rotation.x = Math.PI / 2;
    rightArmPivot.add(rightHand);
    group.add(rightArmPivot);

    // Left leg pivot (at hip) - leg bottom should be at y=0
    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.25 * s, 1.0 * s, 0);
    const leftLegGeo = new THREE.BoxGeometry(0.4 * s, 1.0 * s, 0.45 * s);
    const leftLeg = new THREE.Mesh(leftLegGeo, legMat);
    leftLeg.position.y = -0.5 * s;
    leftLeg.castShadow = true;
    leftLegPivot.add(leftLeg);
    group.add(leftLegPivot);

    // Right leg pivot (at hip)
    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.25 * s, 1.0 * s, 0);
    const rightLegGeo = new THREE.BoxGeometry(0.4 * s, 1.0 * s, 0.45 * s);
    const rightLeg = new THREE.Mesh(rightLegGeo, legMat);
    rightLeg.position.y = -0.5 * s;
    rightLeg.castShadow = true;
    rightLegPivot.add(rightLeg);
    group.add(rightLegPivot);

    // Store references for animation
    group.userData = {
      leftArmPivot,
      rightArmPivot,
      leftLegPivot,
      rightLegPivot,
      headGroup
    };

    return group;
  }, []);

  // ============================================
  // BRICK PLANNING ALGORITHM
  // Builds bottom-up, placing bricks to span
  // across seams in the row below
  // ============================================
  const planBricks = useCallback((grid, color, maxWidth = 4) => {
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
          for (let c = col + 1; c <= run.end && c < col + maxWidth; c++) {
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
            } else if (minWidthToSpan <= 3 && remaining >= 3 && maxWidth >= 3) {
              brickW = 3;
            } else if (minWidthToSpan <= 4 && remaining >= 4 && maxWidth >= 4) {
              brickW = 4;
            } else if (remaining >= 4 && maxWidth >= 4) {
              brickW = 4;
            } else if (remaining >= 3 && maxWidth >= 3) {
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
            for (const tryWidth of [4, 3, 2].filter(w => w <= maxWidth)) {
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
              if (remaining >= 4 && maxWidth >= 4) brickW = 4;
              else if (remaining >= 3 && maxWidth >= 3) brickW = 3;
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
            
            if (combinedWidth <= maxWidth) {
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

    // ============================================
    // STRUCTURAL STABILITY POST-PROCESS
    // Fix rows where all seams align with the row below
    // e.g. |XX|XX|XX|XX| over |XX|XX|XX|XX| → |X|XX|XX|XX|X| over |XX|XX|XX|XX|
    // ============================================
    const byRow = {};
    for (const b of bricks) {
      if (!byRow[b.row]) byRow[b.row] = [];
      byRow[b.row].push(b);
    }
    for (const r in byRow) {
      byRow[r].sort((a, b) => a.col - b.col);
    }

    // Process bottom-up so fixes propagate correctly
    for (let row = height - 2; row >= 0; row--) {
      if (!byRow[row] || !byRow[row + 1]) continue;

      // Find internal seams for the row below (boundaries between adjacent bricks)
      const belowBricks = byRow[row + 1];
      const belowSeams = new Set();
      for (let i = 0; i < belowBricks.length - 1; i++) {
        const curr = belowBricks[i];
        const next = belowBricks[i + 1];
        if (curr.col + curr.width === next.col) {
          belowSeams.add(curr.col + curr.width);
        }
      }
      if (belowSeams.size === 0) continue;

      // Find continuous runs of bricks in the current row
      const currentBricks = byRow[row];
      const runs = [];
      let runStartIdx = 0;
      for (let i = 1; i <= currentBricks.length; i++) {
        if (i === currentBricks.length ||
            currentBricks[i].col !== currentBricks[i - 1].col + currentBricks[i - 1].width) {
          runs.push(currentBricks.slice(runStartIdx, i));
          runStartIdx = i;
        }
      }

      for (const run of runs) {
        if (run.length < 2) continue;

        // Check if any internal seam in this run aligns with a seam below
        let hasAligned = false;
        for (let i = 0; i < run.length - 1; i++) {
          if (belowSeams.has(run[i].col + run[i].width)) {
            hasAligned = true;
            break;
          }
        }
        if (!hasAligned) continue;

        // Re-tile this run with a 1-stud offset: [1, mW, mW, ..., remainder]
        const runColStart = run[0].col;
        const runColEnd = run[run.length - 1].col + run[run.length - 1].width;
        const runWidth = runColEnd - runColStart;
        const c = run[0].color;

        const newWidths = [];
        let rem = runWidth;
        newWidths.push(1);
        rem -= 1;
        while (rem > 0) {
          const w = Math.min(maxWidth, rem);
          newWidths.push(w);
          rem -= w;
        }

        // Verify the new layout actually fixes the alignment
        let newSeamPos = runColStart;
        let stillAligned = false;
        for (let i = 0; i < newWidths.length - 1; i++) {
          newSeamPos += newWidths[i];
          if (belowSeams.has(newSeamPos)) {
            stillAligned = true;
            break;
          }
        }
        if (stillAligned) continue;

        // Remove old bricks from the main array
        const oldSet = new Set(run);
        for (let i = bricks.length - 1; i >= 0; i--) {
          if (oldSet.has(bricks[i])) {
            bricks.splice(i, 1);
          }
        }

        // Add new bricks
        let pos = runColStart;
        const newRunBricks = [];
        for (const w of newWidths) {
          const newBrick = { row, col: pos, width: w, color: c };
          bricks.push(newBrick);
          newRunBricks.push(newBrick);
          pos += w;
        }

        // Update byRow so subsequent row checks see the fixed layout
        byRow[row] = byRow[row].filter(b => !oldSet.has(b)).concat(newRunBricks);
        byRow[row].sort((a, b) => a.col - b.col);
      }
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
    if (minifigRef.current) scene.remove(minifigRef.current);
    minifigStateRef.current = { phase: 'idle', targetX: 0, startX: 0, walkStartTime: 0, turnStartTime: 0, waveStartTime: 0 };
    setProgress(0);

    const text = inputText.toUpperCase();
    const letterSpacing = 2;
    const totalPixelWidth = text.length * FONT_WIDTH + (text.length - 1) * letterSpacing;
    const startX = -totalPixelWidth / 2;

    // Create baseplate
    const bpWidth = Math.max(totalPixelWidth + 8, 20);
    const bpDepth = 6;
    const baseplate = createBaseplate(THREE, bpWidth, bpDepth);
    baseplate.position.y = 0;
    scene.add(baseplate);
    baseplateRef.current = baseplate;

    // Create minifigure only if text contains "MINGJER"
    const showMinifig = text.includes('MINGJER');
    if (showMinifig) {
      const minifig = createMinifigure(THREE);
      const minifigStartX = -bpWidth * STUD_UNIT / 2 - 3;
      // Calculate position after the "R" in "MINGJER"
      const mingjerStart = text.indexOf('MINGJER');
      const rCharIdx = mingjerStart + 6; // R is the 7th character (index 6) of MINGJER
      const rEndX = (startX + rCharIdx * (FONT_WIDTH + letterSpacing) + FONT_WIDTH) * STUD_UNIT;
      const minifigTargetX = rEndX + 1; // Stop just past the R
      minifig.position.set(minifigStartX, PLATE_HEIGHT / 2, bpDepth * STUD_UNIT / 2 - 1); // Walk in front of text, within plate
      minifig.rotation.y = Math.PI / 2; // Face right (walking direction)
      scene.add(minifig);
      minifigRef.current = minifig;
      minifigStateRef.current.startX = minifigStartX;
      minifigStateRef.current.targetX = minifigTargetX;
    }

    // Plan all bricks
    const palette = SEASONAL_COLORS[colorMode] || COLORS;
    const allBricks = [];

    // In plate mode, expand each font row into 3 rows so planBricks
    // plans at plate granularity with natural seam interlocking
    const usePlateGrid = pieceType === 'plate';
    const gridHeight = usePlateGrid ? FONT_HEIGHT * 3 : FONT_HEIGHT;
    const pieceHeight = usePlateGrid ? PIECE_PLATE_HEIGHT : BRICK_HEIGHT;

    text.split('').forEach((char, charIdx) => {
      let pattern = FONT[char];
      if (!pattern) return;

      if (usePlateGrid) {
        const expanded = [];
        for (const row of pattern) {
          expanded.push(row, row, row);
        }
        pattern = expanded;
      }

      const color = colorMode === 'rainbow'
        ? COLORS[charIdx % COLORS.length]
        : colorMode === 'single'
          ? selectedColor
          : '#ff0000'; // placeholder for random/seasonal, will be reassigned below

      const maxWidth = brickSize === 'small' ? 2 : 4;
      const charBricks = planBricks(pattern, color, maxWidth);
      const charStartX = startX + charIdx * (FONT_WIDTH + letterSpacing);

      charBricks.forEach(brick => {
        const worldX = (charStartX + brick.col + brick.width / 2) * STUD_UNIT;
        const worldY = PLATE_HEIGHT / 2 + pieceHeight / 2 + (gridHeight - 1 - brick.row) * pieceHeight;

        allBricks.push({
          ...brick,
          type: usePlateGrid ? 'plate' : 'brick',
          charIdx,
          worldX,
          worldY,
          // Store pixel range for overlap checking
          pixelStart: charStartX + brick.col,
          pixelEnd: charStartX + brick.col + brick.width - 1
        });
      });
    });

    // Random/seasonal mode: greedy graph coloring so no adjacent bricks share a color
    if (colorMode === 'random' || SEASONAL_COLORS[colorMode]) {
      // Two bricks are adjacent if they touch vertically (adjacent rows, overlapping columns)
      // or horizontally (same row, one ends where the other begins)
      const isAdjacent = (a, b) => {
        if (a.charIdx !== b.charIdx) return false;
        const rowDiff = Math.abs(a.row - b.row);
        if (rowDiff === 0) {
          // Same row: adjacent if one brick ends exactly where the other starts
          return a.pixelEnd + 1 === b.pixelStart || b.pixelEnd + 1 === a.pixelStart;
        }
        if (rowDiff === 1) {
          // Adjacent rows: overlapping columns
          return a.pixelStart <= b.pixelEnd && b.pixelStart <= a.pixelEnd;
        }
        return false;
      };

      // Build adjacency lists
      const adj = allBricks.map(() => []);
      for (let i = 0; i < allBricks.length; i++) {
        for (let j = i + 1; j < allBricks.length; j++) {
          if (isAdjacent(allBricks[i], allBricks[j])) {
            adj[i].push(j);
            adj[j].push(i);
          }
        }
      }

      // Greedy coloring with randomized color selection
      const colorAssignment = new Array(allBricks.length).fill(-1);
      for (let i = 0; i < allBricks.length; i++) {
        const neighborColors = new Set();
        for (const n of adj[i]) {
          if (colorAssignment[n] !== -1) neighborColors.add(colorAssignment[n]);
        }
        // Collect all available colors, then pick one at random
        const available = [];
        for (let c = 0; c < palette.length; c++) {
          if (!neighborColors.has(c)) available.push(c);
        }
        colorAssignment[i] = available[Math.floor(Math.random() * available.length)];
      }

      // Assign actual colors from the active palette
      for (let i = 0; i < allBricks.length; i++) {
        allBricks[i].color = palette[colorAssignment[i] % palette.length];
      }
    }

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
      if (brick.row === gridHeight - 1) return true;
      
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

    // Expand bricks into plates for mixture mode (plate mode already planned at plate level)
    let finalBricks;
    if (pieceType === 'plate') {
      // Already planned at plate granularity with interlocking — use as-is
      finalBricks = orderedBricks;
    } else if (pieceType === 'mixture') {
      const expanded = [];
      for (const brick of orderedBricks) {
        if (Math.random() < 0.5) {
          // Replace one brick with 3 stacked plates
          // In random/seasonal modes, give each plate a different color
          const useRandomPlateColors = colorMode === 'random' || SEASONAL_COLORS[colorMode];
          let prevColor = brick.color;
          for (let p = 0; p < 3; p++) {
            let plateColor = brick.color;
            if (useRandomPlateColors) {
              const available = palette.filter(c => c !== prevColor);
              plateColor = available[Math.floor(Math.random() * available.length)];
              prevColor = plateColor;
            }
            expanded.push({
              ...brick,
              type: 'plate',
              color: plateColor,
              worldY: brick.worldY + (p - 1) * PIECE_PLATE_HEIGHT,
            });
          }
        } else {
          expanded.push({ ...brick, type: 'brick' });
        }
      }
      finalBricks = expanded;
    } else {
      finalBricks = orderedBricks;
    }

    setTotalBricks(finalBricks.length);

    // Count pieces by type, width, and color
    const partsMap = {};
    finalBricks.forEach(brick => {
      const key = `${brick.type || 'brick'}-${brick.width}-${brick.color}`;
      if (!partsMap[key]) {
        partsMap[key] = { type: brick.type || 'brick', width: brick.width, color: brick.color, count: 0 };
      }
      partsMap[key].count++;
    });
    // Sort: bricks before plates, then by width descending, then by color
    const parts = Object.values(partsMap).sort((a, b) => {
      if (a.type !== b.type) return a.type === 'brick' ? -1 : 1;
      if (a.width !== b.width) return b.width - a.width;
      return a.color.localeCompare(b.color);
    });
    setPartsList(parts);

    // Function to start minifigure walking (only if minifigure exists)
    const startMinifigWalk = () => {
      if (minifigRef.current) {
        minifigStateRef.current.phase = 'walking';
        minifigStateRef.current.walkStartTime = Date.now();
      }
    };

    if (instantMode) {
      // Place all instantly
      finalBricks.forEach(bd => {
        const piece = bd.type === 'plate'
          ? createPlate(THREE, bd.width, bd.color)
          : createBrick(THREE, bd.width, bd.color);
        piece.position.set(bd.worldX, bd.worldY, 0);
        piece.userData = { targetY: bd.worldY, isDropping: false, bounce: 0 };
        scene.add(piece);
        bricksRef.current.push(piece);
      });
      setProgress(finalBricks.length);
      // Start minifigure walking immediately
      setTimeout(startMinifigWalk, 300);
    } else {
      // Animate
      setIsBuilding(true);
      let idx = 0;
      buildIntervalRef.current = setInterval(() => {
        if (idx >= finalBricks.length) {
          clearInterval(buildIntervalRef.current);
          setIsBuilding(false);
          // Start minifigure walking after build completes
          setTimeout(startMinifigWalk, 500);
          return;
        }

        const bd = finalBricks[idx];
        const piece = bd.type === 'plate'
          ? createPlate(THREE, bd.width, bd.color)
          : createBrick(THREE, bd.width, bd.color);
        piece.position.set(bd.worldX, 30, 0);
        piece.userData = { targetY: bd.worldY, isDropping: true, velocity: 0, bounce: 0 };
        scene.add(piece);
        bricksRef.current.push(piece);

        idx++;
        setProgress(idx);
      }, 200 - speed * 1.5);
    }
  }, [inputText, colorMode, selectedColor, brickSize, pieceType, speed, instantMode, createBrick, createPlate, createBaseplate, createMinifigure, planBricks]);

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
            <option value="spring">🌸 Spring</option>
            <option value="summer">☀️ Summer</option>
            <option value="fall">🍂 Fall</option>
            <option value="winter">❄️ Winter</option>
          </select>

          <select
            value={brickSize}
            onChange={(e) => setBrickSize(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="all">🧱 All Bricks</option>
            <option value="small">🧱 Small Only (2×1, 2×2)</option>
          </select>

          <select
            value={pieceType}
            onChange={(e) => setPieceType(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="brick">🧱 Bricks Only</option>
            <option value="plate">📏 Plates Only</option>
            <option value="mixture">🔀 Mixture</option>
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
            ['BRICK', 'BRICK'],
            ['MINGJER', 'MINGJER']
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
            Drag to rotate • Right-drag/Shift-drag to pan • Scroll to zoom • Double-click to reset
          </span>
        </div>

        {/* Parts inventory */}
        <div className="mt-3 p-3 bg-gray-700 rounded">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-white font-semibold">Parts List:</span>
            <span className="text-white font-semibold">
              Total: <span className="text-yellow-400">{totalBricks}</span> pieces
            </span>
            <span className="text-gray-600 text-xs">
              Fan project • Not affiliated with any brick manufacturer
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(() => {
              // Group parts by shape (type + width)
              const shapeMap = {};
              partsList.forEach(part => {
                const shapeKey = `${part.type}-${part.width}`;
                if (!shapeMap[shapeKey]) {
                  shapeMap[shapeKey] = { type: part.type, width: part.width, total: 0, colors: [] };
                }
                shapeMap[shapeKey].total += part.count;
                shapeMap[shapeKey].colors.push({ color: part.color, count: part.count });
              });
              const shapes = Object.entries(shapeMap).sort((a, b) => {
                const [, sa] = a, [, sb] = b;
                if (sa.type !== sb.type) return sa.type === 'brick' ? -1 : 1;
                return sb.width - sa.width;
              });
              return shapes.map(([shapeKey, shape]) => {
                const isExpanded = expandedShapes.has(shapeKey);
                return (
                  <div key={shapeKey} className="flex flex-col">
                    <div
                      className="flex items-center gap-1.5 bg-gray-800 rounded px-2 py-1 cursor-pointer select-none hover:bg-gray-750"
                      onClick={() => setExpandedShapes(prev => {
                        const next = new Set(prev);
                        if (next.has(shapeKey)) next.delete(shapeKey);
                        else next.add(shapeKey);
                        return next;
                      })}
                    >
                      <span className="text-gray-400 text-xs">{isExpanded ? '▼' : '▶'}</span>
                      <span className="text-gray-300 text-xs">
                        {shape.type === 'plate' ? 'P' : 'B'} 2×{shape.width}
                      </span>
                      <span className="text-yellow-400 font-mono text-xs">×{shape.total}</span>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-wrap gap-1 mt-1 ml-2">
                        {shape.colors.map((c, j) => (
                          <div key={j} className="flex items-center gap-1 bg-gray-800 rounded px-1.5 py-0.5">
                            <span
                              className="inline-block w-3 h-3 rounded-sm border border-gray-600"
                              style={{ backgroundColor: c.color }}
                            />
                            <span className="text-yellow-400 font-mono text-xs">×{c.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      <div ref={containerRef} className="flex-1" />
    </div>
  );
}
