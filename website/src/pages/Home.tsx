import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Puzzle, Palette, FileCode, Box, Sparkles } from 'lucide-react';
import { InstallTabs } from '@/components/common/InstallTabs';
import { CodeBlock } from '@/components/code/CodeBlock';
import { PACKAGE_NAME, GITHUB_REPO } from '@/lib/constants';

const features = [
  {
    icon: Zap,
    title: 'Zero Dependencies',
    description: 'No external packages. Only @oxog ecosystem packages as dependencies.',
  },
  {
    icon: Puzzle,
    title: 'Plugin Architecture',
    description: 'Micro-kernel design with core and optional plugins for extensibility.',
  },
  {
    icon: Palette,
    title: 'Full Color Support',
    description: '16 base colors, 256 colors, and true color (RGB/HEX/HSL) support.',
  },
  {
    icon: FileCode,
    title: 'TypeScript Native',
    description: 'Written in TypeScript with strict mode and full type safety.',
  },
  {
    icon: Box,
    title: 'Chalk Compatible',
    description: 'Drop-in replacement for Chalk v5. Just change the import.',
  },
  {
    icon: Sparkles,
    title: 'Tree Shakeable',
    description: 'Import only what you need. Optimize bundle size automatically.',
  },
];

const quickStartCode = `import { pigment } from '@oxog/pigment';

// Chain styles naturally
console.log(pigment.bold.red('Error!'));
console.log(pigment.italic.blue.bgWhite('Info'));

// Use extended colors
console.log(pigment.hex('#FF6B6B')('Custom color'));
console.log(pigment.rgb(255, 136, 0)('Orange'));

// Compose styles
const error = pigment.bold.red;
const success = pigment.bold.green;

console.log(error('Something went wrong'));
console.log(success('Task completed!'));`;

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              @oxog ecosystem
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              <span className="text-primary">{PACKAGE_NAME}</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Zero-dependency terminal styling with micro-kernel plugin architecture
              and Chalk drop-in compatibility.
            </p>

            {/* Install Command */}
            <div className="mb-8">
              <InstallTabs />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://github.com/${GITHUB_REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors font-medium"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Quick Start</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with @oxog/pigment in seconds. The API is intuitive and Chalk-compatible.
          </p>
          <div className="max-w-3xl mx-auto">
            <CodeBlock
              code={quickStartCode}
              language="typescript"
              filename="example.ts"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">&lt;3KB</div>
              <div className="text-sm text-muted-foreground">Core Bundle</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Test Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">TypeScript</div>
              <div className="text-sm text-muted-foreground">Native</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">@oxog</div>
              <div className="text-sm text-muted-foreground">Ecosystem</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
