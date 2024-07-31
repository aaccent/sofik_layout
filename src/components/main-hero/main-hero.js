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

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    on: {
        init: () => {
            const bullets = document.querySelectorAll('.swiper-pagination-bullet')
            bullets.forEach((bullet) => {
                const span = document.createElement('span')
                span.innerHTML = `<svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" class="loader"></circle>
        </svg>`
                bullet.append(span)
            })
        },
        autoplayTimeLeft(s, time, progress) {
            const bullet = document.querySelector('.swiper-pagination-bullet')
            bullet.style.setProperty('--time', time / 1000)
        },
    },
})
