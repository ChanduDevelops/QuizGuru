let startBtn = document.getElementById("start-btn");
let header = document.querySelector(".header");
let ncMain = document.querySelector(".nc-main");
let noticeContainer = document.querySelector(".notice-container");

let qsnMain = document.querySelector(".qsns-main");

const goFullScreen = () => {
    header.classList.remove("hdr-visible");
    header.classList.add("hdr-hidden");

    ncMain.classList.remove("main-visible");
    ncMain.classList.add("main-hidden");

    noticeContainer.classList.remove("nc-visible");
    noticeContainer.classList.add("nc-hidden");

    qsnMain.classList.remove("main-hidden");
    qsnMain.classList.add("main-visible");
    console.log("qsn-main open");

    var elem = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
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

const timer = () => {
    const remainingTime = 90 * 60

}

let clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
    console.log(clearBtn);
    clearSelection();
});

startBtn.addEventListener("click", () => {
    Swal.fire({
        title: "Alert!",
        text: "You are about to enter full screen mode!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, start test"
    }).then((result) => {
        if (result.isConfirmed) {
            goFullScreen();
        }
    });
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