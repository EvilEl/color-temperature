import { ColorTemperature } from "./src/classes";

function currentColor(color) {
  console.log(color);
}
const instance = "#app";
const optionsCanvas = {
  width: 300,
  height: 50,
  kelvinStart: 1000,
  kelvinEnd: 9500,
};
const controllerEventOptions = {
  getColor: currentColor,
};
const rgbColor = "rgb(220, 255, 255)";
const colorTemperatrue = new ColorTemperature(
  instance,
  optionsCanvas,
  controllerEventOptions,
  rgbColor
);
colorTemperatrue.create();
