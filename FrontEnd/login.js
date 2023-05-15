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
          headers: {"Content-Type": "application/json"},
          body: chargeUtile,
        })

        .then(response => {
            if (response.status === 401) {
                let messageError = document.querySelector(".messageError");
                messageError.textContent = "Nous ne reconnaissons pas vos identifiants!"
                messageError.style.marginBottom = "20px"
                messageError.style.color = "red"

                let inputPassword = document.querySelector("#password")
                inputPassword.style.border = "1px solid red";
                inputPassword.style.boxShadow = "0px 0px 10px red"
                throw new Error("not authorized");      
            }
            else if (response.status === 404) {
                let messageError = document.querySelector(".messageError");
                messageError.textContent = "Nous ne reconnaissons pas vos identifiants !"
                messageError.style.marginBottom = "20px"
                messageError.style.color = "red"

                let inputEmail = document.querySelector("#email")
                inputEmail.style.border = "1px solid red";
                inputEmail.style.boxShadow = "0px 0px 10px red"
                throw new Error("User not found")
                
            } 
            else if (!response.ok) {
                throw new Error("Unexpected error occurred");
            }
            return response.json();
        })

        .then(data => {
          console.log(data.token);
          window.localStorage.setItem("valeur", data.token);
          window.location.href = "index.html"
        })

        .catch(error => console.error(error, "la connexion a echoue !"));
      
        
   });

};
 

loginAccount()