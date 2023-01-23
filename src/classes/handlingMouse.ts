import { getColor } from "../utility";

export class HandlingMouse {
  canvas: HTMLCanvasElement;
  radio: HTMLDivElement;
  #color = "";
  mouseUp: () => void;
  mouseMove: (event: MouseEvent) => void;
  rectRadio: DOMRect;
  rectCanvas: DOMRect;
  constructor(canvas: HTMLCanvasElement, radio: HTMLDivElement) {
    this.canvas = canvas;
    this.radio = radio;

    this.#color = "";

    this.radio?.addEventListener("pointerdown", this.onMouseDown.bind(this));
    this.canvas?.addEventListener("click", this.moveAt.bind(this));

    this.mouseUp = this.onMouseUp.bind(this);
    this.mouseMove = this.onMouseMove.bind(this);

    this.rectRadio = radio.getBoundingClientRect();
    this.rectCanvas = canvas.getBoundingClientRect();
  }

  public get color() {
    return this.#color;
  }
  //нажимаем
  onMouseDown(event: MouseEvent): void {
    console.log("im here");

    this.moveAt(event);
    document.addEventListener("pointerup", this.mouseUp);
    document.addEventListener("pointermove", this.mouseMove);
  }

  //перемещение
  public onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    this.moveAt(event);
    this.radio.style.background = this.getColorCanvas(event);
  }

  // //отпускаем
  private onMouseUp(): void {
    document.removeEventListener("pointerup", this.mouseUp);
    document.removeEventListener("pointermove", this.mouseMove);
  }

  // изменяем положение, движущегося элемента
  public moveAt(event: MouseEvent): void {
    const radioPercent = (this.rectRadio.width / this.rectCanvas.width) * 100;
    const coordinateX =
      ((event.x - this.rectCanvas.left - this.rectRadio.width / 2) /
        this.rectCanvas.width) *
      100;
    let formatCoordinate = coordinateX;
    if (coordinateX < 0) {
      formatCoordinate = 0;
    } else if (coordinateX > 100 - radioPercent) {
      formatCoordinate = 100 - radioPercent;
    }

    this.radio.style.left = `${formatCoordinate}%`;
    this.radio.style.background = getColor({
      event,
      rectRadio: this.rectRadio,
      rectCanvas: this.rectCanvas,
      canvas: this.canvas,
    });
    this.#color = this.radio.style.background;
  }

  public getColorCanvas(event: MouseEvent): string {
    const contextTwoD = this.canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const positionY = Math.floor(this.rectCanvas.height / 2);
    let positionX = Math.floor(
      event.x - this.rectCanvas.left - this.rectRadio.width
    );
    if (positionX < 0) {
      positionX = 1;
    } else if (positionX + this.rectRadio.width > this.rectCanvas.width) {
      positionX = this.rectCanvas.width - 1;
    }
    const imageData = contextTwoD.getImageData(positionX, positionY, 1, 1);
    const pixels = imageData.data;
    const pixelColor = `rgba(${pixels[0]},${pixels[1]},${pixels[2]},${pixels[3]})`;
    return pixelColor;
  }
}
