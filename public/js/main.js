var levelLinks = document.querySelectorAll('.level-type a')

const Tests = {
    "Arithmetic": "arithmetic",
    "Quantitative": "quantitative",
    "Reasoning": "reasoning",
    "Verbal": "verbal",
    "Current Affairs": "current_affairs",
    "Random Test": "random",
}

levelLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault()

        var testLevel = link?.textContent.toLowerCase()
        var levelParent = link.parentNode.parentNode
        var testCategory = Tests[levelParent.querySelector('.column-heading')?.textContent]

        // let url = `/users/qsns?testCategory=${testCategory}&testLevel=${testLevel}`
        // console.log(testCategory, testLevel);
        // window.location.href = url

        fetch(`http://127.0.0.1:2020/users/main`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                testCategory: testCategory,
                testLevel: testLevel
            })
        }).then(res => {
            if (res.ok)
                return res.json()
            else
                throw new Error("Response not OK")
        }).then(data => {
            if (data?.redirect) {
                window.location.href = data.redirect
            }
        }).catch(e => {
            notify(e, "red")
        })
    })
})

function findParentColumn(element) {
    while (element && element.classList.contains('column')) {
        element = element.parentElement
    }
    return element
}
