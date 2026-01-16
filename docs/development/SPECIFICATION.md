# Pigment Technical Specification

## 1. Overview

Pigment is a zero-dependency terminal styling library with micro-kernel architecture and Chalk drop-in compatibility. It provides multiple API styles (proxy chaining, function composition, builder pattern) and works in both Node.js and browsers.

### 1.1 Core Principles

- **Zero Dependencies**: No external packages, all functionality implemented from scratch
- **Universal Runtime**: Works in Node.js (ANSI) and browsers (CSS %c styling)
- **Micro-Kernel Architecture**: Plugin-based extensibility
- **Chalk Compatibility**: Drop-in replacement for Chalk v5
- **100% Test Coverage**: Every line, branch, and function tested
- **LLM-Native**: Optimized for AI assistants with predictable API naming

### 1.2 Design Goals

| Priority | Goal | Rationale |
|----------|------|-----------|
| P0 | Zero dependencies | Foundation ecosystem package |
| P0 | Chalk compatibility | Easy migration path |
| P1 | Universal runtime | Works everywhere |
| P1 | Plugin system | Extensibility for ecosystem |
| P2 | Multiple API styles | Developer preferences |
| P2 | Performance < 3KB | Minimal bundle size |

## 2. API Specifications

### 2.1 Primary API: Proxy-Based Chaining

```typescript
interface Pigment {
  // Text modifiers (properties return chainable instance)
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
  gray: Pigment;  // alias
  grey: Pigment;  // alias

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

  // Function call to apply styling
  (text: string): string;
}
```

**Behavior**: Each property access creates a new chainable instance. When called as a function, it applies accumulated styles to text.

**Example**: `pigment.bold.red('text')` returns styled string.

### 2.2 Alternative API: Function Composition

```typescript
type Styler = (text: string) => string;

// Individual style functions
export const bold: Styler;
export const red: Styler;
export const italic: Styler;
// ... all modifiers and colors

// Composition function
export const compose(...stylers: Styler[]): Styler;
```

**Behavior**: Returns a function that applies all styles in order. Styles are applied left-to-right.

**Example**: `const error = compose(bold, red); error('text')`

### 2.3 Alternative API: Builder Pattern

```typescript
interface PigmentBuilder {
  bold(): PigmentBuilder;
  red(): PigmentBuilder;
  // ... all modifier and color methods

  paint(text: string): string;
}
```

**Behavior**: Methods chain and return builder. `paint()` applies styles and returns styled string.

**Example**: `createPigment().bold().red().paint('text')`

### 2.4 Chalk-Compatible API

```typescript
// Default export is Chalk-compatible
import chalk from '@oxog/pigment';

// All Chalk v5 features work
chalk.red('text');
chalk.bold.red('text');
chalk.rgb(255, 0, 0)('text');
chalk.level; // 0-3
chalk.supportsColor; // ColorSupport object
new Chalk({ level: 2 }); // Instance creation
```

## 3. Plugin System Specification

### 3.1 Plugin Interface

```typescript
interface Plugin<TContext = unknown> {
  name: string;
  version: string;
  dependencies?: string[];
  install(kernel: PigmentKernel<TContext>): void;
  onInit?(context: TContext): void | Promise<void>;
  onDestroy?(): void | Promise<void>;
  onError?(error: Error): void;
}
```

### 3.2 Kernel API

```typescript
interface PigmentKernel<TContext = unknown> {
  // Plugin management
  use(plugin: Plugin<TContext>): PigmentKernel<TContext>;
  register(plugin: Plugin<TContext>): void;
  unregister(name: string): void;
  list(): Plugin<TContext>[];

  // Event system
  on(event: string, handler: Function): void;
  emit(event: string, data: unknown): void;

  // Context access
  getContext(): TContext;
  setContext(context: Partial<TContext>): void;
}
```

### 3.3 Plugin Categories

#### Core Plugins (Always Loaded)

