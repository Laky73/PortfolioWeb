document.getElementById("hamburger").onclick = navbarDropDown
let control = document.getElementById("nav_drop")

function navbarDropDown() {
    if (control.style.display == "flex") {
        navBarClose()
    } else {
        control.style.display = "flex"
        control.classList.add("nav_drop_animation_start")
        document.getElementById("hamburger_bars").style.display = "none"
        document.getElementById("hamburger_x").style.display = "flex"
        control.addEventListener("animationend", () => {
            control.classList.remove("nav_drop_animation_start");
        }, { once: true });
    } 
}

function navBarClose() {
    if (control.style.display != "flex") return;
    control.classList.add("nav_drop_animation_end")
    document.getElementById("hamburger_bars").style.display = "flex"
    document.getElementById("hamburger_x").style.display = "none"
    control.addEventListener("animationend", () => {
        control.style.display = "none"
        control.classList.remove("nav_drop_animation_end");
    }, { once: true });
}

document.addEventListener("keydown", function(event) { 
    if (event.key == "Escape") {
        navBarClose()
    }
})