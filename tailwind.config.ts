import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';

// Since Catppuccin uses the name "base" for a color, it collides with the
// "base" from the text. This makes "text-base" apply both the base styles for
// text and the color. In order to preserve the Catppuccin theme, I simply
// rename the base fontSize prop to "md", aligning with the other values
const { base, ...defaultFontSize } = defaultTheme.fontSize;
const fontSize = { md: base, ...defaultFontSize };

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [],
  theme: {
    extend: {
      animation: {
        blob: 'blob 20s ease-in-out infinite var(--delay, 0s)',
        'blob-alt': 'blob_alt 20s ease-in-out infinite var(--delay, 0s)'
      },
      colors: {
        base: 'hsl(var(--base) / <alpha-value>)',
        blue: 'hsl(var(--blue) / <alpha-value>)',
        crust: 'hsl(var(--crust) / <alpha-value>)',
        flamingo: 'hsl(var(--flamingo) / <alpha-value>)',
        green: 'hsl(var(--green) / <alpha-value>)',
        lavender: 'hsl(var(--lavender) / <alpha-value>)',
        mantle: 'hsl(var(--mantle) / <alpha-value>)',
        maroon: 'hsl(var(--maroon) / <alpha-value>)',
        mauve: 'hsl(var(--mauve) / <alpha-value>)',
        overlay0: 'hsl(var(--overlay0) / <alpha-value>)',
        overlay1: 'hsl(var(--overlay1) / <alpha-value>)',
        overlay2: 'hsl(var(--overlay2) / <alpha-value>)',
        peach: 'hsl(var(--peach) / <alpha-value>)',
        pink: 'hsl(var(--pink) / <alpha-value>)',
        red: 'hsl(var(--red) / <alpha-value>)',
        rosewater: 'hsl(var(--rosewater) / <alpha-value>)',
        sapphire: 'hsl(var(--sapphire) / <alpha-value>)',
        sky: 'hsl(var(--sky) / <alpha-value>)',
        subtext0: 'hsl(var(--subtext0) / <alpha-value>)',
        subtext1: 'hsl(var(--subtext1) / <alpha-value>)',
        surface0: 'hsl(var(--surface0) / <alpha-value>)',
        surface1: 'hsl(var(--surface1) / <alpha-value>)',
        surface2: 'hsl(var(--surface2) / <alpha-value>)',
        teal: 'hsl(var(--teal) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        yellow: 'hsl(var(--yellow) / <alpha-value>)'
      },
      container: {
        center: true,
        screens: { xl: '1100px' }
      },
      height: {
        // Use home-content so it does not collide with h-content
        content: 'var(--content)',
        'editor-bottom-pane': 'var(--editor-subheader)',
        'editor-content': 'var(--editor-content-h)',
        'editor-subheader': 'var(--editor-subheader)',
        footer: 'var(--footer)',
        header: 'var(--header)',
        theme: 'var(--theme)'
      },
      width: {
        'editor-code': 'var(--editor-code)',
        'editor-content': 'var(--editor-content-w)',
        'editor-line-numbers': 'var(--editor-line-numbers)',
        'editor-sidebar': 'var(--editor-sidebar)'
      }
    },
    fontSize
  }
} satisfies Config;
