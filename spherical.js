var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var geometry = new THREE.Geometry();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
var shape = new THREE.Mesh(geometry, material);
scene.add(shape);

for (var c = 0; c < 100; c++)
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
for (var c = 0; c < 98; c++)
    geometry.faces.push(new THREE.Face3(c, c + 1, c+2));

var fn = function(time, t)
{
    r = 3;
    var alpha = Math.abs(ampArray[Math.floor((t / (2 * Math.PI)) * bufferLength)]);

    var theta = t*8*Math.abs(Math.sin(time/100));
    var phi = t/2;
    
    return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function avg(array)
{
    var sum = 0;
    for (var p = 0; p < array.length; p++)
        sum += array[p];
    return sum / array.length;
}

camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var render = function () {
    t++;
    camera.position.y = 0;
    //camera.position.x = 5 * Math.sin(t / 50);
    //camera.position.z = 5 * Math.cos(t / 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    requestAnimationFrame(render);
    analyser.getFloatFrequencyData(freqArray);
    analyser.getFloatTimeDomainData(ampArray);

    for (var c = 0; c < 100; c++)
    {
        geometry.vertices[c].copy(fn(t, 2 * Math.PI * c / 100));
    }
    
    geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);

};

var t = 0;


var audiocontext = new AudioContext();
var myAudio = document.querySelector('audio');
myAudio.play();
var source = audiocontext.createMediaElementSource(myAudio);

var analyser = audiocontext.createAnalyser();
analyser.fftSize = 256;
var bufferLength = analyser.fftSize;
var freqArray = new Float32Array(bufferLength);
analyser.getFloatFrequencyData(freqArray);
var ampArray = new Float32Array(bufferLength);
analyser.getFloatTimeDomainData(ampArray);
source.connect(analyser);
analyser.connect(audiocontext.destination);



render();