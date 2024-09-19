export class Screen {
  cols: number;
  rows: number;
  scale: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  display: number[];
  constructor(scale: number) {
    this.cols = 64;
    this.rows = 32;
    this.display = new Array(this.cols * this.rows).fill(0);
    this.scale = scale;

    this.canvas = document.getElementById("emu") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.canvas.width = this.cols * this.scale;
    this.canvas.height = this.rows * this.scale;
  }

  setPixel(x: number, y: number) {
    if (x > this.cols) {
      x -= this.cols;
    } else if (x < 0) {
      x += this.cols;
    }

    if (y > this.rows) {
      y -= this.rows;
    } else if (y < 0) {
      x += this.rows;
    }
    let pixelLoc = x + y * this.cols;

    this.display[pixelLoc] ^= 1;

    return !this.display[pixelLoc];
  }

  clear() {
    this.display = new Array(this.cols * this.rows).fill(0);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.cols * this.rows; i++) {
      let x = (i % this.cols) * this.scale;

      let y = Math.floor(i / this.cols) * this.scale;

      if (this.display[i]) {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(x, y, this.scale, this.scale);
      }
    }
  }
}
