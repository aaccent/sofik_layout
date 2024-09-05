import Swiper from 'swiper'
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules'

const DELAY = 5000

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
        delay: DELAY,
        disableOnInteraction: false,
    },
    on: {
        init: (swiper) => {
            const bullets = swiper.el.querySelectorAll('.swiper-pagination-bullet')
            bullets.forEach((bullet) => {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                svg.setAttribute('viewBox', '0 0 48 48')

                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

                circle.setAttribute('cx', '24')
                circle.setAttribute('cy', '24')
                circle.setAttribute('r', '20')

                svg.append(circle)
                const span = document.createElement('span')
                span.append(svg)

                bullet.append(span)

                let length
                try {
                    length = circle.getTotalLength()
                } catch {
                    length = 0
                }
                bullet.style.setProperty('--length', `${Math.trunc(length)}`)
            })

            swiper.el.style.setProperty('--time', `${DELAY}ms`)
        },
    },
})
