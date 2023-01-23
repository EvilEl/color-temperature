import { colorTemperature2rgb } from "../utility/colorTemperature";

export class HandlingCanvas {
  kelvinStart: number = 1000;
  kelvinEnd: number = 40000;
  canvas: HTMLCanvasElement;
  radio: HTMLDivElement;
  constructor(
    kelvinStart: number,
    kelvinEnd: number,
    canvas: HTMLCanvasElement,
    radio: HTMLDivElement
  ) {
    this.kelvinStart = kelvinStart;
    this.kelvinEnd = kelvinEnd;
    this.canvas = canvas;
    this.radio = radio;
  }

  public buildCanvasColorTemperature(): void {
    if (!this.canvas) {
      return;
    }
    const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const { width, height } = this.canvas;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        const kelvin =
          ((this.kelvinEnd - this.kelvinStart) / width) * w + this.kelvinStart;
        const rgb = colorTemperature2rgb(kelvin);
        context.fillStyle = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
        context.fillRect(w, h, 1, 1);
      }
    }
  }
}
