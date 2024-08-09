import { openPopup } from 'features/popup/popup'

void (function () {
    const calculatorForm = document.querySelector('form.calculator__form')
    const popupForm = document.querySelector('.call-popup form')
    const popup = document.querySelector('.call-popup')

    calculatorForm.addEventListener('submit', (e) => {
        openPopup('call')
        e.preventDefault()

        const container = document.createElement('div')
        container.className = 'hidden-inputs'
        container.style.position = 'absolute'
        container.style.visibility = 'invisible'

        popup.addEventListener(
            'closed',
            () => {
                container.remove()
            },
            { once: true },
        )

        const amount = document.createElement('input')
        const amountInput = document.querySelector('input[name="amount"]')
        amount.setAttribute('type', 'hidden')
        amount.setAttribute('name', 'calc-amount')
        amount.value = amountInput.value

        const period = document.createElement('input')
        const periodInput = document.querySelector('input[name="period"]')
        period.setAttribute('type', 'hidden')
        period.setAttribute('name', 'calc-period')
        period.value = periodInput.value

        const rate = document.createElement('input')
        const rateInput = document.querySelector('.calculator__field-rate')
        rate.setAttribute('type', 'hidden')
        rate.setAttribute('name', 'calc-rate')
        rate.value = rateInput.dataset.value

        const result = document.createElement('input')
        const resultInput = document.querySelector('.calculator__field-output')
        result.setAttribute('type', 'hidden')
        result.setAttribute('name', 'calc-result')
        result.value = resultInput.value

        container.append(amount, period, rate, result)
        popupForm.append(container)
    })
})()
