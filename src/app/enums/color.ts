export type ColorRGBA = {
  R: number;
  G: number;
  B: number;
  A: number;
};

export enum GradientStyle {
  Linear,
  Radial,
  Angle,
}

export type ColorStop = {
  color: string;
  offset: number;
};
