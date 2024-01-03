var levelLinks = document.querySelectorAll(".level-type a")

// const Tests = {
//     "Arithmetic": "arithmetic",
//     "Quantitative": "quantitative",
//     "Reasoning": "reasoning",
//     "Verbal": "verbal",
//     "GK": "current_affairs",
//     "Current Affairs": "current_affairs",
//     "Random Test": "random",
// }

levelLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        var testLevel = link?.textContent.toLowerCase()
        var levelParent = link.parentNode.parentNode
        var testCategory = Tests[levelParent.querySelector(".column-heading")?.textContent]

        // let url = `/users/qsns?testCategory=${testCategory}&testLevel=${testLevel}`
        // console.log(testCategory, testLevel);
        // window.location.href = url

        sendTestData(testLevel, testCategory)
    })
})
