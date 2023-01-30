import { render } from "../components/Native";
import { BuildCanvas } from "./BuildCanvas";

export class ColorTemperature {
  width: number;
  height: number;
  instance: string;
  component: string;
  canvasRender: BuildCanvas | null;
  rgbColor: string;
  constructor(
    instance: string,
    width: number,
    height: number,
    rgbColor?: string
  ) {
    this.width = width;
    this.height = height;
    this.instance = instance;
    this.component = render(this.width, this.height);
    this.canvasRender = null;
    this.rgbColor = rgbColor ?? "";
  }

  create(kelvinStart = 1000, kelvinEnd = 40000) {
    document.querySelector(this.instance)!.innerHTML = `${this.component}`;
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const radio = document.querySelector("#radio") as HTMLDivElement;
    this.canvasRender = new BuildCanvas({
      kelvinStart,
      kelvinEnd,
      canvas,
      radio,
      color: this.rgbColor,
    });
    this.canvasRender.create();
  }

  get color(): string {
    if (!this.canvasRender) {
      return "";
    }
    return this.canvasRender.color;
  }
}
