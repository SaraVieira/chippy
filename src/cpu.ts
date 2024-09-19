import { Keyboard } from "./keyboard";
import { Screen } from "./screen";

export class CPU {
  renderer: Screen;
  keyboard: Keyboard;
  memory: Uint8Array;
  registers8: Uint8Array;
  register: number;
  delayTimer: number;
  soundTimer: number;
  pc: number;
  stack: any[];
  paused: boolean;
  speed: number;

  constructor(renderer: Screen, keyboard: Keyboard) {
    this.renderer = renderer;
    this.keyboard = keyboard;
    this.memory = new Uint8Array(4096);

    this.registers8 = new Uint8Array(16);

    this.register = 0;

    // Timers
    this.delayTimer = 0;
    this.soundTimer = 0;

    // Program counter. Stores the currently executing address.
    this.pc = 0x200;

    // Don't initialize this with a size in order to avoid empty results.
    this.stack = new Array();

    this.paused = false;

    this.speed = 10;
  }
}
