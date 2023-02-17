export function getRgbValues(rgb: string): string[] | null {
  const matchColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
  const result = matchColors.exec(rgb);
  if (!result) {
    return null;
  }
  return result.slice(1, 4);
}
