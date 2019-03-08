import API from "./api/index.js";
var group = new THREE.Object3D();

(() => {
  console.log("🏆🏆🏆🏆🏆");
  let letsGo = document.getElementById("form");
  letsGo.addEventListener("submit", function(e) {
    e.preventDefault();
    let bookvalue = document.getElementById("bookfield").value,
      namevalue = document.getElementById("namefield").value;

    let form = document.getElementById("form");
    form.style.visibility = "hidden";
    goConfetti();

    search(bookvalue, namevalue);
  });
})();

function search(searchQuery, championName) {
  async function init() {
    const api = new API();
    const stream = await api.createStream(
      "search/" + searchQuery + "&facet=type(book){1}"
    );
    stream.pipe(renderToDocument);
  }

  function renderToDocument(stream) {
    console.log(stream);
    let oldTitle = stream.title.full;
    let newTitle = oldTitle.split("/");

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
		  dd = '0' + dd;
		}
		if (mm < 10) {
		  mm = '0' + mm;
		}
		var today = dd + '/' + mm + '/' + yyyy;

    let usefulData = {
      name: championName,
      title: newTitle[0],
			today: today
    };

    start3d(usefulData);
  }
  init();
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
    camera.lookAt(new THREE.Vector3(0, 0, 0));
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
    var renderer = new THREE.WebGLRenderer({ antialias: false });
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

  var PIXEL_RATIO = (function() {
    var ctx = document.createElement("canvas").getContext("2d"),
      dpr = window.devicePixelRatio || 1,
      bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
    return dpr / bsr;
  })();

  var createRetinaCanvas = function(w, h, ratio) {
    if (!ratio) {
      ratio = PIXEL_RATIO;
    }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
  };

  function addTexture(info = naam) {
		//Font, taken from three.js example fonts
		var textloader = new THREE.FontLoader();
		textloader.load('./src/font/helvetiker_regular.typeface.json', function (font) {
			var textcolor = new THREE.MeshPhongMaterial({
				color: 0x775414
			})

			//The name of our winner
			var nameGeo = new THREE.TextGeometry( info.name, {
				font: font,
				size: 25,
				height: 10,
				curveSegments: 15,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 1,
				bevelSegments: 6
			} );
			nameGeo = new THREE.BufferGeometry().fromGeometry(nameGeo);
			var nameMesh = new THREE.Mesh(nameGeo, textcolor);
			nameMesh.scale.set(0.01,0.01,0.01)
			nameMesh.position.y = -1.75;
			nameMesh.position.z = -3.5;
			nameMesh.rotation.x = 1.5;
			//To get width
			var nameBox = new THREE.Box3().setFromObject( nameMesh );
			nameMesh.position.x = -(nameBox.max.x/2)
			group.add(nameMesh)

			//Book title on the front
			var titleGeo = new THREE.TextGeometry( info.title, {
				font: font,
				size: 25,
				height: 10,
				curveSegments: 15,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 1,
				bevelSegments: 6
			} );

			var titleMesh = new THREE.Mesh(titleGeo, textcolor);
			titleMesh.scale.set(0.01,0.01,0.01)
			titleMesh.position.y = -1.75;
			titleMesh.position.z = -2.75;
			titleMesh.rotation.x = 1.5;
			//To get width
			var titleBox = new THREE.Box3().setFromObject( titleMesh );
			titleMesh.position.x = -(titleBox.max.x/2)
			group.add(titleMesh)

			//Date on the back
			var todayGeo = new THREE.TextGeometry( info.today, {
				font: font,
				size: 25,
				height: 10,
				curveSegments: 15,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 1,
				bevelSegments: 6
			} );

			var todayMesh = new THREE.Mesh(todayGeo, textcolor);
			todayMesh.scale.set(0.01,0.01,0.01)
			todayMesh.position.y = 1.75;
			todayMesh.position.z = -3.125;
			todayMesh.rotation.x = 1.5;
			todayMesh.rotation.y = 3.15;
			//To get width
			var todayBox = new THREE.Box3().setFromObject( todayMesh );
			todayMesh.position.x = -(todayBox.min.x/2)
			group.add(todayMesh)

			//creating oba logo
			var logo = new THREE.Object3D();

			var ob = "ob";
			var obGeo = new THREE.TextGeometry( ob, {
				font: font,
				size: 20,
				height: 12.5,
				curveSegments: 15,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 1,
				bevelSegments: 6
			});

			var obMesh = new THREE.Mesh(obGeo, textcolor);
			obMesh.scale.set(0.05,0.05,0.05)

			var a = "a";
			var aGeo = new THREE.TextGeometry( a, {
				font: font,
				size: 20,
				height: 12.5,
				curveSegments: 15,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 1,
				bevelSegments: 6
			});

			var aMesh = new THREE.Mesh(aGeo, textcolor);
			aMesh.scale.set(0.05,0.05,0.05)
			obMesh.position.x = -1.25;
			aMesh.position.x = +1.25
			aMesh.rotation.z = +1.6;
			logo.add(obMesh)
			logo.add(aMesh)
			logo.rotation.x = +1.6;
			logo.position.z = +3;
			logo.position.y = -1.25;

			group.add(logo)
		});

		//Box for trophy to rest on
    var material = new THREE.MeshPhongMaterial({
        color: 0x783F04,
        emissive: 0x2a0000,
        shininess: 1,
      });
    var geometry = new THREE.BoxGeometry(3.5, 3.5, 2);
    cube = new THREE.Mesh(geometry, material);

		//Trophy loader
		var trophyLoader = new THREE.OBJLoader();
    // load a resource
    trophyLoader.load(
      // resource URL
      "./src/obj/tc_fea Trophy Cup 5/trophy_5_140209b.obj",
      // called when resource is loaded
      function(object) {
        object.scale.set(0.1, 0.1, 0.1);
        var shine = new THREE.MeshStandardMaterial({
          color: 0x664303,
          emissive: 0x775414,
          roughness: 0.25,
          metalness: 0.75,
          flatShading: 1,
          wireframeLinewidth: 1,
          vertexColors: THREE.NoColors,
          fog: 0
        });

        object.traverse(function(node) {
          if (node.isMesh) node.material = shine;
        });

        cube.position.z = -3;
        object.position.z = -2;
        group.add(cube);
        group.add(object);
        scene.add(group);
        forCanvas();
      },
      // called when loading is in progresses
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function(error) {
        console.log("An error happened. No 🏆 for you.");
      }
    );
  }

  // Render loop
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
  }

  var scene = getScene();
  var camera = getCamera();
  var light = getLight(scene);
  var renderer = getRenderer();
  var controls = getControls(camera, renderer);
  var cube;

  addTexture();
  render();
}

