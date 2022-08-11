function sayName(name) {
    alert(name)
}

function Setid(id) {
    var isLogin = sessionStorage.getItem("logindetails")
    if (!isLogin) {
        sessionStorage.setItem("logindetails", id)
    }
}

const body = document.body
const div = document.createElement("div")
div.classList.add("w-100", "p-4", "bg-danger")
div.innerHTML = "please wait for the response objs"
body.appendChild(div)