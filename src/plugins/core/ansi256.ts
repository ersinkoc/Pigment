import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';

/**
 * Core plugin that provides 256-color palette support.
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * pigment.ansi256(196)('Bright red');
 * pigment.bgAnsi256(21)('Blue background');
 * ```
 */
export function ansi256Plugin(): Plugin<PigmentContext> {
  return {
    name: 'ansi256',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;
      const ctx = k.getContext();

      k.updateContext({
        ansi256: {
          enabled: true,
          supports256: ctx.colorSupport?.has256 ?? false
        }
      } as Partial<PigmentContext>);

      k.on('color:ansi256', (data) => {
        const { code, background } = data as { code: number; background: boolean };
        if (code < 0 || code > 255) {
          k.emit('error', new Error(`ANSI 256 code must be between 0 and 255, got ${code}`));
          return;
        }

        const prefix = background ? 48 : 38;
        const closeCode = background ? 49 : 39;

        return {
          name: `ansi256(${code})`,
          code,
          open: `\x1b[${prefix};5;${code}m`,
          close: `\x1b[${closeCode}m`,
          type: 'color' as const,
          background
        };
      });
    }
  };
}
