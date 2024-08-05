import { createYMap } from 'features/maps/createYMap'
import { formSubmitHandler } from 'features/forms'

void (function () {
    const contactsForm = document.querySelector('form.contacts-form__form')

    if (!contactsForm) return
    createYMap('.contacts-form__map')

    createYMap('.contacts-form__map')

    contactsForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const form = e.currentTarget
        /** @type {HTMLInputElement} */
        const fileInput = form.querySelector('input[type="file"]')

        const formData = new FormData(form)
        formData.delete(fileInput.name)

        fileInput.fileSet.forEach((file) => {
            formData.append(fileInput.name, file)
        })

        formSubmitHandler(e, formData)
    })
})()
