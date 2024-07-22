void (function () {
    const filter = document.querySelector('.blog-filter')
    if (!filter) return
    const filterBtns = filter.querySelectorAll('.blog-filter__button')

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const activeBtn = filter.querySelector('._active')

            if (activeBtn && activeBtn !== btn) activeBtn.classList.remove('_active')
            btn.classList.add('_active')
        })
    })
})()
