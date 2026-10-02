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
      border-bottom: 1px solid #e0e0e0;
      background-color: #ffffff;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .piante-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #000000;
      text-transform: none; /* Non tutto maiuscolo */
    }

    .piante-close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      color: #000000; /* X nera */
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    }

    /* BODY */
    .piante-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 16px;
      overflow-y: auto;
    }

    /* SEZIONE FOTO SCORREVOLE */
    .photos-scroll-container {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin; /* Barra di scorrimento */
    }

    .photo-card {
      width: 100px;
      height: 100px;
      border-radius: 14px;
      object-fit: cover;
      border: 1px solid #e0e0e0;
      flex-shrink: 0;
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
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    /* SCHEDA PRINCIPALE */
    .main-card {
      flex: 1;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: #ffffff;
    }

    /* BARRA SALVA E SELETTORE FONT */
    .card-actions-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      min-height: 38px;
    }

    /* CERCHIO / PILLOLA FONT */
    .font-size-control {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #000000;
      border-radius: 20px;
      height: 34px;
      padding: 0 10px;
      cursor: pointer;
      transition: all 0.25s ease;
      user-select: none;
    }

    .font-size-number {
      font-size: 0.85rem;
      font-weight: 700;
      color: #000000;
    }

    .font-slider-wrapper {
      display: none;
      align-items: center;
      gap: 8px;
      margin-left: 6px;
    }

    .font-size-control.expanded .font-slider-wrapper {
      display: flex;
    }

    .font-slider {
      width: 90px;
      accent-color: #000000;
    }

    .save-btn {
      background-color: #ffffff;
      color: #000000;
      border: 1px solid #000000;
      border-radius: 18px;
      padding: 6px 18px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }

    .save-btn:active {
      background-color: #f2f2f7;
    }

    /* CAMPI TESTO */
    .inputs-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .title-input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 22px; /* Font più grande */
      font-weight: 700;
      color: #000000;
      background: transparent;
      padding: 4px 0;
      box-sizing: border-box;
    }

    .title-input::placeholder {
      color: #8e8e93;
      font-weight: 600;
    }

    .description-textarea {
      width: 100%;
      flex: 1;
      border: none;
      outline: none;
      font-size: 15px; /* Font più piccolo */
      font-weight: 400;
      color: #3a3a3c;
      background: transparent;
      resize: none;
      font-family: inherit;
      padding: 4px 0;
      box-sizing: border-box;
    }

    .description-textarea::placeholder {
      color: #8e8e93;
    }
  `;
  document.head.appendChild(style);

  // HTML Schermata
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="piante-modal" id="pianteModal">
      <div class="piante-header">
        <span class="piante-title">Catalogo piante</span>
        <button type="button" class="piante-close-btn" id="closePianteBtn">&times;</button>
      </div>

      <div class="piante-body">
        <input type="file" id="pianteFileInput" accept="image/*" style="display:none;" multiple>
        
        <!-- Scorrimento foto -->
        <div class="photos-scroll-container" id="photosScrollContainer">
          <button type="button" class="add-photo-circle-btn" id="pianteAddBtn">+</button>
        </div>

        <!-- Scheda con controlli e testo -->
        <div class="main-card">
          <div class="card-actions-row">
            <!-- Cerchio / Pillola dimensione font -->
            <div class="font-size-control" id="fontSizeControl">
              <span class="font-size-number" id="fontSizeDisplay">22</span>
              <div class="font-slider-wrapper">
                <input type="range" class="font-slider" id="fontSlider" min="10" max="40" value="22">
              </div>
            </div>

            <!-- Tasto Salva -->
            <button type="button" class="save-btn" id="pianteSaveBtn">SALVA</button>
          </div>

          <!-- Campi Titolo e Descrizione -->
          <div class="inputs-container">
            <input type="text" class="title-input" id="plantTitleInput" placeholder="Titolo..." />
            <textarea class="description-textarea" id="plantDescInput" placeholder="Descrizione..."></textarea>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Elementi DOM
  const closeBtn = document.getElementById('closePianteBtn');
  const fileInput = document.getElementById('pianteFileInput');
  const addBtn = document.getElementById('pianteAddBtn');
  const photosContainer = document.getElementById('photosScrollContainer');
  const titleInput = document.getElementById('plantTitleInput');
  const descInput = document.getElementById('plantDescInput');
  const fontSizeControl = document.getElementById('fontSizeControl');
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  const fontSlider = document.getElementById('fontSlider');
  const saveBtn = document.getElementById('pianteSaveBtn');

  let loadedImagesBase64 = [];
  let activeElement = titleInput; // Elemento di testo attivo di default

  // Chiusura schermata
  closeBtn.addEventListener('click', () => window.closePianteModal());

  // Apertura selettore file
  addBtn.addEventListener('click', () => fileInput.click());

  // Aggiunta immagini
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64 = evt.target.result;
        loadedImagesBase64.push(base64);

        // Crea miniatura
        const img = document.createElement('img');
        img.src = base64;
        img.className = 'photo-card';

        // Inserisce l'immagine prima del pulsante +
        photosContainer.insertBefore(img, addBtn);
      };
      reader.readAsDataURL(file);
    });
    fileInput.value = '';
  });

  // Traccia quale campo si sta modificando per aggiornare il numero nel cerchio
  function updateActiveField(el) {
    activeElement = el;
    const currentSize = parseInt(window.getComputedStyle(activeElement).fontSize);
    fontSizeDisplay.textContent = currentSize;
    fontSlider.value = currentSize;
  }

  titleInput.addEventListener('focus', () => updateActiveField(titleInput));
  descInput.addEventListener('focus', () => updateActiveField(descInput));

  // Toggle Espansione Pillola Font
  fontSizeControl.addEventListener('click', (e) => {
    if (e.target !== fontSlider) {
      fontSizeControl.classList.toggle('expanded');
    }
  });

  // Modifica dimensione font tramite Slider (Ghiera)
  fontSlider.addEventListener('input', (e) => {
    const newSize = e.target.value;
    fontSizeDisplay.textContent = newSize;
    if (activeElement) {
      activeElement.style.fontSize = `${newSize}px`;
    }
  });

  // Salvataggio su iPhone (Capacitor Filesystem)
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

        // Crea la cartella "Catalogo Piante/Nome_Pianta_Data"
        await Filesystem.mkdir({
          path: subFolderPath,
          directory: Directory,
          recursive: true
        });

        // Salva Testo (Titolo + Descrizione)
        const fullTextContent = `TITOLO:\n${titleText}\n\nDESCRIZIONE:\n${descText}`;
        await Filesystem.writeFile({
          path: `${subFolderPath}/scheda.txt`,
          data: fullTextContent,
          directory: Directory,
          encoding: 'utf8'
        });

        // Salva le foto numerate
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

      // Reset dell'interfaccia
      titleInput.value = '';
      descInput.value = '';
      loadedImagesBase64 = [];
      document.querySelectorAll('.photo-card').forEach(img => img.remove());
      fontSizeControl.classList.remove('expanded');
      window.closePianteModal();

    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio: " + err.message);
    }
  });
});
