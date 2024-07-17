const submenuBtns = document.querySelectorAll('.menu-item:has(.submenu)')

submenuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const openedSubmenu = btn.closest('.menu').querySelector('._opened')
        if (openedSubmenu && openedSubmenu !== btn) openedSubmenu.classList.remove('_opened')
        btn.classList.toggle('_opened')
    })
})
