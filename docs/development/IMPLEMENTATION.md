# Pigment Implementation Architecture

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Layer                           │
│  API Styles: Proxy · Function Composition · Builder    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Plugin Registry API                        │
│  use() · register() · unregister() · list()              │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  Core Plugins │   │ Optional Plugins│  │  Ecosystem    │
│  (Always)     │   │   (Opt-in)    │   │   Plugins     │
└───────────────┘   └───────────────┘   └───────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Micro Kernel                           │
│  Event Bus · Lifecycle Management · Error Boundaries    │
│  Context Management · Plugin Resolution                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               Runtime Abstraction                       │
│  Node.js (ANSI) ──────────── Browser (CSS %c)           │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Layer Responsibilities

| Layer | Responsibility |
|-------|----------------|
| **User Layer** | Multiple API styles (proxy, compose, builder) |
| **Plugin Registry** | Plugin lifecycle, registration, resolution |
| **Plugins** | Feature implementation (colors, modifiers, etc.) |
| **Micro Kernel** | Core services (events, context, errors) |
| **Runtime** | Platform-specific output formatting |

## 2. Micro-Kernel Design

### 2.1 Kernel Structure

```typescript
class PigmentKernel<TContext = unknown> {
  private plugins: Map<string, Plugin<TContext>>;
  private context: TContext;
  private eventBus: EventBus;
  private errorBoundary: ErrorBoundary;

  constructor(options?: KernelOptions<TContext>) {
    this.plugins = new Map();
    this.context = options?.context ?? ({} as TContext);
    this.eventBus = new EventBus();
    this.errorBoundary = new ErrorBoundary(this.eventBus);
  }

  // Plugin management
  use(plugin: Plugin<TContext>): this;
  register(plugin: Plugin<TContext>): void;
  unregister(name: string): void;
  list(): Plugin<TContext>[];

  // Context management
  getContext(): TContext;
  setContext(partial: Partial<TContext>): void;

  // Event system
  on(event: string, handler: EventHandler): void;
  emit(event: string, data?: unknown): void;

  // Lifecycle
  async initialize(): Promise<void>;
  async destroy(): Promise<void>;
}
```

### 2.2 Event Bus

```typescript
class EventBus {
  private handlers: Map<string, Set<EventHandler>>;

  on(event: string, handler: EventHandler): void;
  off(event: string, handler?: EventHandler): void;
  emit(event: string, data?: unknown): void;
  once(event: string, handler: EventHandler): void;

  // Internal events: 'plugin:register', 'plugin:init', 'error', etc.
}
```

**Events**:
- `plugin:register` - When plugin is registered
- `plugin:init` - When plugin initializes
- `plugin:destroy` - When plugin destroys
- `error` - When error occurs
- `context:change` - When context changes

### 2.3 Error Boundary

```typescript
class ErrorBoundary {
  constructor(private eventBus: EventBus) {}

  wrap<T>(fn: () => T): T | undefined;
  wrapAsync<T>(fn: () => Promise<T>): Promise<T | undefined>;
  handle(error: Error, context?: string): void;
}

// Custom error classes
class PigmentError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'PigmentError';
  }
}

class PluginError extends PigmentError {
  constructor(pluginName: string, message: string) {
    super(`[${pluginName}] ${message}`, 'PLUGIN_ERROR');
  }
}
```

## 3. Plugin Architecture

### 3.1 Plugin Lifecycle

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Install │ -> │ Resolve │ -> │  Init   │ -> │  Ready  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                              │
                                              ▼
                                      ┌─────────┐
                                      │ Destroy │
                                      └─────────┘
