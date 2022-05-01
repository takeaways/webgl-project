import * as THREE from "three";

const canvas = document.querySelector("#three-canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
// renderer.setClearAlpha(0.5);
// renderer.setClearColor(0x00ff00);
renderer.setClearColor("#00ff00");
renderer.setClearAlpha(0.5);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("blue");
// 원근이 보이는 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, //near
  1000 //far
);

camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;

camera.lookAt(0, 0, 0);
camera.zoom = 0.5;
camera.updateProjectionMatrix();

scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "tomato",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.render(scene, camera);

function setSize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
window.addEventListener("resize", setSize);
