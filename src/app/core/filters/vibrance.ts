import { rgbaFormatter } from '../rgba-formater';

export function vibrance(ctx: CanvasRenderingContext2D, value: number) {
  let imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const rgba = rgbaFormatter.convertToRGBA(imgdata.data);
  let adjust = -value;
  let amt: number;
  let max: number;
  let avg: number;
  rgba.forEach((pixel) => {
    max = Math.max(pixel.R, pixel.G, pixel.B);
    avg = (pixel.R + pixel.G + pixel.B) / 3;
    amt = ((Math.abs(max - avg) * 2) / 255) * adjust;

    pixel.R += max !== pixel.R ? (max - pixel.R) * amt : 0;
    pixel.G += max !== pixel.G ? (max - pixel.G) * amt : 0;
    pixel.B += max !== pixel.B ? (max - pixel.B) * amt : 0;
  });

  const arr = rgbaFormatter.convertToUint8ClampedArray(rgba);
  const newImageData = new ImageData(ctx.canvas.width, ctx.canvas.height);
  newImageData.data.set(arr);
  ctx.putImageData(newImageData, 0, 0);
}
