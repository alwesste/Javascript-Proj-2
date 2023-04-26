const login_button = document.querySelector(".login-button") 
login_button.addEventListener("click", function () {
    for (let input of document.querySelectorAll("input")){
        input.reportValidity();
    }
})


function loginAccount () {
    document.querySelector(".login-form").addEventListener("submit", async function(event) {
        event.preventDefault();

        const inputValue = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
            
        
        const chargeUtile = JSON.stringify(inputValue);

        await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile,
        })
        
        
        .then(res => {
            if (res.ok) {
                res.json().then((data) => {
                  console.log("response data: ", data.token);
                  window.localStorage.getItem("valeur", data.token)
                  // Traiter les données JSON retournées ici
                  console.log("function res is really ok ", res)
                  window.location.href = "index.html"
                }).catch((error) => {
                  console.log("erreur lors de l'extraction du JSON : ", error);
                });

            } else {  
                const inputs = document.querySelectorAll(".login-form input");
                    inputs.forEach(input => {
                    input.style.border = "1px solid red";
                    input.style.boxShadow = "0px 0px 10px red"
                });  
                
                const messageError = document.querySelector(".messageError");
                messageError.textContent = "Vos identifiants sont erronés !"
                messageError.style.marginBottom = "20px"
                messageError.style.color = "red"
            }
        })
         
        .catch((error) => {
            alert("La connexion a échoué. Veuillez réessayer plus tard.");
            console.log("erreur code", error);
        });   

    });

};


loginAccount()