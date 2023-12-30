function notify(msg, color = "#357cb4") {
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
    setTimeout(() => {
        notificationDiv.className = "notification";
        notificationDiv.classList.add("close");
    }, 5000);
    notificationDiv.textContent = msg;
    // console.log(msg);
}