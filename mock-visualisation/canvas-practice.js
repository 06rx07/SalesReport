const createLine = (canvas) => {
    const context = canvas.getContext('2d');
    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = 10;
    context.moveTo(0, 0);
    context.lineTo(150, 150);
    context.stroke();
};

const createRect = (canvas) => {
    const context = canvas.getContext('2d');
    context.fillStyle = '#f58231';
    context.fillRect(0, 0, 150, 150);
};

const createCircle = (canvas) => {
    const context = canvas.getContext('2d');
    const grd = context.createLinearGradient(0, 0, 150, 150);
    grd.addColorStop(0, 'rgba(255,210,111,0.9)');
    grd.addColorStop(1, 'rgba(54,119,255,0.9)');

    context.fillStyle = grd;
    context.arc(75, 75, 75, 0, 2 * Math.PI);
    context.fill();
};

const createText = (canvas) => {
    const context = canvas.getContext('2d');
    const grd = context.createLinearGradient(0, 0, 150, 150);
    grd.addColorStop(0, '#FFA8A8');
    grd.addColorStop(1, '#FCFF00');

    context.strokeStyle = grd;
    context.font = '18px Georgia';
    context.strokeText('Test Canvas', 0, 50);
};

const createClock = (canvas) => {
    const context = canvas.getContext('2d');
    const grd = context.createLinearGradient(0, 0, 150, 150);
    grd.addColorStop(0, 'rgba(255,168,168,0.5)');
    grd.addColorStop(1, 'rgba(252,255,0,0.5)');

    context.fillStyle = grd;
    context.arc(75, 75, 75, 0, 2 * Math.PI);
    context.fill();
    context.arc(75, 75, 5, 0, 2 * Math.PI);

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = 1;
    context.moveTo(75, 75);
    context.lineTo(75, 25);
    context.stroke();

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = 3;
    context.moveTo(75, 75);
    context.lineTo(115, 75);
    context.stroke();

    context.font = '18px Verdana';
    context.fillStyle = '#000';
    context.fillText('12', 65, 20);
    context.fillText('3', 130, 80);
    context.fillText('6', 70, 130);
    context.fillText('9', 20, 80);
};

const createCloud = (canvas) => {
    const context = canvas.getContext("2d");
    const img = new Image(650, 450);
    img.src = './cloud.png';
    img.onload = () => {
        context.drawImage(img, 0, 0, 650, 450);
    };
};

createLine(document.querySelector('canvas#line'));
createRect(document.querySelector('canvas#rect'));
createCircle(document.querySelector('canvas#circle'));
createText(document.querySelector('canvas#text'));
createClock(document.querySelector('canvas#clock'));
createCloud(document.querySelector('canvas#cloud'));