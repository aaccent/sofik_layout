import { openPopup } from 'features/popup/popup'

function clearRequiredInputs(form: HTMLFormElement) {
    const requiredInputs = form.querySelectorAll<HTMLInputElement>('input[required]')
    requiredInputs.forEach((input) => {
        input.value = ''
    })
}

const forms = document.querySelectorAll<HTMLFormElement>('form[data-handler]')
forms.forEach((form) => {
    form.addEventListener('submit', submitHandler)
})

const formSent = new CustomEvent('formSent')

function submitHandler(e: SubmitEvent) {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const handlerPath = form.dataset.handler
    if (!handlerPath) return console.error('data-handler should be not empty. Form element:\n', form)

    if (!validateForm(form)) return

    fetch(handlerPath, {
        method: 'POST',
        body: formData,
    }).then((res) => {
        if (!res.ok) {
            return console.error(
                'Error while submitting form-section\n',
                'FormData:\n',
                formData,
                '\n',
                ' Response:\n',
                res,
            )
        }

        openPopup('thx')
        clearRequiredInputs(form)
        form.dispatchEvent(formSent)
    })
}

function createInvalidInput(input: HTMLInputElement) {
    const field = input.parentElement
    if (!field?.classList.contains('field')) return null

    const fieldWrapper = field.parentElement
    if (!fieldWrapper) return null
    if (fieldWrapper.classList.contains('field__wrapper')) return fieldWrapper

    const inputWrapper = document.createElement('div')
    inputWrapper.className = 'field__wrapper'
    inputWrapper.innerHTML = `<div class="field__error"></div>`

    field.parentElement.insertBefore(inputWrapper, field)
    inputWrapper.prepend(field)

    return inputWrapper
}

function setError(input: HTMLInputElement, error: string) {
    const inputWrapper = createInvalidInput(input)
    if (!inputWrapper) return

    const textContainer = inputWrapper.querySelector<HTMLDivElement>('.field__error')
    if (!textContainer) return

    textContainer.innerText = error
}

function validateForm(form: HTMLFormElement): Boolean {
    let valid = true

    const telInputs = form.querySelectorAll<HTMLInputElement>('input[type="tel"]')
    telInputs.forEach((input) => {
        const tel = input.value.replaceAll(/\D/g, '')
        if (/7\d{10}/.test(tel)) return

        valid = false
        input.classList.add('invalid')
        setError(input, 'Проверьте правильно ли указан номер')
        input.addEventListener('input', () => input.classList.remove('invalid'), { once: true })
    })

    const requiredInputs = form.querySelectorAll<HTMLInputElement>('input[required]')
    requiredInputs.forEach((input) => {
        if (input.value !== '') return

        valid = false
        input.classList.add('invalid')
        setError(input, 'Необходимо ввести данные')
        input.addEventListener('input', () => input.classList.remove('invalid'), { once: true })
    })

    return valid
}
