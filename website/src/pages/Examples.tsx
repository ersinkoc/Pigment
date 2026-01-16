import { CodeBlock } from '@/components/code/CodeBlock';

const basicExampleCode = `import { pigment } from '@oxog/pigment';

// Basic styling
console.log(pigment.red('Error message'));
console.log(pigment.green('Success message'));
console.log(pigment.yellow('Warning message'));
console.log(pigment.blue('Info message'));

// Chained styles
console.log(pigment.bold.underline.red('Important error!'));`;

const loggingExampleCode = `import { pigment } from '@oxog/pigment';

// Create a simple logger
const logger = {
  error: (msg: string) => console.log(pigment.bold.red('[ERROR]'), msg),
  warn: (msg: string) => console.log(pigment.bold.yellow('[WARN]'), msg),
  info: (msg: string) => console.log(pigment.bold.blue('[INFO]'), msg),
  success: (msg: string) => console.log(pigment.bold.green('[SUCCESS]'), msg),
  debug: (msg: string) => console.log(pigment.dim('[DEBUG]'), msg),
};

logger.error('Database connection failed');
logger.warn('Memory usage is high');
logger.info('Server started on port 3000');
logger.success('All tests passed');
logger.debug('Processing request...');`;

const cliExampleCode = `import { pigment } from '@oxog/pigment';

// CLI tool styling
const banner = \`
  \${pigment.bold.cyan('╔════════════════════════════════╗')}
  \${pigment.bold.cyan('║')}  \${pigment.bold.white('My Awesome CLI Tool v1.0.0')}  \${pigment.bold.cyan('║')}
  \${pigment.bold.cyan('╚════════════════════════════════╝')}
\`;

console.log(banner);

// Command help
console.log(pigment.bold.yellow('Usage:'));
console.log(\`  \${pigment.green('mytool')} \${pigment.cyan('<command>')} \${pigment.dim('[options]')}\`);
console.log();
console.log(pigment.bold.yellow('Commands:'));
console.log(\`  \${pigment.cyan('init')}      Initialize a new project\`);
console.log(\`  \${pigment.cyan('build')}     Build the project\`);
console.log(\`  \${pigment.cyan('deploy')}    Deploy to production\`);`;

const tableExampleCode = `import { pigment } from '@oxog/pigment';

// Styled table output
const header = pigment.bold.white;
const cell = pigment.dim;
const highlight = pigment.cyan;

console.log('');
console.log(header('  Name          Version    Status'));
console.log(cell('  ─────────────────────────────────'));
console.log(\`  \${highlight('react')}         19.0.0     \${pigment.green('✓')}\`);
console.log(\`  \${highlight('typescript')}    5.6.0      \${pigment.green('✓')}\`);
console.log(\`  \${highlight('vite')}          6.0.0      \${pigment.green('✓')}\`);
console.log(\`  \${highlight('outdated-pkg')}  1.0.0      \${pigment.red('✗')}\`);
console.log('');`;

const progressExampleCode = `import { pigment } from '@oxog/pigment';

// Progress bar styling
function progressBar(percent: number, width = 30): string {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;

  const bar =
    pigment.green('█'.repeat(filled)) +
    pigment.dim('░'.repeat(empty));

  const percentText = percent === 100
    ? pigment.bold.green(\`\${percent}%\`)
    : pigment.yellow(\`\${percent}%\`);

  return \`[\${bar}] \${percentText}\`;
}

console.log(progressBar(0));
console.log(progressBar(25));
console.log(progressBar(50));
console.log(progressBar(75));
console.log(progressBar(100));`;

const trueColorExampleCode = `import { pigment } from '@oxog/pigment';

// Gradient effect using true color
function gradient(text: string, startHex: string, endHex: string): string {
  const start = parseInt(startHex.slice(1), 16);
  const end = parseInt(endHex.slice(1), 16);

  const startR = (start >> 16) & 255;
  const startG = (start >> 8) & 255;
  const startB = start & 255;

  const endR = (end >> 16) & 255;
  const endG = (end >> 8) & 255;
  const endB = end & 255;

  return text.split('').map((char, i) => {
    const ratio = i / (text.length - 1);
    const r = Math.round(startR + (endR - startR) * ratio);
    const g = Math.round(startG + (endG - startG) * ratio);
    const b = Math.round(startB + (endB - startB) * ratio);
    return pigment.rgb(r, g, b)(char);
  }).join('');
}

console.log(gradient('Rainbow Text Effect!', '#FF0000', '#0000FF'));
console.log(gradient('Sunset Gradient', '#FF6B6B', '#FFA500'));
console.log(gradient('Ocean Theme', '#00CED1', '#1E90FF'));`;

const nestingExampleCode = `import { pigment } from '@oxog/pigment';

// Nested styles reset properly
const output = pigment.bgBlue.white(
  'Blue background with ' +
  pigment.bold.yellow('bold yellow') +
  ' and ' +
  pigment.italic.red('italic red') +
  ' text'
);

console.log(output);

// Complex nesting for syntax highlighting
const code = \`
\${pigment.cyan('const')} \${pigment.blue('greeting')} = \${pigment.green('"Hello, World!"')};
\${pigment.cyan('console')}\${pigment.dim('.')}\${pigment.yellow('log')}\${pigment.dim('(')}greeting\${pigment.dim(')')};
\`;

console.log(code);`;

const examples = [
  { title: 'Basic Styling', description: 'Simple color and modifier usage', code: basicExampleCode },
  { title: 'Custom Logger', description: 'Create a styled logging utility', code: loggingExampleCode },
  { title: 'CLI Tool Banner', description: 'Styled CLI tool interface', code: cliExampleCode },
  { title: 'Table Output', description: 'Formatted table display', code: tableExampleCode },
  { title: 'Progress Bar', description: 'Animated progress indicator', code: progressExampleCode },
  { title: 'Gradient Effect', description: 'True color gradient text', code: trueColorExampleCode },
  { title: 'Nested Styles', description: 'Complex nested styling', code: nestingExampleCode },
];

export function Examples() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Examples</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Real-world examples demonstrating @oxog/pigment capabilities.
      </p>

      <div className="space-y-12">
        {examples.map((example, index) => (
          <section key={index}>
            <h2 className="text-2xl font-semibold mb-2">{example.title}</h2>
            <p className="text-muted-foreground mb-4">{example.description}</p>
            <CodeBlock code={example.code} language="typescript" filename={`example-${index + 1}.ts`} />
          </section>
        ))}
      </div>
    </div>
  );
}
