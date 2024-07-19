import Swiper from 'swiper'
import { Scrollbar } from 'swiper/modules'

new Swiper('.specialists__list.swiper', {
    modules: [Scrollbar],
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    slidesPerView: 'auto',
    spaceBetween: 30,
    breakpoints: {
        1000: {
            slidesPerView: 4,
        },
    },
})
