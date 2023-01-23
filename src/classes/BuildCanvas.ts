import { colorTemperature2rgb, getRgbValues } from "../utility";
import { Controllers } from "./Controllers";
import { IColorTemperature } from "./models";

export class BuildCanvas {
  kelvinStart: number;
  kelvinEnd: number;
  canvas: HTMLCanvasElement;
  radio: HTMLDivElement;
  private _color: string;
  rectCanvas: DOMRect;
  rectRadio: DOMRect;
  context: CanvasRenderingContext2D;

  constructor(options: IColorTemperature) {
    this.kelvinStart = options.kelvinStart ?? 1000;
    this.kelvinEnd = options.kelvinEnd ?? 40000;
    this.canvas = options.canvas;
    this.radio = options.radio;
    this._color = options.color ?? "";
    this.context = this.canvas.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    this.rectCanvas = this.canvas.getBoundingClientRect();
    this.rectRadio = this.radio.getBoundingClientRect();
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  private getData(): number[][] {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, 1);
    const formData: number[][] = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
      const newArr = [...imageData.data.slice(i, i + 3)] as number[];
      if (!formData.includes(newArr)) {
        formData.push(newArr);
      }
    }
    return formData;
  }

  private getSelectedColorIndex(rgb: string): number {
    if (!rgb) {
      return 0;
    }
    const rgbValues = getRgbValues(rgb);
    const data = this.getData();
    const findIndex = data.findIndex((item) => {
      if (!rgbValues) {
        return -1;
      }
      return item.every((item, index) => {
        return item === Number(rgbValues[index]);
      });
    });
    return findIndex + this.rectRadio.width;
  }

  public create(): void {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const { width, height } = this.canvas;
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        const kelvin =
          ((this.kelvinEnd - this.kelvinStart) / width) * w + this.kelvinStart;
        const rgb = colorTemperature2rgb(kelvin);
        this.context.fillStyle = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
        this.context.fillRect(w, h, 1, 1);
      }
    }
    const selectedColorIndex = this.getSelectedColorIndex(this.color);
    const controllers = new Controllers(this.canvas, this.radio, this.context);
    controllers.moveAt({ x: Number(selectedColorIndex) } as MouseEvent);
    this.color = controllers.color;
  }
}
