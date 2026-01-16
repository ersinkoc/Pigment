import { CodeBlock } from '@/components/code/CodeBlock';
import { Puzzle, Zap, Palette, Box, FileCode, Sparkles } from 'lucide-react';

const pluginArchitectureCode = `import { createKernel } from '@oxog/plugin';
import { createPigment } from '@oxog/pigment';

// Pigment uses a micro-kernel architecture
// The core is minimal, plugins add functionality

// Core plugins (always included):
// - base-colors: 16 standard ANSI colors
// - modifiers: bold, italic, underline, etc.
// - ansi256: 256 color palette support
// - true-color: RGB/HEX/HSL support
// - nesting: proper style nesting
// - environment: color detection`;

const corePluginsCode = `import { pigment } from '@oxog/pigment';

// Base colors (core plugin)
pigment.red('Red text');
pigment.bgBlue('Blue background');

// Modifiers (core plugin)
pigment.bold('Bold text');
pigment.italic('Italic text');

// True color (core plugin)
pigment.hex('#FF6B6B')('Hex color');
pigment.rgb(255, 100, 0)('RGB color');
pigment.hsl(200, 100, 50)('HSL color');

// ANSI 256 (core plugin)
pigment.ansi256(196)('256 palette color');`;

const gradientPluginCode = `import { createPigment, gradientPlugin } from '@oxog/pigment';

const p = createPigment({
  plugins: [gradientPlugin()]
});

// Apply gradient to text
const kernel = p._kernel;
const result = kernel.emit('style:gradient', {
  start: '#FF0000',
  end: '#0000FF',
  text: 'Gradient text!'
});

// Rainbow effect
const rainbow = kernel.emit('style:rainbow', {
  text: 'Rainbow colors!'
});`;

const themePluginCode = `import { createPigment, themePlugin } from '@oxog/pigment';

const p = createPigment({
  plugins: [
    themePlugin({
      preset: 'dracula' // or 'monokai', 'nord', 'github', etc.
    })
  ]
});

// Use themed colors
const kernel = p._kernel;
kernel.emit('style:theme', { type: 'keyword', text: 'const' });
kernel.emit('style:theme', { type: 'string', text: '"hello"' });
kernel.emit('style:theme', { type: 'comment', text: '// comment' });`;

const semanticPluginCode = `import { createPigment, semanticPlugin } from '@oxog/pigment';

const p = createPigment({
  plugins: [semanticPlugin()]
});

const kernel = p._kernel;

// Semantic styling
kernel.emit('style:success', { text: 'Operation completed!' });
kernel.emit('style:error', { text: 'Something went wrong!' });
kernel.emit('style:warning', { text: 'Check your input!' });
kernel.emit('style:info', { text: 'Processing...' });
kernel.emit('style:debug', { text: 'Debug info' });`;

const boxPluginCode = `import { createPigment, boxPlugin } from '@oxog/pigment';

const p = createPigment({
  plugins: [boxPlugin()]
});

const kernel = p._kernel;

// Create boxes with different borders
kernel.emit('style:box', {
  text: 'Single border box',
  border: 'single'
});

kernel.emit('style:box', {
  text: 'Double border box',
  border: 'double'
});

kernel.emit('style:box', {
  text: 'Rounded border box',
  border: 'rounded',
  padding: 2
});`;

const customPluginCode = `import { createPigment } from '@oxog/pigment';
import type { Plugin } from '@oxog/plugin';

// Create a custom plugin
const myPlugin = (): Plugin => ({
  name: 'my-custom-plugin',
  version: '1.0.0',

  install(kernel) {
    // Add custom functionality
    kernel.on('style:highlight', (data) => {
      const { text, color = 'yellow' } = data;
      return \`>>> \${text} <<<\`;
    });
  }
});

const p = createPigment({
  plugins: [myPlugin()]
});`;

