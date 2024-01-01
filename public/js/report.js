
const chart = document.getElementById('myChart');
var chartData = {
    labels: ["correct answers", "wrong answers", "not attemmpted"],
    data: [],
    colors: ["green", "red", "yellow"]

}

window.onload = function (e) {
    fetch("http://127.0.0.1:2020/users/report",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Something went wrong!")
            }
        })
        .then(data => {
            if (data?.correctAnswerCount >= 0 && data?.wrongAnswerCount >= 0 && data?.unattemptedCount >= 0 && data?.redirect) {
                chartData.data = [data.correctAnswerCount, data.wrongAnswerCount, data.unattemptedCount]
                displayPie()
                displayEndMsg(chartData)
            }
        })
}


function displayPie() {
    new Chart(chart, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: "",
                data: chartData.data,
                borderColor: "#3f4653",
                backgroundColor: chartData.colors,
                borderWidth: 1,
            }]
        },
        options: {
            borderWidth: 20,
            borderRadius: 2,
            hoverBorderWidth: 4,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    })
}
// displayPie()

function displayEndMsg(chartData) {
    let correctAns = document.getElementById("crt-cnt")
    let wrongAns = document.getElementById("wrng-cnt")
    let unAns = document.getElementById("unans-cnt")

    correctAns.innerHTML = chartData?.data[0]
    wrongAns.innerHTML = chartData?.data[1]
    unAns.innerHTML = chartData?.data[2]

    let endMsg = document.querySelector(".end-msg")

    if (correctAns > wrongAns + unAns) {
        endMsg.innerHTML = "--- " + "You performed well !!" + " ---"
    }
    else {
        endMsg.innerHTML = "--- " + "Better luck next time" + " ---"
    }
}
// displayEndMsg()
