document.getElementById("hamburger").onclick = navbarDropDown

function navbarDropDown() {
    let control = document.getElementById("nav_drop")
    if (control.style.display == "flex") {
        control.style.display = "none"
        document.getElementById("hamburger_bars").style.display = "flex"
        document.getElementById("hamburger_x").style.display = "none"
    } else {
        control.style.display = "flex"
        document.getElementById("hamburger_bars").style.display = "none"
        document.getElementById("hamburger_x").style.display = "flex"
    } 
}