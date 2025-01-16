import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        base: '--base',
        blue: '--blue',
        crust: '--crust',
        flamingo: '--flamingo',
        green: '--green',
        lavender: '--lavender',
        mantle: '--mantle',
        maroon: '--maroon',
        mauve: '--mauve',
        overlay0: '--overlay0',
        overlay1: '--overlay1',
        overlay2: '--overlay2',
        peach: '--peach',
        pink: '--pink',
        red: '--red',
        rosewater: '--rosewater',
        sapphire: '--sapphire',
        sky: '--sky',
        subtext0: '--subtext0',
        subtext1: '--subtext1',
        surface0: '--surface0',
        surface1: '--surface1',
        surface2: '--surface2',
        teal: '--teal',
        text: '--text',
        yellow: '--yellow'
      }
    }
  }
} satisfies Config;
