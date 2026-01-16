import type { Style } from '../types.js';
import { generateResetCode } from './ansi.js';

export function applyStyle(text: string, open: string, close: string): string {
  if (text === '') {
    return '';
  }
  return `${open}${text}${close}`;
}

export function applyStyles(text: string, styles: Style[]): string {
  if (styles.length === 0) {
    return text;
  }

  const open = styles.map((style) => style.open).join('');
  const close = [...styles].reverse().map((style) => style.close).join('');
  return `${open}${text}${close}`;
}

export function reset(text: string): string {
  return `${generateResetCode()}${text}`;
}
