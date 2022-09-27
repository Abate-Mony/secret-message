$("#submit").click(function(e) {
    const url = "/api/v1/auth/register"
    const value = $("#input").val();
    sendData(url, { name: value }, "POST")
    e.preventDefault();

});

$("#login").click(function(e) {
    $(this).text("").append(` <span class="spinner-border"></span>`)
        // $(this).attr("value", "hello")
        // console.log(this)
    const url = "/api/v1/auth/login"
    const id = $("#id").val().trim();
    const password = $("#password").val().trim();
    sendData(url, { id, password }, "POST", this)
    e.preventDefault();
});



function sendData(url, data, method = "GET", elm = null) {
    fetch(url, {
        method,
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            $(".alert").removeClass("d-none")
            $(".alert").html("<strong style='font-style:oblique'>wrong password or username</strong>");

            setTimeout(() => {
                $(".alert").addClass("d-none")
            }, 4000);
            throw new Error("something went wrong")
        }



    }).then(data => {
        console.log(data)
        $("#input").val("")
        const { user: { id, _id, token } } = data

        sessionStorage.setItem("login", data.id)
        sessionStorage.setItem("token", JSON.stringify(token))
        location.replace(`./messages.html`)
    }).catch(err => {
        console.log(err)
        if (elm) {
            console.log(elm)
            $(elm).text("Login")
            const childElm = elm.querySelector("span")
            $(childElm).removeClass("spinner-border");
        }
        // alert("alert wrong information enter check and try again")

    })

}