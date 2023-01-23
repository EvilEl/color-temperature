import "./style.css";
import { ColorTemperature } from "./classes";

const colorTemperature = new ColorTemperature("#app", 1000, 40);

colorTemperature.create();

console.log(colorTemperature.color);
