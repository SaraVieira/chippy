import { CPU } from './cpu';
import { Keyboard } from './keyboard';
import { Colors, Screen } from './screen';
import { Speaker } from './speaker';

const fps = 60;
let fpsInterval: number;
let now: number;
let then: number;
let elapsed: number;

export const loadChippy = (rom: Uint8Array, cpu: CPU) => {
  fpsInterval = 1000 / fps;
  then = Date.now();

  cpu.loadSpritesIntoMemory();
  cpu.loadRom(rom);
  requestAnimationFrame(() => step(cpu));
};

function step(cpu: CPU) {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    cpu.cycle();
  }

  requestAnimationFrame(() => step(cpu));
}

export const startChippy = ({
  rom,
  el,
  scale = 10,
  colors,
  speed = 10,
}: {
  colors?: Colors;
  rom: Uint8Array;
  el: HTMLCanvasElement;
  scale?: number;
  speed?: number;
}) => {
  const screen = new Screen(scale, el, colors);
  const keyboard = new Keyboard();
  loadChippy(rom, new CPU(screen, keyboard, new Speaker(), { speed: speed }));
};

export { CPU, Keyboard, Screen };
