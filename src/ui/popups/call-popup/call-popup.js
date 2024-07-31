import { formSubmitHandler } from 'features/forms'

void (function () {
    const popupForm = document.querySelector('.call-popup form')

    popupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const form = e.currentTarget

        const amount = document.createElement('input')
        amount.setAttribute('type', 'hidden')
        amount.setAttribute('name', 'amountValue')
        amount.value = document.querySelector('input[name="amount"]').value

        const period = document.createElement('input')
        period.setAttribute('type', 'hidden')
        period.setAttribute('name', 'periodValue')
        period.value = document.querySelector('input[name="period"]').value

        const rate = document.createElement('input')
        rate.setAttribute('type', 'hidden')
        rate.setAttribute('name', 'rateValue')
        rate.value = document.querySelector('.calculator__field-rate').getAttribute('data-value')

        const result = document.createElement('input')
        result.setAttribute('type', 'hidden')
        result.setAttribute('name', 'resultValue')
        result.value = document.querySelector('.calculator__field-output').value

        form.append(amount, period, rate, result)

        const formData = new FormData(form)

        formSubmitHandler(e, formData)
    })
})()
