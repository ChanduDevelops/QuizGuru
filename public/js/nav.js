const profileIcon = document.getElementById('profile-icon');
const profileDiv = document.querySelector('.profile-div');

function toggleProfileDiv(e) {
    profileDiv.classList.toggle("pd-hidden");
    profileDiv.classList.toggle("pd-visible");
}

// profileIcon.onclick = toggleProfileDiv;

document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !profileDiv.contains(e.target)) {
        profileDiv.classList.add("pd-hidden");
        profileDiv.classList.remove("pd-visible");
    }
})

const menuIcon = document.querySelector(".menu-icon");
const sideNav = document.querySelector(".side-nav");
const sideNavIcon = document.querySelector(".ic");

function toggleNavbar(e) {
    sideNav.classList.toggle("sn-visible");
    sideNav.classList.toggle("sn-hidden");
    sideNavIcon.classList.toggle("fa-close");
    sideNavIcon.classList.toggle("fa-navicon");
}
menuIcon.onclick = toggleNavbar;


document.addEventListener("click", (e) => {
    if (!menuIcon.contains(e.target) && !sideNav.contains(e.target)) {
        sideNav.classList.add("sn-hidden");
        sideNavIcon.classList.add("fa-navicon");

        sideNav.classList.remove("sn-visible");
        sideNavIcon.classList.remove("fa-close");
    }
})


function logout() {
    const signoutBtns = document.querySelectorAll(".signout");
    signoutBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "/logout";
        });
    });
}
logout();


const shareBtn = document.getElementById("share");
shareBtn.addEventListener("click", () => {
    const url = window.location.href;
    var msg = null;
    navigator.clipboard.writeText(url)
        .then(() => {
            msg = "Link copied!";
            notify(msg, "blue");
        })
        .catch(err => {
            msg = "Couldn't copy link!";
            notify(msg, "red");
        })
});

const signoutBtn = document.querySelector(".signout")
signoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const currentUser = sessionStorage.getItem()
    const currentUrl = "http://127.0.0.1:2020/users/"
    fetch(currentUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            u
            // get currentuser and remove from sessionstorage 
            // currentUser: sessionStorage.get()
        })
    })
})
