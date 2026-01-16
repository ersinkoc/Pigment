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

**One-line:** Terminal styling with micro-kernel plugin architecture, Chalk compatibility, and full @oxog ecosystem integration.

Pigment is a modern, universal terminal styling library that works in Node.js and browsers. Built on @oxog/plugin's micro-kernel architecture, it features a powerful plugin system for extensibility. Use it standalone or integrate as a plugin into other @oxog packages like @oxog/log or @oxog/cli. Drop-in Chalk replacement with zero external dependencies.

---

## @oxog Dependencies

This package uses the following @oxog packages:

### @oxog/types

Provides the core type definitions:
- `Plugin<TContext>` - Plugin interface
- `Kernel<TContext>` - Kernel interface
- `MaybePromise` - Sync/async return type
- `Unsubscribe` - Cleanup function type

```typescript
import type { Plugin, Kernel, MaybePromise } from '@oxog/types';
```

### @oxog/plugin

Provides the micro-kernel implementation:
- `createKernel()` - Kernel factory
- `definePlugin()` - Plugin factory helper
- Lifecycle management (install → init → destroy)
- Event bus for plugin communication

```typescript
import { createKernel, definePlugin } from '@oxog/plugin';
```

---

## NON-NEGOTIABLE RULES

### 1. DEPENDENCY POLICY

```json
{
  "dependencies": {
    "@oxog/types": "^1.0.0",
    "@oxog/plugin": "^1.0.0"
  }
}
```

- ONLY `@oxog/*` packages allowed as runtime dependencies
- NO external packages (chalk, ansi-colors, picocolors, etc.)
- Implement color/ANSI functionality from scratch

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

### 3. USE @oxog/plugin KERNEL

**CRITICAL**: Use `@oxog/plugin` for micro-kernel — DO NOT implement your own kernel!

```typescript
import { createKernel } from '@oxog/plugin';
import type { Plugin } from '@oxog/types';

// Pigment uses the ecosystem kernel
export function createPigment(options?: PigmentOptions) {
  const kernel = createKernel<PigmentContext>({
    context: { /* pigment-specific context */ }
  });
  
  // Register core plugins
  kernel.use(baseColorsPlugin);
  kernel.use(modifiersPlugin);
  // ...
  
  return kernel;
}
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

### 1. createPigment() Factory

Create a pigment instance using @oxog/plugin kernel.

```typescript
import { createPigment } from '@oxog/pigment';

// Simple usage (all core plugins auto-loaded)
const pigment = createPigment();
console.log(pigment.red.bold('Error!'));

// With configuration
const pigment = createPigment({
  level: 3,           // Color level (0-3)
  enabled: true,      // Enable/disable colors
});

// With optional plugins
import { gradientPlugin, themePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [
    gradientPlugin(),
    themePlugin({ preset: 'monokai' })
  ]
});
```

### 2. Proxy-Based Chaining API (Primary)

Chalk-style method chaining using JavaScript Proxy.

```typescript
import { pigment } from '@oxog/pigment';

// Chain styles naturally
pigment.bold.red('Error!');
pigment.italic.blue.bgWhite('Info');
pigment.underline.yellow('Warning');

// Nested styles
pigment.red(`Error: ${pigment.bold('critical')} issue`);

// Combine many styles
pigment.bold.italic.underline.bgRed.white('ALERT');
```

### 3. Function Composition API (Alternative)

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

### 4. Chalk Drop-in Compatibility

Default export is 100% Chalk-compatible.

```typescript
// Before (Chalk)
import chalk from 'chalk';
console.log(chalk.red.bold('Error'));

// After (Pigment) - just change import
import chalk from '@oxog/pigment';
console.log(chalk.red.bold('Error'));

// Instance creation (Chalk-compatible)
import { Pigment } from '@oxog/pigment';
const custom = new Pigment({ level: 2 });
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

// Background colors
pigment.bgRed('text');
pigment.bgGreen('text');
pigment.bgBlue('text');
pigment.bgRedBright('text');
// ... all 16 colors
```

### 6. Text Modifiers

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

### 7. 256 Color Support (Core Plugin)

Extended color palette.

```typescript
// By index (0-255)
pigment.ansi256(196)('Bright red');
pigment.bgAnsi256(21)('Blue background');
```

### 8. RGB/HEX/HSL Color Support (Core Plugin)

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

### 9. Environment Detection

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

### 10. Universal Runtime

Works seamlessly in Node.js and browsers.

```typescript
import { pigment } from '@oxog/pigment';

