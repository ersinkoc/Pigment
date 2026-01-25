import { CodeBlock } from '@/components/code/CodeBlock';

const createPigmentCode = `import { createPigment } from '@oxog/pigment';

// Create a custom instance with specific options
const p = createPigment({
  level: 3,     // 0: disabled, 1: basic, 2: 256, 3: true color
  enabled: true // Enable/disable all styling
});

console.log(p.red('Custom instance'));`;

const chalkCompatCode = `import { chalk } from '@oxog/pigment';

// Chalk v5 compatible API
console.log(chalk.red('Error'));
console.log(chalk.bold.blue('Bold blue'));

// Access level directly
console.log(chalk.level); // 0-3`;

const colorMethods = [
  { name: 'red', description: 'Red foreground color' },
  { name: 'green', description: 'Green foreground color' },
  { name: 'blue', description: 'Blue foreground color' },
  { name: 'yellow', description: 'Yellow foreground color' },
  { name: 'cyan', description: 'Cyan foreground color' },
  { name: 'magenta', description: 'Magenta foreground color' },
  { name: 'white', description: 'White foreground color' },
  { name: 'black', description: 'Black foreground color' },
  { name: 'gray / grey', description: 'Gray foreground color' },
  { name: 'blackBright', description: 'Bright black (gray) foreground' },
  { name: 'redBright', description: 'Bright red foreground' },
  { name: 'greenBright', description: 'Bright green foreground' },
  { name: 'blueBright', description: 'Bright blue foreground' },
  { name: 'yellowBright', description: 'Bright yellow foreground' },
  { name: 'cyanBright', description: 'Bright cyan foreground' },
  { name: 'magentaBright', description: 'Bright magenta foreground' },
  { name: 'whiteBright', description: 'Bright white foreground' },
];

const bgColorMethods = [
  { name: 'bgRed', description: 'Red background color' },
  { name: 'bgGreen', description: 'Green background color' },
  { name: 'bgBlue', description: 'Blue background color' },
  { name: 'bgYellow', description: 'Yellow background color' },
  { name: 'bgCyan', description: 'Cyan background color' },
  { name: 'bgMagenta', description: 'Magenta background color' },
  { name: 'bgWhite', description: 'White background color' },
  { name: 'bgBlack', description: 'Black background color' },
  { name: 'bgGray / bgGrey', description: 'Gray background color' },
  { name: 'bgBlackBright', description: 'Bright black (gray) background' },
  { name: 'bgRedBright', description: 'Bright red background' },
  { name: 'bgGreenBright', description: 'Bright green background' },
  { name: 'bgBlueBright', description: 'Bright blue background' },
  { name: 'bgYellowBright', description: 'Bright yellow background' },
  { name: 'bgCyanBright', description: 'Bright cyan background' },
  { name: 'bgMagentaBright', description: 'Bright magenta background' },
  { name: 'bgWhiteBright', description: 'Bright white background' },
];

const modifierMethods = [
  { name: 'bold', description: 'Make text bold' },
  { name: 'dim', description: 'Make text dimmed/faint' },
  { name: 'italic', description: 'Make text italic' },
  { name: 'underline', description: 'Underline text' },
  { name: 'inverse', description: 'Swap foreground and background colors' },
  { name: 'hidden', description: 'Hide text (still selectable)' },
  { name: 'strikethrough', description: 'Strike through text' },
  { name: 'reset', description: 'Reset all styles' },
];

const extendedColorCode = `// Hex colors
pigment.hex('#FF6B6B')('text')
pigment.bgHex('#2D3748')('text')

// RGB colors (0-255 for each channel)
pigment.rgb(255, 136, 0)('text')
pigment.bgRgb(75, 0, 130)('text')

// HSL colors (h: 0-360, s: 0-100, l: 0-100)
pigment.hsl(120, 100, 50)('text')
pigment.bgHsl(240, 100, 50)('text')

// ANSI 256 colors (0-255)
pigment.ansi256(196)('text')
pigment.bgAnsi256(21)('text')`;

