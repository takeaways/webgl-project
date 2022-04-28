const body = document.body;
let i = 0;
let frame;
const append = () => {
  const div = document.createElement("div");
  div.textContent = i++;
  body.appendChild(div);
  div.scrollIntoView({
    behavior: "smooth",
  });
  if (i === 100) {
    cancelAnimationFrame(frame);
    return;
  }
  frame = requestAnimationFrame(append);
};
append();
