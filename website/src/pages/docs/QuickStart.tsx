import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/code/CodeBlock';

const basicStylingCode = `import { pigment } from '@oxog/pigment';

// Foreground colors
console.log(pigment.red('Red text'));
console.log(pigment.green('Green text'));
console.log(pigment.blue('Blue text'));
console.log(pigment.yellow('Yellow text'));
console.log(pigment.cyan('Cyan text'));
console.log(pigment.magenta('Magenta text'));

// Background colors
console.log(pigment.bgRed('Red background'));
console.log(pigment.bgGreen('Green background'));
console.log(pigment.bgBlue.white('Blue bg, white text'));`;

const modifiersCode = `import { pigment } from '@oxog/pigment';

// Text modifiers
console.log(pigment.bold('Bold text'));
console.log(pigment.dim('Dimmed text'));
console.log(pigment.italic('Italic text'));
console.log(pigment.underline('Underlined text'));
console.log(pigment.strikethrough('Strikethrough text'));

// Combine modifiers with colors
console.log(pigment.bold.red('Bold red'));
console.log(pigment.italic.blue.bgYellow('Italic blue on yellow'));`;

const chainingCode = `import { pigment } from '@oxog/pigment';

// Chain multiple styles
const error = pigment.bold.red;
const success = pigment.bold.green;
const warning = pigment.yellow.bgBlack;
const info = pigment.cyan;

console.log(error('Error: Something went wrong!'));
console.log(success('Success: Operation completed!'));
console.log(warning('Warning: Check your input'));
console.log(info('Info: Processing...'));`;

const extendedColorsCode = `import { pigment } from '@oxog/pigment';

// Hex colors
console.log(pigment.hex('#FF6B6B')('Coral color'));
console.log(pigment.bgHex('#2D3748')('Dark background'));

// RGB colors
console.log(pigment.rgb(255, 136, 0)('Orange'));
console.log(pigment.bgRgb(75, 0, 130)('Indigo background'));

// HSL colors
console.log(pigment.hsl(120, 100, 50)('Pure green'));
console.log(pigment.bgHsl(240, 100, 50)('Blue background'));

// ANSI 256 colors
console.log(pigment.ansi256(196)('ANSI red'));
console.log(pigment.bgAnsi256(21)('ANSI blue bg'));`;

const nestingCode = `import { pigment } from '@oxog/pigment';

// Nested styles reset properly
console.log(
  pigment.red(
    'Red ' + pigment.blue('blue') + ' back to red'
  )
);

// Complex nesting
const styled = pigment.bgWhite.black(
  'Normal ' +
  pigment.bold('Bold ') +
  pigment.italic.red('Italic red ') +
  'back to normal'
);
console.log(styled);`;

export function QuickStart() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Learn the basics of styling terminal output with @oxog/pigment.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Colors</h2>
        <p className="text-muted-foreground mb-4">
          @oxog/pigment supports all 16 standard ANSI colors for both foreground and background:
        </p>
        <CodeBlock code={basicStylingCode} language="typescript" filename="basic-colors.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Text Modifiers</h2>
        <p className="text-muted-foreground mb-4">
          Apply text modifications like bold, italic, underline, and more:
        </p>
        <CodeBlock code={modifiersCode} language="typescript" filename="modifiers.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Chaining & Composition</h2>
        <p className="text-muted-foreground mb-4">
          Chain styles together and save them for reuse:
        </p>
        <CodeBlock code={chainingCode} language="typescript" filename="chaining.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Extended Colors</h2>
        <p className="text-muted-foreground mb-4">
          Use hex, RGB, HSL, or ANSI 256 colors for precise color control:
        </p>
        <CodeBlock code={extendedColorsCode} language="typescript" filename="extended-colors.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nested Styles</h2>
        <p className="text-muted-foreground mb-4">
          Styles can be nested and will reset properly:
        </p>
        <CodeBlock code={nestingCode} language="typescript" filename="nesting.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/api"
            className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold mb-2">API Reference</h3>
            <p className="text-sm text-muted-foreground">Explore all available methods and options</p>
          </Link>
          <Link
            to="/plugins"
            className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold mb-2">Plugins</h3>
            <p className="text-sm text-muted-foreground">Learn about optional plugins for gradients, themes, and more</p>
          </Link>
          <Link
            to="/examples"
            className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold mb-2">Examples</h3>
            <p className="text-sm text-muted-foreground">See real-world usage examples</p>
          </Link>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-border">
        <Link
          to="/docs/installation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Installation
        </Link>
        <Link
          to="/api"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          API Reference
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
