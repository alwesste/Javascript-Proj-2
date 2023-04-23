const works = await fetch("http://localhost:5678/api/works").then(works => works.json())

function genererWorks(works) {
    works.map(work => {
    const image = document.createElement("img");
    image.src = work.imageUrl;
    const figCaption = document.createElement("figcaption");
    figCaption.innerText = work.title;
    const figure = document.createElement("figure");
    const gallery = document.querySelector(".gallery");
    figure.appendChild(image);
    figure.appendChild(figCaption);
    gallery.appendChild(figure);   
    });
}

genererWorks(works)



const filter_tous = document.querySelector(".filter_tous")
filter_tous.addEventListener("click", function() {
    const ordered_tous = works;
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(ordered_tous)

})

const filter_objets = document.querySelector(".filter_objets");
filter_objets.addEventListener("click", function() {
    const orderedListObjet = works.filter(work => work.category.id == 1)
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(orderedListObjet)
});

const filter_appartements = document.querySelector(".filter_appartements");
filter_appartements.addEventListener("click", function () {
    const orderedListAppartements = works.filter(work => work.category.id == 2)
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(orderedListAppartements)
})

const filter_hotels_restaurants = document.querySelector(".filter_hotels_restaurants")
filter_hotels_restaurants.addEventListener("click", function () {
    const ordered_hotels_restaurants = works.filter(work => work.category.id == 3)
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(ordered_hotels_restaurants)
})
 