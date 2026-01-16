# @oxog/pigment

Zero-dependency terminal styling with micro-kernel architecture and Chalk drop-in compatibility.

[![npm](https://img.shields.io/npm/v/@oxog/pigment)](https://www.npmjs.com/package/@oxog/pigment)
[![Build](https://img.shields.io/github/actions/workflow/publish.yml/ersinkoc/pigment)](https://github.com/ersinkoc/pigment)
[![Coverage](https://img.shields.io/codecov/c/github/ersinkoc/pigment?token=)](https://github.com/ersinkoc/pigment)
[![License](https://img.shields.io/npm/l/@oxog/pigment)](https://github.com/ersinkoc/pigment)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@oxog/pigment)](https://bundlephobia.com/result?p=@oxog/pigment)

## Features

- **Zero Dependencies** - No external packages, implements everything from scratch
- **Universal Runtime** - Works in Node.js and browsers with same API
- **Micro-Kernel Architecture** - Powerful plugin system for extensibility
- **Chalk Compatible** - Drop-in replacement for Chalk v5
- **Multiple API Styles** - Proxy chaining, function composition, builder pattern
- **Full Color Support** - 16 base colors, 256 colors, true color (RGB/HEX/HSL)
- **Environment Aware** - Respects NO_COLOR, FORCE_COLOR, TTY detection
- **TypeScript** - Strict mode with full type safety
- **Tree Shakeable** - Optimize bundle size with individual imports

## Installation

```bash
npm install @oxog/pigment
```

## Quick Start

### Proxy-Based Chaining API (Primary)

```typescript
import { pigment } from '@oxog/pigment';

// Chain styles naturally
pigment.bold.red('Error!');
pigment.italic.blue.bgWhite('Info');
pigment.underline.yellow('Warning');

// Nested styles
pigment.red(`Error: ${pigment.bold('critical')} issue`);
```

### Function Composition API (Tree-Shakeable)

```typescript
import { bold, red, compose } from '@oxog/pigment';

// Compose styles
const error = compose(bold, red);
console.log(error('Something went wrong'));

// Reusable styles
const highlight = compose(bold, red);
console.log(highlight('IMPORTANT'));
```

### Builder Pattern API

```typescript
import { createPigment } from '@oxog/pigment';

const styled = createPigment()
  .bold()
  .red()
  .bgWhite()
  .paint('Styled text');

console.log(styled);
```

### Chalk Drop-in Compatibility

```typescript
// Before (Chalk)
import chalk from 'chalk';
console.log(chalk.red.bold('Error'));

// After (Pigment) - just change import
import chalk from '@oxog/pigment';
console.log(chalk.red.bold('Error'));
```

## Colors

### 16 Base Colors

```typescript
pigment.black('text');
pigment.red('text');
pigment.green('text');
pigment.yellow('text');
pigment.blue('text');
pigment.magenta('text');
pigment.cyan('text');
pigment.white('text');
```

### Bright Variants

```typescript
pigment.blackBright('text');  // alias: gray
pigment.redBright('text');
pigment.greenBright('text');
pigment.yellowBright('text');
pigment.blueBright('text');
pigment.magentaBright('text');
pigment.cyanBright('text');
pigment.whiteBright('text');
```

### Background Colors

```typescript
pigment.bgRed('text');
pigment.bgGreen('text');
pigment.bgBlue('text');
pigment.bgYellow('text');
// ... all 16 colors
pigment.bgRedBright('text');
```

## Modifiers

```typescript
pigment.bold('Bold text');
pigment.dim('Dimmed text');
pigment.italic('Italic text');
pigment.underline('Underlined text');
pigment.strikethrough('Strikethrough text');
pigment.inverse('Inverse colors');
pigment.hidden('Hidden text');
pigment.reset('Reset all styles');
```

## Extended Colors

### ANSI 256

```typescript
pigment.ansi256(196)('Bright red');
pigment.bgAnsi256(21)('Blue background');
```

### True Color (RGB)

```typescript
pigment.rgb(255, 136, 0)('Orange text');
pigment.bgRgb(0, 120, 255)('Blue background');
```

### HEX Colors

```typescript
pigment.hex('#FF8800')('Orange text');
pigment.bgHex('#0078FF')('Blue background');
```

### HSL Colors

```typescript
pigment.hsl(30, 100, 50)('Orange text');
pigment.bgHsl(210, 100, 50)('Blue background');
```

## Environment Detection

```typescript
import { pigment, supportsColor } from '@oxog/pigment';

// Check color support
console.log(supportsColor);
// { level: 3, hasBasic: true, has256: true, has16m: true }

// Override level
const pigment = createPigment({ level: 3 });
```

### Environment Variables

- `NO_COLOR` - Disables all colors
- `FORCE_COLOR` - Forces color level (0, 1, 2, 3)
- `TERM` - Terminal type detection

## Plugin System

### Core Plugins (Always Loaded)

```typescript
// 16 ANSI colors
baseColorsPlugin

// Text modifiers
modifiersPlugin

// 256-color palette
ansi256Plugin

// RGB/HEX/HSL color support
trueColorPlugin

// Nested/composed styles
nestingPlugin

// Environment detection
environmentPlugin
```

### Optional Plugins (Opt-in)

#### Gradient Plugin

```typescript
import { createPigment } from '@oxog/pigment';
import { gradientPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({ plugins: [gradientPlugin({ steps: 10 })] });

// Linear gradient
pigment.gradient('red', 'blue')('Gradient text');
pigment.gradient('#FF0000', '#0000FF')('Hex gradient');
pigment.gradient([255, 0, 0], [0, 0, 255])('RGB gradient');

// Rainbow gradient
pigment.rainbow('Rainbow text');
```

#### Theme Plugin

```typescript
import { themePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({ plugins: [themePlugin({ preset: 'monokai' })] });

// Theme colors
pigment.theme.keyword('const');      // Orange
pigment.theme.string('"hello"');     // Yellow
pigment.theme.number('42');          // Purple
pigment.theme.comment('// note');    // Gray
pigment.theme.error('Error!');       // Red
pigment.theme.success('Done!');      // Green
```

**Available Presets**: monokai, dracula, nord, github, vscode, tokyo-night, catppuccin, one-dark, solarized

#### Semantic Plugin

```typescript
import { semanticPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({ plugins: [semanticPlugin()] });

pigment.success('✓ Task completed');    // Green
pigment.error('✗ Task failed');         // Red
pigment.warning('⚠ Check this');        // Yellow
pigment.info('ℹ Note');                 // Blue
pigment.debug('[DEBUG] value');         // Gray

// Custom colors
semanticPlugin({
  success: '#00FF00',
  error: '#FF0000',
  warning: '#FFAA00',
  info: '#00AAFF',
  debug: '#888888'
})
```

#### Box Plugin

```typescript
import { boxPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({ plugins: [boxPlugin()] });

// Simple box
pigment.box('Hello World');
// ┌─────────────┐
// │ Hello World │
// └─────────────┘

// Styled box
pigment.box('Error!', { border: 'double', padding: 2 });
// ╔═════════════╗
// ║               ║
// ║    Error!     ║
// ║               ║
// ╚═════════════╝
```

**Border Styles**: single, double, rounded, bold, classic

#### Template Plugin

```typescript
import { templatePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({ plugins: [templatePlugin()] });

// Tagged template
console.log(pigment`{red Error:} {bold ${name}} has {yellow ${count}} issues`);

// Nested styles
console.log(pigment`{bold.red CRITICAL:} {dim system failure}`);
```

### Ecosystem Plugin

```typescript
import { pigmentPlugin } from '@oxog/pigment/plugins';

// For @oxog/log, @oxog/cli
log.use(pigmentPlugin({ theme: 'monokai', level: 3 }));
```

## API Reference

### createPigment

```typescript
import { createPigment } from '@oxog/pigment';

const pigment = createPigment({
  level: 3,              // Force color level
  forceColor: false,     // Force color output
  noColor: false,        // Disable all colors
  plugins: []            // Custom plugins
});
```

### Type Definitions

```typescript
interface Pigment {
  // Text modifiers
  bold: Pigment;
  dim: Pigment;
  italic: Pigment;
  // ... all modifiers

  // Foreground colors
  black: Pigment;
  red: Pigment;
  green: Pigment;
  // ... all colors

  // Background colors
  bgBlack: Pigment;
  bgRed: Pigment;
  // ... all background colors

  // Extended colors
  ansi256(code: number): Pigment;
  rgb(r: number, g: number, b: number): Pigment;
  hex(color: string): Pigment;
  hsl(h: number, s: number, l: number): Pigment;

  // Function call
  (text: string): string;
}
```

## Platform Support

| Platform | Output | Auto-Detection |
|----------|---------|---------------|
| Node.js | ANSI escape codes | ✅ TTY, TERM, CI |
| Browser | CSS %c styling | ✅ Browser API |

## Technical Specifications

| Requirement | Value |
|-------------|-------|
| Runtime | Universal (Node.js + Browser) |
| Module Format | ESM + CJS |
| Node.js | >= 18 |
| TypeScript | >= 5.0 |
| Bundle (core) | < 3KB gzipped |
| Bundle (all plugins) | < 12KB gzipped |
| Test Coverage | 100% target |

## Dependencies

```json
{
  "dependencies": {
    "@oxog/types": "^1.0.1",
    "@oxog/plugin": "^1.0.0"
  }
}
```

**@oxog ecosystem only** - Only @oxog packages as dependencies, no external libraries.

## License

MIT © Ersin Koç

## Links

- [GitHub](https://github.com/ersinkoc/pigment)
- [Website](https://pigment.oxog.dev)
- [npm](https://www.npmjs.com/package/@oxog/pigment)

Made with ❤️ by Ersin KOÇ
