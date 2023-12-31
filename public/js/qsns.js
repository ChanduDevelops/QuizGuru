const startBtn = document.getElementById("start-btn");
const header = document.querySelector(".header");
const ncMain = document.querySelector(".nc-main");
const noticeContainer = document.querySelector(".notice-container");

const qsnMain = document.querySelector(".qsns-main");

var category = document.querySelector(".category")
var levelType = document.querySelector(".level-type")
var qsn = document.querySelector(".qsn")

var option1 = document.querySelector(".option1")
var option2 = document.querySelector(".option2")
var option3 = document.querySelector(".option3")
var option4 = document.querySelector(".option4")
var selected
var ans = null

var qsnSet = null

const getSelectedOption = () => {

    document.querySelector('.options').addEventListener('click', function (e) {
        if (e.target && e.target.matches('.option')) {
            // console.log('Option ' + e.target.id.split('option')[1] + ' is checked.');
            selected = e.target.id
        }
    })

    // var radios = document.getElementsByClassName('option');

    // for (var i = 0; i < radios.length; i++) {
    //     radios[i].addEventListener('change', function (e) {
    //         if (this.checked) {
    //             console.log('Option ' + this.id.split('option')[1] + ' is checked.');
    //             return this.id
    //         }
    //     });
    // }
    return null

    // var options = document.querySelectorAll(".option")
    // // console.log(options);
    // for (let option of options) {
    //     if (option.checked) {
    //         console.log(option.checked);
    //         return option
    //     }
    // }
    // return null
}

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
    console.log("main-visible");

}

const clearSelection = () => {
    var ele = document.querySelectorAll(".option");
    console.log(ele);
    for (var i = 0; i < ele.length; i++)
        ele[i].checked = false;
}

const fetchQsns = () => {
    let currentUrl = "http://127.0.0.1:2020/users/qsns"
    fetch(currentUrl, {
        method: "GET"
    })

    var urlParams = new URLSearchParams(window.location.search)
    testCategory = urlParams.get("testCategory")
    testLevel = urlParams.get("testLevel")
    console.log(testCategory, testLevel)
    if (testCategory && testLevel) {
        fetch(currentUrl, {
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
                console.log("error");
            }
        }).then(data => {
            if (data?.bitPack) {
                qsnSet = data.bitPack
            }
        })
    } else {
        window.location.href = "/users/main"
        return
    }
}

const getFirstQsn = () => {
    let categoryText = qsnSet[0].category
    category.textContent = categoryText.charAt(0).toUpperCase()
        + categoryText.slice(1)

    let levelText = qsnSet[0].level
    levelType.textContent = levelText.charAt(0).toUpperCase() + levelText.slice(1)

    qsn.textContent = "Q. " + qsnSet[0].qsn
    option1.textContent = qsnSet[0].optA
    option2.textContent = qsnSet[0].optB
    option3.textContent = qsnSet[0].optC
    option4.textContent = qsnSet[0].optD
    ans = qsnSet[0].ans
}
const getNextQsn = () => {

}
const timer = () => {
    const remainingTime = 90 * 60

}

let clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
    console.log(clearBtn);
    clearSelection();
});

startBtn.addEventListener("click", () => {
    // if (qsnSet.length < 1) {
    //     return
    // }
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
            getFirstQsn()
        }
    })
})

let endTest = document.getElementById("end-test");
endTest.addEventListener("click", () => {
    Swal.fire({
        title: "Alert!",
        text: "Do you really want to submit the test?",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#357cb4",
        confirmButtonText: "Yes, End test"
    }).then((result) => {
        if (result.isConfirmed) {
            exitFullScreen();
            correctAnswersCount = 0
            wrongAnswerCount = 0
            unattemptedCount = 0
            window.location.href = "/users/report.html"
        }
    });
});

const startTest = () => {
    //display qsns
}

window.onload = function () {
    fetchQsns()
}