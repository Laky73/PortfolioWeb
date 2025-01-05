let currentProject = 0;
const projects = document.querySelector('.slider');
const json = loadJSON();

document.getElementById("arrow_right").addEventListener("click", () => {
    scroll(currentProject + 1);
});
document.getElementById("arrow_left").addEventListener("click", () => {
    scroll(currentProject - 1);
});

function scroll(newIndex) {
    if (json.projects.length <= newIndex) {
        newIndex = 0
    }
    if (newIndex < 0) newIndex = json.projects.length
    currentProject = newIndex

    projects.style.transform = "translateX(-"+ currentProject * 1000 +"px)";

    for (let child of document.getElementById("dots").children) {
        child.classList = []
    }
    document.getElementById("dots").children[newIndex].className = "selected"
}

function loadJSON() {
    var request = new XMLHttpRequest();
    request.open("GET", "config.json", false);
    request.send(null);
    let json = JSON.parse(request.responseText);

    for (let i in json.projects) {
        let dot = document.createElement("div")
        if (i == 0) dot.className = "selected"
        document.getElementById("dots").appendChild(dot)

        let obj = json.projects[i]
        let newProject = document.createElement("div")
        newProject.className = "project"
        projects.appendChild(newProject)

        let img = document.createElement("img")
        img.src = obj.img
        newProject.appendChild(img)

        let description = document.createElement("div")
        description.className = "project_description"
        newProject.appendChild(description)

        let h = document.createElement("h3")
        h.innerHTML = obj.title
        description.appendChild(h)

        let p = document.createElement("p")
        p.innerHTML = obj.description
        description.appendChild(p)

        if (obj.web_url != "") {
            let a = document.createElement("a")
            a.className = "visit"
            a.target = "_blank"
            let icon = document.createElement("i")
            icon.classList = ["fa-solid", "fa-arrow-up-from-bracket"]
            a.appendChild(icon)
            a.innerHTML = "Visit Website"
        }

        let tags = document.createElement("div")
        tags.className = "languages"
        description.appendChild(tags)
        for (let j in obj.tags) {
            let tag = obj.tags[j]
            let t = document.createElement("div")
            t.className = "lang"
            t.innerHTML = tag.name
            t.style.color = tag.color
            tags.appendChild(t)
        }
    }
}