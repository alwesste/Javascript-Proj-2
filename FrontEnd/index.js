const filter_all = document.querySelector(".filter_all")
const filter_objets = document.querySelector(".filter_objets");
const filter_appartements = document.querySelector(".filter_appartements");
const filter_hotels_restaurants = document.querySelector(".filter_hotels_restaurants")
const filter__container = document.querySelector(".filter__container");

const modify_btn = document.querySelectorAll(".edit__container")
const edit = document.querySelector(".editMode")
const modal = document.querySelector(".modal")



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

async function genererWorks(works) {
   
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


filter_all.addEventListener("click", function() {
    handleFilter("Tous")
});

filter_objets.addEventListener("click", function() {
    handleFilter("Objets")
});

filter_appartements.addEventListener("click", function() {
    handleFilter("Appartements")
});

filter_hotels_restaurants.addEventListener("click", function() {
    handleFilter("Hotels & restaurants")
});

if (localStorage.getItem("valeur")) {
    
    filter__container.style.visibility = "hidden";
    edit.style.display = "block"

    modify_btn.forEach(function(btn) {        
        btn.style.display = "block"
        
        btn.addEventListener("click", function() {
            modal.style.display = "flex"
        })
    })
}

genererWorks(eliminateDuplicate(works, "title"))