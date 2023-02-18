import { colorTemperature2rgb, getRgbValues } from "../utility";
import { Controllers } from "./Controllers";
import { IColorTemperature, IControllerEventOptions } from "./models";

export class BuildCanvas {
  canvas: HTMLCanvasElement;
  radio: HTMLDivElement;
  kelvinStart: number;
  kelvinEnd: number;
  private _color: string;
  rectCanvas: DOMRect;
  rectRadio: DOMRect;
  context: CanvasRenderingContext2D | null;
  controllersEventOptions: IControllerEventOptions;
  constructor(
    options: IColorTemperature,
    controllersEventOptions?: IControllerEventOptions
  ) {
    this.canvas = options.canvas;
    this.radio = options.radio;
    this.kelvinStart = options.kelvinStart;
    this.kelvinEnd = options.kelvinEnd;
    this._color = options.color ?? "";
    this.rectCanvas = this.canvas.getBoundingClientRect();
    this.rectRadio = this.radio.getBoundingClientRect();
    this.context =
      this.canvas &&
      this.canvas.getContext("2d", {
        willReadFrequently: true,
      });
    this.controllersEventOptions = controllersEventOptions ?? {};
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  private getData(): number[][] {
    if (!this.context) {
      return [];
    }
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
    if (!rgbValues) {
      return 0;
    }
    const data = this.getData();
    const findIndex = data.reduce(
      (acc, cur, index) => {
        const res = cur.every((item, index) => {
          return item === Number(rgbValues[index]);
        });
        if (res) {
          acc.index = index;
        }
        return acc;
      },
      { index: 0 }
    );
    return findIndex.index + this.rectRadio.width + this.rectCanvas.left;
  }

  public create(): void {
    if (!this.context) {
      return;
    }
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const { width, height } = this.canvas;
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        const kelvin =
          ((this.kelvinEnd - this.kelvinStart) / width) * w + this.kelvinStart;
        const rgb = colorTemperature2rgb(kelvin);
        this.context.fillStyle = `rgb(${rgb.red},${rgb.green},${rgb.blue})`;
        this.context.fillRect(w, h, 1, 1);
      }
    }
    const selectedColorIndex = this.getSelectedColorIndex(this.color);
    const controllers = new Controllers(
      this.canvas,
      this.radio,
      this.context,
      this.controllersEventOptions
    );
    controllers.moveAt({ x: Number(selectedColorIndex) } as MouseEvent);
    this.color = controllers.color;
  }
}
