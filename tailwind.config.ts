import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';
import aria from 'tw-aria';

// Since Catppuccin uses the name "base" for a color, it collides with the
// "base" from the text. This makes "text-base" apply both the base styles for
// text and the color. In order to preserve the Catppuccin theme, I simply
// rename the base fontSize prop to "md", aligning with the other values
const { base, ...defaultFontSize } = defaultTheme.fontSize;
const fontSize = { md: base, ...defaultFontSize };

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [aria()],
  theme: {
    fontSize
  }
} satisfies Config;

