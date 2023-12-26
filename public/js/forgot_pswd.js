var form = document.querySelector("form")


form.addEventListener("submit", (e) => {
    let email = document.getElementById("email").value
    let password = document.getElementById("pswd").value
    let password2 = document.getElementById("pswd2").value
    e.preventDefault()

    if (password !== password2) {
        console.log(password, password2);
        notify("Password didn't match", "orange")
    }
    else {
        const currentUrl = "http://127.0.0.1:2020/users/forgot_pswd"
        fetch(currentUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => {
            if (res.ok || res.status === 404) {
                return res.json()
            }
            else {
                throw new Error("Something went wrong")
            }
        }).then((data) => {
            if (data && data.redirect && !data.msg) {
                Swal.fire({
                    title: "Successfully updated password!",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Go to Login page"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = data.redirect
                    }
                })
            }
            else if (data.msg === "not found") {
                Swal.fire({
                    title: "User not found!",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Go to Register page"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = data.redirect
                    }
                })
            }
            else {
                throw new Error()
            }
        }).catch(err => {
            notify("Something went wrong!", "red")
        })
    }
})