```

1. **Install**: Plugin registers itself with kernel
2. **Resolve**: Dependencies are resolved and loaded
3. **Init**: Plugin's `onInit` is called (async)
4. **Ready**: Plugin is fully operational
5. **Destroy**: Plugin's `onDestroy` is called (async)

### 3.2 Plugin Resolution Order

1. Load core plugins first (fixed order)
2. Load optional plugins in dependency order
3. Load ecosystem plugins last
4. Topological sort based on `dependencies` array
5. Fail on circular dependencies

### 3.3 Core Plugin Implementation

#### baseColorsPlugin

```typescript
const baseColorsPlugin: Plugin<ColorContext> = {
  name: 'base-colors',
  version: '1.0.0',

  install(kernel) {
    kernel.setContext({
      baseColors: {
        // ANSI codes for 16 colors
        foreground: { 30: 'black', 31: 'red', ... },
        background: { 40: 'bgBlack', 41: 'bgRed', ... },
        bright: { 90: 'blackBright', 91: 'redBright', ... },
        brightBg: { 100: 'bgBlackBright', 101: 'bgRedBright', ... }
      }
    });
  },

  onInit(context) {
    // Initialize color mappings
  }
};
```

#### modifiersPlugin

```typescript
const modifiersPlugin: Plugin<ModifierContext> = {
  name: 'modifiers',
  version: '1.0.0',

  install(kernel) {
    kernel.setContext({
      modifiers: {
        bold: { open: '\x1b[1m', close: '\x1b[22m' },
        dim: { open: '\x1b[2m', close: '\x1b[22m' },
        italic: { open: '\x1b[3m', close: '\x1b[23m' },
        // ...
      }
    });
  }
};
```

#### ansi256Plugin

```typescript
const ansi256Plugin: Plugin<ColorContext> = {
  name: 'ansi256',
  version: '1.0.0',

  install(kernel) {
    kernel.on('color:apply', (data) => {
      if (data.type === 'ansi256') {
        const code = data.code;
        if (data.background) {
          data.ansi = `\x1b[48;5;${code}m`;
        } else {
          data.ansi = `\x1b[38;5;${code}m`;
        }
      }
    });
  }
};
```

#### trueColorPlugin

```typescript
const trueColorPlugin: Plugin<ColorContext> = {
  name: 'true-color',
  version: '1.0.0',

  install(kernel) {
    kernel.on('color:convert', (data) => {
      if (data.format === 'hex') {
        data.rgb = hexToRgb(data.value);
      } else if (data.format === 'hsl') {
        data.rgb = hslToRgb(data.value);
      }
      // RGB to ANSI
      if (data.rgb && data.background) {
        data.ansi = `\x1b[48;2;${data.rgb.r};${data.rgb.g};${data.rgb.b}m`;
      } else if (data.rgb) {
        data.ansi = `\x1b[38;2;${data.rgb.r};${data.rgb.g};${data.rgb.b}m`;
      }
    });
  }
};
```

## 4. API Layer Design

### 4.1 Proxy-Based Chaining API

```typescript
class ProxyPigment implements Pigment {
  private styles: Style[];

  constructor(
    private kernel: PigmentKernel,
    initialStyles: Style[] = []
  ) {
    this.styles = [...initialStyles];
  }

  apply(text: string): string {
    const open = this.styles.map(s => s.open).join('');
    const close = this.styles
      .slice()
      .reverse()
      .map(s => s.close)
      .join('');
    return `${open}${text}${close}`;
  }

  // Proxy handler for property access
  get(target: ProxyPigment, prop: string) {
    if (prop in target) {
      return target[prop];
    }

    // Check if prop is a style (color/modifier)
    const style = resolveStyle(prop, this.kernel.getContext());
    if (style) {
      // Return new instance with additional style
      return createProxyPigment(this.kernel, [...this.styles, style]);
    }

    // Check if prop is a color method (rgb, hex, etc.)
    if (prop === 'rgb' || prop === 'hex' || prop === 'hsl' || prop === 'ansi256') {
      return (...args: unknown[]) => {
        const style = resolveExtendedColor(prop, args, this.kernel.getContext());
        return createProxyPigment(this.kernel, [...this.styles, style]);
      };
    }

    throw new PigmentError(`Unknown style: ${prop}`, 'UNKNOWN_STYLE');
  }
}
```

### 4.2 Function Composition API

```typescript
type Styler = (text: string) => string;

function compose(...stylers: Styler[]): Styler {
  return (text: string) => {
    return stylers.reduce((acc, styler) => styler(acc), text);
  };
}

