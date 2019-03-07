import API from './api/index.js';
var group = new THREE.Object3D();

(() => {
console.log("🏆🏆🏆🏆🏆")
let letsGo = document.getElementById("form");
letsGo.addEventListener("submit", function(e){
	e.preventDefault();
	let bookvalue = document.getElementById("bookfield").value,
			namevalue = document.getElementById("namefield").value

	let form = document.getElementById("form");
	form.style.visibility = "hidden";
	goConfetti();

	search(bookvalue, namevalue);
});
})();

function search(searchQuery, championName) {
async function init(){
	const api = new API();
	const stream = await api.createStream("search/" + searchQuery + "&facet=type(book){2}");
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
  scene.background = new THREE.Color(0xf6f6f6);
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(25, aspectRatio, 0.1, 1000);
  camera.position.set(0, -25, 15);
	camera.lookAt(new THREE.Vector3(0,0,0));
  return camera;
}

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(100, -500, 100);
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
  ctx.font = 'Bold 24px Arial';

  ctx.beginPath();
  ctx.rect(0, 0, 256, 256);
  ctx.fillStyle = 'saddlebrown';
  ctx.fill();

	ctx.fillStyle = 'goldenrod';
  var titlewidth = ctx.measureText(texttitle).width;
	var nameWidth = ctx.measureText(textname).width;

  ctx.fillText(texttitle , 128 - (titlewidth / 2), 96);
  ctx.strokeStyle = 'black';
  ctx.strokeText(texttitle, 128 -(titlewidth / 2), 96);
  ctx.textAlign = "center";

	ctx.fillStyle = 'goldenrod';
	ctx.fillText(textname , 128 - (nameWidth / 2), 192);
	ctx.strokeStyle = 'black';
	ctx.strokeText(textname, 128 -(nameWidth / 2), 192);
	ctx.textAlign = "center";

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(bitmap)
  texture.needsUpdate = true;
	var material = [
		new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x2a0000,
        shininess: 10,
        specular: 0xffffff
    }),
		new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x2a0000,
        shininess: 10,
        specular: 0xffffff
    }),
		new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x2a0000,
        shininess: 10,
        specular: 0xffffff
    }),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
		new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x2a0000,
        shininess: 10,
        specular: 0xffffff
    }),
		new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x2a0000,
        shininess: 10,
        specular: 0xffffff
    })
];
  var geometry = new THREE.BoxGeometry( 3.5, 3.5, 2 );
  cube = new THREE.Mesh(geometry, material);
	var loader = new THREE.OBJLoader();

	// load a resource
	loader.load(
		// resource URL
		'./src/obj/tc_fea Trophy Cup 5/trophy_5_140209b.obj',
		// called when resource is loaded
		function ( object ) {
			object.scale.set( 0.1, 0.1, 0.1 )
			var shine = new THREE.MeshStandardMaterial( {
			    color: 0xd28e11,
					emissive: 0x664303,
					roughness: 0.25,
					metalness: 0.25,
					flatShading: 0,
					wireframeLinewidth: 1,
					vertexColors: THREE.NoColors,
					fog: 0
			} )

			object.traverse( function ( node ) {
		    if ( node.isMesh ) node.material = shine;
		  } );

			cube.position.z = -3;
			object.position.z = -2;
			group.add( cube );
			group.add( object );
		  scene.add(group)
			forCanvas();
		},
		// called when loading is in progresses
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened. No 🏆 for you.' );
		}
	);
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
	var confettiLandDiv = document.createElement('div')
	confettiLandDiv.className = "confetti-land";

	for (var i=0; i<80;i++) {
		var confettiDiv = document.createElement('div')
		confettiDiv.className = "confetti";
		confettiLandDiv.appendChild(confettiDiv)
	}
	document.body.appendChild(confettiLandDiv)

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

function forCanvas(){
	var buttonHolder = document.createElement('div')
	var printButton = document.createElement('button')
	var restartButton = document.createElement('button')
	buttonHolder.setAttribute("class", "buttonHolder")
	printButton.setAttribute("class", "printButton");
	restartButton.setAttribute("class", "restartButton")
	printButton.appendChild(document.createTextNode('Print'))
	restartButton.appendChild(document.createTextNode('Restart'))
	buttonHolder.appendChild(restartButton)
	buttonHolder.appendChild(printButton)
	document.body.appendChild(buttonHolder)
	document.getElementsByClassName("printButton")[0].addEventListener('click', print);
	document.getElementsByClassName("restartButton")[0].addEventListener('click', reload);
}

function print(){
	var exporter = new THREE.STLExporter();
	var result = exporter.parse(group);
	saveString( result, 'trophy.stl')
}

function saveString( text, filename ) {
	save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}

var link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link );

function save( blob, filename ) {
				link.href = URL.createObjectURL( blob );
				link.download = filename;
				link.click();
			}

function reload(){
	location.reload();
}
