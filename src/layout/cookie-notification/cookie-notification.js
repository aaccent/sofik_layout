import { COOKIES, cookies, setCookie } from 'features/cookies'

void (function () {
    const cookieNotification = document.querySelector('.cookie-notification')
    if (!cookieNotification) return

    const cookieValue = cookies().get(COOKIES.COOKIE_NOTIFICATION)

    if (cookieValue) return

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => cookieNotification.classList.add('_active'), 600)
    })

    const button = cookieNotification.querySelector('.cookie-notification__button')
    button.addEventListener('click', () => {
        setCookie(COOKIES.COOKIE_NOTIFICATION, 'true')
        cookieNotification.classList.remove('_active')
    })
})()