1. **baseColorsPlugin**: 16 ANSI colors (8 standard + 8 bright)
2. **modifiersPlugin**: Text modifiers (bold, dim, italic, etc.)
3. **ansi256Plugin**: 256-color palette support
4. **trueColorPlugin**: RGB, HEX, HSL color support
5. **nestingPlugin**: Nested/composed style support
6. **environmentPlugin**: NO_COLOR, FORCE_COLOR, TTY detection

#### Optional Plugins (Opt-in)

1. **gradientPlugin**: Smooth color gradients
2. **themePlugin**: Predefined color themes
3. **semanticPlugin**: Semantic colors (success, error, warning, info, debug)
4. **boxPlugin**: Box drawing with borders
5. **templatePlugin**: Tagged template literal syntax

#### Ecosystem Plugin

1. **pigmentPlugin**: Integration plugin for @oxog packages

## 4. Color System Specification

### 4.1 Color Levels

| Level | Name | Capabilities |
|-------|------|--------------|
| 0 | None | No colors |
| 1 | Basic | 16 colors |
| 2 | 256 | 256 colors |
| 3 | TrueColor | RGB/HEX/HSL (16.7M colors) |

### 4.2 16 Base Colors

```
Standard (0-7): black, red, green, yellow, blue, magenta, cyan, white
Bright (8-15): blackBright, redBright, greenBright, yellowBright,
               blueBright, magentaBright, cyanBright, whiteBright
```

**ANSI Codes**:
- Standard foreground: `30-37`
- Bright foreground: `90-97`
- Standard background: `40-47`
- Bright background: `100-107`

### 4.3 256 Color Mode

- **0-7**: Standard colors (same as 16-color mode)
- **8-15**: High intensity colors
- **16-231**: 6×6×6 RGB cube (r×36 + g×6 + b + 16)
- **232-255**: Grayscale (24 shades)

**Escape Code**: `\x1b[38;5;{code}m` (foreground), `\x1b[48;5;{code}m` (background)

### 4.4 TrueColor Mode (RGB)

**Escape Code**: `\x1b[38;2;{r};{g};{b}m` (foreground), `\x1b[48;2;{r};{g};{b}m` (background)

**Color Conversions**:
- HEX to RGB: Parse `#RRGGBB` to (r, g, b)
- HSL to RGB: Convert using standard formulas
- Clamp values to 0-255 range

### 4.5 Text Modifiers

| Modifier | ANSI Code | Reset |
|----------|-----------|-------|
| bold | `\x1b[1m` | `\x1b[22m` |
| dim | `\x1b[2m` | `\x1b[22m` |
| italic | `\x1b[3m` | `\x1b[23m` |
| underline | `\x1b[4m` | `\x1b[24m` |
| strikethrough | `\x1b[9m` | `\x1b[29m` |
| inverse | `\x1b[7m` | `\x1b[27m` |
| hidden | `\x1b[8m` | `\x1b[28m` |
| reset | `\x1b[0m` | - |

## 5. Environment Detection Specification

### 5.1 Detection Order

1. Check `NO_COLOR` environment variable → level 0
2. Check `FORCE_COLOR` environment variable → use value (0-3)
3. Detect CI environment → level 1
4. Check TTY → if false, level 0
5. Check `TERM` environment variable
6. Detect terminal emulator capabilities
7. Default to level 1 (basic 16 colors)

### 5.2 Environment Variables

| Variable | Format | Effect |
|----------|--------|--------|
| `NO_COLOR` | Any value | Disables all colors (level 0) |
| `FORCE_COLOR` | 0, 1, 2, 3 | Forces specified color level |
| `TERM` | e.g., `xterm-256color` | Used for capability detection |

### 5.3 Platform Detection

```typescript
interface Platform {
  isNode: boolean;
  isBrowser: boolean;
  isWindows: boolean;
  isCI: boolean;
  hasTTY: boolean;
}
```

## 6. Runtime Specification

### 6.1 Node.js Runtime

- Output: ANSI escape codes
- Supports all color levels
- TTY detection via `process.stdout.isTTY`
- Environment variable access via `process.env`

### 6.2 Browser Runtime

