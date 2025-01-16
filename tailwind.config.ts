import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [],
  theme: {
    extend: {
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
      }
    }
  }
} satisfies Config;
