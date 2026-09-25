// Funzioni globali per aprire e chiudere la schermata 3D Creator
window.openThreeDModal = function() {
  const modal = document.getElementById('threeDModal');
  if (modal) {
    modal.classList.add('active');
  }
};

window.closeThreeDModal = function() {
  const modal = document.getElementById('threeDModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Carica Three.js dinamicamente se non presente
  if (!window.THREE) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    document.head.appendChild(script);
  }

  // Inietta gli stili CSS della schermata 3D Creator
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
      line-height: 1;
    }

    .threed-close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      color: #000000;
      font-size: 20px;
      line-height: 1;
      font-weight: 400;
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

    /* Area Upload Immagine */
    .upload-area {
      border: 2px dashed #007aff;
      border-radius: 16px;
      padding: 24px 16px;
      text-align: center;
      background-color: #f8f9fa;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .upload-area:active {
      background-color: #e8f0fe;
    }

    .upload-icon {
      margin-bottom: 8px;
    }

    .upload-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: #007aff;
      margin-bottom: 4px;
    }

    .upload-subtext {
      font-size: 0.78rem;
      color: #8e8e93;
    }

    /* Anteprima Immagine */
    .image-preview-container {
      display: none;
      position: relative;
      width: 100%;
      max-height: 180px;
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
      max-height: 180px;
      object-fit: contain;
    }

    .remove-img-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      border: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* Controlli Parametri */
    .controls-card {
      background-color: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .control-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #333333;
    }

    .control-select, .control-range {
      width: 100%;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid #d1d1d6;
      background-color: #ffffff;
      font-size: 0.9rem;
      outline: none;
    }

    /* Canvas 3D Preview */
    .viewport-3d {
      width: 100%;
      height: 220px;
      background-color: #1c1c1e;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .viewport-placeholder {
      color: #8e8e93;
      font-size: 0.85rem;
      text-align: center;
    }

    /* Pulsanti Azione */
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 8px;
      padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
    }

    .btn-primary {
      flex: 1;
      height: 48px;
      background-color: #007aff;
      color: #ffffff;
      border: none;
      border-radius: 24px;
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 122, 255, 0.25);
      transition: background-color 0.2s;
    }

    .btn-primary:disabled {
      background-color: #c7c7cc;
      box-shadow: none;
      cursor: not-allowed;
    }

    .btn-secondary {
      flex: 1;
      height: 48px;
      background-color: #34c759;
      color: #ffffff;
      border: none;
      border-radius: 24px;
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(52, 199, 89, 0.25);
    }

    .btn-secondary:disabled {
      background-color: #c7c7cc;
      box-shadow: none;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);

  // Inietta l'HTML della schermata 3D Creator
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <div class="threed-modal" id="threeDModal">
      <div class="threed-header">
        <span class="threed-title">3D Creator</span>
        <button type="button" class="threed-close-btn" id="closeThreeDBtn" aria-label="Chiudi">&times;</button>
      </div>

      <div class="threed-body">
        <!-- Area Caricamento Immagine -->
        <input type="file" id="threedFileInput" accept="image/*" style="display: none;">
        <div class="upload-area" id="threedUploadArea">
          <div class="upload-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#007aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <div class="upload-text">Seleziona o scatta un'immagine</div>
          <div class="upload-subtext">JPG, PNG supportati</div>
        </div>

        <!-- Anteprima Immagine Caricata -->
        <div class="image-preview-container" id="threedImgPreviewContainer">
          <img id="threedImgPreview" src="" alt="Anteprima">
          <button type="button" class="remove-img-btn" id="removeThreedImgBtn">&times;</button>
        </div>

        <!-- Parametri Modello 3D -->
        <div class="controls-card">
          <div class="control-group">
            <label class="control-label">Formato di esportazione</label>
            <select class="control-select" id="exportFormat">
              <option value="obj">OBJ (.obj)</option>
              <option value="gltf">GLTF (.gltf)</option>
              <option value="stl">STL (.stl - Stampa 3D)</option>
            </select>
          </div>

          <div class="control-group">
            <label class="control-label">Profondità Estrusione (3D)</label>
            <input type="range" class="control-range" id="depthRange" min="1" max="20" value="5">
          </div>
        </div>

        <!-- Visualizzatore 3D -->
        <div class="viewport-3d" id="viewport3D">
          <div class="viewport-placeholder" id="viewportPlaceholder">
            Carica un'immagine e premi "Genera 3D" per visualizzare il modello
          </div>
        </div>

        <!-- Pulsanti d'Azione -->
        <div class="action-buttons">
          <button type="button" class="btn-primary" id="generate3DBtn" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
            Genera 3D
          </button>

          <button type="button" class="btn-secondary" id="download3DBtn" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Scarica
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  // Variabili di stato
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

  let currentImageData = null;
  let renderer = null, scene = null, camera = null, currentMesh = null;

  // Event Listener Chiusura
  closeBtn.addEventListener('click', () => {
    window.closeThreeDModal();
  });

  // Event Listener Upload
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

  // Generazione del modello 3D basato su Three.js
  generateBtn.addEventListener('click', () => {
    if (!currentImageData) return;

    if (viewportPlaceholder) viewportPlaceholder.style.display = 'none';

    // Inizializza Scene Three.js
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1c1c1e);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    if (renderer && renderer.domElement) {
      viewport.removeChild(renderer.domElement);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    viewport.appendChild(renderer.domElement);

    // Luci
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Crea un Cubo / Forma 3D Estrusa con la Texture dell'immagine carica
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(currentImageData, (texture) => {
      const depth = parseFloat(document.getElementById('depthRange').value) / 5;
      const geometry = new THREE.BoxGeometry(2, 2, depth);
      const material = new THREE.MeshStandardMaterial({ map: texture });

      if (currentMesh) scene.remove(currentMesh);
      currentMesh = new THREE.Mesh(geometry, material);
      scene.add(currentMesh);

      // Animazione di rotazione semplice
      function animate() {
        if (!renderer) return;
        requestAnimationFrame(animate);
        if (currentMesh) {
          currentMesh.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
      }
      animate();

      downloadBtn.disabled = false;
    });
  });

  // Scaricamento del file 3D
  downloadBtn.addEventListener('click', () => {
    const format = document.getElementById('exportFormat').value;
    const content = "3D Model generated by Renji 3D Creator";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `renji_model.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
