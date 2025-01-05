let currentProject = 0;
let projectCount = 0;
let currentCategory = "All projects"
const projects = document.querySelector('.slider');
const json = loadJSON("All projects");

document.getElementById("arrow_right").addEventListener("click", () => {
    scroll(currentProject + 1);
});
document.getElementById("arrow_left").addEventListener("click", () => {
    scroll(currentProject - 1);
});

function scroll(newIndex) {
    if (projectCount <= newIndex) {
        newIndex = 0
    }
    if (newIndex < 0) newIndex = projectCount - 1
    currentProject = newIndex

    if (window.matchMedia("(max-width: 1000px)").matches) projects.style.transform = "translateX(-"+ currentProject * 450 +"px)"
    else projects.style.transform = "translateX(-"+ currentProject * 1000 +"px)"

    for (let child of document.getElementById("dots").children) {
        child.classList = []
    }
    document.getElementById("dots").children[newIndex].className = "selected"
}

function loadJSON(category) {
    var request = new XMLHttpRequest();
    request.open("GET", "config.json", false);
    request.send(null);
    let json = JSON.parse(request.responseText);
    projects.innerHTML = ""
    document.getElementById("dots").innerHTML = ""
    document.querySelector('.categories').innerHTML = ""
    currentProject = 0;
    currentCategory = category
    projectCount = 0;
    projects.style.transition = "none"; 
    projects.style.transform = "translateX(0)"; 
    setTimeout(() => {
        projects.style.transition = "transform 0.5s ease-in-out"; 
    }, 0);

    let first = true
    let index = 0
    for (let i in json.projects) {
        let obj = json.projects[i]
        if (category != "All projects" && obj.category != category) continue

        let dot = document.createElement("div");
        ((currentIndex) => {
            dot.addEventListener("click", () => {
                console.log(currentIndex.toString());
                scroll(currentIndex); 
            });
        })(index);
        if (first) {
            dot.className = "selected"
            first = false
        } 
        if (i == 0) dot.className = "selected"
        document.getElementById("dots").appendChild(dot)

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

        let p = document.createElement("p")
        p.innerHTML = obj.description
        description.appendChild(p)

        if (obj.web_url == null || obj.web_url != "") {
            let a = document.createElement("a")
            a.className = "visit"
            a.target = "_blank"
            let icon = document.createElement("i")
            icon.classList = ["fa-solid", "fa-arrow-up-from-bracket"]
            a.appendChild(icon)
            a.innerHTML = "Visit Website"
            a.href = obj.web_url
            description.appendChild(a)
        }
        projectCount++
        console.log(index)
        index = index + 1
    }

    for (let i in json.categories) {
        let obj = json.categories[i]
        let div = document.createElement("div")
        div.style.color = obj.color
        if (obj.icon != null && obj.icon != "") {
            let icon = document.createElement("i")
            //icon.classList = obj.icon
            icon.className = "fa-solid fa-code"
            div.append(icon)
        }
        if (obj.img != null && obj.img != "") {
            let img = document.createElement("img")
            img.src = obj.img
            div.appendChild(img)
        }
        if (obj.name == currentCategory) div.className = "selected"
        div.append(obj.name)
        div.addEventListener("click", () => {
            if (currentCategory != obj.name) loadJSON(obj.name)
        })
        document.querySelector('.categories').appendChild(div)
    }

    return json
}