export function API() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">API Reference</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Complete API documentation for @oxog/pigment.
      </p>

      {/* Main exports */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Main Exports</h2>

        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold font-mono text-lg mb-2">pigment</h3>
            <p className="text-muted-foreground mb-4">
              The default pre-configured instance with auto-detected color support.
            </p>
            <CodeBlock
              code={`import { pigment } from '@oxog/pigment';\nconsole.log(pigment.red('Hello'));`}
              language="typescript"
            />
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold font-mono text-lg mb-2">createPigment(options?)</h3>
            <p className="text-muted-foreground mb-4">
              Create a custom pigment instance with specific options.
            </p>
            <CodeBlock code={createPigmentCode} language="typescript" />
            <h4 className="font-semibold mt-4 mb-2">Options</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium">Option</th>
                  <th className="text-left py-2 font-medium">Type</th>
                  <th className="text-left py-2 font-medium">Default</th>
                  <th className="text-left py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 font-mono">level</td>
                  <td className="py-2 text-muted-foreground">0 | 1 | 2 | 3</td>
                  <td className="py-2 text-muted-foreground">auto</td>
                  <td className="py-2 text-muted-foreground">Color support level</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">enabled</td>
                  <td className="py-2 text-muted-foreground">boolean</td>
                  <td className="py-2 text-muted-foreground">true</td>
                  <td className="py-2 text-muted-foreground">Enable/disable styling</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold font-mono text-lg mb-2">chalk</h3>
            <p className="text-muted-foreground mb-4">
              Chalk v5 compatible export for easy migration.
            </p>
            <CodeBlock code={chalkCompatCode} language="typescript" />
          </div>
        </div>
      </section>

      {/* Color methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Foreground Colors</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium">Method</th>
              <th className="text-left py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {colorMethods.map((method) => (
              <tr key={method.name} className="border-b border-border">
                <td className="py-2 font-mono text-primary">{method.name}</td>
                <td className="py-2 text-muted-foreground">{method.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Background colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Background Colors</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium">Method</th>
              <th className="text-left py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {bgColorMethods.map((method) => (
              <tr key={method.name} className="border-b border-border">
                <td className="py-2 font-mono text-primary">{method.name}</td>
                <td className="py-2 text-muted-foreground">{method.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modifiers */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Modifiers</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium">Method</th>
              <th className="text-left py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {modifierMethods.map((method) => (
              <tr key={method.name} className="border-b border-border">
                <td className="py-2 font-mono text-primary">{method.name}</td>
                <td className="py-2 text-muted-foreground">{method.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Extended colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Extended Colors</h2>
        <p className="text-muted-foreground mb-4">
          For terminals that support true color (24-bit), you can use hex, RGB, HSL, or ANSI 256 colors:
        </p>
        <CodeBlock code={extendedColorCode} language="typescript" filename="extended-colors.ts" />
      </section>

      {/* Color levels */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Color Levels</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium">Level</th>
              <th className="text-left py-2 font-medium">Name</th>
              <th className="text-left py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">0</td>
              <td className="py-2">Disabled</td>
              <td className="py-2 text-muted-foreground">No color support, returns plain text</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">1</td>
              <td className="py-2">Basic</td>
              <td className="py-2 text-muted-foreground">16 colors (standard ANSI)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 font-mono">2</td>
              <td className="py-2">256 Colors</td>
              <td className="py-2 text-muted-foreground">256 color palette</td>
            </tr>
            <tr>
              <td className="py-2 font-mono">3</td>
              <td className="py-2">True Color</td>
              <td className="py-2 text-muted-foreground">16 million colors (24-bit RGB)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Utility functions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Utility Functions</h2>
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold font-mono text-lg mb-2">detectColorSupport(level?)</h3>
            <p className="text-muted-foreground mb-4">
              Detect terminal color support. Returns cached result unless override level is provided.
            </p>
            <CodeBlock
              code={`import { detectColorSupport } from '@oxog/pigment';

// Auto-detect
const support = detectColorSupport();
console.log(support.level); // 0-3

// Override detection
const forced = detectColorSupport(3);`}
              language="typescript"
            />
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold font-mono text-lg mb-2">resetColorSupportCache()</h3>
            <p className="text-muted-foreground mb-4">
              Reset the cached color support detection. Useful for testing when environment variables change.
            </p>
            <CodeBlock
              code={`import { resetColorSupportCache, detectColorSupport } from '@oxog/pigment';

// Clear cached detection
resetColorSupportCache();

// Next call will re-detect
const support = detectColorSupport();`}
              language="typescript"
            />
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold font-mono text-lg mb-2">supportsColor()</h3>
            <p className="text-muted-foreground mb-4">
              Alias for detectColorSupport(). Returns color support information.
            </p>
            <CodeBlock
              code={`import { supportsColor } from '@oxog/pigment';

const { level, hasBasic, has256, has16m } = supportsColor();`}
              language="typescript"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
