import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/code/CodeBlock';
import { InstallTabs } from '@/components/common/InstallTabs';

const requirementsCode = `// Minimum requirements
Node.js >= 18.0.0
TypeScript >= 5.0.0 (optional, for TypeScript projects)`;

const typescriptSetupCode = `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}`;

const esmImportCode = `// ESM (recommended)
import { pigment } from '@oxog/pigment';

// Named exports
import { createPigment, chalk } from '@oxog/pigment';`;

const cjsImportCode = `// CommonJS
const { pigment } = require('@oxog/pigment');`;

const verifyInstallCode = `import { pigment } from '@oxog/pigment';

console.log(pigment.green('Installation successful!'));
console.log(pigment.bold.blue('Welcome to @oxog/pigment'));`;

export function Installation() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Installation</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Get started with @oxog/pigment in your project.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
        <CodeBlock code={requirementsCode} language="plaintext" filename="requirements" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Package Installation</h2>
        <p className="text-muted-foreground mb-4">
          Install @oxog/pigment using your preferred package manager:
        </p>
        <InstallTabs />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">TypeScript Setup</h2>
        <p className="text-muted-foreground mb-4">
          @oxog/pigment is written in TypeScript and includes type definitions out of the box.
          For optimal TypeScript support, use the following configuration:
        </p>
        <CodeBlock code={typescriptSetupCode} language="json" filename="tsconfig.json" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Importing</h2>

        <h3 className="text-lg font-semibold mb-2 mt-6">ESM (Recommended)</h3>
        <CodeBlock code={esmImportCode} language="typescript" filename="index.ts" />

        <h3 className="text-lg font-semibold mb-2 mt-6">CommonJS</h3>
        <CodeBlock code={cjsImportCode} language="javascript" filename="index.js" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Verify Installation</h2>
        <p className="text-muted-foreground mb-4">
          Create a test file to verify that @oxog/pigment is installed correctly:
        </p>
        <CodeBlock code={verifyInstallCode} language="typescript" filename="test.ts" />
        <p className="text-muted-foreground mt-4">
          Run the file and you should see colored output in your terminal.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Dependencies</h2>
        <p className="text-muted-foreground mb-4">
          @oxog/pigment has minimal dependencies from the @oxog ecosystem:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <code className="px-2 py-0.5 rounded bg-muted font-mono text-sm">@oxog/types</code>
            <span>- Shared type definitions</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <code className="px-2 py-0.5 rounded bg-muted font-mono text-sm">@oxog/plugin</code>
            <span>- Plugin system core</span>
          </li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-border">
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Introduction
        </Link>
        <Link
          to="/docs/quick-start"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Quick Start
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
