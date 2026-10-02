window.openPianteModal = function() {
  const modal = document.getElementById('pianteModal');
  if (modal) modal.classList.add('active');
};

window.closePianteModal = function() {
  const modal = document.getElementById('pianteModal');
  if (modal) modal.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .piante-modal {
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

    .piante-modal.active {
      transform: translateX(0);
    }

    /* HEADER */
    .piante-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: calc(env(safe-area-inset-top) + 8px);
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 12px;
      height: calc(env(safe-area-inset-top) + 56px);
      border-bottom: 1px solid #f0f0f0;
      background-color: #ffffff;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .piante-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #000000;
    }

    .piante-close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      color: #000000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    /* BODY */
    .piante-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 12px 16px 0 16px;
      gap: 12px;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* SCORRIMENTO ORIZZONTALE FOTO */
    .photos-scroll-container {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow-x: scroll !important;
      overflow-y: hidden;
      padding: 6px 16px 14px 16px;
      margin-left: -16px;
      margin-right: -16px;
      width: calc(100% + 32px);
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x;
      flex-shrink: 0;
      min-height: 110px;
      box-sizing: border-box;
    }

    /* BARRA DI SCORRIMENTO ORIZZONTALE VISIBILE */
    .photos-scroll-container::-webkit-scrollbar {
      height: 6px;
      display: block;
    }

    .photos-scroll-container::-webkit-scrollbar-track {
      background: #e8e8ed;
      border-radius: 10px;
      margin: 0 16px;
    }

    .photos-scroll-container::-webkit-scrollbar-thumb {
      background: #8e8e93;
      border-radius: 10px;
    }

    .photo-wrapper {
      position: relative;
      width: 85px;
      height: 85px;
      flex-shrink: 0;
    }

    .photo-card {
      width: 100%;
      height: 100%;
      border-radius: 14px;
      object-fit: cover;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    .delete-photo-btn {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: #000000;
      color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    }

    .add-photo-circle-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #000000;
      color: #ffffff;
      border: none;
      font-size: 26px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
    }

    /* SCHEDA PRINCIPALE - ALLUNGATA FINO IN BASSO */
    .main-card {
      flex: 1;
      border: 1px solid #e0e0e0;
      border-radius: 20px 20px 0 0;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: #ffffff;
      box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.03);
      position: relative;
      box-sizing: border-box;
      margin-bottom: 0;
    }

    /* RIGA BOTTONI AZIONE */
    .card-actions-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      position: relative;
      z-index: 20;
    }

    .trash-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      color: #000000;
    }

    /* SELETTORE FONT CON TOUCH/SCROLLABILITÀ ABILITATA */
    .font-control-wrapper {
      position: relative;
    }

    .font-size-circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: 700;
      color: #000000;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    .font-picker-pill {
      display: none;
      position: absolute;
      top: -110px;
      left: 50%;
      transform: translateX(-50%);
      width: 52px;
      height: 180px;
      background-color: #ffffff;
      border-radius: 24px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      overflow-y: scroll !important;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-y;
      z-index: 50;
      box-sizing: border-box;
      padding: 8px 0;
    }

    .font-picker-pill.active {
      display: block;
    }

    .font-option {
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: 500;
      color: #8e8e93;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;
    }

    .font-option:active {
      background-color: #f0f0f0;
    }

    .font-option.selected {
      font-size: 1.1rem;
      font-weight: 800;
      color: #000000;
    }

    .save-btn {
      background-color: #ffffff;
      color: #000000;
      border: none;
      border-radius: 20px;
      padding: 8px 20px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    .save-btn:active {
      background-color: #f5f5f7;
    }

    /* CAMPI TESTO */
    .inputs-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
      padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
    }

    .title-textarea {
      width: 100%;
      border: none;
      outline: none;
      font-size: 18px;
      font-weight: 700;
      color: #000000;
      background: transparent;
      resize: none;
      font-family: inherit;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
      min-height: 32px;
    }

    .title-textarea::placeholder {
      color: #8e8e93;
      font-weight: 600;
    }

    .description-textarea {
      width: 100%;
      flex: 1;
      border: none;
      outline: none;
      font-size: 18px;
      font-weight: 400;
      color: #3a3a3c;
      background: transparent;
      resize: none;
      font-family: inherit;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-y: auto;
    }

    .description-textarea::placeholder {
      color: #8e8e93;
    }
  `;
  document.head.appendChild(style);

  // STRUTTURA HTML
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="piante-modal" id="pianteModal">
      <div class="piante-header">
        <span class="piante-title">Catalogo piante</span>
        <button type="button" class="piante-close-btn" id="closePianteBtn">&times;</button>
      </div>

      <div class="piante-body">
        <input type="file" id="pianteFileInput" accept="image/*" style="display:none;" multiple>
        
        <!-- Contenitore Foto a Scorrimento Orizzontale -->
        <div class="photos-scroll-container" id="photosScrollContainer">
          <button type="button" class="add-photo-circle-btn" id="pianteAddBtn">+</button>
        </div>

        <!-- Scheda Estesa fino a fondo schermo -->
        <div class="main-card">
          <div class="card-actions-row">
            <button type="button" class="trash-btn" id="clearTextBtn" title="Cancella testo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>

            <!-- Selettore Font -->
            <div class="font-control-wrapper">
              <button type="button" class="font-size-circle" id="fontSizeBtn">18</button>
              <div class="font-picker-pill" id="fontPickerPill"></div>
            </div>

            <button type="button" class="save-btn" id="pianteSaveBtn">SALVA</button>
          </div>

          <div class="inputs-container">
            <textarea class="title-textarea" id="plantTitleInput" placeholder="Titolo..." rows="1"></textarea>
            <textarea class="description-textarea" id="plantDescInput" placeholder="Descrizione..."></textarea>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // RIFERIMENTI DOM
  const closeBtn = document.getElementById('closePianteBtn');
  const fileInput = document.getElementById('pianteFileInput');
  const addBtn = document.getElementById('pianteAddBtn');
  const photosContainer = document.getElementById('photosScrollContainer');
  const titleInput = document.getElementById('plantTitleInput');
  const descInput = document.getElementById('plantDescInput');
  const clearTextBtn = document.getElementById('clearTextBtn');
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  const fontPickerPill = document.getElementById('fontPickerPill');
  const saveBtn = document.getElementById('pianteSaveBtn');

  let loadedImagesBase64 = [];
  let activeElement = titleInput;

  // Popola la tendina font (da 12px a 32px)
  const fontSizes = [12, 14, 16, 18, 20, 22, 24, 28, 32];
  fontSizes.forEach(size => {
    const opt = document.createElement('div');
    opt.className = `font-option ${size === 18 ? 'selected' : ''}`;
    opt.dataset.size = size;
    opt.textContent = size;

    // Selezione con singolo Tap
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      selectFontSize(size);
      fontPickerPill.classList.remove('active');
    });
    fontPickerPill.appendChild(opt);
  });

  function selectFontSize(size) {
    fontSizeBtn.textContent = size;
    if (activeElement) {
      activeElement.style.fontSize = `${size}px`;
    }
    document.querySelectorAll('.font-option').forEach(opt => {
      if (parseInt(opt.dataset.size) === size) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  // Chiusura
  closeBtn.addEventListener('click', () => window.closePianteModal());

  // Aggiungi Foto
  addBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64 = evt.target.result;
        loadedImagesBase64.push(base64);

        const wrapper = document.createElement('div');
        wrapper.className = 'photo-wrapper';

        const img = document.createElement('img');
        img.src = base64;
        img.className = 'photo-card';

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-photo-btn';
        delBtn.innerHTML = '&times;';
        delBtn.addEventListener('click', () => {
          const index = loadedImagesBase64.indexOf(base64);
          if (index > -1) loadedImagesBase64.splice(index, 1);
          wrapper.remove();
        });

        wrapper.appendChild(img);
        wrapper.appendChild(delBtn);
        photosContainer.insertBefore(wrapper, addBtn);

        // Auto-scroll verso destra alla creazione dell'immagine
        photosContainer.scrollLeft = photosContainer.scrollWidth;
      };
      reader.readAsDataURL(file);
    });
    fileInput.value = '';
  });

  // Gestione Focus Campi
  titleInput.addEventListener('focus', () => { activeElement = titleInput; });
  descInput.addEventListener('focus', () => { activeElement = descInput; });

  titleInput.addEventListener('input', () => {
    titleInput.style.height = 'auto';
    titleInput.style.height = titleInput.scrollHeight + 'px';
  });

  // Cancella Testo
  clearTextBtn.addEventListener('click', () => {
    titleInput.value = '';
    titleInput.style.height = 'auto';
    descInput.value = '';
  });

  // Toggle Tendina Font
  fontSizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fontPickerPill.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!fontPickerPill.contains(e.target) && e.target !== fontSizeBtn) {
      fontPickerPill.classList.remove('active');
    }
  });

  // Salvataggio
  saveBtn.addEventListener('click', async () => {
    const titleText = titleInput.value.trim();
    const descText = descInput.value.trim();

    if (!titleText && !descText && loadedImagesBase64.length === 0) {
      alert("Inserisci almeno un titolo, una descrizione o una foto prima di salvare.");
      return;
    }

    const folderTitle = titleText ? titleText.replace(/[^a-zA-Z0-9_-]/g, '_') : 'Senza_Titolo';
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    const folderName = `${folderTitle}_${timeStamp}`;

    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem) {
        const Filesystem = window.Capacitor.Plugins.Filesystem;
        const Directory = 'DOCUMENTS';
        const subFolderPath = `Catalogo Piante/${folderName}`;

        await Filesystem.mkdir({
          path: subFolderPath,
          directory: Directory,
          recursive: true
        });

        const fullTextContent = `TITOLO:\n${titleText}\n\nDESCRIZIONE:\n${descText}`;
        await Filesystem.writeFile({
          path: `${subFolderPath}/scheda.txt`,
          data: fullTextContent,
          directory: Directory,
          encoding: 'utf8'
        });

        for (let i = 0; i < loadedImagesBase64.length; i++) {
          const base64Data = loadedImagesBase64[i].split(',')[1];
          await Filesystem.writeFile({
            path: `${subFolderPath}/foto_${i + 1}.jpg`,
            data: base64Data,
            directory: Directory
          });
        }

        alert(`Studio salvato in File: Renji / Catalogo Piante / ${folderName}`);
      } else {
        alert("Salvataggio simulato nel browser.");
      }

      // Reset Form
      titleInput.value = '';
      titleInput.style.height = 'auto';
      descInput.value = '';
      loadedImagesBase64 = [];
      document.querySelectorAll('.photo-wrapper').forEach(w => w.remove());
      fontPickerPill.classList.remove('active');
      window.closePianteModal();

    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio: " + err.message);
    }
  });
});
