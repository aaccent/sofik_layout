import Swiper from 'swiper'
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules'

new Swiper('.main-hero .swiper', {
    modules: [Navigation, Pagination, EffectFade, Autoplay],
    navigation: {
        nextEl: '.main-hero__controls-btn._next',
        prevEl: '.main-hero__controls-btn._prev',
    },
    pagination: {
        el: '.main-hero__controls-pagination',
    },
    slidesPerView: 1,
    effect: 'fade',
    crossFade: true,
})
