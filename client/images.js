function renderImages(images) {
    document.getElementById("img_container").innerHTML = ""
    if (images) {
        images.forEach((image, index) => {
            const imgName = image.split("/")[image.split("/").length - 1]
            console.log(imgName)
            if (document.getElementById("img_container")) {
                document.getElementById("img_container").innerHTML += `
               <div class="shadow col-md-4 col-lg-3 overflow-hidden rounded-2  p-0 px-sm-5 px-md-0 px-5 m-2" style="height:20vh">
              <a href="./view_pic.html?${imgName}|${id}">
              
              <img src="${image}" alt="${index}" class="h-75 w-100"/>
              
              </a>
              <div class="d-flex justify-content-between">
              
              <div class="btn btn-danger text-dark w-100 rounded-0" onclick="deleteImage('${imgName}')">DELETE</div>
              <div class="btn btn-success text-dark w-100 rounded-0" onclick="download('${imgName}')">Download
              </div>
              </div>
           </div>
           `
            }
        });
    }
}
getallimages(id.trim())

function deleteImage(name, next = null) {
    console.log(name)
    const url = `http://localhost:5000/delete/file/${name}`
    fetch(url, {
        method: "delete",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ name })
    }).then(res => {
        if (res.ok) {
            if (next == null) {
                getallimages(id.trim())
            } else {
                location.replace(`./messages.html?${next}`)
            }
        } else {
            console.log("fail to delete message")
        }
    }).catch(err => {
        console.log(err)
    })
}

function getallimages(id) {
    // console.log(id)
    const url = `http://localhost:5000/get/files/${id}`
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data)
        const images = data.images
        renderImages(images)
    }).catch(err => {
        console.log(err)
    })
}

function download(name) {
    const url = `http://localhost:5000/download/img/${name}`
    fetch(url).then(res => {
        if (res.ok) {
            location.href = `http://localhost:5000/download/img/${name}`
        } else {
            console.log("fail to delete message")
        }
    }).catch(err => {
        console.log(err)
    })
}