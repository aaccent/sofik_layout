import { openPopup } from 'features/popup/popup'
import { cookies, ONE_MONTH_IN_SECONDS, setCookie } from 'features/cookies'

void (function () {
    const popup = document.querySelector<HTMLElement>('[data-popup="call"]')
    const thxPopup = document.querySelector('.thx-popup')
    if (!popup) return

    const delay = parseInt(popup?.dataset.delay || '60000')
    const maxAge = Number(popup.dataset.maxAge) || ONE_MONTH_IN_SECONDS
    let timer = setTimeout(() => openPopup('call'), delay)
    let scrollCount = 0
    let lastScrollTime = 0

    window.addEventListener('scroll', () => {
        if (cookies().get('call-popup')) return
        if (checkScrolling() && timer) {
            clearTimeout(timer)
            timer = setTimeout(() => openPopup('call'), delay)
        }
    })

    document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState
        if (state === 'hidden') {
            clearTimeout(timer)
        } else {
            timer = setTimeout(() => openPopup('call'), delay)
        }
    })

    popup.addEventListener('closed', () => {
        setCookie('call-popup', '1', { maxAge })
    })

    thxPopup?.addEventListener('closed', () => {
        setCookie('call-popup', '1', { maxAge })
    })

    function checkScrolling() {
        const now = Date.now()
        if (now - lastScrollTime < 2000) {
            scrollCount++
        } else {
            scrollCount = 0
        }
        lastScrollTime = now

        return scrollCount > 2
    }
})()
