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
const modal_content = document.querySelector(".modal_content")
const galleryModal = document.querySelector(".galleryModal")
const addContent_picture = document.querySelector(".addContent_picture")
const imageSend = document.querySelector("#imageSend");


//creation de la modale
const works = await fetch("http://localhost:5678/api/works")
.then(response => response.json())

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

async function genererWorksMoldal(works) {
    
    works.map((item) => {
        const galleryModal = document.querySelector(".galleryModal");


        const figure = document.createElement("figure");
        figure.classList.add("article")
        figure.dataset.x = item.category.name
        figure.setAttribute("data-id", item.id)

        figure.addEventListener("mouseover", function () {
            this.classList.add("figureHover");
        })

        figure.addEventListener("mouseout", function () {
            this.classList.remove("figureHover");
        })

        const image = document.createElement("img");   
        image.src = item.imageUrl;
    
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = "editer";
        figCaption.style.marginTop = "5px"
        figCaption.setAttribute("data-name", item.title)

        const icone = document.createElement("div");
        icone.classList.add("iconDel")
        icone.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        icone.style.position = "absolute";
        icone.style.top = "5px";
        icone.style.right = "5px";
        icone.style.cursor = "pointer";
        icone.style.zIndex = "10"

        icone.addEventListener("mouseover", function() {
            this.classList.add("iconHover");
        });
          
        icone.addEventListener("mouseout", function() {
            this.classList.remove("iconHover");
        });


        figure.appendChild(icone)
        figure.appendChild(image);
        figure.appendChild(figCaption);
        galleryModal.appendChild(figure); 

        icone.addEventListener("click", async function(event) {
            event.preventDefault();
            const id = figure.getAttribute("data-id")
            // Suppression des images    
            
            try {
                const res = await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("valeur")}`
                    }
                })
                if (res.ok) {
                    figure.remove();
                } else {
                    throw new Error("Une erreur s'est produite lors de la suppression")
                }
            }
            catch(error) {
                console.error(error)
            }     
        })
    })  
}
//Fin de creation de la modale



//apparition de la modale
modalClose.onclick = function() {
    modal.style.display = "none"
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}
//disparition de la modale


//changement de forme de la modale
const addPicture = document.querySelector(".modal_footer input")
addPicture.addEventListener("click", function() {
    header_title.innerHTML = "Ajout photo"
    galleryModal.style.display = "none"
    modalBack.style.display = "block"
    addContent.style.display = "flex"
    addPicture.style.display = "none"
    modal_footerInput.style.display = "none"
    modal_footer.style.display = "none"
    modal_content.style.overflow = "hidden"


})

//retour
const modalBack = document.querySelector(".modalBack")
modalBack.addEventListener("click", function() {
    header_title.innerHTML = "Galerie photo"
    galleryModal.style.display = "flex"
    modalBack.style.display = "none"
    addContent.style.display = "none"
    addPicture.style.backgroundColor = "#1D6154"
    modal_footerInput.style.display = "block"
    modal_footer.style.display = "block"

})

//Apparition de la photo au clic sur "+ Ajouter photo"
const addContent = document.querySelector("#addContent");
const imageSendLabel = document.querySelector(".imageSendLabel");
const imageShow = document.querySelector('.imageShow');

imageSend.addEventListener("change", function(e) {
    e.preventDefault();
    const image = imageSend.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        imageShow.src = reader.result;
        imageShow.style.position = "absolute" 
        imageShow.style.height = "100%"
        imageSend.style.objectFit = "cover"
        imageSendLabel.style.display = "none"   
    }
    reader.readAsDataURL(image);
});

function checkFields() {
    const image = imageSend.files[0];
    const title = document.querySelector("#titlePicture").value;
    const category = document.querySelector("#categoryId").selectedIndex;

    const modal_footerBtn = document.querySelector(".modal_footerBtn");

    if (image && title && category !== 0) {
        modal_footerBtn.style.backgroundColor = "#1D6154"; // Changer la couleur du bouton en vert
    } else {
        modal_footerBtn.style.backgroundColor = ""; // Réinitialiser la couleur du bouton
    }
}

// Écouter les modifications des champs
imageSend.addEventListener("change", checkFields);
document.querySelector("#titlePicture").addEventListener("input", checkFields);
document.querySelector("#categoryId").addEventListener("change", checkFields);


// requete POST envoie des images
addContent.addEventListener("submit", (event) => {
    event.preventDefault();

    const image = imageSend.files[0];
    const title = document.querySelector("#titlePicture").value;
    const category = document.querySelector("#categoryId").selectedIndex;

    const errorMessage = document.querySelector(".error-message");

    let imageExtension = ['image/jpeg', 'image/png', "image/jpg"]
        if (!imageExtension.includes(image.type)) {
        errorMessage.textContent = "Veuillez sélectionner une image au format JPEG ou PNG.";
        addContent_picture.style.border = "red 1px solid";
        return
        }
   
//message d'erreur
    if (!image) {
        errorMessage.textContent = "Veuillez mettre une image.";
        addContent_picture.style.border = "red 1px solid";

        return;
    } else {
        modal_footerBtn.style.backgroundColor = "#1D6154";
    }
//fin de message d'erreur

//interface FormData
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("valeur")}`,
        },
        body: formData
    })
    .then (res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status ${res.status}`)
        }
        return res.json();
    })

    .then (data => {
        console.log("Les données JSON renvoyées par l'API :", data);
    })

    .catch(error => console.error(error, "la connexion a échoué !"));
});

//creation du menu deroulant de la modale

const categoriesModal = await fetch("http://localhost:5678/api/categories") 
    .then(response => response.json())
    .catch(error => {
        console.error(error); // Log any errors during the fetch request
    });

function createCategories(categoriesModal) {

    categoriesModal.map((category) => {
        const selectCategory = document.querySelector("#categoryId");
    
        const selectOption = document.createElement("option");
        selectOption.innerText = category.name;
        

        selectCategory.appendChild(selectOption);

    });
}
createCategories(categoriesModal)

genererWorksMoldal(eliminateDuplicate(works, "title"));