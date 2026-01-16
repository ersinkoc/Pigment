# Pigment - @oxog NPM Package

## Package Identity

| Field | Value |
|-------|-------|
| **npm** | `@oxog/pigment` |
| **GitHub** | `https://github.com/ersinkoc/pigment` |
| **Website** | `https://pigment.oxog.dev` |
| **Author** | Ersin Koç |
| **License** | MIT |

> NO social media, Discord, email, or external links.

---

## Description

**One-line:** Zero-dependency terminal styling with micro-kernel architecture and Chalk drop-in compatibility.

Pigment is a modern, universal terminal styling library that works in Node.js and browsers. It features a micro-kernel architecture with a powerful plugin system, making it both lightweight and extensible. Use it standalone or integrate as a plugin into other @oxog packages like @oxog/log or @oxog/cli.

---

## @oxog Dependencies

This package has **zero dependencies** (not even @oxog packages). It's a foundational ecosystem package.

---

## NON-NEGOTIABLE RULES

### 1. DEPENDENCY POLICY

```json
{
  "dependencies": {}
}
```

- ONLY `@oxog/*` packages allowed as runtime dependencies
- NO external packages (chalk, ansi-colors, picocolors, etc.)
- Implement ALL functionality from scratch

**Allowed devDependencies:**
```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "tsup": "^8.0.0",
    "@types/node": "^20.0.0",
    "prettier": "^3.0.0",
    "eslint": "^9.0.0"
  }
}
```

### 2. 100% TEST COVERAGE

- Every line, branch, function tested
- All tests must pass
- Use Vitest
- Thresholds enforced in config

### 3. MICRO-KERNEL ARCHITECTURE

```
┌─────────────────────────────────────────────────┐
│                   User Code                      │
├─────────────────────────────────────────────────┤
│             Plugin Registry API                  │
│    use() · register() · unregister() · list()   │
├──────────┬──────────┬──────────┬────────────────┤
│  Core    │ Optional │ Imported │   Community    │
│ Plugins  │ Plugins  │ Plugins  │    Plugins     │
├──────────┴──────────┴──────────┴────────────────┤
│                 Micro Kernel                     │
│     Event Bus · Lifecycle · Error Boundary      │
└─────────────────────────────────────────────────┘
```

### 4. DEVELOPMENT WORKFLOW

Create these documents FIRST:

1. **SPECIFICATION.md** - Complete spec
2. **IMPLEMENTATION.md** - Architecture
3. **TASKS.md** - Ordered task list

Only then implement code following TASKS.md.

### 5. TYPESCRIPT STRICT MODE

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

### 6. LLM-NATIVE DESIGN

- `llms.txt` file (< 2000 tokens)
- Predictable API naming
- Rich JSDoc with @example
- Minimum 15 examples
- README optimized for LLMs

---

## CORE FEATURES

### 1. Proxy-Based Chaining API (Primary)

Chalk-style method chaining using JavaScript Proxy for zero-allocation style composition.

```typescript
import { pigment } from '@oxog/pigment';

// Chain styles naturally
pigment.bold.red('Error!');
pigment.italic.blue.bgWhite('Info');
pigment.underline.yellow('Warning');

// Nested styles
pigment.red(`Error: ${pigment.bold('critical')} issue`);
```

### 2. Function Composition API (Alternative)

Functional approach for tree-shaking and explicit composition.

```typescript
import { bold, red, bgWhite, compose } from '@oxog/pigment';

// Compose functions
const error = compose(bold, red);
console.log(error('Something went wrong'));

// Reusable styles
const highlight = compose(bold, bgWhite, red);
console.log(highlight('IMPORTANT'));
```

### 3. Builder Pattern API (Alternative)

Explicit builder for maximum control.

```typescript
import { pigment } from '@oxog/pigment';

const styled = pigment()
  .bold()
  .red()
  .bgWhite()
  .paint('Styled text');

console.log(styled);
```

### 4. Chalk Drop-in Compatibility

Default export is 100% Chalk-compatible. Swap imports without code changes.

```typescript
// Before (Chalk)
import chalk from 'chalk';
console.log(chalk.red.bold('Error'));

// After (Pigment) - just change import
import chalk from '@oxog/pigment';
console.log(chalk.red.bold('Error'));
```

### 5. 16 Base Colors

All standard ANSI colors with bright variants.

