var levelLinks = document.querySelectorAll('.level-type a')

const Tests = {
    "Arithmetic": "arithmetic",
    "Quantitative": "quantitative",
    "Reasoning": "reasoning",
    "Verbal": "verbal",
    "Current Affairs": "current _affairs",
    "Random Test": "random",
}

levelLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault()

        var levelType = link.textContent.toLowerCase()

        var levelParent = findParentColumn(link)

        var testType = Tests[levelParent.querySelector('.column-heading').textContent]

        fetch("http://127.0.0.1:2020/users/qsns", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                testType,
                levelType
            })
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw new Error("Something went wrong")
            }
        }).then(data => {
            if (data && data.redirect) {
                window.location.href = data.redirect
            }
        }).catch(e => {
            notify(e, "red")
        })
    })
})

function findParentColumn(element) {
    while (element && !element.classList.contains('column')) {
        element = element.parentElement
    }
    return element
}
