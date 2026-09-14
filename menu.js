// menu.js - Gestione menu laterale a scorrimento da sinistra verso destra

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.top-bar .icon-btn:first-child');
  
  // Crea la struttura del menu e dell'overlay
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';

  const sideMenu = document.createElement('div');
  sideMenu.className = 'side-menu';
  sideMenu.innerHTML = `
    <div class="side-menu-header">
      <h2>Menu</h2>
      <button class="close-menu-btn">&times;</button>
    </div>
    <div class="side-menu-content">
      <ul>
        <li>Nuova Chat</li>
        <li>Impostazioni</li>
        <li>Info su Renji</li>
      </ul>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(sideMenu);

  function openMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
  }

  function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openMenu);
  }

  overlay.addEventListener('click', closeMenu);
  
  const closeBtn = sideMenu.querySelector('.close-menu-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }
});