- Output: CSS `%c` styling via `console.log`
- Mapping: ANSI colors → CSS colors
- Modifiers: CSS properties (font-weight, font-style, text-decoration)
- No TTY detection (always enabled)
- `NO_COLOR` via `localStorage` or query param

### 6.3 Browser Color Mapping

```typescript
const ansiToCss: Record<number, string> = {
  30: '#000000', // black
  31: '#cd3131', // red
  32: '#0dbc79', // green
  33: '#e5e510', // yellow
  34: '#2472c8', // blue
  35: '#bc3fbc', // magenta
  36: '#11a8cd', // cyan
  37: '#e5e5e5', // white
  // ... bright variants
};
```

## 7. Chalk Compatibility Specification

### 7.1 Required Compatibility

All Chalk v5 public APIs must work:

```typescript
// Color methods
chalk.red('text');
chalk.hex('#FF0000')('text');
chalk.rgb(255, 0, 0)('text');
chalk.ansi256(196)('text');

// Modifier methods
chalk.bold('text');
chalk.italic('text');

// Chaining
chalk.red.bold('text');
chalk.bold.underline('text');

// Level property
chalk.level; // 0-3

// supportsColor
chalk.supportsColor; // ColorSupport object

// Instance creation
new Chalk({ level: 2 });
```

### 7.2 Behavior Differences (Allowed)

- Plugin system not present in Chalk
- Additional optional plugins (gradient, theme, etc.)
- Different bundle size (smaller)
- Browser support (Chalk is Node-only)

## 8. Performance Requirements

### 8.1 Bundle Size

| Configuration | Target | Rationale |
|---------------|--------|-----------|
| Core (no plugins) | < 3KB gzipped | Foundation size |
| All plugins | < 12KB gzipped | Full feature set |
| Tree-shakeable | Yes | Function composition API |

### 8.2 Runtime Performance

- Proxy overhead: Minimal (single proxy per instance)
- Style application: O(n) where n = number of style codes
- Color conversion: O(1) for all formats
- Memory: No permanent allocations per call

## 9. Testing Requirements

### 9.1 Coverage

- **Line Coverage**: 100%
- **Branch Coverage**: 100%
- **Function Coverage**: 100%
- **Statement Coverage**: 100%

### 9.2 Test Categories

1. **Unit Tests**: Individual functions and methods
2. **Integration Tests**: API composition and chaining
3. **Platform Tests**: Node.js and browser behavior
4. **Compatibility Tests**: Chalk API compatibility
5. **Performance Tests**: Bundle size and runtime

### 9.3 Test Framework

- **Framework**: Vitest
- **Coverage**: @vitest/coverage-v8
- **Thresholds**: Enforced in vitest.config.ts

## 10. Build Requirements

### 10.1 Output Formats

- **ESM**: `dist/index.mjs` (modern, default)
- **CJS**: `dist/index.js` (Node.js legacy)
- **Types**: `dist/index.d.ts` (TypeScript)

### 10.2 Build Tool

- **Tool**: tsup (esbuild-based)
- **Minification**: Enabled for production
- **Source Maps**: Generated

## 11. TypeScript Configuration

### 11.1 Strict Mode

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

### 11.2 Type Safety

- All public APIs must have TypeScript types
- No `any` types in public API
- Generic types properly constrained
- JSDoc comments with examples

## 12. LLM-Native Requirements

### 12.1 API Naming

- Predictable: No abbreviations unless standard
- Consistent: Same naming across all APIs
- Self-documenting: Names describe function
- Standard: Follow TypeScript/JavaScript conventions

### 12.2 Documentation

- **llms.txt**: < 2000 tokens, LLM-optimized
- **README**: Optimized for LLM comprehension
- **JSDoc**: Every public function with @example
- **Examples**: Minimum 15 working examples

## 13. Security Requirements

### 13.1 Input Validation

- Color codes validated (0-255 for ansi256, 0-255 for RGB)
- HEX color format validation
- HSL value clamping (h: 0-360, s/l: 0-100)

### 13.2 Error Handling

