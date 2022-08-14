var allmessagescontainer = null
const userId = document.getElementById("user-id")
const password_ = document.getElementById("password")
const id = location.search.substring(1)

function fetchuser(id) {
    fetch(`http://localhost:5000/${id}`).
    then(res => {
        return res.json()
    }).then(data => {
        // console.log(data)
        const {
            messages,
            name,
            password
        } = data
        renderMessages(messages)
        password_.textContent += password
        userId.textContent += id
        $("#name").text(name);
    }).catch((error) => {
        console.log(error)
            // location.replace("./user.not.found.html")
    })
}

//copy data to the keyboard
$(".reload").click(function(e) {
    location.reload()
    e.preventDefault();
});

function delete_message(id, messages) {
    const url = "http://localhost:5000/delete/message"
    fetch(url, {
        method: "delete",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            id,
            messages
        })
    }).then(res => {
        if (res.ok) {
            renderMessages(messages)
        } else {
            console.log("fail to delete message here")
            alert("fail to delete messaage chech internet connection and try again")
        }
    })
}

function delete_all() {
    if (window.confirm("Do you want to delete all messages")) {
        delete_message(id, [])
    }

}

function renderMessages(messages) {
    messageBox.innerHTML = messages ?
        messages.map((message, index) =>
            `<div class="d-flex justify-content-between">
                <a href="./full_message.html?${id}|${index}">
                 <div class="my-1 p-2 px-4 text-danger bg-primary">${message}
                 </div></a> <div class="del-btn  btn btn-danger p-0">delete</div>
                </div>`).join(" ") : "no new messages"
    allmessagescontainer = [...document.querySelectorAll(".del-btn")]
    if (allmessagescontainer) {
        allmessagescontainer.forEach((btn, index) => {
            btn.addEventListener("click", (e) => {
                messages.splice(index, 1)
                delete_message(id, messages)
            })
        })
    }
}