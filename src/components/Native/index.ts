export function render(width: number, height: number): HTMLDivElement {
  const div = document.createElement("div");
  div.classList.add("temperature-picker");
  div.style.display = "flex";
  div.innerHTML = `
  <div class="temperature-picker__container" style="width: ${width}px; height: ${height}px ;position:relative;margin: 0;padding: 0;width: 100%;">
   <canvas id="canvas" class="temperature-picker__canvas" style="width:100%;height:100%;">
   </canvas>
   <div id="radio" class="temperature-picker__radio" style="position: absolute;border:
    1px solid black;top: 50%;left: 0;cursor: move;touch-action: none;user-select: none;
    border-radius: 50%;width: 0.625rem;height: 0.625rem;transform: translateY(-50%);">
   </div>
  </div>`;
  return div;
}
