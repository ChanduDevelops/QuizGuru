function notify(msg, color = "#357cb4") {
    let timeoutId
    let notificationDiv = document.querySelector(".notification");
    notificationDiv.classList.remove("close");
    notificationDiv.classList.add("active");
    if (msg) {
        switch (color) {
            case "green" || "Green":
                color = "#00bf00";
                break;
            case "red" || "Red":
                color = "#ff0000";
                break;
            case "blue" || "Blue":
                color = "#357cb4";
                break;
        }
        document.documentElement.style.setProperty('--notification-bg', color);
    }
    else {
        color = "#ff0000";
        document.documentElement.style.setProperty('--notification-bg', color);
        msg = "Something wnet wrong!";
    }

    notificationDiv.textContent = msg;
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        notificationDiv.className = "notification close"
    }, 3000)
    // console.log(msg);
}