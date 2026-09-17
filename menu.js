// menu.js - Gestione menu laterale
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('leftMenuBtn');
  
  if (document.querySelector('.side-menu')) return;

  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';

  const sideMenu = document.createElement('div');
  sideMenu.className = 'side-menu';
  sideMenu.innerHTML = `
    <div class="side-menu-header">
      <h2>Menu</h2>
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
    menuBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      openMenu();
    });
  }

  overlay.addEventListener('click', closeMenu);
  
  const closeBtn = sideMenu.querySelector('.close-menu-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }
});