- Custom error classes
- No silent failures
- Graceful degradation on unsupported features
- Error boundaries in plugin system

## 14. Optional Plugins Specification

### 14.1 gradientPlugin

```typescript
interface GradientPluginOptions {
  steps?: number; // default: 10
}

// API
pigment.gradient(start, end)('text'); // linear gradient
pigment.rainbow('text'); // spectrum gradient
```

### 14.2 themePlugin

```typescript
type ThemePreset = 'monokai' | 'dracula' | 'nord' | 'github' | 'vscode' |
                   'tokyo-night' | 'catppuccin' | 'one-dark' | 'solarized';

// API
pigment.theme.keyword('const');
pigment.theme.string('"text"');
pigment.theme.error('Error');
```

### 14.3 semanticPlugin

```typescript
// API
pigment.success('✓ Done');
pigment.error('✗ Failed');
pigment.warning('⚠ Warning');
pigment.info('ℹ Info');
pigment.debug('[DEBUG] msg');
```

### 14.4 boxPlugin

```typescript
type BoxBorder = 'single' | 'double' | 'rounded' | 'bold' | 'classic';

// API
pigment.box('text', { border: 'double', padding: 2 });
```

### 14.5 templatePlugin

```typescript
// API
pigment`{red Error:} {bold ${var}} {yellow text}`;
```

## 15. Ecosystem Integration Specification

### 15.1 pigmentPlugin

Integration plugin for @oxog packages:

```typescript
interface PigmentPluginOptions {
  theme?: ThemePreset;
  level?: 0 | 1 | 2 | 3;
}

// Usage in @oxog/log
log.use(pigmentPlugin({ theme: 'monokai' }));
log.info('Styled message');
```

### 15.2 Export Structure

```typescript
// Main exports
export { pigment, createPigment };
export { compose, bold, red, /* ... */ };
export default pigment; // Chalk-compatible

// Plugin exports
export { baseColorsPlugin, modifiersPlugin, /* ... */ };
export { gradientPlugin, themePlugin, /* ... */ };
export { pigmentPlugin };

// Utility exports
export { supportsColor };
export { detectEnvironment };
export type { Pigment, Styler, /* ... */ };
```

## 16. Website Requirements

### 16.1 Tech Stack

- **Framework**: React 19
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Syntax Highlighting**: @oxog/codeshine
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (code), Inter (text)

### 16.2 Features

- Interactive color picker
- Theme preview (all presets)
- ANSI preview (terminal appearance)
- Chalk migration guide
- Browser console demo
- Dark/Light theme toggle

### 16.3 Deployment

- **Platform**: GitHub Pages
- **Domain**: pigment.oxog.dev
- **CNAME**: Configured in repository
- **Auto-deploy**: On push to main branch

## 17. Quality Gates

### 17.1 Pre-Publish Checklist

- [ ] All tests passing (100% coverage)
- [ ] No TypeScript errors
- [ ] Bundle size < 12KB gzipped
- [ ] Chalk compatibility verified
- [ ] Documentation complete (README, llms.txt)
- [ ] Website builds successfully
- [ ] Examples run without errors

### 17.2 CI/CD Requirements

- **Test**: Run on every push
- **Coverage**: Fail if < 100%
- **Build**: Verify ESM/CJS outputs
- **Lint**: Enforce code style
- **Type**: TypeScript strict mode validation
- **Deploy**: Automatic on main branch
- **Publish**: Manual on tag push

## 18. Non-Negotiable Rules Summary

1. **Zero Runtime Dependencies**: Only devDependencies allowed
2. **100% Test Coverage**: Every line, branch, function tested
3. **Micro-Kernel Architecture**: Plugin-based extensibility
4. **Strict TypeScript**: Strict mode enabled
5. **Chalk Compatibility**: Drop-in replacement for Chalk v5
6. **Universal Runtime**: Node.js + Browser support
7. **Performance**: < 3KB core, < 12KB full
8. **LLM-Native**: < 2000 token llms.txt, rich JSDoc
9. **No Social Media**: Only GitHub link allowed
10. **MIT License**: No exceptions
