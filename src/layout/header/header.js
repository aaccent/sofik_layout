import { toggleScroll } from 'features/scroll.ts'
const openMenuButton = document.querySelector('.header__button-menu')
openMenuButton.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('_menu-opened')
    toggleScroll()
})
