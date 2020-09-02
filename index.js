import roofData from "./data.js";

const width = 236;
const height = 251;
const imageUrl = 'https://img.techpowerup.org/200902/applicable-image3.png';

const delta = [];
for (var key in roofData) {
  if (roofData.hasOwnProperty(key)) {
    var val = roofData[key];

    const cordinates = [];
    for (var innerKey in val) {
      if (val.hasOwnProperty(innerKey)) {
        var innerval = val[innerKey];
        cordinates.push(innerval);
      }
    }

    delta.push({
      fill: true,
      data: cordinates
    });
  }
}

function getCoordinates(obj) {
  return [obj.x, obj.y];
}

var ctx = document.getElementById("c").getContext("2d");

document.getElementById("image").src = imageUrl;
document.getElementById("c").width  = width;
document.getElementById("c").height = height;

ctx.clearRect(0, 0, width, height);

ctx.strokeStyle = "#f37320";
ctx.lineWidth = 1;

delta.map(panelData => {
  const { fill, data } = panelData;

  if (fill) {
    ctx.fillStyle = "rgba(9,21,39,0.7)";
  } else {
    ctx.fillStyle = "transparent";
  }

  ctx.beginPath();
  const [first, ...rest] = data;

  const d = getCoordinates(first);

  //// set start points of panel
  ctx.moveTo(d[0], d[1]);

  rest.map(restData => {
    const rd = getCoordinates(restData);
    // draw lines to x,y position of panel placement
    ctx.lineTo(rd[0], rd[1]);
  });
  ctx.closePath();
  // fill border color
  ctx.stroke();
  // fill box color
  ctx.fill();
});
