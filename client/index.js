$("#submit").click(function(e) {
    const url = "http://localhost:5000"
    const value = $("#input").val();
    sendData(url, { name: value }, "POST")
    e.preventDefault();
});
// $(document).keypress(function(e) {
//     if (e.keyCode == "13" && $("#input").val().trim().length != 0) {
//         const url = "http://localhost:5000"
//         const value = $("#input").val().trim();
//         sendData(url, { name: value }, "POST")

//     }
// });
$("#login").click(function(e) {
    const url = "http://localhost:5000/login"
    const id = $("#id").val().trim();
    const password = $("#password").val().trim();
    sendData(url, { id, password }, "POST")
    e.preventDefault();
});



function sendData(url, data, method = "GET") {
    fetch(url, {
        method,
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.error(res.status)
        if (res.ok) {
            return res.json()
        } else {
            return res.json()
        }



    }).then(data => {
        // alert("enter the second ")
        $("#input").val("")
        sessionStorage.setItem("login", data.id)
            //   if the is a response redirect users to a new page
        location.replace(`./messages.html?${data.id}`)
    }).catch(err => {
        console.log(err)
        alert("alert wrong information enter check and try again")


    })

}