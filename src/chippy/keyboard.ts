import { KEYMAP } from "./const";

export class Keyboard {
  keysPressed: { [key: number]: boolean };
  onNextKeyPress: ((key: number) => void) | null;
  constructor() {
    this.keysPressed = {};

    // Some Chip-8 instructions require waiting for the next keypress. We initialize this function elsewhere when needed.
    this.onNextKeyPress = null;

    window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    window.addEventListener("keyup", this.onKeyUp.bind(this), false);
  }

  isKeyPressed(keyCode: number) {
    return this.keysPressed[keyCode];
  }

  onKeyDown(event: KeyboardEvent) {
    const key = KEYMAP[event.which];
    this.keysPressed[key] = true;

    // Make sure onNextKeyPress is initialized and the pressed key is actually mapped to a Chip-8 key
    if (this.onNextKeyPress !== null && key) {
      this.onNextKeyPress(parseInt(key));
      this.onNextKeyPress = null;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    this.keysPressed[KEYMAP[event.which]] = false;
  }
}