// Same API, different output
pigment.red.bold('Works everywhere!');

// Node.js output: \x1b[1m\x1b[31mWorks everywhere!\x1b[0m
// Browser output: %c styled via console CSS
```

---

## PLUGIN SYSTEM

### Using @oxog/plugin Interface

All plugins follow the standard @oxog/plugin interface:

```typescript
import type { Plugin } from '@oxog/types';
import { definePlugin } from '@oxog/plugin';

interface PigmentContext {
  level: number;
  enabled: boolean;
  styles: Map<string, StyleFunction>;
}

// Define a plugin using ecosystem helper
export const myColorPlugin = definePlugin<PigmentContext>(() => ({
  name: 'my-color',
  version: '1.0.0',
  
  install(kernel) {
    const ctx = kernel.getContext();
    
    // Add custom color
    ctx.styles.set('coral', (text) => `\x1b[38;2;255;127;80m${text}\x1b[0m`);
    
    // Listen to kernel events
    kernel.on('style:apply', ({ name, text }) => {
      console.log(`Applying ${name} to "${text}"`);
    });
  },
  
  onInit(context) {
    console.log('Color plugin initialized with level:', context.level);
  },
  
  onDestroy() {
    console.log('Color plugin destroyed');
  }
}));
```

### Core Plugins (Always Loaded)

| Plugin | Description |
|--------|-------------|
| `baseColorsPlugin` | 16 base ANSI colors + bright variants |
| `bgColorsPlugin` | Background colors |
| `modifiersPlugin` | bold, dim, italic, underline, strikethrough, inverse, hidden |
| `ansi256Plugin` | 256-color palette support |
| `trueColorPlugin` | RGB, HEX, HSL color support |
| `nestingPlugin` | Nested/composed style support |
| `environmentPlugin` | NO_COLOR, FORCE_COLOR, TTY detection |

### Optional Plugins (Opt-in)

| Plugin | Description |
|--------|-------------|
| `gradientPlugin` | Smooth color gradients between two colors |
| `themePlugin` | Predefined color themes (monokai, dracula, nord, etc.) |
| `semanticPlugin` | Semantic colors (success, error, warning, info, debug) |
| `boxPlugin` | Box drawing with borders |
| `templatePlugin` | Tagged template literal syntax |

### Exported Plugins (For Ecosystem)

Pigment exports a plugin for other @oxog packages:

```typescript
// In @oxog/log or @oxog/cli
import { pigmentPlugin } from '@oxog/pigment/plugins';

const log = createLogger();
log.use(pigmentPlugin()); // Adds color support to logger
```

---

## API DESIGN

### Main Exports

```typescript
// Factory function
export function createPigment(options?: PigmentOptions): PigmentInstance;

// Default instance (singleton)
export const pigment: PigmentInstance;

// Chalk-compatible class
export class Pigment implements PigmentInstance {
  constructor(options?: PigmentOptions);
}

// Function composition
export function compose(...styles: StyleFunction[]): StyleFunction;

// Individual style functions (tree-shakeable)
export { bold, dim, italic, underline, strikethrough } from './styles/modifiers';
export { red, green, blue, yellow, /* ... */ } from './styles/colors';
export { bgRed, bgGreen, bgBlue, /* ... */ } from './styles/backgrounds';
export { rgb, hex, hsl, ansi256 } from './styles/extended';

// Environment detection
export const supportsColor: ColorSupport;

// Type re-exports
export type { Plugin } from '@oxog/types';
```

### Type Definitions

```typescript
import type { Plugin, Kernel } from '@oxog/types';

/**
 * Color support levels.
 */
export enum ColorLevel {
  None = 0,      // No colors
  Basic = 1,     // 16 colors
  Ansi256 = 2,   // 256 colors
  TrueColor = 3  // 16 million colors
}

/**
 * Pigment configuration options.
 */
export interface PigmentOptions {
  /** Color level (0-3), auto-detected if not specified */
  level?: ColorLevel;
  
  /** Enable/disable colors globally */
  enabled?: boolean;
  
  /** Additional plugins to load */
  plugins?: Plugin<PigmentContext>[];
}

/**
 * Pigment context shared between plugins.
 */