```typescript
// Standard colors
pigment.black('text');
pigment.red('text');
pigment.green('text');
pigment.yellow('text');
pigment.blue('text');
pigment.magenta('text');
pigment.cyan('text');
pigment.white('text');

// Bright variants
pigment.blackBright('text');  // alias: gray, grey
pigment.redBright('text');
pigment.greenBright('text');
pigment.yellowBright('text');
pigment.blueBright('text');
pigment.magentaBright('text');
pigment.cyanBright('text');
pigment.whiteBright('text');
```

### 6. Background Colors

All foreground colors available as backgrounds.

```typescript
pigment.bgRed('text');
pigment.bgGreen('text');
pigment.bgBlue('text');
pigment.bgYellow('text');
// ... all 16 colors
pigment.bgRedBright('text');
```

### 7. Text Modifiers

Full set of ANSI text modifiers.

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

### 8. 256 Color Support (Core Plugin)

Extended color palette with 256 colors.

```typescript
// By index (0-255)
pigment.ansi256(196)('Bright red');
pigment.bgAnsi256(21)('Blue background');

// Helper for common colors
pigment.ansi256(208)('Orange text');
```

### 9. RGB/HEX/HSL Color Support (Core Plugin)

True color support for modern terminals.

```typescript
// RGB
pigment.rgb(255, 136, 0)('Orange text');
pigment.bgRgb(0, 120, 255)('Blue background');

// HEX
pigment.hex('#FF8800')('Orange text');
pigment.bgHex('#0078FF')('Blue background');

// HSL
pigment.hsl(30, 100, 50)('Orange text');
pigment.bgHsl(210, 100, 50)('Blue background');
```

### 10. Environment Detection

Automatic color support detection with manual overrides.

```typescript
import { pigment, supportsColor } from '@oxog/pigment';

// Check color support
console.log(supportsColor.stdout);
// { level: 3, hasBasic: true, has256: true, has16m: true }

// Environment variables respected:
// NO_COLOR - disables all colors
// FORCE_COLOR - forces color level (0, 1, 2, 3)
// TERM - terminal type detection
// CI - CI environment detection
```

### 11. Universal Runtime

Works seamlessly in Node.js and browsers.

```typescript
// Node.js - ANSI escape codes
// Browser - CSS %c styling (auto-detected)

import { pigment } from '@oxog/pigment';

// Same API, different output
pigment.red.bold('Works everywhere!');

// Node.js output: \x1b[1m\x1b[31mWorks everywhere!\x1b[0m
// Browser output: %c styled via console CSS
```

---

## PLUGIN SYSTEM

### Standard Plugin Interface

```typescript
interface Plugin<TContext = unknown> {
  name: string;
  version: string;
  dependencies?: string[];
  install: (kernel: PigmentKernel<TContext>) => void;
  onInit?: (context: TContext) => void | Promise<void>;
  onDestroy?: () => void | Promise<void>;
  onError?: (error: Error) => void;
}
```

### Core Plugins (Always Loaded)

| Plugin | Description |
|--------|-------------|
| `baseColorsPlugin` | 16 base ANSI colors (black, red, green, yellow, blue, magenta, cyan, white + bright variants) |
| `modifiersPlugin` | Text modifiers (bold, dim, italic, underline, strikethrough, inverse, hidden, reset) |
| `ansi256Plugin` | 256-color palette support |
| `trueColorPlugin` | RGB, HEX, HSL color support |
| `nestingPlugin` | Nested/composed style support |
| `environmentPlugin` | NO_COLOR, FORCE_COLOR, TTY detection |

### Optional Plugins (Opt-in)

| Plugin | Description |
|--------|-------------|
| `gradientPlugin` | Smooth color gradients between two colors |
| `themePlugin` | Predefined color themes (monokai, dracula, nord, github, vscode, tokyo-night, catppuccin, one-dark, solarized) |
| `semanticPlugin` | Semantic colors (success, error, warning, info, debug) |
| `boxPlugin` | Box drawing with borders (single, double, rounded, bold, classic) |
| `templatePlugin` | Tagged template literal syntax for inline styling |

### Exported Plugins (For Ecosystem)

| Plugin | Description |
|--------|-------------|
| `pigmentPlugin` | Integration plugin for @oxog/log, @oxog/cli and other @oxog packages. Provides styled output capability with configurable themes. |

---

## API DESIGN

### Main Export

