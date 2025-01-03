document.getElementById("hamburger").onclick = navbarDropDown

function navbarDropDown() {
    let control = document.getElementById("nav_drop")
    if (control.style.display == "flex") {
        control.style.display = "none"
    } else control.style.display = "flex"
}