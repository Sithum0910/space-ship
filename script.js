import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let mixer;

loader.load('path/to/spaceship.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const clip = gltf.animations[0]; // Assuming the first animation clip
    const action = mixer.clipAction(clip);
    action.play();
});

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}
animate();
