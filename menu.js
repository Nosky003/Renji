document.addEventListener('DOMContentLoaded', () => {
  // Inietta lo stile CSS del menu
  const style = document.createElement('style');
  style.textContent = `
    .side-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease-out;
    }
    .side-menu-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .side-drawer {
      position: fixed;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      z-index: 1000;
      transition: transform 0.25s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }
    .side-drawer.active {
      transform: translateX(100%);
    }

    .drawer-header {
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
    }

    .drawer-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #000000;
      line-height: 1;
      display: flex;
      align-items: center;
    }

    /* Tasto X dentro un cerchio stilizzato */
    .close-btn {
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

    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 0;
      border-radius: 8px;
      background-color: transparent;
      color: #000000;
      font-size: 1.05rem;
      font-weight: 400;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .menu-item:active {
      background-color: #f5f5f5;
    }
    .menu-item svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);

  // Inietta la struttura HTML del Drawer
  const menuContainer = document.createElement('div');
  menuContainer.innerHTML = `
    <div class="side-menu-overlay" id="menuOverlay"></div>
    <div class="side-drawer" id="sideDrawer">
      <div class="drawer-header">
        <span class="drawer-title">Renji</span>
        <button type="button" class="close-btn" id="closeDrawerBtn" aria-label="Chiudi">&times;</button>
      </div>

      <div class="drawer-content">
        <!-- Nuova Chat con linea definita nera (fill: none) -->
        <div class="menu-item" data-action="new-chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V12" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Nuova chat</span>
        </div>

        <!-- Cerca nelle chat con la nuova lente vettoriale nera -->
        <div class="menu-item" data-action="search-chat">
          <svg viewBox="0 0 980 980" fill="#000000">
            <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)">
              <path d="M3735 7504 c-427 -64 -769 -245 -1039 -549 -187 -69 211 -312 -464 -378 -762 -18 -83 -22 -131 -22 -313 -1 -238 14 -340 76 -525 2646 7 -787 1072 -1251 1885 -1086 209 43 450 148 622 272 l84 61 1146 -1146 c648 35 -647 1158 -1150 1174 -1156 48 -17 111 -12 148 13 70 47 97 127 69 204 -6 1 426 -509 526 -1157 1175 l-1146 1146 30 39 c17 21 51 70 76 108 317 493 346 1127 75 1646 -194 372 -547 672 -938 798 -177 57 -277 73 -485 76 -104 2 -203 1 -220 -1z m406 -340 c481 -82 873 -418 1027 -879 83 -251 84 -576 0 -820 -69 -203 -170 -365 -319 -514 -109 -110 -199 -175 -329 -241 -216 -108 -390 -146 -644 -137 -220 7 -358 42 -547 138 -348 177 -597 503 -685 894 -25 112 -30 353 -10 476 47 285 177 532 387 733 198 191 425 305 694 350 113 19 312 19 426 0z"/>
            </g>
          </svg>
          <span>Cerca nelle chat</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(menuContainer);

  const leftBtn = document.getElementById('leftMenuBtn');
  const sideDrawer = document.getElementById('sideDrawer');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeDrawerBtn');

  if (!leftBtn || !sideDrawer || !overlay) return;

  function toggleMenu(open) {
    if (open) {
      sideDrawer.classList.add('active');
      overlay.classList.add('active');
    } else {
      sideDrawer.classList.remove('active');
      overlay.classList.remove('active');
    }
  }

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu(false);
  };

  leftBtn.addEventListener('touchstart', handleOpen, { capture: true, passive: false });
  leftBtn.addEventListener('click', handleOpen, { capture: true });

  overlay.addEventListener('touchstart', handleClose, { capture: true, passive: false });
  overlay.addEventListener('click', handleClose, { capture: true });

  if (closeBtn) {
    closeBtn.addEventListener('touchstart', handleClose, { capture: true, passive: false });
    closeBtn.addEventListener('click', handleClose, { capture: true });
  }

  // Gestione del click sulle voci
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      toggleMenu(false);

      if (action === 'new-chat') {
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) chatContainer.innerHTML = '';
      }
    });
  });
});
