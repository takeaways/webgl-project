import * as THREE from "three";

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(
  canvas.getBoundingClientRect().width,
  canvas.getBoundingClientRect().height
);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// 원근이 보이는 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, //near
  1000 //far
);

// 원근 없이 같이 보이는 카메라
// const camera = new THREE.OrthographicCamera(
//   -(window.innerWidth / window.innerHeight), //
//   window.innerWidth / window.innerHeight,
//   1,
//   -1,
//   0.1,
//   1000
// );

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
