import { Stuff } from "./stuff";
import { cm1 } from "../utils/common";
import { AnimationMixer } from "three";
import { Mesh } from "three";
import { BoxGeometry } from "three";
import { MeshBasicMaterial } from "three";

export class Player extends Stuff {
  constructor(info) {
    super(info);

    this.width = 0.5;
    this.height = 0.5;
    this.depth = 0.5;

    this.mesh = new Mesh(
      new BoxGeometry(this.width, this.height, this.depth),
      new MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    this.mesh.castShadow = true;
    this.mesh.position.set(this.x, this.y, this.z);
    cm1.scene.add(this.mesh);

    cm1.gltfLoader.load("./models/ilbuni.glb", (glb) => {
      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.set(this.x, this.y, this.z);
      this.modelMesh.animations = glb.animations;
      this.modelMesh.castShadow = true;

      //물리엔진 적용하면 필요 없음
      this.modelMesh.rotation.set(
        this.rotationX,
        this.rotationY,
        this.rotationZ
      );

      cm1.scene.add(this.modelMesh);
      cm1.mixer = new AnimationMixer(this.modelMesh);
      this.actions = [];
      this.actions[0] = cm1.mixer.clipAction(this.modelMesh.animations[0]);
      this.actions[1] = cm1.mixer.clipAction(this.modelMesh.animations[1]);
      this.actions[2] = cm1.mixer.clipAction(this.modelMesh.animations[2]);
      this.actions[2].repetitions = 1;
      this.actions[0].play();

      this.setCannonBody();
    });
  }
}
