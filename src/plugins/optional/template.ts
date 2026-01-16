import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';

/**
 * Optional plugin that provides tagged template literal syntax.
 *
 * @example
 * ```typescript
 * import { createPigment } from '@oxog/pigment';
 * import { templatePlugin } from '@oxog/pigment/plugins';
 *
 * const pigment = createPigment({
 *   plugins: [templatePlugin()]
 * });
 *
 * console.log(pigment`{red Error:} {bold ${name}} has {yellow ${count}} issues`);
 * ```
 */
export function templatePlugin(): Plugin<PigmentContext> {
  return {
    name: 'template',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;

      k.updateContext({
        template: {
          enabled: true
        }
      } as Partial<PigmentContext>);

      k.on('style:template', (data) => {
        const { strings, values } = data as { strings: TemplateStringsArray; values: unknown[] };
        let result = '';

        for (let i = 0; i < strings.length; i++) {
          result += strings[i];

          if (i < values.length) {
            const value = values[i];

            if (typeof value === 'string') {
              const match = value.match(/^\{(.+)\}(.*)$/);
              if (match) {
                // Groups are guaranteed: (.+) requires 1+ chars, (.*) captures 0+ chars
                const [, styleExpression, text] = match as [string, string, string];
                result += parseStyleExpression(styleExpression, text, k);
              } else {
                result += value;
              }
            } else {
              result += String(value);
            }
          }
        }

        return result;
      });
    }
  };
}

function parseStyleExpression(expression: string, text: string, kernel: PigmentKernel): string {
  const parts = expression.split('.');
  let current: unknown = kernel.getContext();

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return text;
    }
  }

  if (typeof current === 'function') {
    return current(text);
  }

  return text;
}
