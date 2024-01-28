import { ColorStop, GradientStyle } from '../enums/color';
import { fabric } from 'fabric';
import { Shape } from '../enums/shapes';

export type ShapeToolProperties = {
  shape?: Shape;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeStyle?: string;
  radius?: number;
  sides?: number;
  width?: number;
  height?: number;
};
export type MoveToolProperties = {
  autoSelect?: boolean;
  showTransformControls?: boolean;
};
export type RectSelectToolProperties = {
  feather?: number;
  antiAlias?: boolean;
  style?: string;
  width?: number;
  height?: number;
};
export type LassoToolProperties = {
  feather?: number;
  antiAlias?: boolean;
};
export type QuickSelectToolProperties = {
  brush?: Brush;
  sampleAllLayers?: boolean;
  autoEnhance?: boolean;
};
export type CropToolProperties = {
  ratio?: string;
  width?: number;
  height?: number;
  res?: number;
  unit?: Unit;
  deleteCropedPixels?: boolean;
  contentAware?: boolean;
};
export type ColorPickerToolProperties = {
  sampleSize?: string;
  sample?: string;
  showSamplingRing?: boolean;
};
export type SpotHealingBrushToolProperties = {
  brush?: Brush;
  mode?: string;
  type?: string;
  sampleAllLayers?: boolean;
};

export enum Unit {
  Pixels,
  Inches,
  Centimeters,
  Milimeters,
  Points,
  Picas,
}

export type Brush = {
  size?: number;
  hardness?: number;
};
export type TextToolProperties = {
  fontFamily: string;
  fontStyle: '' | 'italic' | 'normal' | 'oblique' | undefined;
  fill: string;
  size: number;
  fontWeight: number;
  textAlign?: 'left' | 'right' | 'center';
};
export type GradientToolProperties = {
  gradientStyle: GradientStyle.Linear;
  colorStops: ColorStop[];
  mode: 'normal';
  opacity: number;
  reverse: boolean;
  dither: boolean;
  transparency: boolean;
};
export type BrushToolProperties = {
  brush?: Brush;
  color: string;
  mode?: string;
  opacity?: number;
  smoothing?: number;
  autoErase?: boolean;
};
export type CloneStampToolProperties = {
  brush?: Brush;
  mode?: string;
  opacity?: number;
  aligned?: boolean;
  sample?: string;
  autoErase?: boolean;
};
export type EraserToolProperties = {
  brush?: Brush;
  mode?: string;
  opacity?: number;
  flow?: number;
  smoothing?: boolean;
};
export type BlurToolProperties = {
  brush?: Brush;
  mode?: string;
  strength?: number;
  sampleAllLayers?: boolean;
};
export type PenToolProperties = {
  autoAddDelete?: boolean;
  alignEdges?: boolean;
};
export type ZoomToolProperties = {
  resizeWindowToFit?: boolean;
  zoomAllWindows?: boolean;
  scrubbyZoom?: boolean;
  zoom?: number;
};
export type HandToolProperties = {
  scrollAllWindows?: boolean;
  level?: boolean;
};
