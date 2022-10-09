const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const W = canvas.width
const H = canvas.height

class Dots {
    constructor(x, y) {
        this.x = x, this.y = y
    }
    over = (e) => {
        const T = canvas.getBoundingClientRect().top
        const L = canvas.getBoundingClientRect().left

        if (e.clientX - L > 0) {
            console.log(e.clientX - L, e.clientY - T)
        }
    }
    draw = () => {
        ctx.lineTo(this.x + 2, this.y + 2)
            // console.log(this.x, this.y)
        ctx.lineWidth = 2
        ctx.strokeStyle = "blue"
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
    }

}

const random = () => {
    return {
        x: Math.random() * (W - 40),
        y: Math.random() * (H - 40),
    }
}
const arr = []
for (let i = 0; i < 10; i++) {
    const { x, y } = random()
    arr.push((new Dots(x, y)))
}

var Ylines = H / 24;
var Xlines = W / 100
for (let i = Ylines; i < H; i += Ylines) {
    ctx.beginPath()
    ctx.fillRect(0, i, W, 1)
}
for (let i = Xlines; i < W; i += Xlines) {
    ctx.beginPath()
    ctx.fillRect(i, 0, 1, H)
}
arr.sort((a, b) => {
    return (a.x - b.x)
}).forEach((item, index) => {
    // const { x, y } = item
    item.draw()
})

// file: ///C:/Users/Dell%20User/Desktop/Formulario-dinamico-HTML-CSS-JS/index.html



ctx.beginPath()
ctx.fillStyle = "white"
ctx.fillRect(30, 10, 5, H - 30);

// down bar
ctx.beginPath()
ctx.fillStyle = "white"
ctx.fillRect(35, H - 25, W, 5);
// assigning values
ctx.font = '20px Arial';
ctx.fillStyle = "green";
ctx.fillText("24", 6, 20);


ctx.font = '20px Arial';
ctx.fillStyle = "green";
ctx.fillText("0", 12, H - 5);

ctx.font = '20px Arial';
ctx.fillStyle = "green";
ctx.fillText("100", W - 40, H);