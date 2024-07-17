import IMask from 'imask'

void (function () {
    const fields = document.querySelectorAll('.calculator__field:has(input)')
    if (!fields.length) return
    fields.forEach((field) => {
        field.addEventListener('click', () => {
            const input = field.querySelector('input')
            field.classList.add('_active')
            input.focus()
            input.onblur = () => {
                if (input.value) return
                field.classList.remove('_active')
            }

            input.oninput = () => {}
        })
    })

    const amountInput = document.querySelector('._amount input')
    IMask(amountInput, {
        mask: 'num ₽',
        lazy: false,

        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: ' ',
                max: 999999999999999999999,
            },
        },
    })
})()

void (function () {
    const dateInput = document.querySelector('input[type="date"]')
    if (!dateInput) return
    const field = dateInput.closest('._period')
    const periodOutput = field.querySelector('.calculator__field-input')

    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonth = String(now.getMonth() + 1).length < 2 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
    const nowDay = String(now.getDate()).length < 2 ? `0${now.getDate()}` : now.getDate()
    const today = `${nowYear}-${nowMonth}-${nowDay}`

    dateInput.setAttribute('min', today)

    dateInput.oninput = () => {
        const nowTimestamp = now.getTime()
        const resultTimestamp = new Date(dateInput.value).getTime()
        const periodTimestamp = resultTimestamp - nowTimestamp
        field.classList.add('_active')
        periodOutput.value = Math.round(periodTimestamp / 86400000)
    }
})()

void (function () {
    const selectors = document.querySelectorAll('.calculator__selector')
    if (!selectors.length) return
    selectors.forEach((selector) => {
        selector.addEventListener('click', () => {
            const activeSelector = document.querySelector('.calculator__selector._active')
            if (!activeSelector) return selector.classList.add('_active')
            if (activeSelector && activeSelector === selector) return selector.classList.remove('_active')
            activeSelector.classList.remove('_active')
            selector.classList.add('_active')
        })
    })

    const options = document.querySelectorAll('.calculator__selector-options-item')
    options.forEach((option) => {
        option.addEventListener('click', () => {
            const selected = option.closest('.calculator__selector').querySelector('.calculator__selector-selected')
            selected.textContent = option.textContent
        })
    })
})()
