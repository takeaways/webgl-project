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
light.position.z = 2;
scene.add(light);
// 원근이 보이는 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, //near
  1000 //far
);

camera.position.z = 2;

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
const clock = new THREE.Clock();
function draw() {
  // getElapsedTime 경과 시간
  const time = clock.getElapsedTime() * 2;
  console.log(time);
  mesh.rotation.y = time;
  // mesh.rotation.y += THREE.MathUtils.degToRad(1);
  mesh.position.y += 0.01;
  if (mesh.position.y > 3) {
    mesh.position.y = 0;
  }
  renderer.render(scene, camera);
  // requestAnimationFrame(draw); //직접 써도 되나
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
