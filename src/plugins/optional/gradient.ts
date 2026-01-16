import type { Plugin, GradientPluginOptions, PigmentContext, PigmentKernel } from '../../types.js';
import { hexToRgb } from '../../utils/hex-to-rgb.js';
import { hslToRgb } from '../../utils/hsl-to-rgb.js';

/**
 * Optional plugin that provides smooth color gradients between two colors.
 *
 * @example
 * ```typescript
 * import { createPigment } from '@oxog/pigment';
 * import { gradientPlugin } from '@oxog/pigment/plugins';
 *
 * const pigment = createPigment({
 *   plugins: [gradientPlugin()]
 * });
 *
 * pigment.gradient('red', 'blue')('Gradient text');
 * pigment.rainbow('Rainbow text');
 * ```
 */
export function gradientPlugin(options?: GradientPluginOptions): Plugin<PigmentContext> {
  const steps = options?.steps ?? 10;

  return {
    name: 'gradient',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;

      k.updateContext({
        gradient: {
          steps,
          enabled: true
        }
      } as Partial<PigmentContext>);

      k.on('style:gradient', (data) => {
        const { start, end, text, steps: gradientSteps = steps } = data as { start: string; end: string; text: string; steps?: number };

        const startRgb = start.startsWith('#') ? hexToRgb(start) : start.startsWith('rgb(') ? parseRgb(start) : hexToRgb(start);
        const endRgb = end.startsWith('#') ? hexToRgb(end) : end.startsWith('rgb(') ? parseRgb(end) : hexToRgb(end);

        if (!startRgb || !endRgb) {
          return text;
        }

        const colors = interpolateColors(startRgb, endRgb, text.length, gradientSteps);
        let result = '';

        for (let i = 0; i < text.length; i++) {
          const colorIndex = Math.floor((i / (text.length - 1)) * (colors.length - 1));
          const color = colors[colorIndex];
          if (color) {
            const open = `\x1b[38;2;${color.r};${color.g};${color.b}m`;
            result += `${open}${text[i]}\x1b[39m`;
          } else {
            result += text[i];
          }
        }

        return result;
      });

      k.on('style:rainbow', (data) => {
        const { text, steps: rainbowSteps = steps } = data as { text: string; steps?: number };

        const colors = generateRainbowColors(text.length, rainbowSteps);
        let result = '';

        for (let i = 0; i < text.length; i++) {
          const colorIndex = i % colors.length;
          const color = colors[colorIndex];
          if (color) {
            const open = `\x1b[38;2;${color.r};${color.g};${color.b}m`;
            result += `${open}${text[i]}\x1b[39m`;
          } else {
            result += text[i];
          }
        }

        return result;
      });
    }
  };
}

function parseRgb(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    return null;
  }
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

function interpolateColors(start: { r: number; g: number; b: number }, end: { r: number; g: number; b: number }, length: number, steps: number): Array<{ r: number; g: number; b: number }> {
  const colors: Array<{ r: number; g: number; b: number }> = [];

  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    colors.push({
      r: Math.round(start.r + (end.r - start.r) * ratio),
      g: Math.round(start.g + (end.g - start.g) * ratio),
      b: Math.round(start.b + (end.b - start.b) * ratio)
    });
  }

  return colors;
}

function generateRainbowColors(length: number, steps: number): Array<{ r: number; g: number; b: number }> {
  const colors: Array<{ r: number; g: number; b: number }> = [];

  for (let i = 0; i < steps; i++) {
    const hue = (i / steps) * 360;
    const rgb = hslToRgb(hue, 100, 50);
    colors.push(rgb);
  }

  return colors;
}