```typescript
// Primary: Proxy-based chaining
import { pigment } from '@oxog/pigment';
pigment.bold.red.bgWhite('Styled text');

// Default export: Chalk-compatible (drop-in replacement)
import pigment from '@oxog/pigment';
pigment.bold.red('Works like chalk');

// Alternative: Function composition
import { bold, red, compose } from '@oxog/pigment';
const errorStyle = compose(bold, red);

// Alternative: Builder pattern
import { createPigment } from '@oxog/pigment';
const p = createPigment().bold().red();

// Factory with plugins
import { createPigment } from '@oxog/pigment';
import { gradientPlugin, themePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [
    gradientPlugin(),
    themePlugin({ preset: 'monokai' })
  ]
});

// Ecosystem plugin export
import { pigmentPlugin } from '@oxog/pigment';
// Use in @oxog/log or @oxog/cli
```

### Type Definitions

```typescript
/**
 * Pigment kernel configuration options.
 * 
 * @example
 * ```typescript
 * const pigment = createPigment({
 *   level: 3,
 *   plugins: [gradientPlugin()]
 * });
 * ```
 */
export interface PigmentOptions {
  /**
   * Color support level override.
   * - 0: No colors
   * - 1: Basic 16 colors
   * - 2: 256 colors
   * - 3: True color (16m)
   * @default auto-detected
   */
  level?: 0 | 1 | 2 | 3;
  
  /**
   * Force color output regardless of TTY.
   * @default false
   */
  forceColor?: boolean;
  
  /**
   * Disable all colors.
   * @default false
   */
  noColor?: boolean;
  
  /**
   * Plugins to register.
   * @default []
   */
  plugins?: Plugin[];
}

/**
 * Color support detection result.
 */
export interface ColorSupport {
  level: 0 | 1 | 2 | 3;
  hasBasic: boolean;
  has256: boolean;
  has16m: boolean;
}

/**
 * Styler function type.
 * Applies ANSI styling to input string.
 */
export type Styler = (text: string) => string;

/**
 * Chainable pigment instance.
 * Supports property access chaining and function call.
 */
export interface Pigment {
  // Text modifiers
  bold: Pigment;
  dim: Pigment;
  italic: Pigment;
  underline: Pigment;
  strikethrough: Pigment;
  inverse: Pigment;
  hidden: Pigment;
  reset: Pigment;
  
  // Foreground colors
  black: Pigment;
  red: Pigment;
  green: Pigment;
  yellow: Pigment;
  blue: Pigment;
  magenta: Pigment;
  cyan: Pigment;
  white: Pigment;
  blackBright: Pigment;
  redBright: Pigment;
  greenBright: Pigment;
  yellowBright: Pigment;
  blueBright: Pigment;
  magentaBright: Pigment;
  cyanBright: Pigment;
  whiteBright: Pigment;
  gray: Pigment;
  grey: Pigment;
  
  // Background colors
  bgBlack: Pigment;
  bgRed: Pigment;
  bgGreen: Pigment;
  bgYellow: Pigment;
  bgBlue: Pigment;
  bgMagenta: Pigment;
  bgCyan: Pigment;
  bgWhite: Pigment;
  bgBlackBright: Pigment;
  bgRedBright: Pigment;
  bgGreenBright: Pigment;
  bgYellowBright: Pigment;
  bgBlueBright: Pigment;
  bgMagentaBright: Pigment;
  bgCyanBright: Pigment;
  bgWhiteBright: Pigment;
  bgGray: Pigment;
  bgGrey: Pigment;
  
  // Extended colors (methods)
  ansi256(code: number): Pigment;
  bgAnsi256(code: number): Pigment;
  rgb(r: number, g: number, b: number): Pigment;
  bgRgb(r: number, g: number, b: number): Pigment;
  hex(color: string): Pigment;
  bgHex(color: string): Pigment;
  hsl(h: number, s: number, l: number): Pigment;
  bgHsl(h: number, s: number, l: number): Pigment;
  
  // Call signature
  (text: string): string;
}

/**
 * Theme preset names.
 */
export type ThemePreset = 
  | 'monokai' 
  | 'dracula' 
  | 'nord' 
  | 'github' 
  | 'vscode' 
  | 'tokyo-night' 
  | 'catppuccin' 
  | 'one-dark' 
  | 'solarized';

/**
 * Box border style.
 */
export type BoxBorder = 
  | 'single' 
  | 'double' 
  | 'rounded' 
  | 'bold' 
  | 'classic';

/**
 * Plugin options for gradientPlugin.
 */
export interface GradientPluginOptions {
  /**
   * Default number of steps for gradients.
   * @default 10
   */
  steps?: number;
}

/**
 * Plugin options for themePlugin.
 */
export interface ThemePluginOptions {
  /**
   * Theme preset to use.
   * @default 'monokai'
   */
  preset?: ThemePreset;
  
  /**
   * Custom theme colors.
   */
  custom?: Record<string, string>;
}

/**
 * Plugin options for boxPlugin.
 */
export interface BoxPluginOptions {
  /**
   * Default border style.
   * @default 'single'
   */
  border?: BoxBorder;
  
  /**
   * Default padding inside box.
   * @default 1
   */
  padding?: number;
}

/**
 * Ecosystem plugin for @oxog/log, @oxog/cli integration.
 */
export interface PigmentPluginOptions {
  /**
   * Theme preset for styled output.
   * @default 'monokai'
   */
  theme?: ThemePreset;
  
  /**
   * Override color level.
   */
  level?: 0 | 1 | 2 | 3;
}
```

