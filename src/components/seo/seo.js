void (function () {
    const seoText = document.querySelector('.seo__text')
    if (!seoText) return
    const moreBtn = document.querySelector('.seo__button')

    moreBtn.addEventListener('click', () => {
        seoText.classList.toggle('_opened')
        seoText.classList.contains('_opened')
            ? (moreBtn.textContent = 'Скрыть')
            : (moreBtn.textContent = 'Читать полностью')
    })
})()
