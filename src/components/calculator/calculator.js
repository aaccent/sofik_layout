import IMask from 'imask'
import AirDatepicker from 'air-datepicker'
import { suggestionPluralDay, suggestionPluralRubles } from 'features/pluralRules.ts'

document.querySelectorAll('input').forEach((input) => input.setAttribute('autocomplete', 'off'))

let amount
let period
let rate

void (function () {
    const resultOutput = document.querySelector('.calculator__field-rate')
    if (!resultOutput) return
    resultOutput.setAttribute('data-value', '0.015')
    rate = Number(resultOutput.getAttribute('data-value'))
})()

function showResult() {
    const resultOutput = document.querySelector('.calculator__field-output')

    if (!amount || !period) {
        resultOutput.value = '0 ₽'
    } else {
        const result = Math.round(((amount * rate) / 365) * period).toLocaleString('ru')
        if (result < 750) {
            resultOutput.value = `750 ₽`
        } else {
            resultOutput.value = `${result} ₽`
        }
    }
}

void (function () {
    const fields = document.querySelectorAll('.field:has(input)')
    if (!fields.length) return
    fields.forEach((field) => {
        field.addEventListener('click', (e) => {
            const input = field.querySelector('input')
            if (e.target.classList.contains('pseudo')) return
            field.classList.add('_active')
            input.focus()
            input.onblur = () => {
                if (input.value) return
                field.classList.remove('_active')
            }
        })
    })
})()

void (function () {
    const amountInput = document.querySelector('.field._amount input')
    const periodInput = document.querySelector('.field._period input')

    if (!amountInput || !periodInput) return

    const amountMasked = IMask(amountInput, {
        mask: Number,
        thousandsSeparator: ' ',
    })

    const periodMasked = IMask(periodInput, {
        mask: Number,
    })

    amountInput.addEventListener('blur', () => {
        if (amountInput.value) {
            amountInput.value += ` ${suggestionPluralRubles.get(Number(amountMasked.unmaskedValue))}`
            amount = Number(amountMasked.unmaskedValue)
            showResult()
        }
    })

    periodInput.addEventListener('blur', () => {
        if (periodInput.value) {
            periodInput.value += ` ${suggestionPluralDay.get(Number(periodMasked.unmaskedValue))}`
            period = Number(periodMasked.unmaskedValue)
            showResult()
        }
    })
})()

function showPeriod(arr, input) {
    if (arr.length !== 2) return
    const start = new Date(arr[0].toDateString())
    const end = new Date(arr[1].toDateString())
    const periodLength = Math.abs(end - start) / 86400000
    input.value = `${periodLength} ${suggestionPluralDay.get(periodLength)}`
    period = periodLength
    showResult()
}

void (function () {
    const field = document.querySelector('.field._period')
    if (!field) return
    const input = field.querySelector('input')

    const pseudoInput = document.createElement('input')
    pseudoInput.classList.add('pseudo')
    field.append(pseudoInput)

    new AirDatepicker(pseudoInput, {
        range: true,
        onSelect: ({ date }) => {
            showPeriod(date, input)
        },
    })
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
        const rateOutput = document.querySelector('.calculator__field-rate')
        option.addEventListener('click', () => {
            const selected = option.closest('.calculator__selector').querySelector('.calculator__selector-selected')
            const hiddenInput = option.closest('.calculator__selector-options').querySelector('input[type="hidden"]')
            selected.textContent = option.textContent
            hiddenInput.value = option.textContent
            if (option.textContent === 'Коммерческий контракт') {
                rateOutput.setAttribute('data-value', '0.03')
                rate = Number(rateOutput.getAttribute('data-value'))
            } else {
                rateOutput.setAttribute('data-value', '0.015')
                rate = rateOutput.getAttribute('data-value')
            }
            rateOutput.textContent = `${rate * 100}% годовых`
            showResult()
        })
    })
})()
