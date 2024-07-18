import Swiper from 'swiper'

new Swiper('.our-clients .swiper', {
    spaceBetween: 30,
    slidesPerView: 1.35,
    breakpoints: {
        1200: {
            slidesPerView: 5.85,
        }
    }
})