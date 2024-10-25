import { CPU } from "../cpu";

const fps = 60;
let fpsInterval: number;
let now: number;
let then: number;
let elapsed: number;

export function loadChippy(rom: Uint8Array, cpu: CPU) {
  fpsInterval = 1000 / fps;
  then = Date.now();

  cpu.loadSpritesIntoMemory();
  cpu.loadRom(rom);
  requestAnimationFrame(() => {
    step(cpu);
  });
}

function step(cpu: CPU) {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    cpu.cycle();
  }

  requestAnimationFrame(() => {
    step(cpu);
  });
}
