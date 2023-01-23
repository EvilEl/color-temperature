const KelvinRedMore6600kA = 351.97690566805693;
const KelvinRedMore6600kB = 0.114206453784165;
const KelvinRedMore6600kC = 40.25366309332127;

const KelvinGreenMin6600kA = -155.25485562709179;
const KelvinGreenMin6600kB = 0.44596950469579133;
const KelvinGreenMin6600kC = 104.49216199393888;

const KelvinGreenMore6600kA = 325.4494125711974;
const KelvinGreenMore6600kB = 0.07943456536662342;
const KelvinGreenMore6600kC = -28.0852963507957;

const KelvinBlueMin6600kA = -254.76935184120902;
const KelvinBlueMin6600kB = 0.8274096064007395;
const KelvinBlueMin6600kC = 115.67994401066147;

export function colorTemperature2rgb(kelvin: number): { red: number; green: number; blue: number } {
  const temperature = kelvin / 100.0;
  let red = 0,
    green = 0,
    blue = 0;
  if (temperature < 66.0) {
    red = 255;
  } else {
    // a + b x + c Log[x] /.
    // {a -> 351.97690566805693`,
    // b -> 0.114206453784165`,
    // c -> -40.25366309332127
    //x -> (kelvin/100) - 55}
    red = temperature - 55.0;
    red = KelvinRedMore6600kA + KelvinRedMore6600kB * red - KelvinRedMore6600kC * Math.log(red);
    if (red < 0) red = 0;
    if (red > 255) red = 255;
  }

  /* Calculate green */

  if (temperature < 66.0) {
    // a + b x + c Log[x] /.
    // {a -> -155.25485562709179`,
    // b -> -0.44596950469579133`,
    // c -> 104.49216199393888`,
    // x -> (kelvin/100) - 2}
    green = temperature - 2;
    green = KelvinGreenMin6600kA - KelvinGreenMin6600kB * green + KelvinGreenMin6600kC * Math.log(green);
    if (green < 0) green = 0;
    if (green > 255) green = 255;
  } else {
    // a + b x + c Log[x] /.
    // {a -> 325.4494125711974`,
    // b -> 0.07943456536662342`,
    // c -> -28.0852963507957`,
    // x -> (kelvin/100) - 50}
    green = temperature - 50.0;
    green = KelvinGreenMore6600kA + KelvinGreenMore6600kB * green - KelvinGreenMore6600kC * Math.log(green);
    if (green < 0) green = 0;
    if (green > 255) green = 255;
  }

  /* Calculate blue */

  if (temperature >= 66.0) {
    blue = 255;
  } else {
    if (temperature <= 20.0) {
      blue = 0;
    } else {
      // a + b x + c Log[x] /.
      // {a -> -254.76935184120902`,
      // b -> 0.8274096064007395`,
      // c -> 115.67994401066147`,
      // x -> kelvin/100 - 10}
      blue = temperature - 10;
      blue = KelvinBlueMin6600kA + KelvinBlueMin6600kB * blue + KelvinBlueMin6600kC * Math.log(blue);
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }
  }

  return {
    red: Math.round(red),
    blue: Math.round(blue),
    green: Math.round(green),
  };
}
