import "./style.css";
import { HandlingCanvas, HandlingMouse } from "./classes";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="im-color-picker">
    <div class="im-color-picker__container"
    style="width:1000px;height:50px">
  <canvas
    id="canvas"
    class="im-color-picker__canvas"
  >
  </canvas>
  <div
    id="radio"
    class="im-color-picker__radio"
  ></div>
</div>
</div>
`;

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const radio = document.querySelector("#radio") as HTMLDivElement;
const canvasRender = new HandlingCanvas(1000, 40000, canvas, radio);
canvasRender.buildCanvasColorTemperature();
new HandlingMouse(canvas, radio);
