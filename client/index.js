$("#submit").click(function(e) {
    const url = "/api/v1/auth/register"
    const value = $("#input").val();
    $(".bigDiv").removeClass("d-none");
    sendData(url, { name: value }, "POST", this)
    e.preventDefault();

});

$("#login").click(function(e) {
    $(".bigDiv").removeClass("d-none");
    const url = "/api/v1/auth/login"
    const id = $("#user-id").val().trim();
    const password = $("#password-field").val().trim();
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
        $(".alert").removeClass("d-none").text(data.error)
        setTimeout(() => {
            $(".alert").addClass("d-none")

        }, 2000)
        if (elm) {
            $(elm).css("background-color", "pink")
            const childElm = elm.querySelector("div")
            $(childElm).addClass("d-none");
        }
        return;
    }
    const data = await response.json()
    const { user: { id, _id, token } } = data

    sessionStorage.setItem("login", _id)
    sessionStorage.setItem("token", JSON.stringify(token))
    location.replace(`./messages.html`)


}