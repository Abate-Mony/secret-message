$("#submit").click(function(e) {
    const url = "/api/v1/auth/register"
    const value = $("#input").val();
    $(".bigDiv").removeClass("display-none");
    $(this).css("background-color", "black")

    sendData(url, { name: value }, "POST", this)
    e.preventDefault();

});

$("#login").click(function(e) {
    // $(this).text("")
    $(".bigDiv").removeClass("display-none");
    $(this).css("background-color", "black")
    const url = "/api/v1/auth/login"
    const id = $("#id").val().trim();
    const password = $("#password").val().trim();
    sendData(url, { id, password }, "POST", this)
    e.preventDefault();
});



async function sendData(url, _data, method = "GET", elm = null) {

    const response = await fetch(url, {
        method,
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(_data)
    })
    if (!response.ok) {
        const data = await response.json()
        console.log(data)
        $(".alertbox").removeClass("display-none");
        setTimeout(() => {
            $(".alertbox").addClass("display-none")

        }, 2000)
        if (elm) {
            $(elm).css("background-color", "pink")
            const childElm = elm.querySelector("div")
            $(childElm).addClass("display-none");
        }
        return;
    }
    const data = await response.json()
        // $("#input").val("")
    const { user: { id, _id, token } } = data

    sessionStorage.setItem("login", data.id)
    sessionStorage.setItem("token", JSON.stringify(token))
    location.replace(`./messages.html`)



    // fetch(url, {
    //     method,
    //     headers: {
    //         "Content-type": "Application/json"
    //     },
    //     body: JSON.stringify(data)
    // }).then(res => {
    //     if (res.ok) {
    //         return res.json()
    //     } else {
    //         $(".alert").removeClass("d-none")
    //         $(".alert").html("<strong style='font-style:oblique'>wrong password or username</strong>");

    //         setTimeout(() => {
    //             $(".alert").addClass("d-none")
    //         }, 4000);
    //         throw new Error("something went wrong")
    //     }



    // }).then(data => {
    //     console.log(data)
    //     $("#input").val("")
    //     const { user: { id, _id, token } } = data

    //     sessionStorage.setItem("login", data.id)
    //     sessionStorage.setItem("token", JSON.stringify(token))
    //     location.replace(`./messages.html`)
    // }).catch(err => {
    //     if (elm) {
    //         const childElm = elm.querySelector("div")
    //         $(childElm).addClass("display-none");
    //     }

    // })

}

function longestString() {
    for (let i = 0; i < arguments.length; ++i) {

        console.log(arguments[i])
    }
}

function doSomething() {
    for (let i = 0; i < arguments.length; ++i) {
        arguments[i] && arguments[i].addEventListener("focus", (e) => {
            $(".login").css("display", "none");
        })
        arguments[i] && arguments[i].addEventListener("blur", (e) => {
            console.log(e.target)
            $(".login").css("display", "block");
        })
    }
}
const ua = navigator.userAgent
if (/(tablet|ipad|playbok|silk)|(android(?!.*mobi))/i.test(ua)) {
    console.log("tablet")
} else if (/Mobile|Android|i(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    console.log('mobile');
    const input = $("#input")[0]
    const __ = $("#password")[0]
    const _ = $("#id")[0]
    doSomething(input, __, _)

} else {
    console.log('desktop');

}

longestString("one", "mand", 2, 3, 4, 4, 5, 8)