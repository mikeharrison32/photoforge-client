import { TemplateType } from '../enums/templateType.enum';

export type Template = {
  id: number;
  title: string;
  type: TemplateType;
  width: number;
  height: number;
  resolution: number;
};
