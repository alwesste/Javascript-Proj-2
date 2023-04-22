const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
console.log(works)


works.map(work => {
    // const diapo = works[i]

    const image = document.createElement("img");
    image.src = work.imageUrl;
    const figCaption = document.createElement("figcaption");
    figCaption.innerText = work.title;


    const figure = document.createElement("figure");
    const gallery = document.querySelector(".gallery");
    figure.appendChild(image);
    figure.appendChild(figCaption);
    gallery.appendChild(figure);
 
    console.log(image)
});

    



   

