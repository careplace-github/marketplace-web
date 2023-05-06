// theme
import palette from 'src/theme/palette';
// types
import { ThemeColorPresetsValue } from './types/types';

// ----------------------------------------------------------------------

const themePalette = palette('light');

export const presets = [
  // DEFAULT
  {
    name: 'default',
    primary: themePalette.primary,
    secondary: themePalette.secondary,
  },
];

// ----------------------------------------------------------------------

export const defaultPreset = presets[0];

export const presetsOption = presets.map((color) => ({
  name: color.name,
  primary: color.primary.main,
  secondary: color.secondary.main,
}));

export function getPresets(key: ThemeColorPresetsValue) {
  return {
    default: presets.filter((color) => color.name === 'default')[0],
  }[key];
}
