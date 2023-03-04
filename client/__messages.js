const _url = location.host
const socket = new WebSocket(`wss://${_url}`);
const token = JSON.parse(sessionStorage.getItem("token"))
let timer = null
var ismessage = false

// console.log(token)
const messageHeader = document.getElementById("message_header")

document.body.classList.add("overflow-hidden")

function getElement() {
    userid = document.getElementById("user-id")
    passwordElement = document.getElementById("password")

}
getElement()
let headersList = {
    "Accept": "*/*",
    "Authorization": `pablo ${token}`,
    "Content-Type": "application/json"
}
if (token) {
    fetch("/api/v1/auth/user", {
        method: "POST",
        headers: headersList
    }).then(function(response) {
        if (!response.ok) {
            throw new Error("coudn,t validate user")
        }
        return response.json();
    }).then(function(data) {
        $(".loader-container").addClass("d-none")
        document.body.classList.remove("overflow-hidden")
        console.log("hello")
        const { user: { id, _id, name, password }, update } = data
        if (!update) {
            setTimeout(() => {
                var myModal = new bootstrap.Modal(document.getElementById('exampleModalToggle2'))
                myModal.show()
            }, 30000);
        }
        userid.innerHTML += `<span class="font-montserrat">${id}</span>`
        passwordElement.innerHTML += `<span class="font-montserrat">${password}</span>`
        $("#name").text(name)
        $("#link").text(location.href + "?" + _id);
        const href = `${location.href}?${_id}`
        $("#copy_").click(function(e) {
            copyTextToClipboard(href, this)
            e.preventDefault();
        });
    }).catch(error => {
        console.log(error)
    })
}
const Messages = async() => {
        const response = await fetch("/api/v1/message", {
            headers: headersList
        })
        if (!response.ok) {
            const badResponse = await response.json();
            // console.log(badResponse)
            return
        }
        const data = await response.json()
        const { messages } = data
        var messageBox = document.querySelector(".message-box")
        messageBox.innerHTML = messages.length > 0 ?
            messages.map(({ message, _id, }, index) => {
                    return (
                            `<div class="col-md-6 col-lg-4 _card position-relative" >
        <div class="card bg-dark text-white text-center mx-2" >
            <div class="card-body shadow">
                <div class="hr mb-3 ">
                </div>
                <h3 class="card-title mb-3 text-center">
                    ${index + 1}
                </h3>
                <div class="card-text ">
                ${message.length > 200 ? message.slice(0, 200) + "..." : message} 
                </div>
                ${message.length > 30 ? `<a href='./full_message.html?${_id}'
                 class='btn btn-warning my-2 d-block w-50 m-auto'>read more</a>` : ""}
            <div  class="p-2 bg-dark del-btn position-absolute bottom-0 end-0 me-2" id=${_id}>
            <i class="fa-solid fa-trash" style="font-size:1rem"></i>
            </div>
            <div  class="p-2 bg-dark  position-absolute bottom-0 start-0 ms-2 spinner-container d-none">
            <div class="spinner-border text-light" role="status">
</div></i>
            </div>
            </div>
        </div>
    </div>`
            )
        }).join(` `) :
        `<img src='https://c.tenor.com/4lA3ViMpstwAAAAj/wait-no.gif' id="no__message" alt='no messages'/>`
    fadeOut()
    messages.length<=0?nomessage():[clearInterval(timer),messageHeader.textContent="Messages"]
function nomessage(){
    const text = "o Messages"
    var i = 0
    clearInterval(timer)
   timer= setInterval(() => {
        messageHeader.textContent ="N"+ text.slice(0, Math.abs(i))
        i > text.length - 1 ? i *= -1 : i += 1
    }, 300)

}
    const delBtn = [...document.querySelectorAll(".del-btn")]
    delBtn.forEach((btn, id) => {
        btn.addEventListener("click", (e) => {
            const spinner=e.target.parentElement.parentElement.querySelector(".spinner-container")
            $(spinner).removeClass("d-none")
            deleteMessage(btn.id,spinner)
        })
    })


}
(function(){
    
    Messages()
}())
const deleteMessage = async (id, spanElm) => {
    try {
        const response = await fetch(`/api/v1/message/${id}`, {
            method: "delete",
            headers: headersList
        })
        if (!response.ok) {
            const BadResponse = await response.json()
           spanElm&&spanElm.classList.add("d-none")
            alert("fail to delte message")
            const error=new Error(BadResponse,{
            status:response.status
            })
            throw error
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
                elm.innerHTML=`<span><i class="fa-regular fa-copy"></i></span>&nbsp;copy link `
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
        if(elm){
            elm.textContent+="😚"
            setTimeout(()=>{ 
                elm.innerHTML=`<span><i class="fa-regular fa-copy"></i></span>&nbsp;copy link `
            },3000)
        }
        // console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}