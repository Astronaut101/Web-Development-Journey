const myImage = new Image();
myImage.src = 'batman-tony-daniel.png';

myImage.addEventListener('load', function(){
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 894;
    
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // console.log(pixels); ->> To double check the pixel values of each image
    
    let particlesArray = [];
    const numberOfParticles = 5000;

    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++){
        let row = [];
        for (let x = 0; x < canvas.width; x++){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]; 
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]; 
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]; 
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [
                cellBrightness = brightness,
                cellColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
            ];
            row.push(cell);
        }
        mappedImage.push(row);
    }
    console.log(mappedImage);

    function calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.2126 +
            (green * green) * 0.7152 +
            (blue * blue) * 0.0722
        )/100;
        
    }
    class Particle{
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 5.5;
            this.size = Math.random() * 1.5 + 0.5;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.angle = 0;
        }
        update(){
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                this.speed = mappedImage[this.position1][this.position2][0];
            }
            let movement = (2.5 - this.speed) + this.velocity;
            this.angle += this.speed/20;

            this.y += movement / 2 // Math.sin(this.angle);
            this.x += movement / 2// Math.cos(this.angle);
            if (this.y >= canvas.height){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            if (this.x >= canvas.width){
                this.x = 0;
                this.y = Math.random() * canvas.height
            }
        }
        draw(){
            ctx.beginPath();
            if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                ctx.fillStyle = mappedImage[this.position1][this.position2][1];
            }
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function init(){
        for (let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particle);
        }
    }
    init();
    function animate(){
        //ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height); ->>  This would maintain the image in the background after particle fade
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.5
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
})