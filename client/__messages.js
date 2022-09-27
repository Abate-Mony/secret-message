const token = JSON.parse(sessionStorage.getItem("token"))
    // console.log(token)

function getElement() {
    userid = document.getElementById("user-id")
    passwordElement = document.getElementById("password")
}
getElement()
let headersList = {
    "Accept": "*/*",
    // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": `pablo ${token}`,
    "Content-Type": "application/json"
}

fetch("/api/v1/auth/user", {
    method: "POST",
    headers: headersList
}).then(function(response) {
    if (!response.ok) {
        throw new Error("coudn,t validate user")
    }
    // console.log(response)

    return response.json();
}).then(function(data) {
    const { user: { id, _id, name, password } } = data
    userid.innerHTML += id
    passwordElement.innerHTML += password
    $("#name").text(name)
    $("#link").text(location.href + "?" + _id);

    console.log(data);
    const href = `${location.href}?${_id}`
    $("#copy_").click(function(e) {


        // alert("hoasikg l")

        copyTextToClipboard(href, this)


        e.preventDefault();
    });
}).catch(error => {
    // sessionStorage.removeItem("token")
    // sessionStorage.removeItem("login")
    // console.log(error)
    // location.href = `./index.html`

})
const Messages = async() => {

        const response = await fetch("/api/v1/message", {
            headers: headersList
        })
        if (!response.ok) {
            const badResponse = await response.json();
            console.log(badResponse)
            return
        }
        const data = await response.json()
        const { messages } = data
        console.log(messages)
        var messageBox = document.querySelector(".message-box")
        messageBox.innerHTML = messages.length > 0 ?
            messages.map(({ message, _id, }, index) => {
                    return (
                            `<div class="col-md-6 col-lg-4 _card">
        <div class="card bg-secondary text-white">
            <div class="card-body">
                <div class="hr mb-3 ">
                </div>
                <h3 class="card-title mb-3 text-center">
                    ${index + 1}
                </h3>
                <div class="card-text ">
                ${message.length > 200 ? message.slice(0, 200) + "..." : message} 
                </div>
                ${message.length > 1 ? `<a href='./full_message.html?${_id}' class='btn btn-dark my-2 d-block w-50 m-auto'>read more</a>` : ""}
            <button  class="btn btn-danger my-2 d-flex align-items-center
              gap-2 w-50 m-auto del-btn text-center justify-content-center" id=${_id}>
            <span class=""></span>
                Delete
            </button>
            </div>
        </div>
    </div>`
            )
        }).join(` `) : "<span class='text-dark fs-1 p-4 text-center alert alert-dark'>no new messages</span>"
    fadeOut()

    const delBtn = [...document.querySelectorAll(".del-btn")]
    delBtn.forEach((btn, id) => {
        btn.addEventListener("click", (e) => {
            const spanElm = btn.querySelector("span")
            spanElm.classList.add("spinner-border")
            deleteMessage(btn.id, spanElm)
        })
    })

    // fetch("/api/v1/message", {
    //     headers: headersList
    // }).then(function (response) {
    //     if (!response.ok) {
    //         // response.json()
    //         throw new Error("coudn,t validate user")

    //     }
    //     return response.json();
    // }).then(function (data) {
    //     console.log(data)
    //     const { messages } = data
    //     var messageBox = document.querySelector(".message-box")
    //     messageBox.innerHTML = messages ?
    //         messages.map(({ message, _id, }, index) => {
    //             return (
    //                 `<div class="col-md-6 col-lg-4 _card">
    //                 <div class="card bg-secondary text-white text-center">
    //                     <div class="card-body">
    //                         <div class="hr mb-3 ">
    //                         </div>
    //                         <h3 class="card-title mb-3 text-center">
    //                             ${index + 1}
    //                         </h3>
    //                         <div class="card-text ">
    //                         ${message.length > 200 ? message.slice(0, 200) + "..." : message} 
    //                         </div>
    //                         ${message.length > 1 ? `<a href='./full_message.html?${_id}' class='btn btn-dark my-2 d-block w-50 m-auto'>read more</a>` : ""}
    //                     <button  class="btn btn-danger my-2 d-flex align-items-center
    //                       gap-2 w-50 m-auto del-btn text-center justify-content-center" id=${_id}>
    //                     <span class=""></span>
    //                         Delete
    //                     </button>
    //                     </div>
    //                 </div>
    //             </div>`
    //             )
    //         }).join(` `) : "no new messages"
    //     fadeOut()

    //     const delBtn = [...document.querySelectorAll(".del-btn")]
    //     delBtn.forEach((btn, id) => {
    //         btn.addEventListener("click", (e) => {
    //             const spanElm = btn.querySelector("span")
    //             spanElm.classList.add("spinner-border")
    //             deleteMessage(btn.id, spanElm)
    //         })
    //     })

    // }).catch(error => {
    // })

}
Messages()
const deleteMessage = async (id, spanElm) => {
    try {
        const response = await fetch(`/api/v1/message/${id}`, {
            method: "delete",
            headers: headersList
        })
        if (!response.ok) {
            const BadResponse = await response.json()
            spanElm.classList.remove("spinner-border")
            console.log(BadResponse)
            alert("fail to delte message")
            return
        }

        return Messages()

    } catch (error) {
        console.log(error)
    }
}


function fallbackCopyTextToClipboard(text,elm=null) {

    try {
        var TempText = document.createElement("input");
        TempText.value = text
        document.body.appendChild(TempText);
        TempText.select()
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        if(elm){
            elm.textContent+="😚"
            setTimeout(()=>{ 
                elm.innerHTML="&copy;&nbsp;copy link "
            },3000)
        }
        document.body.removeChild(TempText)

    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
}
function copyTextToClipboard(text,elm= null) {

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text,elm);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}