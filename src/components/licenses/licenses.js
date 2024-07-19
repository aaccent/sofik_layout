import Swiper from 'swiper'
import { Scrollbar } from 'swiper/modules'

new Swiper('.licenses .swiper', {
    modules: [Scrollbar],
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    slidesPerView: 'auto',
    spaceBetween: 30,
    breakpoints: {
        1200: {
            slidesPerView: 4,
        },
    },
})
