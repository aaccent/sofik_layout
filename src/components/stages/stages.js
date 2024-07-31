import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

function stagesAnimation(stages) {
    const tl = gsap.timeline()
    stages.forEach((stage) => {
        tl.fromTo(
            stage,
            {
                '--progress': '0',
            },
            {
                '--progress': '100%',
                duration: 1,
                ease: 'none',
                onComplete: () => stage.classList.add('stages__list-item--active'),
            },
        )
        tl.fromTo(
            stage,
            {
                '--dot-progress': 0,
            },
            {
                '--dot-progress': '100%',
                duration: 0.5,
                ease: 'none',
            },
        )
    })
}

void (function () {
    const stagesList = document.querySelector('.stages__list')
    if (!stagesList) return
    const active = stagesList.querySelector('.stages__list-item--active')
    if (active) active.classList.remove('stages__list-item--active')
    const stages = stagesList.querySelectorAll('.stages__list-item ')

    ScrollTrigger.create({
        trigger: stagesList,
        start: 'top 70%',
        once: true,
        onEnter: () => stagesAnimation(stages),
        markers: true,
    })
})()
