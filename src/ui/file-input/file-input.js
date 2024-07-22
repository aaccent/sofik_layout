/**
 * @param {Set<File>} fileSet
 * @param {HTMLElement} container
 * */
function outputFileList(fileSet, container) {
    container.innerHTML = ''

    fileSet.forEach((file) => {
        const el = document.createElement('button')
        el.className = 'file-input__file'
        el.innerText = file.name
        el.type = 'button'
        el.addEventListener('click', () => {
            fileSet.delete(file)
            outputFileList(fileSet, container)
        })

        container.append(el)
    })
}

document.querySelectorAll('.file-input').forEach((fileInput) => {
    const input = fileInput.querySelector('input')
    const filesContainer = fileInput.querySelector('.file-input__files')

    const fileSet = new Set()
    input.fileSet = fileSet

    input.addEventListener('change', () => {
        for (const file of input.files) {
            fileSet.add(file)
        }

        outputFileList(fileSet, filesContainer)
    })
})
