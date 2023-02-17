import { render } from "../components/Native";
import { BuildCanvas } from "./BuildCanvas";
import { ICanvasOptions, IControllerEventOptions } from "./models";

export class ColorTemperature {
  instance: string;
  component: HTMLDivElement;
  canvasRender: BuildCanvas | null;
  rgbColor: string;
  canvasOptions: ICanvasOptions;
  controllersEventOptions: IControllerEventOptions;
  constructor(
    instance: string,
    canvasOptions: ICanvasOptions,
    controllersEventOptions?: IControllerEventOptions,
    rgbColor?: string
  ) {
    this.instance = instance;
    this.canvasOptions = canvasOptions;
    this.controllersEventOptions = controllersEventOptions ?? {};
    this.rgbColor = rgbColor ?? "";
    this.component = render(this.canvasOptions.width, this.canvasOptions.height);
    this.canvasRender = null;
  }

  create() {
    document.querySelector(this.instance)!.appendChild(this.component);
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const radio = document.querySelector("#radio") as HTMLDivElement;
    this.canvasRender = new BuildCanvas({
      kelvinStart: this.canvasOptions.kelvinStart ?? 1000,
      kelvinEnd: this.canvasOptions.kelvinEnd ?? 40000,
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
