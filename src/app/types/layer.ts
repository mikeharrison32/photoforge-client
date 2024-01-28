import { ImageCanvas } from '../core/image-canvas';
import { Mask } from '../core/layers/mask';
import { ColorRGBA } from '../enums/color';
import { fabric } from 'fabric';
export type Layer = PixelLayer | TypeLayer | ShapeLayer;
export type PixelLayer = {
  Type: LayerType.Pixel;
  Id: string;
  GroupId?: string | null;
  ProjectId: string;
  Title: string;
  Url: string;
  X: number;
  Y: number;
  opacity?: number;
  mask?: Mask;
  obj?: ImageCanvas;
  maskSelected?: boolean;
  stackIndex: number;
  Locked?: boolean;
  Hidden?: boolean;
};
export type TypeLayer = {
  Type: LayerType.Type;
  Id: string;
  GroupId?: string | null;
  ProjectId: string;
  Text: string;
  X: number;
  Y: number;
  opacity?: number;
  stackIndex: number;
  Locked?: boolean;
  Hidden?: boolean;
  mask?: Mask;
  maskSelected?: boolean;
  obj: fabric.IText;
  fontWeight?: number;
};
export type ShapeLayer = {
  Type: LayerType.Shape;
  Id: string;
  GroupId?: string | null;
  ProjectId: string;
  X: number;
  Y: number;
  Title: string;
  mask?: Mask;
  maskSelected?: boolean;
  obj?: fabric.Object;
  opacity?: number;
  stackIndex: number;
  Locked?: boolean;
  Hidden?: boolean;
};

export type Group = {
  Id: string;
  Title: string;
};
export enum LayerType {
  Pixel,
  Type,
  Shape,
  SmartObject,
}
export enum AdjustmentLayer {
  SolidColor,
  Gradient,
  Pattern,
  BrightnessContrast,
  Levels,
  Curves,
  Exposure,
  Vibrance,
  HueSaturation,
  ColorBalance,
  BlackWhite,
  PhotoFilter,
  ChannelMixer,
  ColorLookup,
  Invert,
  Posterize,
  Threshold,
  GradientMap,
  SelectiveColor,
}
export type AdjustmentLayerType =
  | SolidColorAdjustmentLayer
  | ExposureAdjustmentLayer
  | BrightnessContrast
  | Vibracne
  | HueSaturation
  | ColorBalance
  | BlackWhite
  | LevelsAdjustmentLayer;

export type LevelsAdjustmentLayer = {
  Type: AdjustmentLayer.Levels;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};
export type SolidColorAdjustmentLayer = {
  Type: AdjustmentLayer.SolidColor;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  color: ColorRGBA;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};

export type ExposureAdjustmentLayer = {
  Type: AdjustmentLayer.Exposure;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};

export type BrightnessContrast = {
  Type: AdjustmentLayer.BrightnessContrast;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  Brightness: number;
  Contrast: number;
  UseLegacy: boolean;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};
export type Vibracne = {
  Type: AdjustmentLayer.Vibrance;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  vibrance: number;
  saturation: number;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};
export type HueSaturation = {
  Type: AdjustmentLayer.HueSaturation;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  hue: number;
  saturation: number;
  lightness: number;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};
export type ColorBalance = {
  Type: AdjustmentLayer.ColorBalance;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  CyanRed: number;
  MagentaGreen: number;
  YellowBlue: number;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};
export type BlackWhite = {
  Type: AdjustmentLayer.BlackWhite;
  Id: string;
  ProjectId: string;
  LayerId: string;
  Title: string;
  Reds: number;
  Yellows: number;
  Greens: number;
  Cyans: number;
  Blues: number;
  Magentas: number;
  Locked?: boolean;
  Hidden?: boolean;
  hasMask?: boolean;
};
