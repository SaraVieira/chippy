import { SPRITES } from "./const";
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
  stack: number[];
  paused: boolean;
  speed: number;
  i: number;

  constructor(renderer: Screen, keyboard: Keyboard) {
    this.renderer = renderer;
    this.keyboard = keyboard;
    this.memory = new Uint8Array(4096);

    this.registers8 = new Uint8Array(16);

    this.register = 0;

    // Timers
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.i = 0;

    // Program counter. Stores the currently executing address.
    this.pc = 0x200;

    // Don't initialize this with a size in order to avoid empty results.
    this.stack = [];

    this.paused = false;

    this.speed = 20;
  }

  togglePause() {
    this.paused = !this.paused;
  }

  loadSpritesIntoMemory() {
    // According to the technical reference, sprites are stored in the interpreter section of memory starting at hex 0x000
    for (let i = 0; i < SPRITES.length; i++) {
      this.memory[i] = SPRITES[i];
    }
  }

  loadProgramIntoMemory(program: Uint8Array) {
    for (let loc = 0; loc < program.length; loc++) {
      this.memory[0x200 + loc] = program[loc];
    }
  }
  loadRom(rom: Uint8Array) {
    this.loadProgramIntoMemory(rom);
  }

  cycle() {
    for (let i = 0; i < this.speed; i++) {
      if (!this.paused) {
        const opcode = (this.memory[this.pc] << 8) | this.memory[this.pc + 1];
        this.executeInstruction(opcode);
      }
    }

    if (!this.paused) {
      this.updateTimers();
    }

    this.playSound();
    this.renderer.render();
  }

  updateTimers() {
    if (this.delayTimer > 0) {
      this.delayTimer -= 1;
    }

    if (this.soundTimer > 0) {
      this.soundTimer -= 1;
    }
  }

  playSound() {
    // if (this.soundTimer > 0) {
    //     this.speaker.play(440);
    // } else {
    //     this.speaker.stop();
    // }
  }

  executeInstruction(opcode: number) {
    // Increment the program counter to prepare it for the next instruction.
    // Each instruction is 2 bytes long, so increment it by 2.
    this.pc += 2;

    // We only need the 2nd nibble, so grab the value of the 2nd nibble and shift it right 8 bits to get rid of everything but that 2nd nibble.
    const x = (opcode & 0x0f00) >> 8;

    // We only need the 3rd nibble, so grab the value of the 3rd nibble and shift it right 4 bits to get rid of everything but that 3rd nibble.
    const y = (opcode & 0x00f0) >> 4;

    switch (opcode & 0xf000) {
      case 0x0000:
        switch (opcode) {
          case 0x00e0:
            this.renderer.clear();
            break;
          case 0x00ee:
            this.pc = this.stack.pop()!;
            break;
        }

        break;
      case 0x1000:
        this.pc = opcode & 0xfff;
        break;
      case 0x2000:
        this.stack.push(this.pc);
        this.pc = opcode & 0xfff;
        break;
      case 0x3000:
        if (this.registers8[x] === (opcode & 0xff)) {
          this.pc += 2;
        }
        break;
      case 0x4000:
        if (this.registers8[x] !== (opcode & 0xff)) {
          this.pc += 2;
        }
        break;
      case 0x5000:
        if (this.registers8[x] === this.registers8[y]) {
          this.pc += 2;
        }
        break;
      case 0x6000:
        this.registers8[x] = opcode & 0xff;
        break;
      case 0x7000:
        this.registers8[x] += opcode & 0xff;
        break;
      case 0x8000:
        switch (opcode & 0xf) {
          case 0x0:
            this.registers8[x] = this.registers8[y];
            break;
          case 0x1:
            this.registers8[x] |= this.registers8[y];
            break;
          case 0x2:
            this.registers8[x] &= this.registers8[y];
            break;
          case 0x3:
            this.registers8[x] ^= this.registers8[y];
            break;
          case 0x4: {
            const sum = (this.registers8[x] += this.registers8[y]);

            this.registers8[0xf] = 0;

            if (sum > 0xff) {
              this.registers8[0xf] = 1;
            }

            this.registers8[x] = sum;
            break;
          }
          case 0x5:
            this.registers8[0xf] = 0;

            if (this.registers8[x] > this.registers8[y]) {
              this.registers8[0xf] = 1;
            }

            this.registers8[x] -= this.registers8[y];
            break;
          case 0x6:
            this.registers8[0xf] = this.registers8[x] & 0x1;

            this.registers8[x] >>= 1;
            break;
          case 0x7:
            this.registers8[0xf] = 0;

            if (this.registers8[y] > this.registers8[x]) {
              this.registers8[0xf] = 1;
            }

            this.registers8[x] = this.registers8[y] - this.registers8[x];
            break;
          case 0xe:
            this.registers8[0xf] = this.registers8[x] & 0x80;
            this.registers8[x] <<= 1;
            break;
        }

        break;
      case 0x9000:
        if (this.registers8[x] !== this.registers8[y]) {
          this.pc += 2;
        }
        break;
      case 0xa000:
        this.i = opcode & 0xfff;
        break;
      case 0xb000:
        this.pc = (opcode & 0xfff) + this.registers8[0];
        break;
      case 0xc000: {
        const rand = Math.floor(Math.random() * 0xff);

        this.registers8[x] = rand & (opcode & 0xff);
        break;
      }
      case 0xd000: {
        const width = 8;
        const height = opcode & 0xf;

        this.registers8[0xf] = 0;

        for (let row = 0; row < height; row++) {
          let sprite = this.memory[this.i + row];

          for (let col = 0; col < width; col++) {
            // If the bit (sprite) is not 0, render/erase the pixel
            if ((sprite & 0x80) > 0) {
              // If setPixel returns 1, which means a pixel was erased, set VF to 1
              if (
                this.renderer.setPixel(
                  this.registers8[x] + col,
                  this.registers8[y] + row
                )
              ) {
                this.registers8[0xf] = 1;
              }
            }

            // Shift the sprite left 1. This will move the next next col/bit of the sprite into the first position.
            // Ex. 10010000 << 1 will become 0010000
            sprite <<= 1;
          }
        }
        break;
      }

      case 0xe000:
        switch (opcode & 0xff) {
          case 0x9e:
            if (this.keyboard.isKeyPressed(this.registers8[x])) {
              this.pc += 2;
            }
            break;
          case 0xa1:
            if (!this.keyboard.isKeyPressed(this.registers8[x])) {
              this.pc += 2;
            }
            break;
        }

        break;
      case 0xf000:
        switch (opcode & 0xff) {
          case 0x07:
            this.registers8[x] = this.delayTimer;
            break;
          case 0x0a:
            this.paused = true;

            this.keyboard.onNextKeyPress = (key) => {
              this.registers8[x] = key;
              this.paused = false;
            };
            break;
          case 0x15:
            this.delayTimer = this.registers8[x];
            break;
          case 0x18:
            this.soundTimer = this.registers8[x];
            break;
          case 0x1e:
            this.i += this.registers8[x];
            break;
          case 0x29:
            this.i = this.registers8[x] * 5;
            break;
          case 0x33:
            // Get the hundreds digit and place it in I.
            this.memory[this.i] = Math.round(this.registers8[x] / 100);

            // Get tens digit and place it in I+1. Gets a value between 0 and 99, then divides by 10 to give us a value
            // between 0 and 9.
            this.memory[this.i + 1] = Math.round(
              (this.registers8[x] % 100) / 10
            );

            // Get the value of the ones (last) digit and place it in I+2. 0 through 9.
            this.memory[this.i + 2] = Math.round(this.registers8[x] % 10);
            break;
          case 0x55:
            for (let registerIndex = 0; registerIndex <= x; registerIndex++) {
              this.memory[this.i + registerIndex] =
                this.registers8[registerIndex];
            }
            break;
          case 0x65:
            for (let registerIndex = 0; registerIndex <= x; registerIndex++) {
              this.registers8[registerIndex] =
                this.memory[this.i + registerIndex];
            }
            break;
        }

        break;

      default:
        throw new Error("Unknown opcode " + opcode);
    }
  }
}
