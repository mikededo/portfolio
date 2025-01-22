import type { Icon as LucideIcon } from 'lucide-svelte';

import type { Theme } from '$lib/cookies';

import { FileCode, PaletteIcon } from 'lucide-svelte';

import { goto } from '$app/navigation';
import { changeTheme } from '$lib/context';

const to = (path: string) => () => {
  goto(path);
};

const onTheme = (value: Theme) => () => {
  changeTheme(value);
};

export type Option = {
  value: string;
  action: () => void;
  Icon: typeof LucideIcon;
};
export const OPTIONS: Option[] = [
  // Routes
  { action: to('/'), Icon: FileCode, value: 'Open /home page' },
  { action: to('/projects'), Icon: FileCode, value: 'Open /projects page' },
  { action: to('/about'), Icon: FileCode, value: 'Open /about page' },

  // Theme actions
  { action: onTheme('latte'), Icon: PaletteIcon, value: 'Change theme to latte' },
  { action: onTheme('frappe'), Icon: PaletteIcon, value: 'Change theme to frappé' },
  { action: onTheme('macchiato'), Icon: PaletteIcon, value: 'Change theme to macchiatto' },
  { action: onTheme('mocha'), Icon: PaletteIcon, value: 'Change theme to mocha' }
];
