import { rgbaFormatter } from '../rgba-formater';

/**
 * Apply the Saturation filter to the provided canvas context.
 *
 * @param {Object} ctx
 * @param {Number} value
 */
export function saturation(ctx: CanvasRenderingContext2D, value: number) {
  let imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const rgba = rgbaFormatter.convertToRGBA(imgdata.data);
  let adjust = -value;
  rgba.forEach((pixel) => {
    let max = Math.max(pixel.R, pixel.G, pixel.B);
    pixel.R += max !== pixel.R ? (max - pixel.R) * adjust : 0;
    pixel.G += max !== pixel.G ? (max - pixel.G) * adjust : 0;
    pixel.B += max !== pixel.B ? (max - pixel.B) * adjust : 0;
  });

  const arr = rgbaFormatter.convertToUint8ClampedArray(rgba);
  const newImageData = new ImageData(ctx.canvas.width, ctx.canvas.height);
  newImageData.data.set(arr);
  ctx.putImageData(newImageData, 0, 0);
}
