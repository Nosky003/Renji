// Definizione globale immediata per l'apertura del modal
window.openAppsModal = function() {
  const appsModal = document.getElementById('appsModal');
  if (appsModal) {
    void appsModal.offsetWidth;
    appsModal.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Inietta lo stile CSS per la schermata Applicazioni (Scorrevole da sinistra a destra)
  const style = document.createElement('style');
  style.textContent = `
    .apps-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      z-index: 2000;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      will-change: transform;
    }

    .apps-modal.active {
      transform: translateX(0);
    }

    .apps-header {
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

    .apps-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #000000;
      line-height: 1;
    }

    .apps-close-btn {
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

    .apps-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-content: flex-start;
      -webkit-overflow-scrolling: touch;
    }

    /* Card Applicazione */
    .app-card {
      width: 140px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      -webkit-user-select: none;
      user-select: none;
    }

    .app-icon-square {
      width: 72px;
      height: 72px;
      background-color: #f2f2f7;
      border: 1px solid #e5e5ea;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      transition: transform 0.15s ease, background-color 0.15s ease;
    }

    .app-card:active .app-icon-square {
      transform: scale(0.95);
      background-color: #e5e5ea;
    }

    .app-name {
      font-size: 0.95rem;
      font-weight: 600;
      color: #000000;
      margin-bottom: 2px;
      line-height: 1.2;
    }

    .app-description {
      font-size: 0.78rem;
      color: #666666;
      line-height: 1.25;
    }
  `;
  document.head.appendChild(style);

  // Inietta l'HTML della schermata Applicazioni
  const appsContainer = document.createElement('div');
  appsContainer.innerHTML = `
    <div class="apps-modal" id="appsModal">
      <div class="apps-header">
        <span class="apps-title">Applicazioni</span>
        <button type="button" class="apps-close-btn" id="closeAppsBtn" aria-label="Chiudi">&times;</button>
      </div>
      <div class="apps-body">
        <!-- Card App 3D Generator -->
        <div class="app-card" id="app3DCard">
          <div class="app-icon-square">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <span class="app-name">3D Creator</span>
          <span class="app-description">Crea forme e modelli 3D partendo dalle tue immagini</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(appsContainer);

  const appsModal = document.getElementById('appsModal');
  const closeAppsBtn = document.getElementById('closeAppsBtn');

  function closeAppsModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (appsModal) {
      appsModal.classList.remove('active');
    }
  }

  if (closeAppsBtn) {
    closeAppsBtn.addEventListener('touchstart', closeAppsModal, { capture: true, passive: false });
    closeAppsBtn.addEventListener('click', closeAppsModal, { capture: true });
  }
});