---

## TECHNICAL REQUIREMENTS

| Requirement | Value |
|-------------|-------|
| Runtime | Universal (Node.js + Browser) |
| Module Format | ESM + CJS |
| Node.js | >= 18 |
| TypeScript | >= 5.0 |
| Bundle (core) | < 3KB gzipped |
| Bundle (all plugins) | < 12KB gzipped |

---

## PROJECT STRUCTURE

```
pigment/
├── .github/workflows/
│   ├── deploy.yml
│   └── publish.yml
├── src/
│   ├── index.ts                    # Main entry, public exports
│   ├── kernel.ts                   # Micro kernel implementation
│   ├── types.ts                    # Type definitions
│   ├── errors.ts                   # Custom error classes
│   ├── constants.ts                # ANSI codes, color values
│   ├── core/
│   │   ├── proxy.ts                # Proxy-based chaining
│   │   ├── composer.ts             # Function composition
│   │   ├── builder.ts              # Builder pattern
│   │   ├── styler.ts               # Style application
│   │   └── ansi.ts                 # ANSI escape code generation
│   ├── utils/
│   │   ├── environment.ts          # Environment detection
│   │   ├── color-support.ts        # Color level detection
│   │   ├── hex-to-rgb.ts           # Color conversion
│   │   ├── hsl-to-rgb.ts           # Color conversion
│   │   └── platform.ts             # Node/Browser detection
│   └── plugins/
│       ├── index.ts                # Plugin exports
│       ├── core/
│       │   ├── index.ts
│       │   ├── base-colors.ts      # 16 ANSI colors
│       │   ├── modifiers.ts        # Text modifiers
│       │   ├── ansi256.ts          # 256 color support
│       │   ├── true-color.ts       # RGB/HEX/HSL
│       │   ├── nesting.ts          # Nested styles
│       │   └── environment.ts      # NO_COLOR, FORCE_COLOR
│       ├── optional/
│       │   ├── index.ts
│       │   ├── gradient.ts         # Gradient text
│       │   ├── theme.ts            # Color themes
│       │   ├── semantic.ts         # success/error/warning/info
│       │   ├── box.ts              # Box drawing
│       │   └── template.ts         # Template literals
│       └── ecosystem/
│           ├── index.ts
│           └── pigment-plugin.ts   # For @oxog/log, @oxog/cli
├── tests/
│   ├── unit/
│   │   ├── kernel.test.ts
│   │   ├── proxy.test.ts
│   │   ├── composer.test.ts
│   │   ├── builder.test.ts
│   │   ├── ansi.test.ts
│   │   ├── colors.test.ts
│   │   ├── modifiers.test.ts
│   │   ├── environment.test.ts
│   │   └── plugins/
│   │       ├── gradient.test.ts
│   │       ├── theme.test.ts
│   │       ├── semantic.test.ts
│   │       ├── box.test.ts
│   │       └── template.test.ts
│   ├── integration/
│   │   ├── chalk-compat.test.ts    # Chalk compatibility tests
│   │   ├── browser.test.ts         # Browser environment tests
│   │   ├── nesting.test.ts         # Nested style tests
│   │   └── ecosystem.test.ts       # Plugin integration tests
│   └── fixtures/
│       └── ...
├── examples/
│   ├── 01-basic/
│   │   ├── minimal.ts
│   │   ├── all-colors.ts
│   │   ├── all-modifiers.ts
│   │   ├── chaining.ts
│   │   └── README.md
│   ├── 02-plugins/
│   │   ├── gradient.ts
│   │   ├── themes.ts
│   │   ├── semantic.ts
│   │   ├── box-drawing.ts
│   │   ├── template-literals.ts
│   │   └── README.md
│   ├── 03-error-handling/
│   │   ├── invalid-colors.ts
│   │   ├── no-color-env.ts
│   │   └── README.md
│   ├── 04-typescript/
│   │   ├── typed-themes.ts
│   │   ├── custom-plugin.ts
│   │   └── README.md
│   ├── 05-integrations/
│   │   ├── chalk-migration.ts
│   │   ├── with-oxog-log.ts
│   │   ├── with-oxog-cli.ts
│   │   └── README.md
│   └── 06-real-world/
│       ├── cli-app/
│       ├── log-formatter/
│       ├── progress-bar/
│       └── README.md
├── website/
│   ├── public/CNAME
│   └── src/
├── llms.txt
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── package.json
└── ...configs
```

