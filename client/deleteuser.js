function renderUsers(data) {
    const list = data ? data.map(user => {
        if (user._id !== "62f0f3adcc52193ba3e17c04") {
            return `<h1>${user.name} &nbsp; <span class="btn btn-danger" onclick="deleteuser('${user._id}')">delete
                 </span><a class="btn btn-success" href="./moredetails.html?${user._id}">Details</a><h1>`
        } else {
            $("#userlist").html("no user yet");
        }
    }).join("") : "no users yet"
    $("#userlist").html(list);
}
helper("http://localhost:5000/all/users", id = null, renderUsers, "GET")

function helper(url, id, func, method = "GET") {
    fetch(url, id ? {
        method,
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            id
        })
    } : null).then(users => {
        return users.json()
    }).then(data => {
        func(data.users)
    }).catch(err => {
        console.log(err)
            // alert("error could not delete users with id :" + id)
        location.replace("./error.html")

    })
}


function deleteuser(id) {
    const url = "http://localhost:5000/delete/user"
    helper(url, id, renderUsers, "POST")
}