import Swiper from 'swiper'
import { Scrollbar } from 'swiper/modules'

new Swiper('.our-projects .swiper', {
    modules: [Scrollbar],
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
})
