import { ICanvasOptions } from "../models";

export interface IColorTemperature extends Pick<ICanvasOptions, "timeout"> {
  canvas: HTMLCanvasElement;
  radio: HTMLDivElement;
  kelvinStart: number;
  kelvinEnd: number;
  color?: string;
}
