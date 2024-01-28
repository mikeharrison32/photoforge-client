import { IColorRGBA } from '../types/color';

export const rgbaFormatter = {
  convertToRGBA(data: Uint8ClampedArray) {
    const rgba_arr: IColorRGBA[] = [];
    for (let i = 0; i < data.length - 1; i += 4) {
      rgba_arr.push({
        R: data[i],
        G: data[i + 1],
        B: data[i + 2],
        A: data[i + 3],
      });
    }
    return rgba_arr;
  },

  convertToUint8ClampedArray(data: IColorRGBA[]) {
    const arr = [];
    for (let i = 0; i < data.length - 1; i++) {
      const { R, G, B, A } = data[i];
      arr.push(R, G, B, A);
    }
    return arr;
  },

  getRGBAFormat(img: any): IColorRGBA[] {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);
    const imgdata = ctx?.getImageData(0, 0, img.width, img.height);
    return this.convertToRGBA(imgdata!.data);
  },
};
