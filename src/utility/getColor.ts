import { IGetColor } from "./models";

export function getColor({
  event,
  rectRadio,
  rectCanvas,
  canvas,
}: IGetColor): string {
  if (!canvas) {
    return "";
  }
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const positionY = Math.floor(rectCanvas.height / 2);
  let positionX = Math.floor(event.x - rectCanvas.left - rectRadio.width);
  if (positionX < 0) {
    positionX = 1;
  } else if (positionX + rectRadio.width > rectCanvas.width) {
    positionX = rectCanvas.width - 1;
  }
  const imageData = context.getImageData(positionX, positionY, 1, 1);
  const pixels = imageData.data;
  const pixelColor = `rgba(${pixels[0]},${pixels[1]},${pixels[2]},${pixels[3]})`;
  return pixelColor;
}
