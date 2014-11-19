var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var geometry = new THREE.Geometry();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++)
        geometry.vertices.push(new THREE.Vector3(x, 0, y));
}
var normal = new THREE.Vector3(0, 0, -1);
for (var x = 0; x < 9; x++)
    for (var y = 0; y < 9; y++) {
        geometry.faces.push(new THREE.Face3(10 * y + x, 10 * y + x + 1, 10 * y + x + 10, normal));
        geometry.faces.push(new THREE.Face3(10 * y + x + 10, 10 * y + x + 1, 10 * y + x + 11, normal));
    }
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false});
var material2 = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff });
var shape = new THREE.Mesh(geometry, material);
var frame = new THREE.Mesh(geometry, material2);
scene.add(shape);
scene.add(frame);

var startvertices = geometry.vertices.slice(0);
camera.position.z = 0;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(new THREE.Vector3(5, 0, 5));

var render = function () {
    t++;
    requestAnimationFrame(render);
    analyser.getFloatFrequencyData(dataArray);
    for (var c = 0; c < geometry.vertices.length; c++)
    {
        geometry.vertices[c].y = (dataArray[c]+100)/30;
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