import { render } from "../components/Native";
import { BuildCanvas } from "./BuildCanvas";

export class ColorTemperature {
  width: number;
  height: number;
  instance: string;
  component: string;
  canvasRender: BuildCanvas | null;
  constructor(instance: string, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.instance = instance;
    this.component = render(this.width, this.height);
    this.canvasRender = null;
  }

  create() {
    document.querySelector<HTMLDivElement>(
      this.instance
    )!.innerHTML = `${this.component}`;
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const radio = document.querySelector("#radio") as HTMLDivElement;
    this.canvasRender = new BuildCanvas({
      kelvinStart: 1000,
      kelvinEnd: 40000,
      canvas,
      radio,
      color: "rgb(168, 255, 255)",
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