//https://codepen.io/danwilson/pen/vKzbgd
function goConfetti() {
  var confettiLandDiv = document.createElement("div");
  confettiLandDiv.className = "confetti-land";

  for (var i = 0; i < 80; i++) {
    var confettiDiv = document.createElement("div");
    confettiDiv.className = "confetti";
    confettiLandDiv.appendChild(confettiDiv);
  }
  document.body.appendChild(confettiLandDiv);

  var confettiPlayers = [];
  function makeItConfetti() {
    var confetti = document.querySelectorAll(".confetti");

    if (!confetti[0].animate) {
      return false;
    }

    for (var i = 0, len = confetti.length; i < len; ++i) {
      var snowball = confetti[i];
      snowball.innerHTML =
        '<div class="rotate"><div class="askew"></div></div>';
      var scale = Math.random() * 0.8 + 0.2;
      var player = snowball.animate(
        [
          {
            transform:
              "translate3d(" + (i / len) * 100 + "vw,0,0) scale(" + scale + ")",
            opacity: scale
          },
          {
            transform:
              "translate3d(" +
              ((i / len) * 100 + 10) +
              "vw,100vh,0) scale(" +
              scale +
              ")",
            opacity: 1
          }
        ],
        {
          duration: Math.random() * 3000 + 3000,
          iterations: Infinity,
          delay: -(Math.random() * 5000)
        }
      );

      confettiPlayers.push(player);
    }
  }

  makeItConfetti();
}

function forCanvas() {
  var buttonHolder = document.createElement("div");
  var printButton = document.createElement("button");
  var restartButton = document.createElement("button");
  buttonHolder.setAttribute("class", "buttonHolder");
  printButton.setAttribute("class", "printButton");
  restartButton.setAttribute("class", "restartButton");
  printButton.appendChild(document.createTextNode("Print"));
  restartButton.appendChild(document.createTextNode("Restart"));
  buttonHolder.appendChild(restartButton);
  buttonHolder.appendChild(printButton);
  document.body.appendChild(buttonHolder);
  document
    .getElementsByClassName("printButton")[0]
    .addEventListener("click", print);
  document
    .getElementsByClassName("restartButton")[0]
    .addEventListener("click", reload);
}

function print() {
  var exporter = new THREE.STLExporter();
  var result = exporter.parse(group);
  saveString(result, "trophy.stl");
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function save(blob, filename) {
  let link;
  link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function reload() {
  location.reload();
}

/*
TODO:
Add a +1 to cam so it moves the trophy around.
Probably still somewhere in the old commits since I removed it in this new version.
*/
