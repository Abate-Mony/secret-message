const signInBtn = document.getElementById("sign-in")
if (signInBtn) {
    signInBtn.addEventListener("click", async() => {
        const passwordElm = document.getElementById("password-field")
        const password = passwordElm.value
        const url = "login"
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                password
            })
        })
        if (!response.ok) {
            const error = await response.json()
            console.log(error)
            return
        }
        const data = await response.json()
        const { token } = data
        console.log(token)
        sessionStorage.setItem("dashboardtoken", JSON.stringify(token))
        location.href = "./user.html"
    })
}