const dashboardtoken = JSON.parse(sessionStorage.getItem("dashboardtoken"))
var UsersDetails = []
const userContainerElm = document.querySelector(".side-container")

const alignMessages = (messages) => {
    const infoElm = document.querySelector(".info")
    if (infoElm) {
        const _messages = messages.length > 1 ? messages.map(({ message, createdAt }) => {
            const date = new Date(createdAt).toLocaleTimeString()
            return (
                ` <div class="grid__3">
<div class="col-2  p-0 m-0 __border">
    <div class="time-box p-0 m-0 text-light  fw-bolder">
        ${Number(date.split(":")[0])>12?date+" pm":date+" am"}
    </div>
</div>
<div class="shadow big-box  ms-5 mt-2 text-center d-flex align-items-center justify-content-center text-light">
${message}
<div class="triangle">
    </div>
</div>
</div>`
            )
        }).join("") : "no messages"
        infoElm.innerHTML = _messages
    }
}

const alignUsers = (Users = []) => {
    const users = Users.map(({ name, _id, id, password }, index) => {
        return (
            `<div class="grid" id=${_id}>
<div id="number">${index+1}</div>

<div class="user-name">
${name}
</div> 
<div class="user-id">
${id}
</div>
<div class="id">
${_id}

</div>
<div class="user-password">
${password}

</div>
</div>`
        )
    }).join("")
    userContainerElm.innerHTML = `<div class="grid">
<div id="number__">1</div>
<div class="user-name__">
    User Name
</div>
<div class="user-id__">
    User Id
</div>
<div class="id__">
    mongodb Id
</div>
<div class="user-password__">
    password
</div>
</div>`
    userContainerElm.innerHTML += users.length >= 1 ? users : "no users with search values"

}
let headersList = {
    "Accept": "*/*",
    "Authorization": `dashboard ${dashboardtoken}`,
    "Content-Type": "application/json"
}
const getAllUsers = async() => {
    const response = await fetch("allusers", {
        headers: headersList
    })
    const { Users } = await response.json()
    UsersDetails = Users
    alignUsers(Users)
    const userBtn = [...userContainerElm.children]
    userBtn.forEach((btn, index) => {
        btn.addEventListener("click", async() => {
            const { id } = btn
            const res = await fetch(`messages/${id}`, {
                headers: headersList,
            })
            if (!res.ok) {
                const error = res.json()

                return
            }
            const { messages } = await res.json()
            alignMessages(messages)
        })
    })



}
getAllUsers()


const search = {
    btn: document.querySelector(".search-btn"),
    box: document.querySelector(".search-box input"),
    delBtn: document.querySelector(".delete-btn"),
}

window.addEventListener("click", async(e) => {
    const { box } = search
    if (e.target == search.btn) {
        console.log(box.value)
        const { value } = box
        const res = await fetch(`searchusers?${value}`, {
            headers: headersList
        })
        if (!res.ok) {
            console.log("somethng went wrong")
            alignUsers()

            return
        }
        const { Users } = await res.json()
        console.log(Users)
        alignUsers(Users)
        const userBtn = [...userContainerElm.children]
        userBtn.forEach((btn, index) => {
            btn.addEventListener("click", async() => {
                const { id } = btn
                const res = await fetch(`messages/${id}`, {
                    headers: headersList,
                })
                if (!res.ok) {
                    const error = res.json()

                    return
                }
                const { messages } = await res.json()
                alignMessages(messages)
                console.log(messages)
            })
        })
    }
    if (e.target == search.delBtn) {
        search.box.value = ``
        getAllUsers()
    }
})