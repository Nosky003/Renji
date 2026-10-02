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
      padding: 12px 16px;
      padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
      gap: 12px;
      overflow-y: auto;
      box-sizing: border-box;
    }

    /* SEZIONE FOTO CON SCORRIMENTO ORIZZONTALE OTTIMIZZATO */
    .photos-scroll-container {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow-x: scroll !important;
      overflow-y: hidden;
      padding: 10px 16px 12px 4px;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x;
      flex-shrink: 0;
      min-height: 108px;
      width: 100%;
      box-sizing: border-box;
    }

    .photo-wrapper {
      position: relative;
      width: 90px;
      height: 90px;
      flex-shrink: 0;
    }

    .photo-card {
      width: 100%;
      height: 100%;
      border-radius: 14px;
      object-fit: cover;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    /* BOTTONE ELIMINA FOTO SENZA BORDO BIANCO */
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
      margin-right: 16px;
    }

    /* CONTENITORE PRINCIPALE DI DIMENSIONE FISSA E POSIZIONATO PIÙ IN BASSO */
    .main-card {
      height: 520px;
      max-height: calc(100vh - 220px);
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: #ffffff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
      position: relative;
      margin-top: 6px;
      box-sizing: border-box;
    }

    /* RIGA BOTTONI */
    .card-actions-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      position: relative;
      z-index: 20;
    }

    /* BOTTONE CESTINO */
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

    /* GHIERA FONT STILE IPHONE SULLA SOGLIA DEL RETTANGOLO */
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

    /* GHIERA VERTICALE SBURANTE SULLA PARTE SUPERIORE ED INFERIORE DEL RETTANGOLO */
    .font-picker-pill {
      display: none;
      position: absolute;
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      width: 48px;
      height: 160px;
      background-color: #ffffff;
      border-radius: 24px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      -webkit-overflow-scrolling: touch;
      z-index: 50;
      box-sizing: border-box;
      padding: 60px 0;
    }

    .font-picker-pill::-webkit-scrollbar {
      display: none;
    }

    .font-picker-pill.active {
      display: block;
    }

    /* BARRETTE ORIZZONTALI NERE AL CENTRO DELLA GHIERA */
    .font-picker-pill::before,
    .font-picker-pill::after {
      content: '';
      position: absolute;
      left: 6px;
      right: 6px;
      height: 1.5px;
      background-color: #000000;
      z-index: 60;
      pointer-events: none;
    }

    .font-picker-pill::before {
      top: 60px;
    }

    .font-picker-pill::after {
      top: 100px;
    }

    .font-option {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 500;
      color: #8e8e93;
      scroll-snap-align: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .font-option.selected {
      font-size: 1.1rem;
      font-weight: 800;
      color: #000000;
    }

    /* BOTTONE SALVA */
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

    /* CAMPI TESTO CON A CAPO AUTOMATICO */
    .inputs-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }

    .title-textarea {
      width: 100%;
      border: none;
      outline: none;
      font-size: 22px;
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
      min-height: 36px;
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
      font-size: 15px;
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

  // STRUTTURA HTML SCHERMATA
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="piante-modal" id="pianteModal">
      <div class="piante-header">
        <span class="piante-title">Catalogo piante</span>
        <button type="button" class="piante-close-btn" id="closePianteBtn">&times;</button>
      </div>

      <div class="piante-body">
        <input type="file" id="pianteFileInput" accept="image/*" style="display:none;" multiple>
        
        <!-- Scorrimento Foto -->
        <div class="photos-scroll-container" id="photosScrollContainer">
          <button type="button" class="add-photo-circle-btn" id="pianteAddBtn">+</button>
        </div>

        <!-- Scheda Testo & Comandi -->
        <div class="main-card">
          <div class="card-actions-row">
            <!-- Cestino -->
            <button type="button" class="trash-btn" id="clearTextBtn" title="Cancella testo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>

            <!-- Selettore Font a Ghiera iOS -->
            <div class="font-control-wrapper">
              <button type="button" class="font-size-circle" id="fontSizeBtn">22</button>
              <div class="font-picker-pill" id="fontPickerPill"></div>
            </div>

            <!-- Tasto Salva -->
            <button type="button" class="save-btn" id="pianteSaveBtn">SALVA</button>
          </div>

          <!-- Campi Titolo e Descrizione -->
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

  // Popola la ghiera del font (da 10px a 40px)
  for (let size = 10; size <= 40; size += 2) {
    const opt = document.createElement('div');
    opt.className = `font-option ${size === 22 ? 'selected' : ''}`;
    opt.dataset.size = size;
    opt.textContent = size;
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      selectFontSize(size);
      fontPickerPill.classList.remove('active');
    });
    fontPickerPill.appendChild(opt);
  }

  function selectFontSize(size) {
    fontSizeBtn.textContent = size;
    if (activeElement) {
      activeElement.style.fontSize = `${size}px`;
    }
    document.querySelectorAll('.font-option').forEach(opt => {
      if (parseInt(opt.dataset.size) === size) {
        opt.classList.add('selected');
        opt.scrollIntoView({ block: 'center', behavior: 'smooth' });
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  // Chiusura
  closeBtn.addEventListener('click', () => window.closePianteModal());

  // Apertura Foto
  addBtn.addEventListener('click', () => fileInput.click());

  // Caricamento Foto
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
      };
      reader.readAsDataURL(file);
    });
    fileInput.value = '';
  });

  // Gestione Focus Campi
  function updateActiveElement(el) {
    activeElement = el;
    const currentSize = parseInt(window.getComputedStyle(activeElement).fontSize);
    fontSizeBtn.textContent = currentSize;
  }

  titleInput.addEventListener('focus', () => updateActiveElement(titleInput));
  descInput.addEventListener('focus', () => updateActiveElement(descInput));

  titleInput.addEventListener('input', () => {
    titleInput.style.height = 'auto';
    titleInput.style.height = titleInput.scrollHeight + 'px';
  });

  // Cancella Tutto
  clearTextBtn.addEventListener('click', () => {
    titleInput.value = '';
    titleInput.style.height = 'auto';
    descInput.value = '';
  });

  // Mostra / Nascondi Ghiera Font
  fontSizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fontPickerPill.classList.toggle('active');
    if (fontPickerPill.classList.contains('active')) {
      const currentSize = parseInt(fontSizeBtn.textContent) || 22;
      selectFontSize(currentSize);
    }
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

      // Reset
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