export interface PigmentContext {
  /** Current color level */
  level: ColorLevel;
  
  /** Whether colors are enabled */
  enabled: boolean;
  
  /** Registered style functions */
  styles: Map<string, StyleFunction>;
  
  /** ANSI escape code generator */
  ansi: AnsiGenerator;
}

/**
 * Style function type.
 */
export type StyleFunction = {
  (text: string): string;
  open: string;
  close: string;
};

/**
 * Color support information.
 */
export interface ColorSupport {
  level: ColorLevel;
  hasBasic: boolean;
  has256: boolean;
  has16m: boolean;
}

/**
 * Pigment instance with chainable API.
 */
export interface PigmentInstance extends Kernel<PigmentContext> {
  // Modifiers
  bold: PigmentInstance & StyleFunction;
  dim: PigmentInstance & StyleFunction;
  italic: PigmentInstance & StyleFunction;
  underline: PigmentInstance & StyleFunction;
  strikethrough: PigmentInstance & StyleFunction;
  inverse: PigmentInstance & StyleFunction;
  hidden: PigmentInstance & StyleFunction;
  visible: PigmentInstance & StyleFunction;
  reset: PigmentInstance & StyleFunction;
  
  // Base colors
  black: PigmentInstance & StyleFunction;
  red: PigmentInstance & StyleFunction;
  green: PigmentInstance & StyleFunction;
  yellow: PigmentInstance & StyleFunction;
  blue: PigmentInstance & StyleFunction;
  magenta: PigmentInstance & StyleFunction;
  cyan: PigmentInstance & StyleFunction;
  white: PigmentInstance & StyleFunction;
  
  // Bright colors
  blackBright: PigmentInstance & StyleFunction;
  redBright: PigmentInstance & StyleFunction;
  // ... etc
  gray: PigmentInstance & StyleFunction; // alias for blackBright
  grey: PigmentInstance & StyleFunction; // alias for blackBright
  
  // Background colors
  bgBlack: PigmentInstance & StyleFunction;
  bgRed: PigmentInstance & StyleFunction;
  // ... etc
  
  // Extended colors
  rgb(r: number, g: number, b: number): PigmentInstance & StyleFunction;
  bgRgb(r: number, g: number, b: number): PigmentInstance & StyleFunction;
  hex(color: string): PigmentInstance & StyleFunction;
  bgHex(color: string): PigmentInstance & StyleFunction;
  hsl(h: number, s: number, l: number): PigmentInstance & StyleFunction;
  bgHsl(h: number, s: number, l: number): PigmentInstance & StyleFunction;
  ansi256(code: number): PigmentInstance & StyleFunction;
  bgAnsi256(code: number): PigmentInstance & StyleFunction;
  
  // Chalk compatibility
  level: ColorLevel;
  enabled: boolean;
}
```

---

## INTERNAL ARCHITECTURE

### Core Modules

```
src/
├── index.ts              # Public exports
├── pigment.ts            # createPigment factory
├── proxy.ts              # Proxy-based chaining
├── ansi.ts               # ANSI escape code generation
├── detect.ts             # Environment detection
├── plugins/
│   ├── index.ts          # Plugin exports
│   ├── core/
│   │   ├── base-colors.ts
│   │   ├── bg-colors.ts
│   │   ├── modifiers.ts
│   │   ├── ansi256.ts
│   │   ├── true-color.ts
│   │   ├── nesting.ts
│   │   └── environment.ts
│   └── optional/
│       ├── gradient.ts
│       ├── theme.ts
│       ├── semantic.ts
│       ├── box.ts
│       └── template.ts
├── styles/               # Tree-shakeable functions
│   ├── modifiers.ts
│   ├── colors.ts
│   ├── backgrounds.ts
│   └── extended.ts
└── types.ts              # Internal types
```

### Using @oxog/plugin Kernel

```typescript
// src/pigment.ts
import { createKernel } from '@oxog/plugin';
import type { Plugin } from '@oxog/types';
import { baseColorsPlugin, modifiersPlugin, /* ... */ } from './plugins/core';
import { createProxy } from './proxy';
import { detectColorLevel } from './detect';

