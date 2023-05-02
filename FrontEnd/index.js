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
 