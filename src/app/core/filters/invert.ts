import { rgbaFormatter } from '../rgba-formater';

/**
 * Inverts the pixels of an image
 *
 * @param {Object} ctx
 * @param {Number} value
 */
export function invert(ctx: CanvasRenderingContext2D, value: number) {
  let imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const rgba = rgbaFormatter.convertToRGBA(imgdata.data);
  rgba.forEach((pixel) => {
    pixel.R = 255 - pixel.R;
    pixel.G = 255 - pixel.G;
    pixel.B = 255 - pixel.B;
  });

  const arr = rgbaFormatter.convertToUint8ClampedArray(rgba);
  const newImageData = new ImageData(ctx.canvas.width, ctx.canvas.height);
  newImageData.data.set(arr);
  ctx.putImageData(newImageData, 0, 0);
}
