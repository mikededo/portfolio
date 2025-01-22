import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

// Since Catppuccin uses the name "base" for a color, it collides with the
// "base" from the text. This makes "text-base" apply both the base styles for
// text and the color. In order to preserve the Catppuccin theme, I simply
// rename the base fontSize prop to "md", aligning with the other values
const { base, ...defaultFontSize } = defaultTheme.fontSize;
const fontSize = { md: base, ...defaultFontSize };

// See: https://github.com/mikededo/stack/blob/main/packages/config-tailwind/aria.ts
const BOOL = ['false', 'true'];
const ARIA = {
  atomic: BOOL,
  autocomplete: ['inline', 'list', 'both'],
  busy: BOOL,
  checked: [...BOOL, 'mixed'],
  current: [...BOOL, 'page', 'step', 'location', 'date', 'time'],
  disabled: BOOL,
  dropeffect: ['none', 'copy', 'execute', 'link', 'move', 'popup'],
  errormessage: ['true'],
  expanded: BOOL,
  grabbed: BOOL,
  haspopup: ['menu', 'listbox', 'tree', 'grid', 'dialog', 'true'],
  hidden: BOOL,
  invalid: [...BOOL, 'grammar', 'spelling'],
  level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  live: ['off', 'assertive', 'polite'],
  multiline: BOOL,
  multiselectable: BOOL,
  orientation: ['horizontal', 'vertical'],
  pressed: [...BOOL, 'mixed'],
  readonly: BOOL,
  relevant: ['additions-text', 'additions', 'all', 'removals', 'text'],
  required: BOOL,
  selected: BOOL,
  sort: ['none', 'ascending', 'descending', 'other']
};

const getSelector = (element: number | string, key: string) => {
  if (element === 'true') {
    return `aria-${key}`;
  } else if (element === 'false') {
    return `aria-not-${key}`;
  }

  return `aria-${key}-${element}`;
};

const aria = () => plugin(({ addVariant }) => {
  let key: keyof typeof ARIA;
  for (key in ARIA) {
    if (ARIA[key] instanceof Function) {
      continue;
    }

    ARIA[key].forEach((element: number | string) => {
      const selector = getSelector(element, key);

      addVariant(selector, [`[aria-${key}="${element}"] &`, `&[aria-${key}="${element}"]`]);
      addVariant(`group-${selector}`, `.group[aria-${key}="${element}"] &`);
      addVariant(`peer-${selector}`, `.peer[aria-${key}="${element}"] ~ &`);
    });
  }
});

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [aria()],
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

