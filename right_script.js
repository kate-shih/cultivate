let imgSize = 50;
let images = [];
let plantImg;
let csvData;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("Canvas created:", windowWidth, windowHeight);
  noLoop();

  // load CSV
  csvData = await d3.csv("plant_data.csv", d3.autoType);
  console.log("CSV loaded:", csvData);

  // get page filename
  const currentPage = window.location.pathname.split('/').pop();
  console.log("Current page:", currentPage);

  // find the matching row in the CSV
  const pageData = csvData.find(row => row.page === currentPage);
  
  // find the image path
  if (pageData) {
    console.log("Found page data:", pageData);
    let imgPath = pageData.image;
    loadImage(imgPath, (img) => {
      plantImg = img;
    });
   }
}

function draw() {
  background(228, 250, 220);
  
  // draw all images
  if (images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image(image.img, image.x, image.y, imgSize, imgSize);
    }
    console.log("Drew", images.length, "images");
  }
}

// listen for messages from the left iframe
window.addEventListener("message", (event) => {
  console.log("Message received:", event.data);
  if (event.data.type === "growTree") {
    console.log("Right iframe received growTree message!");
    
	// find which page this message refers to
    const row = csvData.find(r => r.page === event.data.page);

	// get the image path
    let imgPath = row.image;

    insertImage(imgPath);
  }
});

// insert an image file into the page at a random position
function insertImage(imgPath) {
    // create img element
	const img = document.createElement('img');
    img.src = imgPath;
    img.style.position = 'absolute';
    img.style.width = imgSize + 'px';
    img.style.height = imgSize + 'px';
    
	// place at random
    const x = Math.floor(Math.random() * Math.max(1, window.innerWidth - imgSize));
    const y = Math.floor(Math.random() * Math.max(1, window.innerHeight - imgSize - 80) + 80);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    document.body.appendChild(img);
    console.log('Inserted IMG', imgPath, 'at', x, y);
    return;
  }





// function setup() {
// 	createCanvas(windowWidth, windowHeight)
// 	angleMode(DEGREES)
// 	noLoop()
// }

// function draw() {
// 	background(100)
// 	translate(width/2, height)
// 	branch(100)
// }

// function branch(len) {
//   push()
//   if (len > 10) {
// 	strokeWeight(map(len, 10, 100, 1, 15))
// 	stroke(70, 40, 20)
// 	line(0, 0, 0, -len)
// 	translate(0, -len)
// 	rotate(random(-20, -30))
// 	branch(len * random(0.7, 0.9))
// 	rotate(random(50, 60))
// 	branch(len * random(0.7, 0.9))
//   } else {
// 	fill(80, 120, 40)
// 	noStroke()
// 	ellipse(0, 0, 5)

// 	beginShape()
// 	for (var i = 45; i < 135; i++) {
// 		var rad = 15
// 		var x = rad * cos(i)
// 		var y = rad * sin(i)
// 		vertex(x, y)
// 	}

// 	for (var i = 135; i < 45; i--) {
// 		var rad = 15
// 		var x = rad * cos(i)
// 		var y = rad * sin(-i) + 20
// 		vertex(x, y)
// 	}

// 	endShape(CLOSE)
//   }
//   pop()
// }


