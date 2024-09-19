import { Keyboard } from "./keyboard";
import { Screen } from "./screen";
import "./style.css";

const screen = new Screen(10);
const keyboard = new Keyboard();
let loop;

let fps = 60;
let fpsInterval: number;
let startTime: number;
let now: number;
let then: number;
let elapsed: number;

function init() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;

  // TEST CODE

  loop = requestAnimationFrame(step);
}

function step() {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    // Cycle the CPU. We'll come back to this later and fill it out.
  }

  loop = requestAnimationFrame(step);
}

init();
