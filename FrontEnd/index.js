const filter_all = document.querySelector("#filter_all")
const filter__container = document.querySelector(".filter__container");

const modify_btn = document.querySelectorAll(".edit__container")
const edit = document.querySelector(".editMode")
const modal = document.querySelector(".modal")

const log = document.querySelector(".log")


const works = await fetch("http://localhost:5678/api/works")
.then(res => res.json())

// annulation des doublons
const eliminateDuplicate = (array, propriete) => {

    const uniqueValue = new Set();  

    return array.filter((item) => {
        const value = item[propriete];
        if (!uniqueValue.has(value)) {
            uniqueValue.add(value);
            return true;
        }
        return false; 
    })
}

function genererWorks(works) {
   
    works.map((item) => {
        const gallery = document.querySelector(".gallery");

        const figure = document.createElement("figure");
        figure.classList.add("article")
        figure.dataset.x = item.category.name

        const image = document.createElement("img");   
        image.src = item.imageUrl;
 
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = item.title;

        figure.appendChild(image);
        figure.appendChild(figCaption);
        gallery.appendChild(figure); 
    })
}


filter_all.addEventListener("click", function() {
    handleFilter("Tous")
});



function handleFilter(x) {
    const figures = document.querySelectorAll(".article")
    figures.forEach(item => {
        if (item.dataset.x !== x) {
            item.style.display = "none"
        } else {
            item.style.display = "block"
        }
    })
    if (x === "Tous") {
        figures.forEach(item => {
            item.style.display = "block"
        })
    }
}

//gestion filter
const categories = await fetch ("http://localhost:5678/api/categories")
.then(response => response.json())

function createFilter(categories) {

    categories.map((category) => {
        const filter__container = document.querySelector(".filter__container");

        const button = document.createElement("button");
        button.classList.add("filter");
        button.dataset.cat = category.name;
        button.innerText = category.name;

        filter__container.appendChild(button)

        const filterButtons = document.querySelectorAll(".filter")
        filterButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const category = this.dataset.cat
                handleFilter(category)
            })
        })
    })
}


if (localStorage.getItem("valeur")) {

//logout 
    log.innerHTML = "logout";
    log.onclick =  function() {
        localStorage.removeItem("valeur");
        location.reload();
    }    

    filter__container.style.visibility = "hidden";
    edit.style.display = "block"

    modify_btn.forEach(function(btn) {        
        btn.style.display = "block"
        
        btn.addEventListener("click", function() {
            modal.style.display = "flex"
        })
    })
}

createFilter(categories)
genererWorks(eliminateDuplicate(works, "title"))