// Individual stylers
export const bold: Styler = (text) => applyStyle(text, '\x1b[1m', '\x1b[22m');
export const red: Styler = (text) => applyStyle(text, '\x1b[31m', '\x1b[39m');
export const italic: Styler = (text) => applyStyle(text, '\x1b[3m', '\x1b[23m');
// ... all other modifiers and colors

function applyStyle(text: string, open: string, close: string): string {
  return `${open}${text}${close}`;
}
```

### 4.3 Builder Pattern API

```typescript
class BuilderPigment {
  private styles: Style[] = [];

  constructor(private kernel: PigmentKernel) {}

  // Modifier methods
  bold(): this {
    this.styles.push(getModifierStyle('bold', this.kernel.getContext()));
    return this;
  }
  dim(): this {
    this.styles.push(getModifierStyle('dim', this.kernel.getContext()));
    return this;
  }
  // ... all modifiers

  // Color methods
  red(): this {
    this.styles.push(getColorStyle('red', false, this.kernel.getContext()));
    return this;
  }
  bgRed(): this {
    this.styles.push(getColorStyle('red', true, this.kernel.getContext()));
    return this;
  }
  // ... all colors

  // Extended color methods
  rgb(r: number, g: number, b: number): this {
    this.styles.push(resolveRgb(r, g, b, false, this.kernel.getContext()));
    return this;
  }
  bgRgb(r: number, g: number, b: number): this {
    this.styles.push(resolveRgb(r, g, b, true, this.kernel.getContext()));
    return this;
  }
  // ... hex, hsl, ansi256 variants

  paint(text: string): string {
    const open = this.styles.map(s => s.open).join('');
    const close = this.styles
      .slice()
      .reverse()
      .map(s => s.close)
      .join('');
    return `${open}${text}${close}`;
  }
}
```

## 5. Runtime Abstraction

### 5.1 Interface

```typescript
interface Runtime {
  platform: 'node' | 'browser';
  applyStyles(text: string, styles: Style[]): string;
  supportsColor(): ColorSupport;
  reset(text: string): string;
}
```

### 5.2 Node.js Runtime

```typescript
class NodeRuntime implements Runtime {
  platform: 'node' = 'node';

  applyStyles(text: string, styles: Style[]): string {
    const open = styles.map(s => s.open).join('');
    const close = styles
      .slice()
      .reverse()
      .map(s => s.close)
      .join('');
    return `${open}${text}${close}`;
  }

  reset(text: string): string {
    return `\x1b[0m${text}`;
  }

  supportsColor(): ColorSupport {
    return detectColorSupport();
  }
}
```

### 5.3 Browser Runtime

```typescript
class BrowserRuntime implements Runtime {
  platform: 'browser' = 'browser';

  applyStyles(text: string, styles: Style[]): string {
    const css = this.stylesToCss(styles);
    return text; // Actual styling done via console.log('%c', css)
  }

  private stylesToCss(styles: Style[]): string {
    const properties: string[] = [];

    for (const style of styles) {
      if (style.type === 'modifier') {
        properties.push(this.modifierToCss(style.name));
      } else if (style.type === 'color') {
        properties.push(this.colorToCss(style));
      }
    }

    return properties.join('; ');
  }

  private modifierToCss(name: string): string {
    const map: Record<string, string> = {
      bold: 'font-weight: bold',
      dim: 'opacity: 0.5',
      italic: 'font-style: italic',
      underline: 'text-decoration: underline',
      strikethrough: 'text-decoration: line-through',
      inverse: 'filter: invert(1)',
      hidden: 'opacity: 0'
    };
    return map[name] ?? '';
  }

  private colorToCss(style: Style): string {
    const cssColor = this.ansiToCss(style.code, style.background);
    return style.background ? `background-color: ${cssColor}` : `color: ${cssColor}`;
  }

