export function render(width: number, height: number) {
  return `<div class="im-color-picker">
  <div class="im-color-picker__container" style="width: ${width}px; height: ${height}px">
    <canvas id="canvas" class="im-color-picker__canvas"> </canvas>
    <div id="radio" class="im-color-picker__radio"></div>
  </div>
</div>`;
}
