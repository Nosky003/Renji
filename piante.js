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
      font-size: 1.1rem;
      font-weight: 700;
      color: #000000;
      letter-spacing: 0.5px;
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
      font-size: 20px;
    }

    .piante-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 16px;
      overflow-y: auto;
    }

    .top-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .image-box {
      width: 110px;
      height: 110px;
      border: 2px dashed #a0a0a0;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #fafafa;
      overflow: hidden;
    }

    .image-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-placeholder-text {
      font-size: 0.85rem;
      color: #8e8e93;
    }

    .add-photo-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: #000000;
      color: #ffffff;
      border: none;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .description-container {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .description-textarea {
      width: 100%;
      flex: 1;
      min-height: 250px;
      border: 1px solid #c7c7cc;
      border-radius: 12px;
      padding: 12px;
      font-size: 1rem;
      font-family: inherit;
      resize: none;
      outline: none;
      box-sizing: border-box;
      background-color: #ffffff;
    }

    .save-btn-container {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .save-btn {
      background-color: #ffffff;
      color: #000000;
      border: 1px solid #000000;
      border-radius: 16px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .save-btn:active {
      background-color: #f2f2f7;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.innerHTML = `
    <div class="piante-modal" id="pianteModal">
      <div class="piante-header">
        <span class="piante-title">CATALOGO PIANTE</span>
        <button type="button" class="piante-close-btn" id="closePianteBtn">&times;</button>
      </div>

      <div class="piante-body">
        <input type="file" id="pianteFileInput" accept="image/*" style="display:none;">
        
        <div class="top-section">
          <div class="image-box" id="pianteImageBox">
            <span class="image-placeholder-text" id="pianteImgLabel">Foto 1</span>
            <img id="pianteImgPreview" src="" style="display:none;">
          </div>
          <button type="button" class="add-photo-btn" id="pianteAddBtn">+</button>
        </div>

        <div class="description-container">
          <textarea class="description-textarea" id="pianteDesc" placeholder="Scrivi la descrizione qui..."></textarea>
          <div class="save-btn-container">
            <button type="button" class="save-btn" id="pianteSaveBtn">SALVA</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const closeBtn = document.getElementById('closePianteBtn');
  const fileInput = document.getElementById('pianteFileInput');
  const addBtn = document.getElementById('pianteAddBtn');
  const imgPreview = document.getElementById('pianteImgPreview');
  const imgLabel = document.getElementById('pianteImgLabel');
  const saveBtn = document.getElementById('pianteSaveBtn');
  const descInput = document.getElementById('pianteDesc');

  let currentBase64Image = null;

  closeBtn.addEventListener('click', () => window.closePianteModal());
  addBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        currentBase64Image = evt.target.result;
        imgPreview.src = currentBase64Image;
        imgPreview.style.display = 'block';
        imgLabel.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });

  saveBtn.addEventListener('click', async () => {
    const descText = descInput.value.trim();
    if (!descText && !currentBase64Image) {
      alert("Inserisci un'immagine o una descrizione prima di salvare.");
      return;
    }

    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    const folderName = `Studio_${timeStamp}`;

    try {
      // Verifica presenza del plugin Filesystem Capacitor
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem) {
        const Filesystem = window.Capacitor.Plugins.Filesystem;
        const Directory = 'DOCUMENTS';

        // Crea la struttura: Renji / Catalogo Piante / Studio_...
        const subFolderPath = `Catalogo Piante/${folderName}`;

        await Filesystem.mkdir({
          path: subFolderPath,
          directory: Directory,
          recursive: true
        });

        // Salva la descrizione in TXT
        if (descText) {
          await Filesystem.writeFile({
            path: `${subFolderPath}/descrizione.txt`,
            data: descText,
            directory: Directory,
            encoding: 'utf8'
          });
        }

        // Salva la foto
        if (currentBase64Image) {
          const base64Data = currentBase64Image.split(',')[1];
          await Filesystem.writeFile({
            path: `${subFolderPath}/foto.jpg`,
            data: base64Data,
            directory: Directory
          });
        }

        alert(`Studio salvato con successo nella cartella File di iPhone in: Renji / Catalogo Piante / ${folderName}`);
      } else {
        alert("Salvataggio completato in modalità browser Web.");
      }

      // Reset dell'interfaccia
      descInput.value = '';
      currentBase64Image = null;
      imgPreview.style.display = 'none';
      imgLabel.style.display = 'block';
      fileInput.value = '';
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio dei file: " + err.message);
    }
  });
});
