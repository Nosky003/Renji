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
      gap: 4px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #ffffff;
      color: #1f1f1f;
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
      fill: #444746;
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
        <!-- Nuova Chat con la nuova icona SVG convertita -->
        <div class="menu-item" data-action="new-chat">
          <svg viewBox="0 0 980 980">
            <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)">
              <path d="M4595 7349 c-411 -12 -830 -45 -994 -81 -393 -84 -745 -351 -935 -708 -133 -252 -165 -415 -202 -1055 -13 -221 -15 -376 -105 -740 3 -253 8 -491 11 -530 44 -557 61 -669 125 -830 134 -337 363 -592 60 377 -753 219 -112 406 -151 858 -177 61 -4 126 -9 145 -11 19 -3 229 -8 465 -4 311 381 -5 730 3 960 22 505 42 595 60 810 165 293 143 515 362 651 645 61 127 86 197 113 321 19 86 44 317 56 514 3 52 7 115 10 140 6 55 15 357 16 535 12 147 -6 176 -53 205 -42 25 -84 25 -126 0 -56 -34 -59 -55 -65 -390 -3 -168 -9 -339 -12 -380 -6 -78 -22 -282 -31 -385 -7 -91 -22 -171 -50 -268 -94 -333 -346 -614 -676 -753 -167 -70 -412 -102 -993 -129 -269 -13 -878 -5 -1185 16 -526 35 -694 79 -925 244 -250 178 -422 446 -478 745 -17 90 -42 354 -54 585 -10 182 -10 1001" />
            </g>
          </svg>
          <span>Nuova chat</span>
        </div>

        <!-- Cerca nelle chat -->
        <div class="menu-item" data-action="search-chat">
          <svg viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
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
