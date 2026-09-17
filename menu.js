document.addEventListener('DOMContentLoaded', () => {
  const leftBtn = document.getElementById('leftMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeMenuBtn');

  if (!leftBtn || !sideMenu || !overlay) return;

  function toggleMenu(open) {
    if (open) {
      sideMenu.classList.add('active');
      overlay.classList.add('active');
    } else {
      sideMenu.classList.remove('active');
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
});
