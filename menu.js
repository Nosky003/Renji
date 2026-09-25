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
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform 0.25s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }
    .side-drawer.active {
      transform: translateX(0);
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
      -webkit-user-select: none;
      user-select: none;
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
        <!-- Nuova Chat -->
        <div class="menu-item" data-action="new-chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V12" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Nuova chat</span>
        </div>

        <!-- Cerca nelle chat -->
        <div class="menu-item" data-action="search-chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <line x1="15.5" y1="15.5" x2="21" y2="21" />
          </svg>
          <span>Cerca nelle chat</span>
        </div>

        <!-- Applicazioni di Renji -->
        <div class="menu-item" data-action="apps-renji">
          <svg viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Applicazioni di Renji</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(menuContainer);

  const leftBtn = document.getElementById('leftMenuBtn');
  const sideDrawer = document.getElementById('sideDrawer');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeDrawerBtn');

  function toggleMenu(open) {
    if (open) {
      sideDrawer.classList.add('active');
      overlay.classList.add('active');
    } else {
      sideDrawer.classList.remove('active');
      overlay.classList.remove('active');
    }
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(true);
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => toggleMenu(false));
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }

  // Gestione click sulle opzioni del menu
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = item.getAttribute('data-action');

      if (action === 'new-chat') {
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) chatContainer.innerHTML = '';
        toggleMenu(false);
      } else if (action === 'apps-renji') {
        toggleMenu(false);
        if (typeof window.openAppsModal === 'function') {
          window.openAppsModal();
        }
      } else {
        toggleMenu(false);
      }
    });
  });
});
