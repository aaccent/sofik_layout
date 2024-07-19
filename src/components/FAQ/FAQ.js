const questions = document.querySelectorAll('.faq__item')
questions.forEach((question) => {
    question.addEventListener('click', () => {
        const opened = document.querySelector('.faq__item._opened')
        if (opened && opened !== question) opened.classList.remove('_opened')
        question.classList.toggle('_opened')
    })
})
