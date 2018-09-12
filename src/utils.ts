import { TimePickerStyle } from './styles';

export const mergeStyles = (style: TimePickerStyle, overwrite: TimePickerStyle = {}, property: string): Array<{}> => {
  const newStyle = [];

  if (style[property]) {
    newStyle.push(style[property]);
  }

  if (overwrite && overwrite[property]) {
    newStyle.push(overwrite[property]);
  }

  return newStyle;
};