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
      background-color: rgba(0, 0, 0, 0.4);
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
      left: -300px;
      width: 300px;
      height: 100%;
      background-color: #ffffff;
      z-index: 1000;
      box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.25s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      padding-top: calc(env(safe-area-inset-top) + 16px);
      padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
    }
    .side-drawer.active {
      transform: translateX(300px);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    .drawer-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #000000;
    }
    .close-btn {
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: #666666;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
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
      gap: 14px;
      padding: 12px 16px;
      border-radius: 12px;
      background-color: #ffffff;
      color: #1f1f1f;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .menu-item:active {
      background-color: #f5f5f5;
    }
    .menu-item svg {
      width: 20px;
      height: 20px;
      fill: #444746;
    }

    .menu-divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 8px 0;
    }

    .drawer-footer {
      padding: 12px 20px;
      border-top: 1px solid #f0f0f0;
      font-size: 0.8rem;
      color: #8e8e93;
      text-align: center;
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
        <button type="button" class="close-btn" id="closeDrawerBtn">&times;</button>
      </div>

      <div class="drawer-content">
        <div class="menu-item" data-action="new-chat">
          <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          <span>Nuova Chat</span>
        </div>

        <div class="menu-item" data-action="history">
          <svg viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
          <span>Cronologia</span>
        </div>

        <div class="menu-divider"></div>

        <div class="menu-item" data-action="settings">
          <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <span>Impostazioni</span>
        </div>

        <div class="menu-item" data-action="about">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <span>Info su Renji</span>
        </div>
      </div>

      <div class="drawer-footer">
        Renji AI v1.0.0
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

  // Gestione dei click sulle voci di menu
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      toggleMenu(false);

      if (action === 'new-chat') {
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) chatContainer.innerHTML = '';
      } else if (action === 'settings') {
        alert('Impostazioni in arrivo!');
      } else if (action === 'about') {
        alert('Renji - Assistente AI');
      }
    });
  });
});
