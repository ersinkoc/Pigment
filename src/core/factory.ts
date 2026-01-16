import { createKernel } from '@oxog/plugin';
import type { PigmentOptions, Pigment, PigmentContext, PigmentEvents } from '../types.js';
import { createProxyPigment } from './proxy.js';
import { BuilderPigment } from './builder.js';
import { detectColorSupport } from '../utils/color-support.js';
import { hexToRgb } from '../utils/hex-to-rgb.js';
import { hslToRgb } from '../utils/hsl-to-rgb.js';
import { rgbToAnsi256 } from '../utils/rgb-to-ansi256.js';
import { baseColorsPlugin } from '../plugins/core/base-colors.js';
import { modifiersPlugin } from '../plugins/core/modifiers.js';
import { ansi256Plugin } from '../plugins/core/ansi256.js';
import { trueColorPlugin } from '../plugins/core/true-color.js';
import { nestingPlugin } from '../plugins/core/nesting.js';
import { environmentPlugin } from '../plugins/core/environment.js';

/**
 * Creates a new Pigment instance using @oxog/plugin micro-kernel.
 *
 * @param options - Configuration options
 * @returns Pigment instance with chainable API
 *
 * @example
 * ```typescript
 * // Simple usage (all core plugins auto-loaded)
 * const pigment = createPigment();
 * console.log(pigment.red.bold('Error!'));
 *
 * // With configuration
 * const pigment = createPigment({
 *   level: 3,           // Color level (0-3)
 *   forceColor: true,   // Force colors
 * });
 *
 * // With optional plugins
 * import { gradientPlugin, themePlugin } from '@oxog/pigment/plugins';
 *
 * const pigment = createPigment({
 *   plugins: [
 *     gradientPlugin(),
 *     themePlugin({ preset: 'monokai' })
 *   ]
 * });
 * ```
 */
export function createPigment(options?: PigmentOptions): Pigment & { builder: BuilderPigment } {
  const colorSupport = detectColorSupport(options?.level);
  const noColor = options?.noColor ?? false;
  const forceColor = options?.forceColor ?? false;

  const level = noColor ? 0 : forceColor ? (options?.level ?? 3) : colorSupport.level;

  // Create kernel using @oxog/plugin
  const kernel = createKernel<PigmentContext, PigmentEvents>({
    context: {
      colorSupport: { ...colorSupport, level },
      level,
      enabled: level > 0,
      styles: new Map(),
      utils: {
        hexToRgb,
        hslToRgb,
        rgbToAnsi256,
        detectColorSupport,
        supportsColor: detectColorSupport
      }
    }
  });

  // Register core plugins
  kernel.use(baseColorsPlugin());
  kernel.use(modifiersPlugin());
  kernel.use(ansi256Plugin());
  kernel.use(trueColorPlugin());
  kernel.use(nestingPlugin());
  kernel.use(environmentPlugin());

  // Register optional plugins
  if (options?.plugins) {
    for (const plugin of options.plugins) {
      kernel.use(plugin);
    }
  }

  // Initialize kernel (plugins have synchronous install, so init is safe)
  kernel.init();

  // Wrap with Proxy for chainable API
  const pigment = createProxyPigment(kernel);
  const builder = new BuilderPigment(kernel);

  Object.defineProperty(pigment, 'builder', { value: builder, enumerable: false });
  Object.defineProperty(pigment, 'level', { value: level, enumerable: true });
  Object.defineProperty(pigment, 'supportsColor', { value: colorSupport, enumerable: true });

  return pigment as Pigment & { builder: BuilderPigment };
}
