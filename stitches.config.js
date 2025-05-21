// stitches.config.js
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  theme,
  createTheme,
  globalCss,
} = createStitches({
  theme: {
    colors: {
      background: '#000000',
      text: '#ffffff',
      inputBg: '#121212',
      inputBorder: '#444444',
      buttonBg: '#000000',
      buttonText: '#ffffff',
      buttonHoverBg: '#ffffff',
      buttonHoverText: '#000000',
      placeholder: '#888888',
    },
    radii: {
      base: '12px',
      input: '8px',
    },
  },
});
