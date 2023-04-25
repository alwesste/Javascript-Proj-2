const login_button = document.querySelector(".login-button") 
login_button.addEventListener("click", function () {
    for (let input of document.querySelectorAll("input")){
        input.reportValidity();
    }
    console.log("ok ca marche!!!!")

})


function loginAccount () {
    document.querySelector(".login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const inputValue = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        const chargeUtile = JSON.stringify(inputValue);

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json", },
            body: chargeUtile,
        })

        .then(function(res) {
            if (res.ok) {
                console.log("function then is correct !") 
                window.location.href = "index.html"
            }
            else {
                console.log("il y a une erreur")
            }
        })

        .catch((error) => {
            alert("La connexion a échoué. Veuillez réessayer plus tard.");
            console.log("erreur ", error);
        });
    });

};
loginAccount()
