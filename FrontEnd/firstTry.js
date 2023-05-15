const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
console.log(works)
const mySet = new Set(works)
const uniqueWorks = [...mySet]

function genererWorks(uniqueWorks) {

  uniqueWorks.map(work => {
    
    const image = document.createElement("img");
    image.src = work.imageUrl;
    const figCaption = document.createElement("figcaption");
    figCaption.innerText = work.title;
    const figure = document.createElement("figure");
    figure.classList.add("article")
    figure.dataset.x = work.category.name

    const gallery = document.querySelector(".gallery");
    figure.appendChild(image);
    figure.appendChild(figCaption);
    gallery.appendChild(figure);     
    });
}

genererWorks(uniqueWorks)




const filter_all = document.querySelector(".filter_all")
filter_all.addEventListener("click", function() {
    const ordered_all = uniqueWorks;
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(ordered_all)

})

const filter_objets = document.querySelector(".filter_objets");
filter_objets.addEventListener("click", function() {
    const orderedListObjet = uniqueWorks.filter(work => work.category.id == 1)
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(orderedListObjet)
});

const filter_appartements = document.querySelector(".filter_appartements");
filter_appartements.addEventListener("click", function () {
    const orderedListAppartements = uniqueWorks.filter(work => work.category.id == 2)
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(orderedListAppartements)
})

const filter_hotels_restaurants = document.querySelector(".filter_hotels_restaurants")
filter_hotels_restaurants.addEventListener("click", function () {
    const ordered_hotels_restaurants = uniqueWorks.filter(work => work.category.id == 3)
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(ordered_hotels_restaurants)
})
 


//creation de la partie login


        .then(res => {
            if (res.status === 200) {
                res.json().then((data) => {
                  window.localStorage.setItem("valeur", data.token)
                  window.location.href = "index.html"

                }).catch((error) => {
                  console.log("erreur lors de l'extraction du JSON : ", error);
                });
            
            } else if (res.status === 401) {
                let messageError = document.querySelector(".messageError");
                messageError.textContent = "Nous ne reconnaissons pas votre mot de passe !"
                messageError.style.marginBottom = "20px"
                messageError.style.color = "red"

                let inputPassword = document.querySelector("#password")
                inputPassword.style.border = "1px solid red";
                inputPassword.style.boxShadow = "0px 0px 10px red"

            } else if (res.status === 404) {  
                let messageError = document.querySelector(".messageError");
                messageError.textContent = "Nous ne reconnaissons pas votre email !"
                messageError.style.marginBottom = "20px"
                messageError.style.color = "red"

                let inputEmails = document.querySelectorAll(".login-form input")
                inputEmails.forEach(input => {
                    input.style.border = "1px solid red";
                    input.style.boxShadow = "0px 0px 10px red"
                });  
            };        
        })
         

        .catch((error) => {
            alert("La connexion a échoué. Veuillez réessayer plus tard.");
            console.log("erreur code", error);
        });   
