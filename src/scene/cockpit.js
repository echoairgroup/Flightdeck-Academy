import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Procedural A320ceo educational cockpit scene.
 * Geometry is deliberately schematic: it is not manufacturer CAD or a training simulator.
 */
export class CockpitScene {
  constructor(mount, items, onSelect) {
    this.mount = mount;
    this.items = items;
    this.onSelect = onSelect;
    this.hotspotObjects = new Map();
    this.labelObjects = [];
    this.selectedId = null;
    this.hotspotsVisible = true;
    this.labelsVisible = false;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.clock = new THREE.Clock();
    this.cameraMotion = null;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#09131d');
    this.scene.fog = new THREE.Fog('#09131d', 13, 30);

    const width = Math.max(1, mount.clientWidth);
    const height = Math.max(1, mount.clientHeight);
    this.camera = new THREE.PerspectiveCamera(43, width / height, 0.1, 100);
    this.camera.position.set(0, 2.25, 8.8);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.domElement.setAttribute('aria-label', 'Interactieve schematische 3D-weergave van een Airbus A320ceo-cockpit');
    mount.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.minDistance = 3.7;
    this.controls.maxDistance = 13;
    this.controls.maxPolarAngle = Math.PI * 0.87;
    this.controls.target.set(0, 0.8, 1.8);
    this.controls.update();

    this.addLighting();
    this.buildCockpit();
    this.buildHotspots();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(mount);
    this.onPointerDown = event => this.handlePointer(event);
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
    this.animate();
  }

