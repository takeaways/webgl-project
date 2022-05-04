import { World, Material } from "cannon-es";
import { SphereGeometry, MeshPhongMaterial, Scene, BoxGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export const cm1 = {
  scene: new Scene(),
  gltfLoader: new GLTFLoader(),
  mixer: undefined,

  world: new World(),
  defaultMaterial: new Material("default"),
  glassMaterial: new Material("glass"),
  playerMaterial: new Material("player"),
};

export const cm2 = {
  step: 0,
  backgroundColor: "#3e1322",
  lightColor: "#ffe9ac",
  lightOffColor: "#222",
  pillarColor: "#071d28",
  floorColor: "#111",
  barColor: "#441c1d",
  sideLightColor: "#ffe9ac",
  glassColor: "#9fdff",
};

export const geo = {
  pillar: new BoxGeometry(5, 10, 5),
  floor: new BoxGeometry(200, 1, 200),
  bar: new BoxGeometry(0.1, 0.3, 1.2 * 21),
  sideLight: new SphereGeometry(0.1, 6, 6),
  glass: new BoxGeometry(1.2, 0.05, 1.2),
};

export const mat = {
  pillar: new MeshPhongMaterial({ color: cm2.pillarColor }),
  floor: new MeshPhongMaterial({ color: cm2.floorColor }),
  bar: new MeshPhongMaterial({ color: cm2.barColor }),
  sideLight: new MeshPhongMaterial({ color: cm2.sideLightColor }),
  glass1: new MeshPhongMaterial({
    color: cm2.glassColor,
    transparent: true,
    opacity: 0.1,
  }),
  glass2: new MeshPhongMaterial({
    color: cm2.glassColor,
    transparent: true,
    opacity: 0.15,
  }),
};

const normalSound = new Audio();
normalSound.src = "/sounds/crash.mp3";
const strongSound = new Audio();
strongSound.src = "/sounds/step.mp3";
const backSound = new Audio();
backSound.src = "/sounds/back.mp3";

export const sounds = {
  normal: normalSound,
  strong: strongSound,
  background: backSound,
};