  private ansiToCss(code: number, background: boolean): string {
    // ANSI to CSS color mapping
    const colors: Record<number, string> = {
      30: '#000000', 31: '#cd3131', 32: '#0dbc79', 33: '#e5e510',
      34: '#2472c8', 35: '#bc3fbc', 36: '#11a8cd', 37: '#e5e5e5',
      90: '#666666', 91: '#f14c4c', 92: '#23d18b', 93: '#f5f543',
      94: '#3b8eea', 95: '#d670d6', 96: '#29b8db', 97: '#ffffff'
    };
    return colors[code] ?? '#000000';
  }

  reset(text: string): string {
    return text; // No reset needed in CSS
  }

  supportsColor(): ColorSupport {
    // Always support all colors in browser
    return { level: 3, hasBasic: true, has256: true, has16m: true };
  }
}
```

## 6. Environment Detection

### 6.1 Color Support Detection

```typescript
interface ColorSupport {
  level: 0 | 1 | 2 | 3;
  hasBasic: boolean;
  has256: boolean;
  has16m: boolean;
}

function detectColorSupport(): ColorSupport {
  // Check NO_COLOR
  if (process.env.NO_COLOR) {
    return { level: 0, hasBasic: false, has256: false, has16m: false };
  }

  // Check FORCE_COLOR
  if (process.env.FORCE_COLOR) {
    const level = parseInt(process.env.FORCE_COLOR, 10);
    return {
      level: clamp(level, 0, 3) as 0 | 1 | 2 | 3,
      hasBasic: level >= 1,
      has256: level >= 2,
      has16m: level >= 3
    };
  }

  // Check TTY
  if (!process.stdout.isTTY) {
    return { level: 0, hasBasic: false, has256: false, has16m: false };
  }

  // Check TERM
  const term = process.env.TERM ?? '';
  if (term.includes('256color')) {
    return { level: 2, hasBasic: true, has256: true, has16m: false };
  }

  // Check for truecolor support
  if (term.includes('truecolor') || term.includes('24bit')) {
    return { level: 3, hasBasic: true, has256: true, has16m: true };
  }

  // Default to basic colors
  return { level: 1, hasBasic: true, has256: false, has16m: false };
}
```

### 6.2 Platform Detection

```typescript
interface Platform {
  isNode: boolean;
  isBrowser: boolean;
  isWindows: boolean;
  isCI: boolean;
  hasTTY: boolean;
}