  material(color, roughness = 0.65, metalness = 0.15) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }

  addBox(parent, name, position, scale, material, bevel = false) {
    const geometry = new THREE.BoxGeometry(...scale);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  addLighting() {
    this.scene.add(new THREE.HemisphereLight('#c9e7ff', '#18232c', 2.25));
    const key = new THREE.DirectionalLight('#e6f4ff', 3.2);
    key.position.set(-4, 7, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
    const fill = new THREE.PointLight('#58b9c8', 32, 16);
    fill.position.set(4, 2.5, 4);
    this.scene.add(fill);
    const panelGlow = new THREE.PointLight('#2d657b', 24, 10);
    panelGlow.position.set(0, 2, 1.5);
    this.scene.add(panelGlow);
  }

  buildCockpit() {
    const shell = this.material('#111b24', 0.78, 0.24);
    const shellEdge = this.material('#263744', 0.55, 0.38);
    const dark = this.material('#060b10', 0.34, 0.2);
    const rubber = this.material('#202a31', 0.92, 0.02);
    const metal = this.material('#64747b', 0.32, 0.78);
    const seat = this.material('#222d34', 0.9, 0.05);

    this.addBox(this.scene, 'cockpit floor', [0, -1.9, 0.3], [9.5, 0.18, 8.3], rubber);
    this.addBox(this.scene, 'rear wall', [0, 1.55, -1.55], [9.4, 5.4, 0.22], shell);
    this.addBox(this.scene, 'left side wall', [-4.45, 0.3, 0.7], [0.2, 4.4, 5.2], shell);
    this.addBox(this.scene, 'right side wall', [4.45, 0.3, 0.7], [0.2, 4.4, 5.2], shell);

    // Main instrument panel and glareshield.
    this.addBox(this.scene, 'main instrument panel housing', [0, 0.35, 2.45], [7.9, 2.35, 0.5], shell);
    this.addBox(this.scene, 'panel top ledge', [0, 1.62, 2.45], [8.1, 0.16, 0.8], shellEdge);
    this.addBox(this.scene, 'glareshield', [0, 1.82, 2.0], [7.6, 0.34, 1.1], shellEdge);
    this.addBox(this.scene, 'glareshield face', [0, 1.7, 1.73], [7.4, 0.18, 0.18], dark);

    // Window frames and simplified windshields.
    for (const x of [-2.55, -0.85, 0.85, 2.55]) {
      const pane = new THREE.Mesh(new THREE.BoxGeometry(1.55, 2.55, 0.09), new THREE.MeshPhysicalMaterial({
        color: '#173044', roughness: 0.12, metalness: 0.18, transmission: 0.18, transparent: true, opacity: 0.78
      }));
      pane.position.set(x, 2.6, -0.85);
      this.scene.add(pane);
      this.addBox(this.scene, 'windshield frame', [x, 3.91, -0.84], [1.62, 0.1, 0.18], shellEdge);
      this.addBox(this.scene, 'windshield lower frame', [x, 1.31, -0.84], [1.62, 0.1, 0.18], shellEdge);
    }
    for (const x of [-3.38, -1.7, 0, 1.7, 3.38]) {
      this.addBox(this.scene, 'windshield mullion', [x, 2.6, -0.82], [0.09, 2.7, 0.2], shellEdge);
    }

    this.addDisplay(-2.55, 0.48, 'PFD', 'ATTITUDE · SPEED · ALTITUDE');
    this.addDisplay(-0.9, 0.48, 'ND', 'ROUTE · WAYPOINTS · RANGE');
    this.addDisplay(0.9, 0.48, 'ECAM', 'ENGINE · SYSTEM STATUS');
    this.addDisplay(2.55, 0.48, 'SD', 'SYSTEM SYNOPTICS');

    // FCU controls, annunciators and knobs.
    this.addBox(this.scene, 'FCU panel', [0, 1.92, 1.7], [5.8, 0.38, 0.42], dark);
    for (let i = 0; i < 12; i++) {
      const x = -2.55 + i * 0.465;
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.13, 24), metal);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(x, 1.92, 1.43);
      this.scene.add(knob);
    }
    for (let i = 0; i < 15; i++) {
      this.addBox(this.scene, 'FCU pushbutton', [-2.7 + i * 0.385, 1.78, 1.49], [0.24, 0.09, 0.1], this.material(i % 4 === 0 ? '#38565a' : '#293944', 0.4, 0.15));
    }

    // Center pedestal with two throttle levers and surrounding controls.
    this.addBox(this.scene, 'center pedestal base', [0, -0.75, 0.95], [2.75, 0.55, 3.0], shell);
    this.addBox(this.scene, 'pedestal top', [0, -0.42, 0.83], [2.55, 0.12, 2.65], shellEdge);
    this.addBox(this.scene, 'throttle quadrant', [0, -0.31, 1.18], [1.05, 0.1, 1.6], dark);
    for (const x of [-0.3, 0.3]) {
      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.68, 0.16), metal);
      lever.position.set(x, 0.03, 1.12);
      lever.rotation.x = -0.12;
      this.scene.add(lever);
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.15, 0.26), this.material('#101a20', 0.72, 0.18));
      grip.position.set(x, 0.39, 1.07);
      this.scene.add(grip);
    }
    this.addBox(this.scene, 'radio console', [0, -0.31, -0.03], [2.25, 0.1, 0.54], dark);
    this.addBox(this.scene, 'MCDU left', [-0.65, -0.2, 0.0], [0.72, 0.14, 0.82], shellEdge);
    this.addBox(this.scene, 'MCDU right', [0.65, -0.2, 0.0], [0.72, 0.14, 0.82], shellEdge);

    // Overhead panel: a tilted panel above the pilots.
    const overhead = new THREE.Group();
    overhead.position.set(0, 3.7, -0.1);
    overhead.rotation.x = -0.25;
    this.scene.add(overhead);
    this.addBox(overhead, 'overhead housing', [0, 0, 0], [5.9, 0.25, 2.0], shell);
    this.addBox(overhead, 'overhead face', [0, -0.15, 0.05], [5.55, 0.08, 1.7], dark);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 9; col++) {
        const x = -2.36 + col * 0.59;
        const z = -0.55 + row * 0.35;
        const panelButton = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.09, 0.22), this.material((row + col) % 5 === 0 ? '#48615e' : '#4c5961', 0.45, 0.2));
        panelButton.position.set(x, -0.22, z);
        overhead.add(panelButton);
      }
    }
    const overheadTitle = this.makeTextSprite('OVERHEAD PANEL', '#a8dfe3');
    overheadTitle.position.set(0, -0.08, -0.86);
    overheadTitle.scale.set(1.5, 0.22, 1);
    overhead.add(overheadTitle);

    // Side consoles, seats and footwells.
    for (const x of [-3.25, 3.25]) {
      this.addBox(this.scene, 'side console', [x, -0.65, 0.55], [0.78, 0.9, 2.75], shell);
      this.addBox(this.scene, 'armrest', [x, -0.05, 0.75], [0.72, 0.12, 1.8], seat);
      this.addBox(this.scene, 'pilot seat cushion', [x, -1.0, -1.15], [1.3, 0.26, 1.3], seat);
      this.addBox(this.scene, 'pilot seat back', [x, 0.05, -1.65], [1.25, 1.65, 0.28], seat);
      this.addBox(this.scene, 'seat headrest', [x, 1.0, -1.68], [0.72, 0.45, 0.3], seat);
    }

    // Foot pedals and trim details.
    for (const x of [-2.7, 2.7]) {
      for (const z of [1.2, 1.7]) {
        const pedal = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.34), metal);
        pedal.position.set(x, -1.42, z);
        this.scene.add(pedal);
      }
    }
    this.addBox(this.scene, 'center windshield post', [0, 2.65, -0.62], [0.12, 2.55, 0.2], shellEdge);
  }

  addDisplay(x, y, label, subtitle) {
    const frame = this.material('#242f37', 0.34, 0.58);
    this.addBox(this.scene, label + ' display frame', [x, y, 2.17], [1.48, 1.04, 0.18], frame);
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 320;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#071b23'; ctx.fillRect(0, 0, 512, 320);
    ctx.strokeStyle = '#184e55'; ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(0, i * 40); ctx.lineTo(512, i * 40); ctx.stroke(); }
    ctx.fillStyle = '#7ce1cf'; ctx.font = 'bold 34px monospace'; ctx.fillText(label, 24, 52);
    ctx.fillStyle = '#9eb5b9'; ctx.font = '15px monospace'; ctx.fillText(subtitle, 24, 82);
    ctx.strokeStyle = '#72c7b9'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(22, 165); ctx.lineTo(126, 165); ctx.lineTo(170, 132); ctx.lineTo(240, 186); ctx.lineTo(328, 140); ctx.lineTo(486, 140); ctx.stroke();
    ctx.strokeStyle = '#d7b66d'; ctx.beginPath(); ctx.arc(260, 224, 46, Math.PI, 2 * Math.PI); ctx.stroke();
    ctx.fillStyle = '#b6d7d9'; ctx.font = '16px monospace'; ctx.fillText('SYSTEM DISPLAY', 24, 290);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.34, 0.87), new THREE.MeshBasicMaterial({ map: texture }));
    screen.position.set(x, y, 2.065);
    this.scene.add(screen);
  }

  makeTextSprite(text, color = '#bce4e8') {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 96;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 32px monospace';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, 256, 58);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  }

  buildHotspots() {
    const ringGeometry = new THREE.TorusGeometry(0.13, 0.018, 8, 28);
    const pointGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    for (const item of this.items) {
      const group = new THREE.Group();
      const [x, y, z] = item.position || [0, 0, 2];
      group.position.set(x, y, z + 0.18);
      group.userData.itemId = item.id;
      const ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: '#61d9df', transparent: true, opacity: 0.92 }));
      ring.userData.itemId = item.id;
      const point = new THREE.Mesh(pointGeometry, new THREE.MeshBasicMaterial({ color: '#d7ffff' }));
      point.userData.itemId = item.id;
      group.add(ring, point);
      const label = this.makeTextSprite(item.short || item.title, '#c5f3f2');
      label.scale.set(0.92, 0.18, 1);
      label.position.set(0.33, 0.2, 0);
      label.visible = false;
      label.userData.itemId = item.id;
      group.add(label);
      this.scene.add(group);
      this.hotspotObjects.set(item.id, group);
      this.labelObjects.push(label);
    }
  }

  handlePointer(event) {
    if (event.button !== 0) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const clickable = [];
    for (const group of this.hotspotObjects.values()) group.traverse(child => { if (child.isMesh && child.visible) clickable.push(child); });
    const hit = this.raycaster.intersectObjects(clickable, false)[0];
    if (hit?.object?.userData?.itemId) {
      this.onSelect(hit.object.userData.itemId);
      this.select(hit.object.userData.itemId);
    }
  }

  select(id) {
    this.selectedId = id;
    for (const [itemId, group] of this.hotspotObjects) {
      const ring = group.children[0];
      const active = itemId === id;
      ring.material.color.set(active ? '#f0c978' : '#61d9df');
      ring.scale.setScalar(active ? 1.45 : 1);
      ring.material.opacity = active ? 1 : 0.78;
    }
  }

  setHotspotsVisible(visible) {
    this.hotspotsVisible = visible;
    for (const group of this.hotspotObjects.values()) group.visible = visible;
  }

  setLabelsVisible(visible) {
    this.labelsVisible = visible;
    for (const label of this.labelObjects) label.visible = visible && this.hotspotsVisible;
  }

  focusView(view = 'captain') {
    const presets = {
      captain: { position: [0, 2.25, 8.8], target: [0, 0.8, 1.9], label: 'CAPTAIN VIEW' },
      overhead: { position: [0, 6.8, 4.3], target: [0, 3.45, 0.05], label: 'OVERHEAD VIEW' },
      pedestal: { position: [0, 1.25, 6.5], target: [0, -0.48, 0.75], label: 'PEDESTAL VIEW' },
      wide: { position: [5.6, 2.9, 8.8], target: [0, 0.8, 1.15], label: 'WIDE COCKPIT VIEW' }
    };
    const preset = presets[view] || presets.captain;
    this.cameraMotion = {
      startPosition: this.camera.position.clone(),
      endPosition: new THREE.Vector3(...preset.position),
      startTarget: this.controls.target.clone(),
      endTarget: new THREE.Vector3(...preset.target),
      started: performance.now(),
      duration: 700
    };
    return preset.label;
  }

  zoom(amount) {
    const direction = this.camera.position.clone().sub(this.controls.target).normalize();
    this.camera.position.addScaledVector(direction, amount);
    this.camera.position.clampLength(this.controls.minDistance, this.controls.maxDistance);
  }

  resize() {
    const width = Math.max(1, this.mount.clientWidth);
    const height = Math.max(1, this.mount.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.frameId = requestAnimationFrame(() => this.animate());
    if (this.cameraMotion) {
      const motion = this.cameraMotion;
      const t = Math.min(1, (performance.now() - motion.started) / motion.duration);
      const eased = t * t * (3 - 2 * t);
      this.camera.position.lerpVectors(motion.startPosition, motion.endPosition, eased);
      this.controls.target.lerpVectors(motion.startTarget, motion.endTarget, eased);
      if (t >= 1) this.cameraMotion = null;
    }
    this.controls.update();
    const time = this.clock.getElapsedTime();
    for (const [id, group] of this.hotspotObjects) {
      const ring = group.children[0];
      if (id !== this.selectedId) ring.scale.setScalar(1 + Math.sin(time * 2.3 + group.position.x) * 0.07);
    }
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
    this.controls.dispose();
    this.renderer.dispose();
  }
}
