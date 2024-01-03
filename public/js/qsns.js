const startBtn = document.getElementById("start-btn")
const header = document.querySelector(".header")
const ncMain = document.querySelector(".nc-main")
const noticeContainer = document.querySelector(".notice-container")

const qsnMain = document.querySelector(".qsns-main")

var category = document.querySelector(".category")
var levelType = document.querySelector(".level-type")
var qsn = document.querySelector(".qsn")

var option1 = document.querySelector(".option1")
var option2 = document.querySelector(".option2")
var option3 = document.querySelector(".option3")
var option4 = document.querySelector(".option4")
var selectedOption
var ans = null


var optionSelected = false

var [attempted, correctAnswerCount, wrongAnswerCount, unattemptedCount] = [0, 0, 0, 20]

var currentQsn = {

}
var currentQsnNo = 0
var qsnSet = []

document.querySelector('.options').addEventListener('click', (e) => {

    if (e.target && e.target.matches('.option')) {
        optionSelected = true
        switch (e.target.id) {
            case "option1": selectedOption = "a"
                break
            case "option2": selectedOption = "b"
                break
            case "option3": selectedOption = "c"
                break
            case "option4": selectedOption = "d"
                break
        }
        if (optionSelected) {
            attempted++
        }
        console.log(selectedOption);
        // console.log("answer", selectedOption);
    }
})

const goFullScreen = () => {
    header.classList.remove("hdr-visible");
    header.classList.add("hdr-hidden");

    ncMain.classList.remove("main-visible");
    ncMain.classList.add("main-hidden");

    noticeContainer.classList.remove("nc-visible");
    noticeContainer.classList.add("nc-hidden");

    qsnMain.classList.remove("main-hidden");
    qsnMain.classList.add("main-visible");
    // console.log("qsn-main open");

    var elem = document.documentElement;
    // if (!document.fullscreenElement && !document.mozFullScreenElement &&
    //     !document.webkitFullscreenElement && !document.msFullscreenElement) {
    //     if (elem.requestFullscreen) {
    //         elem.requestFullscreen();
    //     } else if (elem.msRequestFullscreen) {
    //         elem.msRequestFullscreen();
    //     } else if (elem.mozRequestFullScreen) {
    //         elem.mozRequestFullScreen();
    //     } else if (elem.webkitRequestFullscreen) {
    //         elem.webkitRequestFullscreen();
    //     }
    // }
}

const exitFullScreen = () => {
    var elem = document.documentElement;
    if (document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    qsnMain.classList.remove("main-visible");
    qsnMain.classList.add("main-hidden");

    header.classList.remove("hdr-hidden");
    header.classList.add("hdr-visible");

    ncMain.classList.remove("main-hidden");
    ncMain.classList.add("main-visible");

    noticeContainer.classList.remove("nc-hidden");
    noticeContainer.classList.add("nc-visible");
    // console.log("main-visible");

}

const clearSelection = () => {
    var ele = document.querySelectorAll(".option");
    // console.log(ele);
    for (var i = 0; i < ele.length; i++)
        ele[i].checked = false
    if (optionSelected) {
        optionSelected = false
        attempted--
    }
    displayDetails()
}

const fetchQsns = () => {
    var urlParams = new URLSearchParams(window.location.search)
    var testCategory = urlParams.get("testCategory")
    var testLevel = urlParams.get("testLevel")

    let currentUrl = `http://127.0.0.1:2020/users/qsns?testCategory=${testCategory}&testLevel=${testLevel}`
    fetch(currentUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!testCategory || !testLevel) {
        window.location.href = "/users/main"
        return
    } else {
        fetch("http://127.0.0.1:2020/users/qsns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                testCategory,
                testLevel
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Questions not found! Try again later!!")
            }
        }).then(data => {
            if (data?.bitPack) {
                qsnSet = data.bitPack
                console.log("no of qsns", qsnSet.length);
            }
        }).catch(e => {
            notify(e.message, "red")
            setTimeout(() => {
                window.location.href = "/users/main"
            }, 1250)

        })
    }
}

const renderQsn = qsnNo => {
    clearSelection()
    let currentQsn = qsnSet[qsnNo]
    console.log(currentQsn)
    let categoryText = currentQsn.category
    category.textContent = categoryText.charAt(0).toUpperCase()
        + categoryText.slice(1)

    let levelText = currentQsn.level
    levelType.textContent = levelText.charAt(0).toUpperCase() + levelText.slice(1)

    qsn.textContent = "Q. " + currentQsn.qsn
    option1.textContent = currentQsn.a
    option2.textContent = currentQsn.b
    option3.textContent = currentQsn.c
    option4.textContent = currentQsn.d
    ans = qsnSet[qsnNo].ans
}

const getNextQsn = qsnNo => {
    renderQsn(qsnNo + 1)
}
const getprevQsn = qsnNo => {
    if (qsnNo === 0) {
        notify("This is first question", "orange")
        return
    }
    renderQsn(qsnNo - 1)
}

const timer = () => {
    const remainingTime = 90 * 60
}

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clearSelection)

startBtn.addEventListener("click", () => {
    // if (qsnSet?.length < 1) {
    //     window.location.href = "/users/main"
    //     return
    // } else {
    Swal.fire({
        title: "Alert!",
        text: "You are about to enter full screen mode!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, start test"
    }).then((result) => {
        if (result.isConfirmed) {
            goFullScreen()
            renderQsn(currentQsnNo)
        }
    })
})

// const prevoiusBtn = document.getElementById("prev-btn")
// prevoiusBtn.addEventListener("click", () => {
//     getprevQsn(currentQsnNo)
//     currentQsnNo--
// })


const saveAndNextBtn = document.getElementById("next-btn")
saveAndNextBtn.addEventListener("click", async () => {
    if (currentQsnNo === qsnSet.length - 1) {
        await notify("This is the last question!", "orange")
        return
    }


    if (!selectedOption) {
        unattemptedCount += 1
    } else if (selectedOption === ans) {
        correctAnswerCount += 1
        attempted++
    } else {
        wrongAnswerCount += 1
        attempted++
    }
    displayDetails()

    getNextQsn(currentQsnNo)
    currentQsnNo++
})

function displayDetails() {
    console.log("qsn no", currentQsnNo)

    console.log("attempted", attempted);
    console.log("crct", correctAnswerCount)
    console.log("wrong", wrongAnswerCount)
    console.log("unatt", unattemptedCount)
}

const submitTest = document.getElementById("end-test")
submitTest.addEventListener("click", () => {
    Swal.fire({
        title: "Alert!",
        text: "Do you really want to submit the test?",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#357cb4",
        confirmButtonText: "Yes, End test"
    }).then((result) => {
        if (result.isConfirmed) {
            exitFullScreen()
            console.log(correctAnswerCount);
            // ? correctAnswerCount = ${ correctAnswerCount }& wrongAnswerCount=${ wrongAnswerCount }& unattemptedCount=${ unattemptedCount }
            fetch(`http://127.0.0.1:2020/users/report`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        correctAnswerCount,
                        wrongAnswerCount,
                        unattemptedCount: qsnSet.length - attempted
                    })
                }).then(res => {
                    if (res.status === 200) {
                        window.location.href = "/users/report.html"
                    } else {
                        throw new Error("Something went wrong, Try again later")
                    }
                }).catch(e => {
                    notify(e, "red")
                })
        }
    })
})


window.onload = function () {
    fetchQsns()
}