let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
c.imageSmoothingEnabled = true;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

c.fillStyle = "#999"
c.fillRect(0,0,width,height)

// c.fillStyle= "#333"

// c.arc(width/2,height/2, 120, Math.PI*2, 0, false);
// c.fill()


// c.beginPath();
// c.moveTo(0,height/2)
let i = 0
let pos = 0
let colArray = []
let arcArray = []
for(i = 0; i < 360; i ++) {
    colArray.push(`hsl(${i}), 50%, 50%`);
}

// c.beginPath()
// c.moveTo(width/2, height/2)
// c.lineTo(width/2 + 100, height/2 + 1)
// c.stroke()



// let Circle = function (x, y) {

//     this.x = x;
//     this.y = y;
//     let count = 1
//     let dist = 100;
//     let speed = 0.05;
//     // let xPos = Math.sin(count) * 100

//     this.draw = () => {
//         c.fillStyle = `hsl(${count}, 50%, 50%)`;
//         c.fill();
//     }
    
//     this.update = () => {
//         c.beginPath()
//         xPos = Math.sin(count) * dist
//         yPos = Math.cos(count) * dist
//         c.arc(this.x + xPos, this.y + yPos, 10, Math.PI * 2, 0, false);
//         count += speed;
//         console.log(xPos)
//         this.draw();
//     }
// }

let Line = function () {
    let count = 1
    let dist = 200;
    let speed = 0.001;

    let draw = () => {
        c.strokeStyle = `hsl(${count}, 50%, 50%)`;
        c.stroke();
    }

    let update = () => {
        xPos = width/2 + Math.sin(count) * dist
        yPos = height/2 + Math.cos(count) * dist
        c.beginPath();
        c.moveTo(width/2,height/2);
        c.lineTo(xPos, yPos);
        count += speed;
        draw()
    }

        for(i=0; i<6280;i++){
            update()
        }
    // update()
}
// Line();

// let circle1 = new Circle(width/2, height/2);

// for(i = 0; i < 360; i++) {
//     arcArray.push(new Line(0,0));
// }
// for(i = 0; i < 360; i++) {
//     arcArray[i].update()
// }


let animate = () => {
    c.clearRect(0,0,width, height)
    requestAnimationFrame(animate)
    // circle1.update();

}

// animate()
// for (i = 0; i < 100; i++) {
//     console.log(Math.sin(i) * 1000)
// }