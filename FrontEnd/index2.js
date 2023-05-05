
const filter_all = document.querySelector(".filter_all")
const filter_objets = document.querySelector(".filter_objets");
const filter_appartements = document.querySelector(".filter_appartements");
const filter_hotels_restaurants = document.querySelector(".filter_hotels_restaurants")
const filter__container = document.querySelector(".filter__container");

const modify_btn = document.querySelectorAll(".edit__container")
const edit = document.querySelector(".editMode")
const modal = document.querySelector(".modal")
const modal_wrapper = document.querySelector(".modal_wrapper")
const modal_header = document.querySelector(".modal_header")
const modal_footer = document.querySelector(".modal_footer")
const modal_footer_add = document.querySelector(".modal_footer_add")
const modal_footerBtn = document.querySelector(".modal_footerBtn")
const modal_footerInput = document.querySelector(".modal_footer input")
const header_title = document.querySelector(".header_title")
const modalClose = document.querySelector(".modalClose")
const modalBack = document.querySelector(".modalBack")
const modal_content = document.querySelector(".modal_content")
const galleryModal = document.querySelector(".galleryModal")
const addContent_picture = document.querySelector(".addContent_picture")




const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
 
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

const addContent = document.querySelector(".addContent")

addContent.addEventListener("submit", async function(e) {
    e.preventDefault()


    const imageUrl = document.querySelector("[name=image]").files[0];
    const title = document.querySelector("[name=title]").value;
    const categoryId = document.querySelector("#categoryId").selectedIndex;
    

    const formData = new FormData()
        formData.append("image", imageUrl)
        formData.append("title", title)
        formData.append("category", categoryId)

    await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("valeur")}`,
        },
        body: formData
    })

    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
})



async function genererWorksMoldal() {
    
    works.map((item) => {
        const galleryModal = document.querySelector(".galleryModal");

        const figure = document.createElement("figure");
        figure.classList.add("article")
        figure.dataset.x = item.category.name
        figure.setAttribute("data-id", item.id)

        const image = document.createElement("img");   
        image.src = item.imageUrl;
    
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = "editer";
        figCaption.style.marginTop = "5px"

        const icone = document.createElement("div");
        icone.classList.add("iconDel")
        icone.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        icone.style.position = "absolute";
        icone.style.top = "5px";
        icone.style.right = "5px";
        icone.style.cursor = "pointer";
        icone.style.zIndex = "10"

        figure.appendChild(icone)
        figure.appendChild(image);
        figure.appendChild(figCaption);
        galleryModal.appendChild(figure); 

        icone.addEventListener("click", async function() {
            const id = figure.getAttribute("data-id")
            console.log("on a clique ! Ceci est l'id clique: ", id)      

                const res = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("valeur")}`
                    }
                })
                .then(res => res.json()) // or res.json()
                .then(res => console.log(res))
                
                if (res.status === 200) {
                    console.log("res.status 200 ok !")
                } else {
                    console.log("res.status not good !", res.status)
                }                     
        })
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
     console.log("ceci est le resulta de x: ", x)
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


} else {
    console.log("je ne suis pas ici !")
}




modalClose.onclick = function() {
    modal.style.display = "none"
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

const addPicture = document.querySelector(".modal_footer input")
addPicture.addEventListener("click", function() {
    console.log("ajout photo")
    header_title.innerHTML = "Ajout photo"
    galleryModal.style.display = "none"
    modalBack.style.display = "block"
    addContent.style.display = "flex"
    addPicture.style.display = "none"
    modal_footerInput.style.display = "none"
    modal_footer.style.display = "none"


})

modalBack.addEventListener("click", function() {
    header_title.innerHTML = "Galerie photo"
    galleryModal.style.display = "flex"
    modalBack.style.display = "none"
    addContent.style.display = "none"
    addPicture.style.backgroundColor = "#1D6154"
    modal_footerInput.style.display = "block"
    modal_footer.style.display = "block"

})

  

genererWorks(works);
genererWorksMoldal(works);