---

## GITHUB WORKFLOWS

### deploy.yml (Website)

```yaml
name: Deploy Website

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run build
      - working-directory: ./website
        run: npm ci && npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './website/dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### publish.yml (npm)

```yaml
name: Publish to npm

on:
  push:
    tags: ['v*']

permissions:
  contents: read
  id-token: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run build
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## WEBSITE REQUIREMENTS

- React 19 + Vite 6 + Tailwind CSS v4
- @oxog/codeshine for syntax highlighting
- shadcn/ui components
- Lucide React icons
- JetBrains Mono + Inter fonts
- CNAME: pigment.oxog.dev
- Footer: "Made with ❤️ by Ersin KOÇ"
- GitHub link only (no social media)

### Special Website Features for Pigment

- **Interactive Color Picker**: Let users try colors in real-time
- **Theme Preview**: Show all theme presets side by side
- **ANSI Preview**: Show actual terminal output appearance
- **Chalk Migration Guide**: Side-by-side comparison with Chalk
- **Browser Console Demo**: Show how it works in browser DevTools

---

## OPTIONAL PLUGIN DETAILS

### gradientPlugin

Creates smooth color transitions between two colors.

```typescript
import { createPigment } from '@oxog/pigment';
import { gradientPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [gradientPlugin()]
});

// Linear gradient
pigment.gradient('red', 'blue')('Gradient text');
pigment.gradient('#FF0000', '#0000FF')('Hex gradient');
pigment.gradient([255, 0, 0], [0, 0, 255])('RGB gradient');

// Rainbow gradient (cycles through spectrum)
pigment.rainbow('Rainbow text');
```

### themePlugin

Predefined color themes for consistent styling.

```typescript
import { createPigment } from '@oxog/pigment';
import { themePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [themePlugin({ preset: 'monokai' })]
});

// Theme colors become available
pigment.theme.keyword('const');      // Orange
pigment.theme.string('"hello"');     // Yellow
pigment.theme.number('42');          // Purple
pigment.theme.comment('// note');    // Gray
pigment.theme.error('Error!');       // Red
pigment.theme.success('Done!');      // Green

// Available presets
// monokai, dracula, nord, github, vscode, tokyo-night, catppuccin, one-dark, solarized
```

### semanticPlugin

Semantic color names for common use cases.

```typescript
import { createPigment } from '@oxog/pigment';
import { semanticPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [semanticPlugin()]
});

pigment.success('✓ Task completed');    // Green
pigment.error('✗ Task failed');         // Red
pigment.warning('⚠ Check this');        // Yellow
pigment.info('ℹ Note');                 // Blue
pigment.debug('[DEBUG] value');         // Gray

// Customizable
pigment = createPigment({
  plugins: [semanticPlugin({
    success: '#00FF00',
    error: '#FF0000',
    warning: '#FFAA00',
    info: '#00AAFF',
    debug: '#888888'
  })]
});
```

### boxPlugin

Box drawing for framed content.

