import { COLS, ROWS } from "./const";

type Colors = {
  fill?: string;
  bg?: string;
};

export class Screen {
  scale: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  display: number[];
  colors: Colors;
  constructor(scale: number, canvas: HTMLCanvasElement, colors?: Colors) {
    this.display = new Array(COLS * ROWS).fill(0);
    this.scale = scale;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.colors = {
      fill: colors?.fill || "#000",
      bg: colors?.bg || "white",
    };

    this.canvas.width = COLS * this.scale;
    this.canvas.height = ROWS * this.scale;
  }

  setPixel(x: number, y: number) {
    if (x > COLS) {
      x -= COLS;
    } else if (x < 0) {
      x += COLS;
    }

    if (y > ROWS) {
      y -= ROWS;
    } else if (y < 0) {
      x += ROWS;
    }
    const pixelLoc = x + y * COLS;

    this.display[pixelLoc] ^= 1;

    return !this.display[pixelLoc];
  }

  clear() {
    this.display = new Array(COLS * ROWS).fill(0);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < COLS * ROWS; i++) {
      const x = (i % COLS) * this.scale;

      const y = Math.floor(i / COLS) * this.scale;

      if (this.display[i]) {
        this.ctx.fillStyle = this.colors.fill;
        this.ctx.fillRect(x, y, this.scale, this.scale);
      }
    }
  }
}