const corePlugins = [
  {
    icon: Palette,
    name: 'base-colors',
    description: '16 standard ANSI foreground and background colors',
  },
  {
    icon: Zap,
    name: 'modifiers',
    description: 'Text modifiers: bold, italic, underline, strikethrough, etc.',
  },
  {
    icon: Box,
    name: 'ansi256',
    description: '256 color palette support for extended color range',
  },
  {
    icon: Sparkles,
    name: 'true-color',
    description: '24-bit true color support (RGB, HEX, HSL)',
  },
  {
    icon: FileCode,
    name: 'nesting',
    description: 'Proper style nesting with reset handling',
  },
  {
    icon: Puzzle,
    name: 'environment',
    description: 'Auto-detection of terminal color capabilities',
  },
];

const optionalPlugins = [
  {
    name: 'gradientPlugin',
    description: 'Apply color gradients to text',
    presets: ['rainbow', 'sunset', 'ocean'],
  },
  {
    name: 'themePlugin',
    description: 'Syntax highlighting themes',
    presets: ['dracula', 'monokai', 'nord', 'github', 'vscode', 'tokyo-night'],
  },
  {
    name: 'semanticPlugin',
    description: 'Semantic color meanings',
    presets: ['success', 'error', 'warning', 'info', 'debug'],
  },
  {
    name: 'boxPlugin',
    description: 'Draw boxes around text',
    presets: ['single', 'double', 'rounded', 'bold', 'classic'],
  },
  {
    name: 'templatePlugin',
    description: 'Tagged template literal support',
    presets: [],
  },
];

export function Plugins() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Plugins</h1>
      <p className="text-xl text-muted-foreground mb-8">
        @oxog/pigment uses a micro-kernel plugin architecture for maximum flexibility and tree-shaking.
      </p>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Plugin Architecture</h2>
        <p className="text-muted-foreground mb-4">
          Pigment's core is minimal - all styling functionality comes from plugins.
          This allows for tree-shaking and custom configurations.
        </p>
        <CodeBlock code={pluginArchitectureCode} language="typescript" filename="architecture.ts" />
      </section>

      {/* Core Plugins */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Core Plugins</h2>
        <p className="text-muted-foreground mb-4">
          These plugins are included by default and provide the essential styling functionality:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {corePlugins.map((plugin) => (
            <div
              key={plugin.name}
              className="p-4 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <plugin.icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold font-mono">{plugin.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{plugin.description}</p>
            </div>
          ))}
        </div>
        <CodeBlock code={corePluginsCode} language="typescript" filename="core-plugins.ts" />
      </section>

      {/* Optional Plugins */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Optional Plugins</h2>
        <p className="text-muted-foreground mb-4">
          Import and use these plugins when you need additional functionality:
        </p>

        <div className="space-y-4 mb-6">
          {optionalPlugins.map((plugin) => (
            <div
              key={plugin.name}
              className="p-4 rounded-lg border border-border bg-card"
            >
              <h3 className="font-semibold font-mono text-primary mb-2">{plugin.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{plugin.description}</p>
              {plugin.presets.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {plugin.presets.map((preset) => (
                    <span
                      key={preset}
                      className="px-2 py-0.5 text-xs rounded bg-muted font-mono"
                    >
                      {preset}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Gradient Plugin */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Gradient Plugin</h2>
        <CodeBlock code={gradientPluginCode} language="typescript" filename="gradient-plugin.ts" />
      </section>

      {/* Theme Plugin */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Theme Plugin</h2>
        <CodeBlock code={themePluginCode} language="typescript" filename="theme-plugin.ts" />
      </section>

      {/* Semantic Plugin */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Semantic Plugin</h2>
        <CodeBlock code={semanticPluginCode} language="typescript" filename="semantic-plugin.ts" />
      </section>

      {/* Box Plugin */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Box Plugin</h2>
        <CodeBlock code={boxPluginCode} language="typescript" filename="box-plugin.ts" />
      </section>

      {/* Custom Plugins */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Creating Custom Plugins</h2>
        <p className="text-muted-foreground mb-4">
          You can create your own plugins to extend Pigment's functionality:
        </p>
        <CodeBlock code={customPluginCode} language="typescript" filename="custom-plugin.ts" />
      </section>
    </div>
  );
}
