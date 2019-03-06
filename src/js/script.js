import API from './api/index.js';

(() => {
let letsGo = document.getElementById("form");
letsGo.addEventListener("submit", function(e){
	e.preventDefault();
	let bookvalue = document.getElementById("bookfield").value,
			namevalue = document.getElementById("namefield").value
	goConfetti();
	search(bookvalue, namevalue);
});
})();

function search(searchQuery, championName) {
async function init(){
	const api = new API();
	const stream = await api.createStream("search/" + searchQuery + "&facet=type(book)&librarian=true{2}");
	stream
		.pipe(renderToDocument)
}

function renderToDocument(stream){
	let oldTitle = stream[0].title.full;
	let newTitle = oldTitle.split("/");
  let usefulData = {
   name: championName,
   title: newTitle[0]
  }

  start3d(usefulData)
}
init()
}

function start3d(naam = parametertje) {
  function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(25, aspectRatio, 0.1, 1000);
  camera.position.set(0, 1, 5);
  return camera;
}

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(1, 1, 1);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

function getRenderer() {
  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({antialias: false});
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the canvas to the DOM
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.1;
  controls.panSpeed = 0.1;
  return controls;
}

var PIXEL_RATIO = (function () {
  var ctx = document.createElement('canvas').getContext('2d'),
      dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
})();


var createRetinaCanvas = function(w, h, ratio) {
  if (!ratio) { ratio = PIXEL_RATIO; }
  var can = document.createElement('canvas');
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + 'px';
  can.style.height = h + 'px';
  can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
}

function addTexture(name = naam) {
  var textname = name.name;
	var texttitle = name.title;
  //create image
  var bitmap = createRetinaCanvas(256, 256);
  var ctx = bitmap.getContext('2d', {antialias: false});
  ctx.font = 'Bold 20px Arial';

  ctx.beginPath();
  ctx.rect(0, 0, 256, 256);
  ctx.fillStyle = 'gold';
  ctx.fill();

	ctx.fillStyle = 'white';
  var textWidth = ctx.measureText(texttitle).width;
  ctx.fillText(texttitle , 128 - (textWidth / 2), 96);
  ctx.strokeStyle = 'black';
  ctx.strokeText(texttitle, 128 -(textWidth / 2), 96);
  ctx.textAlign = "center";

	ctx.fillStyle = 'white';
	var textWidth = ctx.measureText(textname).width;
	ctx.fillText(textname , 184 - (textWidth / 2), 192);
	ctx.strokeStyle = 'black';
	ctx.strokeText(textname, 184 -(textWidth / 2), 192);
	ctx.textAlign = "center";

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(bitmap)
  texture.needsUpdate = true;
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube)
}

// Render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);
var cube;

addTexture()

render();
}

//https://codepen.io/danwilson/pen/vKzbgd
function goConfetti() {
	var confettiPlayers = [];
function makeItConfetti() {
  var confetti = document.querySelectorAll('.confetti');

  if (!confetti[0].animate) {
    return false;
  }

  for (var i = 0, len = confetti.length; i < len; ++i) {
    var snowball = confetti[i];
    snowball.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
    var scale = Math.random() * .8 + .2;
    var player = snowball.animate([
      { transform: 'translate3d(' + (i/len*100) + 'vw,0,0) scale(' + scale + ')', opacity: scale },
      { transform: 'translate3d(' + (i/len*100 + 10) + 'vw,100vh,0) scale(' + scale + ')', opacity: 1 }
    ], {
      duration: Math.random() * 3000 + 3000,
      iterations: Infinity,
      delay: -(Math.random() * 5000)
    });


    confettiPlayers.push(player);
  }
}

makeItConfetti();
}

/*

- Welkom, uitleg?
- Vragen en dan send
- Eerst laadscherm
- Dan alles weghalen voor canvbas
	+ Knoppen voor opnieuw en print

*/
