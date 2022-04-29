import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import Stats from "stats.js";
import KeyController from "./utils/keyController";
// ----- 주제: Group
const keyController = new KeyController();
function work() {
  if (keyController.keys["ArrowUp"]) {
    controls.moveForward(0.09);
  }
  if (keyController.keys["ArrowDown"]) {
    controls.moveForward(-0.09);
  }
  if (keyController.keys["ArrowRight"]) {
    controls.moveRight(0.09);
  }
  if (keyController.keys["ArrowLeft"]) {
    controls.moveRight(-0.09);
  }
}
// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 1;
camera.position.y = 5;
camera.position.z = 10;
scene.add(camera);

//Controls
const controls = new PointerLockControls(camera, renderer.domElement);
controls.enableDamping = true;
// Light
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Mesh
const geometry = new THREE.SphereGeometry(3, 102, 102);

const material = new THREE.MeshStandardMaterial({
  color: "orangered",
  side: THREE.DoubleSide,
  // wireframe: true,
  flatShading: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 2;
mesh.position.z = 2;

const positionArray = geometry.attributes.position.array;
const randomArray = [];
for (let i = 0; i < positionArray.length; i += 3) {
  positionArray[i] += (Math.random() - 0.5) * 0.2;
  positionArray[i + 1] += (Math.random() - 0.5) * 0.2;
  positionArray[i + 2] += (Math.random() - 0.5) * 0.2;

  randomArray[i] = (Math.random() - 0.5) * 0.2;
  randomArray[i + 1] = (Math.random() - 0.5) * 0.2;
  randomArray[i + 2] = (Math.random() - 0.5) * 0.2;
}

// scene.add(mesh);

const group1 = new THREE.Group();
const box1 = new THREE.Mesh(geometry, material);

const group2 = new THREE.Group();
// const box2 = new THREE.Mesh(geometry, material);
const box2 = box1.clone();
box2.scale.set(0.3, 0.3, 0.3);
group2.position.x = 7;

const group3 = new THREE.Group();
// const box3 = new THREE.Mesh(geometry, material);
const box3 = box2.clone();
box3.scale.set(0.15, 0.15, 0.15);
box3.position.x = 2;
group3.add(box3);

group2.add(box2, group3);
group1.add(box1, group2);
scene.add(group1);

//
const stats = new Stats();
document.body.append(stats.domElement);

const clock = new THREE.Clock();
function draw() {
  const delta = clock.getDelta();
  stats.update();
  work();

  // group1.rotation.y += delta;
  // group2.rotation.y += delta;
  // group3.rotation.y += delta;

  const time = clock.getElapsedTime() * 9;
  for (let i = 0; i < positionArray.length; i += 3) {
    positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001;
    positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.001;
    positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.001;
  }
  geometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

draw();

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 이벤트
window.addEventListener("resize", setSize);
