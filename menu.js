// menu.js - Gestione del menu laterale
document.addEventListener('DOMContentLoaded', () => {
  const leftBtn = document.getElementById('leftMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeMenuBtn');

  if (!leftBtn || !sideMenu || !overlay) return;

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

  // Eventi di tocco e click sul pulsante cerchio in alto a sinistra
  leftBtn.addEventListener('touchstart', openMenu, { passive: false });
  leftBtn.addEventListener('click', openMenu);

  // Chiusura al tocco sull'overlay o sul pulsante (X)
  overlay.addEventListener('touchstart', closeMenu, { passive: false });
  overlay.addEventListener('click', closeMenu);

  if (closeBtn) {
    closeBtn.addEventListener('touchstart', closeMenu, { passive: false });
    closeBtn.addEventListener('click', closeMenu);
  }
});
