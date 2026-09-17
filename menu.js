// menu.js - Gestione separata del menu e del pannello laterale
document.addEventListener('DOMContentLoaded', () => {
  const leftBtn = document.getElementById('leftMenuBtn');
  if (!leftBtn) return;

  // 1. Crea Overlay se non esiste
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
  }

  // 2. Crea Side Menu se non esiste
  let sideMenu = document.querySelector('.side-menu');
  if (!sideMenu) {
    sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.innerHTML = `
      <div class="side-menu-header">
        <h2 style="font-size: 1.2rem; font-weight: 700;">Menu</h2>
        <button class="close-menu-btn" type="button">&times;</button>
      </div>
      <div class="side-menu-content">
        <ul>
          <li>Nuova Chat</li>
          <li>Impostazioni</li>
          <li>Info su Renji</li>
        </ul>
      </div>
    `;
    document.body.appendChild(sideMenu);
  }

  // Funzioni per aprire/chiudere
  function openMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sideMenu.classList.add('active');
    overlay.classList.add('active');
  }

  function closeMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  }

  // Event Listener sul pulsante in alto a sinistra
  leftBtn.addEventListener('click', openMenu);
  leftBtn.addEventListener('touchstart', openMenu, { passive: false });

  // Event Listener per chiudere cliccando sull'overlay
  overlay.addEventListener('click', closeMenu);
  overlay.addEventListener('touchstart', closeMenu, { passive: false });

  // Event Listener per il pulsante di chiusura (x)
  const closeBtn = sideMenu.querySelector('.close-menu-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
    closeBtn.addEventListener('touchstart', closeMenu, { passive: false });
  }
});
