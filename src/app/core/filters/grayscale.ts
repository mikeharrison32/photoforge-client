import { rgbaFormatter } from '../rgba-formater';

/**
 *Converts an image to grayscale
 * @param {Object} ctx
 * @param {Number} value
 */
export function grayscale(ctx: CanvasRenderingContext2D, mode: string) {
  let imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const rgba = rgbaFormatter.convertToRGBA(imgdata.data);
  let value: number;
  rgba.forEach((pixel) => {
    const { R, G, B } = pixel;
    if (mode == 'average') {
      value = (R + G + B) / 3;
    } else if (mode == 'lightnees') {
      value = Math.min(R + G + B) + Math.max(R, G, B) / 2;
    } else if (mode == 'luminosity') {
      value = 0.21 * R + 0.72 * G + 0.07 * B;
    }
    pixel.R = value;
    pixel.G = value;
    pixel.B = value;
  });

  const arr = rgbaFormatter.convertToUint8ClampedArray(rgba);
  const newImageData = new ImageData(ctx.canvas.width, ctx.canvas.height);
  newImageData.data.set(arr);
  ctx.putImageData(newImageData, 0, 0);
}
