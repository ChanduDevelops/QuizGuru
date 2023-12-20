var loginForm = document.querySelector("form")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let email = document.getElementById("email").value
    let password = document.getElementById("pswd").value

    if (email === "" ||
        password === "") {
        notify("Must enter all fields", "orange")
    }
    else {
        let currentUrl = "http://127.0.0.1:2020/users/login"
        fetch(currentUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((response) => {
                if (response.ok || response.status === 401) {
                    return response.json()
                }
                else {
                    throw new Error("Something went wrong!")
                }
            })
            .then((data) => {
                if (data && data.redirect && !data.msg) {
                    notify("Login successfull!", "green")
                    setTimeout(() => {
                        window.location.href = data.redirect
                    }, 3000)
                } else if (data.msg === "wrong password") {
                    notify("Wrong password!", "red")
                    setTimeout(() => {
                        window.location.href = data.redirect
                    }, 3000)
                }
                else {
                    notify("User not found", "orange")
                    setTimeout(() => {
                        window.location.href = data.redirect
                    }, 3000)
                }
            })
            .catch((err) => {
                notify(err, "red");
            })
    }
})