```typescript
import { createPigment } from '@oxog/pigment';
import { boxPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [boxPlugin()]
});

// Simple box
pigment.box('Hello World');
// ┌─────────────┐
// │ Hello World │
// └─────────────┘

// Styled box
pigment.box('Error!', { 
  border: 'double',
  borderColor: 'red',
  padding: 2
});
// ╔═══════════════╗
// ║               ║
// ║    Error!     ║
// ║               ║
// ╚═══════════════╝

// Border styles: single, double, rounded, bold, classic
```

### templatePlugin

Tagged template literal syntax for inline styling.

```typescript
import { createPigment } from '@oxog/pigment';
import { templatePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [templatePlugin()]
});

const name = 'World';
const count = 42;

// Tagged template
console.log(pigment`{red Error:} {bold ${name}} has {yellow ${count}} issues`);

// Nested styles
console.log(pigment`{bold.red CRITICAL:} {dim system failure}`);

// With variables
console.log(pigment`Status: {green.bold OK} | Count: {cyan ${count}}`);
```

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Create SPECIFICATION.md
- [ ] Create IMPLEMENTATION.md  
- [ ] Create TASKS.md

### During Implementation
- [ ] Follow TASKS.md sequentially
- [ ] Write tests with each feature
- [ ] Maintain 100% coverage
- [ ] JSDoc on every public API

### Core Features
- [ ] Proxy-based chaining API
- [ ] Function composition API
- [ ] Builder pattern API
- [ ] 16 base colors + bright variants
- [ ] Background colors
- [ ] Text modifiers (bold, italic, underline, etc.)
- [ ] 256 color support
- [ ] RGB/HEX/HSL color support
- [ ] Nested style support
- [ ] Environment detection (NO_COLOR, FORCE_COLOR, TTY)
- [ ] Browser console support (%c styling)
- [ ] Chalk drop-in compatibility

### Plugins
- [ ] gradientPlugin - smooth color gradients
- [ ] themePlugin - predefined color themes
- [ ] semanticPlugin - success/error/warning/info
- [ ] boxPlugin - box drawing
- [ ] templatePlugin - tagged template literals
- [ ] pigmentPlugin - ecosystem export

### Package Completion
- [ ] All tests passing (100%)
- [ ] Coverage at 100%
- [ ] No TypeScript errors
- [ ] Package builds
- [ ] ESM + CJS outputs work

### LLM-Native Completion
- [ ] llms.txt created (< 2000 tokens)
- [ ] README optimized
- [ ] 15+ examples
- [ ] 8-12 npm keywords

### Website Completion
- [ ] All pages implemented
- [ ] @oxog/codeshine integrated
- [ ] Dark/Light theme
- [ ] CNAME configured
- [ ] Interactive color picker
- [ ] Theme preview
- [ ] Chalk migration guide

### Final
- [ ] `npm run build` succeeds
- [ ] `npm run test:coverage` shows 100%
- [ ] Website builds
- [ ] All examples run
- [ ] Chalk compatibility verified

---

## CHALK COMPATIBILITY REFERENCE

Pigment must support all Chalk v5 features:

```typescript
// All Chalk styles must work
chalk.red('text')           ✓
chalk.bold('text')          ✓
chalk.red.bold('text')      ✓
chalk.rgb(255, 136, 0)      ✓
chalk.hex('#FF8800')        ✓
chalk.ansi256(196)          ✓
chalk.bgRed('text')         ✓
chalk.visible('text')       ✓  // Shows if color supported
chalk.level                 ✓  // 0-3

// Instance creation
new Chalk({ level: 2 })     ✓
chalk.supportsColor         ✓

// Template literals (via templatePlugin)
chalk`{red text}`           ✓ (with plugin)
```

---

## npm KEYWORDS

```json
{
  "keywords": [
    "chalk",
    "colors", 
    "terminal",
    "console",
    "ansi",
    "styling",
    "cli",
    "zero-dependency",
    "typescript",
    "plugin",
    "micro-kernel",
    "oxog"
  ]
}
```

---

## BEGIN IMPLEMENTATION

Start with **SPECIFICATION.md**, then **IMPLEMENTATION.md**, then **TASKS.md**.

Only after all three documents are complete, implement code following TASKS.md sequentially.

**Remember:**
- Production-ready for npm publish
- Zero dependencies (implement everything from scratch)
- 100% test coverage
- Chalk drop-in compatibility
- Universal (Node.js + Browser)
- LLM-native design
- Beautiful documentation website
