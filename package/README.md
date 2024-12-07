# Chippy

Chippy is a chip-8 emulator built with JavaScript.

## How to use:

```ts
import { startChippy } from '@saravieira/chippy';

const uint8Array = new Uint8Array(buffer); // from a file upload
startChippy({
  rom: uint8Array,
  colors: { fill: '#fff' } as { fill?: string; bg?: string },
  el: el as HTMLCanvasElement,
  speed: 10, // emulation speed and default is 10
  scale: 10, // scale and default is 10
});
```

## License

MIT
