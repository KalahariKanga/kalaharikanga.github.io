var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var geometry = new THREE.SphereGeometry(1, 32, 32);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
var material2 = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff });
var shape = new THREE.Mesh(geometry, material);
var frame = new THREE.Mesh(geometry, material2);
scene.add(shape);
scene.add(frame);


var startvertices = JSON.parse(JSON.stringify(geometry.vertices));
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var render = function () {
    t++;
    camera.position.y = 0;
    camera.position.x = 5 * Math.sin(t / 50);
    camera.position.z = 5 * Math.cos(t / 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    

    requestAnimationFrame(render);
    analyser.getFloatFrequencyData(dataArray);
    for (var c = 0; c < geometry.vertices.length; c++) {
        var alpha = ((dataArray[Math.floor((32*c) / geometry.vertices.length)] + 100) / 30) || 1;
        geometry.vertices[c].x = startvertices[c].x * alpha;
        geometry.vertices[c].y = startvertices[c].y * alpha;
        geometry.vertices[c].z = startvertices[c].z * alpha;
    }
    geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);

};

var t = 0;


var audiocontext = new AudioContext();
var myAudio = document.querySelector('audio');
var source = audiocontext.createMediaElementSource(myAudio);
var analyser = audiocontext.createAnalyser();
analyser.fftSize = 256;
var bufferLength = analyser.fftSize;
var dataArray = new Float32Array(bufferLength);
analyser.getFloatFrequencyData(dataArray);
source.connect(analyser);
analyser.connect(audiocontext.destination);



render();