export function createPigment(options: PigmentOptions = {}): PigmentInstance {
  const level = options.level ?? detectColorLevel();
  const enabled = options.enabled ?? level > 0;
  
  // Create kernel using @oxog/plugin
  const kernel = createKernel<PigmentContext>({
    context: {
      level,
      enabled,
      styles: new Map(),
      ansi: createAnsiGenerator(level)
    }
  });
  
  // Register core plugins
  kernel.use(baseColorsPlugin);
  kernel.use(bgColorsPlugin);
  kernel.use(modifiersPlugin);
  kernel.use(ansi256Plugin);
  kernel.use(trueColorPlugin);
  kernel.use(nestingPlugin);
  kernel.use(environmentPlugin);
  
  // Register optional plugins
  if (options.plugins) {
    for (const plugin of options.plugins) {
      kernel.use(plugin);
    }
  }
  
  // Initialize kernel
  kernel.init();
  
  // Wrap with Proxy for chainable API
  return createProxy(kernel);
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
| Bundle (core) | < 5KB gzipped |
| Bundle (all plugins) | < 10KB gzipped |

---

## PROJECT STRUCTURE

```
pigment/
├── .github/workflows/
│   ├── deploy.yml
│   └── publish.yml
├── src/
│   ├── index.ts
│   ├── pigment.ts
│   ├── proxy.ts
│   ├── ansi.ts
│   ├── detect.ts
│   ├── types.ts
│   ├── plugins/
│   │   ├── index.ts
│   │   ├── core/
│   │   │   ├── index.ts
│   │   │   ├── base-colors.ts
│   │   │   ├── bg-colors.ts
│   │   │   ├── modifiers.ts
│   │   │   ├── ansi256.ts
│   │   │   ├── true-color.ts
│   │   │   ├── nesting.ts
│   │   │   └── environment.ts
│   │   └── optional/
│   │       ├── index.ts
│   │       ├── gradient.ts
│   │       ├── theme.ts
│   │       ├── semantic.ts
│   │       ├── box.ts
│   │       └── template.ts
│   └── styles/
│       ├── modifiers.ts
│       ├── colors.ts
│       ├── backgrounds.ts
│       └── extended.ts
├── tests/
│   ├── unit/
│   │   ├── pigment.test.ts
│   │   ├── proxy.test.ts
│   │   ├── ansi.test.ts
│   │   ├── detect.test.ts
│   │   └── plugins/
│   ├── integration/
│   │   ├── chaining.test.ts
│   │   ├── chalk-compat.test.ts
│   │   └── browser.test.ts
│   └── fixtures/
├── examples/
│   ├── 01-basic-colors/
│   ├── 02-chaining/
│   ├── 03-composition/
│   ├── 04-extended-colors/
│   ├── 05-gradients/
│   ├── 06-themes/
│   ├── 07-semantic/
│   ├── 08-boxes/
│   ├── 09-templates/
│   ├── 10-chalk-migration/
│   ├── 11-environment/
│   ├── 12-browser/
│   ├── 13-custom-plugin/
│   ├── 14-ecosystem-integration/
│   └── 15-real-world/
├── website/
│   ├── public/CNAME
│   └── src/
├── llms.txt
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── .prettierrc
├── eslint.config.js
└── .gitignore
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

### Special Website Features

- **Interactive Color Picker**: Try colors in real-time
- **Theme Preview**: Show all theme presets
- **ANSI Preview**: Show terminal output appearance
- **Chalk Migration Guide**: Side-by-side comparison
- **Browser Console Demo**: Show browser DevTools styling

---

## OPTIONAL PLUGIN DETAILS

### gradientPlugin

```typescript
import { createPigment } from '@oxog/pigment';
import { gradientPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [gradientPlugin()]
});

pigment.gradient('red', 'blue')('Gradient text');
pigment.rainbow('Rainbow text');
```

### themePlugin

```typescript
import { createPigment } from '@oxog/pigment';
import { themePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [themePlugin({ preset: 'monokai' })]
});

pigment.theme.keyword('const');
pigment.theme.string('"hello"');
pigment.theme.error('Error!');

// Presets: monokai, dracula, nord, github, vscode, tokyo-night, catppuccin, one-dark, solarized
```

### semanticPlugin

```typescript
import { createPigment } from '@oxog/pigment';
import { semanticPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [semanticPlugin()]
});

