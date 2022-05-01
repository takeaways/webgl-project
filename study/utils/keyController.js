export default class KeyController {
  constructor() {
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
      console.log(this.keys);
    });
    window.addEventListener("keyup", (e) => {
      delete this.keys[e.code];
    });
  }
}
