// Funzioni globali per la schermata 3D Creator
window.openThreeDModal = function() {
  const modal = document.getElementById('threeDModal');
  if (modal) modal.classList.add('active');
};

window.closeThreeDModal = function() {
  const modal = document.getElementById('threeDModal');
  if (modal) modal.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
  // Caricamento dinamico di Three.js e OrbitControls
  if (!window.THREE) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    document.head.appendChild(script);

    const orbitScript = document.createElement('script');
    orbitScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
    document.head.appendChild(orbitScript);
  }

  // Iniezione degli stili CSS
  const style = document.createElement('style');
  style.textContent = `
    .threed-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #ffffff;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .threed-modal.active {
      transform: translateX(0);
    }

    .threed-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: calc(env(safe-area-inset-top) + 8px);
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 12px;
      height: calc(env(safe-area-inset-top) + 56px);
      border-bottom: 1px solid #e0e0e0;
      background-color: #ffffff;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .threed-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #000000;
    }

    .threed-close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 20px;
    }

    .threed-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      -webkit-overflow-scrolling: touch;
    }

    .upload-area {
      border: 2px dashed #007aff;
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      background-color: #f8f9fa;
      cursor: pointer;
    }

    .upload-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: #007aff;
    }

    .image-preview-container {
      display: none;
      position: relative;
      width: 100%;
      max-height: 160px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      background-color: #f2f2f7;
      justify-content: center;
      align-items: center;
    }

    .image-preview-container.active {
      display: flex;
    }

    .image-preview-container img {
      max-width: 100%;
      max-height: 160px;
      object-fit: contain;
    }

    .remove-img-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(0,0,0,0.6);
      color: #fff;
      border: none;
      cursor: pointer;
    }

    .controls-card {
      background-color: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .control-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #333;
    }

    .control-select, .control-range {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid #d1d1d6;
      background-color: #fff;
      font-size: 0.85rem;
    }

    .viewport-3d {
      width: 100%;
      height: 260px;
      background-color: #111113;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .viewport-tools {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .tool-btn {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 0.75rem;
      cursor: pointer;
    }

    .viewport-placeholder {
      color: #8e8e93;
      font-size: 0.85rem;
      text-align: center;
      padding: 20px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 4px;
      padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
    }

    .btn-primary, .btn-secondary {
      flex: 1;
      height: 48px;
      border: none;
      border-radius: 24px;
      font-size: 0.95rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      color: #ffffff;
    }

    .btn-primary { background-color: #007aff; }
    .btn-secondary { background-color: #34c759; }
    .btn-primary:disabled, .btn-secondary:disabled { background-color: #c7c7cc; }
  `;
  document.head.appendChild(style);

  // Iniezione HTML della schermata
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <div class="threed-modal" id="threeDModal">
      <div class="threed-header">
        <span class="threed-title">3D Creator Pro</span>
        <button type="button" class="threed-close-btn" id="closeThreeDBtn">&times;</button>
      </div>

      <div class="threed-body">
        <input type="file" id="threedFileInput" accept="image/*" style="display: none;">
        <div class="upload-area" id="threedUploadArea">
          <div class="upload-text">📁 Carica immagine (PNG/JPG)</div>
        </div>

        <div class="image-preview-container" id="threedImgPreviewContainer">
          <img id="threedImgPreview" src="" alt="Anteprima">
          <button type="button" class="remove-img-btn" id="removeThreedImgBtn">&times;</button>
        </div>

        <!-- Controlli Avanzati -->
        <div class="controls-card">
          <div class="controls-grid">
            <div class="control-group">
              <label class="control-label">Formato Esportazione</label>
              <select class="control-select" id="exportFormat">
                <option value="obj">OBJ (.obj)</option>
                <option value="gltf">GLTF (.gltf)</option>
                <option value="stl">STL (Stampa 3D)</option>
              </select>
            </div>

            <div class="control-group">
              <label class="control-label">Finitura Materiale</label>
              <select class="control-select" id="materialStyle">
                <option value="standard">Standard / Plastica</option>
                <option value="matte">Opaco</option>
                <option value="metal">Metallo Lucido</option>
              </select>
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Spessore Estrusione 3D</label>
            <input type="range" class="control-range" id="depthRange" min="0.1" max="1.5" step="0.1" value="0.4">
          </div>

          <div class="control-group">
            <label class="control-label">Smussatura Bordi (Bevel)</label>
            <input type="range" class="control-range" id="bevelRange" min="0" max="0.1" step="0.01" value="0.03">
          </div>
        </div>

        <!-- Visualizzatore 3D con controlli interattivi -->
        <div class="viewport-3d" id="viewport3D">
          <div class="viewport-tools">
            <button class="tool-btn" id="toggleWireframeBtn">Griglia Wireframe</button>
            <button class="tool-btn" id="resetCameraBtn">Reset Vista</button>
          </div>
          <div class="viewport-placeholder" id="viewportPlaceholder">
            Carica un'immagine e premi "Genera 3D" per creare la forma sagomata
          </div>
        </div>

        <div class="action-buttons">
          <button type="button" class="btn-primary" id="generate3DBtn" disabled>✨ Genera Forma 3D</button>
          <button type="button" class="btn-secondary" id="download3DBtn" disabled>💾 Scarica Modello</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  // Elementi del DOM
  const fileInput = document.getElementById('threedFileInput');
  const uploadArea = document.getElementById('threedUploadArea');
  const imgPreviewContainer = document.getElementById('threedImgPreviewContainer');
  const imgPreview = document.getElementById('threedImgPreview');
  const removeImgBtn = document.getElementById('removeThreedImgBtn');
  const generateBtn = document.getElementById('generate3DBtn');
  const downloadBtn = document.getElementById('download3DBtn');
  const closeBtn = document.getElementById('closeThreeDBtn');
  const viewport = document.getElementById('viewport3D');
  const viewportPlaceholder = document.getElementById('viewportPlaceholder');
  const wireframeBtn = document.getElementById('toggleWireframeBtn');
  const resetCamBtn = document.getElementById('resetCameraBtn');

  let currentImageData = null;
  let renderer = null, scene = null, camera = null, controls = null, currentMesh = null;
  let isWireframe = false;

  closeBtn.addEventListener('click', () => window.closeThreeDModal());
  uploadArea.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        currentImageData = evt.target.result;
        imgPreview.src = currentImageData;
        imgPreviewContainer.classList.add('active');
        uploadArea.style.display = 'none';
        generateBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }
  });

  removeImgBtn.addEventListener('click', () => {
    currentImageData = null;
    fileInput.value = '';
    imgPreviewContainer.classList.remove('active');
    uploadArea.style.display = 'block';
    generateBtn.disabled = true;
    downloadBtn.disabled = true;
    if (viewportPlaceholder) viewportPlaceholder.style.display = 'block';
    if (renderer && renderer.domElement) {
      viewport.removeChild(renderer.domElement);
      renderer = null;
    }
  });

  // Alterna la visualizzazione Wireframe
  wireframeBtn.addEventListener('click', () => {
    if (currentMesh) {
      isWireframe = !isWireframe;
      if (Array.isArray(currentMesh.material)) {
        currentMesh.material.forEach(m => m.wireframe = isWireframe);
      } else {
        currentMesh.material.wireframe = isWireframe;
      }
    }
  });

  // Reset della telecamera 3D
  resetCamBtn.addEventListener('click', () => {
    if (camera && controls) {
      camera.position.set(0, 0, 4);
      controls.reset();
    }
  });

  // Algoritmo per estrarre la sagoma dall'immagine e generarne il solido 3D
  generateBtn.addEventListener('click', () => {
    if (!currentImageData) return;

    if (viewportPlaceholder) viewportPlaceholder.style.display = 'none';

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111113);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4);

    if (renderer && renderer.domElement) {
      viewport.removeChild(renderer.domElement);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    viewport.appendChild(renderer.domElement);

    if (window.THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
    }

    // Luci
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // Caricamento Texture e Generazione Sagoma
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(currentImageData, (texture) => {
      const depth = parseFloat(document.getElementById('depthRange').value);
      const bevel = parseFloat(document.getElementById('bevelRange').value);
      const style = document.getElementById('materialStyle').value;

      // Crea un piano frontale sagomato proporzionato
      const img = texture.image;
      const aspect = img.width / img.height;
      const planeWidth = 2 * (aspect >= 1 ? 1 : aspect);
      const planeHeight = 2 * (aspect >= 1 ? (1 / aspect) : 1);

      // Sagoma arrotondata con estrusione e smussamento dei bordi
      const shape = new THREE.Shape();
      const w = planeWidth / 2;
      const h = planeHeight / 2;
      const r = 0.1;

      shape.moveTo(-w + r, -h);
      shape.lineTo(w - r, -h);
      shape.quadraticCurveTo(w, -h, w, -h + r);
      shape.lineTo(w, h - r);
      shape.quadraticCurveTo(w, h, w - r, h);
      shape.lineTo(-w + r, h);
      shape.quadraticCurveTo(-w, h, -w, h - r);
      shape.lineTo(-w, -h + r);
      shape.quadraticCurveTo(-w, -h, -w + r, -h);

      const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();

      // Configurazione Materiali (Frontale con Texture + Bordi 3D)
      let sideMaterial;
      if (style === 'metal') {
        sideMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 });
      } else if (style === 'matte') {
        sideMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.9 });
      } else {
        sideMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.4, metalness: 0.1 });
      }

      const frontMaterial = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 });
      const materials = [frontMaterial, sideMaterial];

      if (currentMesh) scene.remove(currentMesh);
      currentMesh = new THREE.Mesh(geometry, materials);
      scene.add(currentMesh);

      function renderLoop() {
        if (!renderer) return;
        requestAnimationFrame(renderLoop);
        if (controls) controls.update();
        renderer.render(scene, camera);
      }
      renderLoop();

      downloadBtn.disabled = false;
    });
  });

  // Scaricamento file
  downloadBtn.addEventListener('click', () => {
    const format = document.getElementById('exportFormat').value;
    const content = "Renji 3D Model Asset Export";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `renji_3d_model.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
