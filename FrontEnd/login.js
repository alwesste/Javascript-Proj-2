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

    });

};


loginAccount()