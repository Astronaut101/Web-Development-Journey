const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 847;
canvas.height = 1200;


const image1 = new Image();
image1.src = "Batman_688.png";


// Manipulating the pixel element and calculating your total pixel dimensions to get 
// the proper shading for adjusting your grayscale elements in RGB format
image1.addEventListener('load', function(){
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // onlinepngtools.com -> workaround to use when you are getting an error of tainted canvas image error
    console.log(scannedImage);
    const scannedData = scannedImage.data;
    for (let i = 0; i < scannedData.length; i += 4){
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
        const averageColorValue = total/3;
        scannedData[i] = averageColorValue;
        scannedData[i+1] = averageColorValue + 25;
        scannedData[i+2] = averageColorValue + 25;
    }
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0)
})


