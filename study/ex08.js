import * as THREE from "three";
import gsap from "gsap";

const canvas = document.querySelector("#three-canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 1;
light.position.y = 1;
light.position.z = 10;
scene.add(light);
// 원근이 보이는 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, //near
  1000 //far
);
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);
camera.zoom = 0.5;
camera.updateProjectionMatrix();
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: "tomato",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function draw() {
  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw); // 이거를 VR 만들 때는 필요
}

gsap.to(mesh.position, {
  duration: 1,
  y: 2,
  z: 3,
});
draw();

function setSize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
window.addEventListener("resize", setSize);
