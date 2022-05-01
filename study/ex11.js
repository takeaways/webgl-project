import * as THREE from "three";
import Stats from "stats.js";
import dat from "dat.gui";
// ----- 주제: AxesHelper, GridHelper

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

const stats = new Stats();
document.body.append(stats.domElement);

camera.position.x = 1;
camera.position.z = 10;
scene.add(camera);

const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: "seagreen",
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 2;
mesh.position.z = 2;
scene.add(mesh);

// Dat GUI
const gui = new dat.GUI();
gui //
  .add(mesh.position, "y", -5, 5, 0.01)
  .name("메쉬 y 위치");
gui //
  .add(mesh.position, "x", -5, 5, 0.01)
  .name("메쉬 x 위치");

// 그리기
const clock = new THREE.Clock();

function draw() {
  stats.update();
  camera.lookAt(mesh.position);
  mesh.position.set(-1, 2, -5);
  mesh.position.distanceTo(new THREE.Vector3(1, 2, 0));
  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 이벤트
window.addEventListener("resize", setSize);

draw();