function detectPlatform(): Platform {
  const isNode = typeof process !== 'undefined' && process.versions?.node !== undefined;
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  const isWindows = isNode && process.platform === 'win32';
  const isCI = isNode && (process.env.CI === 'true' || process.env.CONTINUOUS_INTEGRATION === 'true');
  const hasTTY = isNode && process.stdout?.isTTY === true;

  return { isNode, isBrowser, isWindows, isCI, hasTTY };
}
```

## 7. Color Conversion Utilities

### 7.1 HEX to RGB

```typescript
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse 3-digit shorthand (#RGB)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  // Validate
  if (hex.length !== 6) {
    throw new PigmentError('Invalid HEX color format', 'INVALID_HEX');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}
```

### 7.2 HSL to RGB

```typescript
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
```

### 7.3 RGB to ANSI 256

```typescript
function rgbToAnsi256(r: number, g: number, b: number): number {
  // Grayscale (232-255)
  if (r === g && g === b) {
    if (r < 8) return 16;
    if (r > 248) return 231;
    return Math.round(((r - 8) / 247) * 24) + 232;
  }

  // RGB cube (16-231)
  return Math.round(r / 51) * 36 + Math.round(g / 51) * 6 + Math.round(b / 51) + 16;
}
```

## 8. Optional Plugins Implementation

### 8.1 gradientPlugin

```typescript
interface GradientPluginOptions {
  steps?: number;
}

const gradientPlugin = (options?: GradientPluginOptions): Plugin => ({
  name: 'gradient',
  version: '1.0.0',

  install(kernel) {
    kernel.setContext({
      gradient: {
        steps: options?.steps ?? 10
      }
    });

    kernel.on('style:gradient', (data) => {
      const { start, end, text, steps } = data;
      const colors = interpolateColors(start, end, text.length, steps);

      // Apply gradient character by character
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const colorIndex = Math.floor((i / text.length) * (colors.length - 1));
        const color = colors[colorIndex];
        result += applyStyle(text[i], color, reset);
      }

      return result;
    });
  }
});
```

### 8.2 themePlugin

```typescript
interface ThemePreset {
  keyword: string;
  string: string;
  number: string;
  comment: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

const themes: Record<string, ThemePreset> = {
  monokai: {
    keyword: '#ff79c6',
    string: '#f1fa8c',
    number: '#bd93f9',
    comment: '#6272a4',
    error: '#ff5555',
    success: '#50fa7b',
    warning: '#ffb86c',
    info: '#8be9fd'
  },
  dracula: {
    keyword: '#ff79c6',
    string: '#f1fa8c',
    number: '#bd93f9',
    comment: '#6272a4',
    error: '#ff5555',
    success: '#50fa7b',
    warning: '#ffb86c',
    info: '#8be9fd'
  },
  // ... other themes
};

const themePlugin = (options?: { preset?: string }): Plugin => ({
  name: 'theme',
  version: '1.0.0',

  install(kernel) {
    const preset = options?.preset ?? 'monokai';
    const theme = themes[preset];

    kernel.setContext({
      theme
    });

    // Add theme property to Pigment
    kernel.on('style:theme', (data) => {
      const color = theme[data.type];
      return applyStyle(data.text, color, reset);
    });
  }
});
```

### 8.3 semanticPlugin

```typescript
const semanticPlugin = (): Plugin => ({
  name: 'semantic',
  version: '1.0.0',

  install(kernel) {
    const colors = {
      success: '#50fa7b',
      error: '#ff5555',
      warning: '#ffb86c',
      info: '#8be9fd',
      debug: '#6272a4'
    };

    kernel.setContext({ semantic: colors });

    // Add semantic methods
    kernel.on('style:success', (data) => applyStyle(data.text, colors.success, reset));
    kernel.on('style:error', (data) => applyStyle(data.text, colors.error, reset));
    kernel.on('style:warning', (data) => applyStyle(data.text, colors.warning, reset));
    kernel.on('style:info', (data) => applyStyle(data.text, colors.info, reset));
    kernel.on('style:debug', (data) => applyStyle(data.text, colors.debug, reset));
  }
});
```

### 8.4 boxPlugin

```typescript
const borders: Record<string, BoxChars> = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  bold: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  classic: { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' }
};

const boxPlugin = (): Plugin => ({
  name: 'box',
  version: '1.0.0',

  install(kernel) {
    kernel.on('style:box', (data) => {
      const { text, border, padding } = data;
      const chars = borders[border ?? 'single'];
      const lines = text.split('\n');

      const width = Math.max(...lines.map(l => l.length)) + (padding ?? 1) * 2;
      const pad = ' '.repeat(padding ?? 1);

      const top = `${chars.tl}${chars.h.repeat(width)}${chars.tr}`;
      const middle = lines.map(l => `${chars.v}${pad}${l.padEnd(width - (padding ?? 1) * 2)}${pad}${chars.v}`);
      const bottom = `${chars.bl}${chars.h.repeat(width)}${chars.br}`;

      return [top, ...middle, bottom].join('\n');
    });
  }
});
```

### 8.5 templatePlugin

```typescript
const templatePlugin = (): Plugin => ({
  name: 'template',
  version: '1.0.0',

  install(kernel) {
    kernel.on('style:template', (data) => {
      const { strings, values } = data;
      let result = '';

      for (let i = 0; i < strings.length; i++) {
        result += strings[i];

        if (i < values.length) {
          const value = values[i];

          if (typeof value === 'string') {
            // Check if it's a style tag: {style}
            const match = value.match(/^\{(.+)\}(.*)$/);
            if (match) {
              const [, style, text] = match;
              result += applyStyle(text, resolveStyle(style), reset);
            } else {
              result += value;
            }
          } else {
            result += String(value);
          }
        }
      }

      return result;
    });
  }
});
```

## 9. Chalk Compatibility Layer

### 9.1 Chalk Class

```typescript
class Chalk {
  level: 0 | 1 | 2 | 3;
  supportsColor: ColorSupport;

