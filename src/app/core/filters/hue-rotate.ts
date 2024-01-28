import { rgbaFormatter } from '../rgba-formater';

export function hueRotate(ctx: CanvasRenderingContext2D, deg: number) {
  let imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const rgba = rgbaFormatter.convertToRGBA(imgdata.data);
  rgba.forEach((pixel) => {});

  const arr = rgbaFormatter.convertToUint8ClampedArray(rgba);

  const newImageData = new ImageData(ctx.canvas.width, ctx.canvas.height);
  newImageData.data.set(arr);
  ctx.putImageData(newImageData, 0, 0);
}
