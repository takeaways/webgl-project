# webgl-project

# Scene

하나의 무대 여기서 부터 시작된다.

# Mesh

무대위 오브젝트

- Geometry: 모양
- Material: 재질

# Camera

시야각

- fov (Field of View): 어느 각도로 볼 수 있는가
- aspenct: 가로세로비
- near - far: 사이에 있고 시야각 안에 있어야 보인다.

# Light

조명

- Optional

# Renderer

카라메라 보고 있는 장면을 렌더

```js
//1 make canvas from renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//2 use canvas aleady exited in html
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
```

## glTF - json format d3 :)

make 3D file with [blender](https://www.blender.org/)!