pigment.success('✓ Task completed');
pigment.error('✗ Task failed');
pigment.warning('⚠ Check this');
pigment.info('ℹ Note');
pigment.debug('[DEBUG] value');
```

### boxPlugin

```typescript
import { createPigment } from '@oxog/pigment';
import { boxPlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [boxPlugin()]
});

pigment.box('Hello World');
// ┌─────────────┐
// │ Hello World │
// └─────────────┘

pigment.box('Error!', { border: 'double', borderColor: 'red' });
```

### templatePlugin

```typescript
import { createPigment } from '@oxog/pigment';
import { templatePlugin } from '@oxog/pigment/plugins';

const pigment = createPigment({
  plugins: [templatePlugin()]
});

console.log(pigment`{red Error:} {bold ${name}} has {yellow ${count}} issues`);
```

---

## ECOSYSTEM INTEGRATION

### Exporting pigmentPlugin for Other Packages

```typescript
// src/plugins/ecosystem/pigment-plugin.ts
import type { Plugin } from '@oxog/types';
import { createPigment } from '../pigment';

export interface PigmentPluginOptions {
  level?: number;
  enabled?: boolean;
}

/**
 * Plugin that adds Pigment color support to any @oxog kernel.
 * Use this in @oxog/log, @oxog/cli, etc.
 */
export function pigmentPlugin(options?: PigmentPluginOptions): Plugin {
  return {
    name: 'pigment',
    version: '1.0.0',
    
    install(kernel) {
      const pigment = createPigment(options);
      
      // Extend kernel with pigment instance
      kernel.pigment = pigment;
      
      // Add color helpers to context
      const ctx = kernel.getContext();
      if (ctx) {
        ctx.colors = {
          red: pigment.red,
          green: pigment.green,
          yellow: pigment.yellow,
          blue: pigment.blue,
          // ... etc
        };
      }
    }
  };
}
```

### Usage in @oxog/log

```typescript
// In @oxog/log
import { createKernel } from '@oxog/plugin';
import { pigmentPlugin } from '@oxog/pigment/plugins';

const log = createKernel<LogContext>();
log.use(pigmentPlugin({ level: 3 }));

// Now log has access to colors
log.pigment.red('Error message');
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
- [ ] Use @oxog/plugin kernel (NOT custom kernel)
- [ ] Proxy-based chaining API
- [ ] Function composition API
- [ ] 16 base colors + bright variants
- [ ] Background colors
- [ ] Text modifiers
- [ ] 256 color support
- [ ] RGB/HEX/HSL support
- [ ] Nested style support
- [ ] Environment detection
- [ ] Browser console support
- [ ] Chalk drop-in compatibility

### Plugins
- [ ] Core plugins (auto-loaded)
- [ ] gradientPlugin
- [ ] themePlugin
- [ ] semanticPlugin
- [ ] boxPlugin
- [ ] templatePlugin
- [ ] pigmentPlugin (ecosystem export)

### Package Completion
- [ ] All tests passing (100%)
- [ ] Coverage at 100%
- [ ] No TypeScript errors
- [ ] Package builds
- [ ] ESM + CJS outputs work

### Final
- [ ] `npm run build` succeeds
- [ ] `npm run test:coverage` shows 100%
- [ ] Website builds
- [ ] Chalk compatibility verified
- [ ] Ecosystem integration tested

---

## CHALK COMPATIBILITY REFERENCE

```typescript
// All Chalk styles must work
chalk.red('text')           ✓
chalk.bold('text')          ✓
chalk.red.bold('text')      ✓
chalk.rgb(255, 136, 0)      ✓
chalk.hex('#FF8800')        ✓
chalk.ansi256(196)          ✓
chalk.bgRed('text')         ✓
chalk.visible('text')       ✓
chalk.level                 ✓

// Instance creation
new Chalk({ level: 2 })     ✓ (via new Pigment())
chalk.supportsColor         ✓

// Template literals (via templatePlugin)
chalk`{red text}`           ✓ (with plugin)
```

---

## BEGIN IMPLEMENTATION

Start with **SPECIFICATION.md**, then **IMPLEMENTATION.md**, then **TASKS.md**.

Only after all three documents are complete, implement code following TASKS.md sequentially.

**Remember:**
- Production-ready for npm publish
- Use @oxog/types and @oxog/plugin (DON'T implement own kernel)
- 100% test coverage
- Chalk drop-in compatibility
- Universal (Node.js + Browser)
- LLM-native design
- Beautiful documentation website
