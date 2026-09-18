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
    }

    .drawer-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #000000;
    }

    /* Tasto X dentro un cerchio stilizzato uguale al tasto header */
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
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      border-radius: 12px;
      background-color: #ffffff;
      color: #1f1f1f;
      font-size: 1rem;
      font-weight: 500;
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
        <div class="menu-item" data-action="new-chat">
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          <span>Nuova chat</span>
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

  // Gestione del click su Nuova Chat
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
