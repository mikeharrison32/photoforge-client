import { Injectable } from '@angular/core';
import { AdjustmentLayer } from 'src/app/types/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { BrightnessContrastAdjustmentLayer } from '../layers/adjustment/brightness_contrast';
import { Vibrance } from '../layers/adjustment/vibrance';
import { Exposure } from '../layers/adjustment/exposure';
import { HueSaturationLightnees } from '../layers/adjustment/hue_saturation_lightnees';
import { ColorBalance } from '../layers/adjustment/color_balance';

@Injectable({
  providedIn: 'root',
})
export class AdjustmentService {
  constructor() {}

  addAdjustmentLayer(ad_type: AdjustmentLayer, layer: PixelLayer) {
    let aj;
    switch (ad_type) {
      case AdjustmentLayer.BrightnessContrast:
        let bc_count = 1;
        layer.adjustmentLayers.forEach((aj) => {
          if (aj instanceof BrightnessContrastAdjustmentLayer) {
            bc_count += 1;
          }
        });
        aj = new BrightnessContrastAdjustmentLayer(
          layer,
          'BrightneesContrast ' + bc_count,
          {
            brightness: 1,
            contrast: 1,
          }
        );
        layer.adjustmentLayers.push(aj);

        break;
      case AdjustmentLayer.HueSaturation:
        let hsl_count = 1;
        layer.adjustmentLayers.forEach((aj) => {
          if (aj instanceof HueSaturationLightnees) {
            hsl_count += 1;
          }
        });
        aj = new HueSaturationLightnees(
          layer,
          'HueSaturationLightnees ' + hsl_count,
          { hue: 0, saturation: 0, lightnees: 0 }
        );
        layer.adjustmentLayers.push(aj);

        break;
      case AdjustmentLayer.Vibrance:
        let vibranceLayersCout = 1;
        layer.adjustmentLayers.forEach((aj) => {
          if (aj instanceof Vibrance) {
            vibranceLayersCout += 1;
          }
        });
        aj = new Vibrance(layer, 'Vibrance ' + vibranceLayersCout, {
          saturation: 0,
          vibrance: 0,
        });
        layer.adjustmentLayers.push(aj);

        break;
      case AdjustmentLayer.Exposure:
        let exposureLayersCount = 1;
        layer.adjustmentLayers.forEach((aj) => {
          if (aj instanceof Exposure) {
            exposureLayersCount += 1;
          }
        });
        aj = new Exposure(layer, 'Exposure ' + exposureLayersCount, {
          exposure: 0,
          offset: 0,
          gammaCorrection: 0,
        });
        layer.adjustmentLayers.push(aj);

        break;
      case AdjustmentLayer.ColorBalance:
        let colorBalanceLayersCount = 1;
        layer.adjustmentLayers.forEach((aj) => {
          if (aj instanceof ColorBalance) {
            colorBalanceLayersCount += 1;
          }
        });
        aj = new ColorBalance(
          layer,
          'Color Balance ' + colorBalanceLayersCount,
          {
            red: 0,
            green: 0,
            blue: 0,
          }
        );
        layer.adjustmentLayers.push(aj);
        break;
    }
  }
}
