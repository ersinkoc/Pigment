import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/code/CodeBlock';

const installCode = `npm install @oxog/pigment`;

const basicUsageCode = `import { pigment } from '@oxog/pigment';

// Basic styling
console.log(pigment.red('Red text'));
console.log(pigment.bold.green('Bold green'));
console.log(pigment.bgBlue.white('White on blue'));

// Chaining styles
console.log(pigment.bold.italic.underline.cyan('Styled text'));

// Extended colors
console.log(pigment.hex('#FF6B6B')('Custom hex color'));
console.log(pigment.rgb(255, 136, 0)('RGB orange'));
console.log(pigment.hsl(120, 100, 50)('HSL green'));`;

const chalkMigrationCode = `// Before (Chalk)
import chalk from 'chalk';
console.log(chalk.red('Error!'));

// After (Pigment) - just change the import
import { pigment } from '@oxog/pigment';
console.log(pigment.red('Error!'));`;

export function Introduction() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Introduction</h1>
      <p className="text-xl text-muted-foreground mb-8">
        @oxog/pigment is a zero-dependency terminal styling library with a micro-kernel plugin architecture
        and Chalk drop-in compatibility.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span><strong className="text-foreground">Zero Dependencies:</strong> Only @oxog ecosystem packages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span><strong className="text-foreground">Plugin Architecture:</strong> Micro-kernel design for extensibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span><strong className="text-foreground">Full Color Support:</strong> 16 colors, 256 colors, and true color (RGB/HEX/HSL)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span><strong className="text-foreground">TypeScript Native:</strong> Written in TypeScript with strict mode</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span><strong className="text-foreground">Chalk Compatible:</strong> Drop-in replacement for Chalk v5</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span><strong className="text-foreground">Tree Shakeable:</strong> Import only what you need</span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCode} language="bash" filename="terminal" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <CodeBlock code={basicUsageCode} language="typescript" filename="example.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Chalk Migration</h2>
        <p className="text-muted-foreground mb-4">
          Migrating from Chalk is simple - just change your import statement:
        </p>
        <CodeBlock code={chalkMigrationCode} language="typescript" filename="migration.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">@oxog Ecosystem</h2>
        <p className="text-muted-foreground mb-4">
          @oxog/pigment is part of the @oxog ecosystem - a collection of zero-dependency
          TypeScript packages designed for modern development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">@oxog/types</h3>
            <p className="text-sm text-muted-foreground">Core type definitions shared across @oxog packages</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">@oxog/plugin</h3>
            <p className="text-sm text-muted-foreground">Micro-kernel plugin system for extensibility</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-border">
        <div />
        <Link
          to="/docs/installation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Installation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