  constructor(options?: { level?: 0 | 1 | 2 | 3 }) {
    this.level = options?.level ?? detectColorSupport().level;
    this.supportsColor = {
      level: this.level,
      hasBasic: this.level >= 1,
      has256: this.level >= 2,
      has16m: this.level >= 3
    };
  }

  // Color methods
  red(text: string): string { /* ... */ }
  green(text: string): string { /* ... */ }
  // ... all other colors

  // Modifier methods
  bold(text: string): string { /* ... */ }
  // ... all other modifiers

  // Extended color methods
  rgb(r: number, g: number, b: number): (text: string) => string { /* ... */ }
  hex(color: string): (text: string) => string { /* ... */ }
  ansi256(code: number): (text: string) => string { /* ... */ }
  // ... background variants

  // Chaining
  private createChained(...styles: Style[]): Chalk {
    const instance = new Chalk({ level: this.level });
    instance.styles = styles;
    return instance;
  }
}
```

### 9.2 Default Export

```typescript
// Create default instance
const chalk = new Chalk();

// Export as default for Chalk compatibility
export default chalk;
```

## 10. Testing Strategy

### 10.1 Unit Tests

Test individual functions and modules:

```typescript
describe('hexToRgb', () => {
  it('converts valid HEX to RGB', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('throws on invalid HEX', () => {
    expect(() => hexToRgb('invalid')).toThrow(PigmentError);
  });
});
```

### 10.2 Integration Tests

Test API composition and chaining:

```typescript
describe('Proxy API', () => {
  it('chains multiple styles', () => {
    expect(pigment.bold.red('text')).toContain('\x1b[1m\x1b[31mtext\x1b[39m\x1b[22m');
  });

  it('supports nested styles', () => {
    expect(pigment.red(`Error: ${pigment.bold('critical')}`)).toMatchSnapshot();
  });
});
```

### 10.3 Chalk Compatibility Tests

Verify Chalk API compatibility:

```typescript
describe('Chalk Compatibility', () => {
  it('matches Chalk behavior', () => {
    const chalk = createPigment() as Chalk;
    expect(chalk.red('text')).toMatchSnapshot();
    expect(chalk.bold.red('text')).toMatchSnapshot();
  });
});
```

### 10.4 Coverage Targets

Configure in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
});
```

## 11. Build Configuration

### 11.1 tsup Configuration

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  external: [],
  target: 'es2022'
});
```

### 11.2 TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

## 12. Performance Optimizations

### 12.1 Proxy Caching

Cache proxy instances to reduce allocations:

```typescript
const proxyCache = new Map<string, ProxyPigment>();

function createProxyPigment(kernel: PigmentKernel, styles: Style[]): ProxyPigment {
  const cacheKey = styles.map(s => `${s.name}:${s.code}`).join('|');
  if (proxyCache.has(cacheKey)) {
    return proxyCache.get(cacheKey)!;
  }

  const proxy = new ProxyPigment(kernel, styles);
  proxyCache.set(cacheKey, proxy);
  return proxy;
}
```

### 12.2 Style Pre-computation

Pre-compute style strings for performance:

```typescript
const styleCache = new Map<string, { open: string; close: string }>();

function getStyle(name: string, code: number, background: boolean): Style {
  const key = `${name}:${code}:${background}`;
  if (styleCache.has(key)) {
    return styleCache.get(key)!;
  }

  const style = {
    open: background ? `\x1b[48;5;${code}m` : `\x1b[38;5;${code}m`,
    close: background ? `\x1b[49m' : '\x1b[39m'
  };

  styleCache.set(key, style);
  return style;
}
```

### 12.3 Bundle Size Optimization

- Tree-shakeable exports
- Separate plugin exports
- Minimal runtime overhead
- Dead code elimination

## 13. Summary

This architecture provides:

1. **Modularity**: Plugin-based extensibility
2. **Performance**: Optimized runtime with caching
3. **Flexibility**: Multiple API styles
4. **Compatibility**: Chalk drop-in replacement
5. **Testability**: Clear separation of concerns
6. **Maintainability**: Well-defined interfaces and contracts
