import * as THREE from "three";

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
scene.fog = new THREE.Fog("black", 1, 7);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: "tomato",
});
const meshes = [];
for (let i = 0; i < 10; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 5 - 2.5;
  mesh.position.z = Math.random() * 5 - 2.5;
  meshes.push(mesh);
  scene.add(mesh);
}

const clock = new THREE.Clock();
function draw() {
  renderer.render(scene, camera);
  // requestAnimationFrame(draw); //직접 써도 되나
  meshes.forEach((item) => {
    console.log("0-0");
    console.log(item);
    item.rotation.y += clock.getDelta() * 100;
  });
  renderer.setAnimationLoop(draw); // 이거를 VR 만들 때는 필요
}

draw();

function setSize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
window.addEventListener("resize", setSize);
