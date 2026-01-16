# Pigment Implementation Tasks

## Phase 1: Foundation Setup

### Task 1.1: Create Project Structure

**Files to create:**
- `package.json`
- `tsconfig.json`
- `vitest.config.ts`
- `tsup.config.ts`
- `.eslintrc.cjs`
- `.prettierrc`
- `.prettierignore`
- `.gitignore`
- `.npmignore`

**Commands:**
```bash
npm init -y
npm install --save-dev typescript@^5.0.0 vitest@^2.0.0 @vitest/coverage-v8@^2.0.0 tsup@^8.0.0 @types/node@^20.0.0 prettier@^3.0.0 eslint@^9.0.0
```

**Acceptance Criteria:**
- All config files created
- TypeScript strict mode enabled
- Vitest configured with 100% coverage thresholds
- tsup configured for ESM + CJS output

---

### Task 1.2: Create Directory Structure

**Directories to create:**
```
src/
  core/
  utils/
  plugins/
    core/
    optional/
    ecosystem/
tests/
  unit/
  integration/
  fixtures/
examples/
  01-basic/
  02-plugins/
  03-error-handling/
  04-typescript/
  05-integrations/
  06-real-world/
website/
.github/workflows/
```

**Acceptance Criteria:**
- All directories created
- Empty `index.ts` files in each plugin directory

---

## Phase 2: Core Implementation

### Task 2.1: Implement Type Definitions

**File:** `src/types.ts`

**Types to define:**
- `PigmentOptions`
- `ColorSupport`
- `Styler`
- `Pigment`
- `Style`
- `Plugin<TContext>`
- `PigmentKernel<TContext>`
- `ThemePreset`
- `BoxBorder`
- All plugin option types

**Acceptance Criteria:**
- All types defined with JSDoc
- Generic types properly constrained
- No `any` types

---

### Task 2.2: Implement Error Classes

**File:** `src/errors.ts`

**Classes to implement:**
- `PigmentError` (base class)
- `PluginError`
- `ColorError`
- `EnvironmentError`

**Acceptance Criteria:**
- All classes extend Error properly
- Error codes defined
- Stack traces preserved

---

### Task 2.3: Implement Constants

**File:** `src/constants.ts`

**Constants to define:**
- ANSI codes for 16 colors (foreground/background/bright variants)
- ANSI codes for modifiers (bold, dim, italic, etc.)
- ANSI reset codes
- ANSI open/close codes
- Theme presets (monokai, dracula, nord, etc.)
- Box border characters

**Acceptance Criteria:**
- All ANSI codes correct
- All theme colors defined
- All border characters included

---

### Task 2.4: Implement Event Bus

**File:** `src/kernel/event-bus.ts`

**Methods to implement:**
- `on(event, handler)`
- `off(event, handler?)`
- `emit(event, data?)`
- `once(event, handler)`

**Acceptance Criteria:**
- Event handlers stored in Map
- Multiple handlers per event supported
- `once` handlers removed after firing

---

### Task 2.5: Implement Error Boundary

**File:** `src/kernel/error-boundary.ts`

**Methods to implement:**
- `wrap(fn)`
- `wrapAsync(fn)`
- `handle(error, context?)`

**Acceptance Criteria:**
- Catches and logs errors
- Emits error event
- Returns undefined on error

---

### Task 2.6: Implement Micro Kernel

**File:** `src/kernel.ts`

**Methods to implement:**
- `constructor(options?)`
- `use(plugin)`
- `register(plugin)`
- `unregister(name)`
- `list()`
- `getContext()`
- `setContext(partial)`
- `on(event, handler)`
- `emit(event, data?)`
- `initialize()`
- `destroy()`

**Acceptance Criteria:**
- Plugins stored in Map
- Context managed properly
- Lifecycle hooks called correctly
- Dependency resolution implemented

---

### Task 2.7: Implement ANSI Code Generation

**File:** `src/core/ansi.ts`

**Functions to implement:**
- `generateModifierCode(name)` - returns `{ open, close }`
- `generateColorCode(name, background)` - returns `{ open, close }`
- `generateAnsi256Code(code, background)` - returns `{ open, close }`
- `generateRgbCode(r, g, b, background)` - returns `{ open, close }`
- `generateResetCode()` - returns reset string

**Acceptance Criteria:**
- All ANSI codes correct
- Background/foreground variants handled
- Reset code returns `\x1b[0m`

---

### Task 2.8: Implement Styler

**File:** `src/core/styler.ts`

**Functions to implement:**
- `applyStyle(text, open, close)` - applies style to text
- `applyStyles(text, styles)` - applies multiple styles
- `reset(text)` - resets all styles

**Acceptance Criteria:**
- Styles applied in order
- Close codes in reverse order
- Reset code appended

---

## Phase 3: Utilities Implementation

### Task 3.1: Implement Platform Detection

**File:** `src/utils/platform.ts`

**Functions to implement:**
- `detectPlatform()` - returns `Platform` object

**Acceptance Criteria:**
- Detects Node.js vs Browser
- Detects Windows
- Detects CI environment
- Detects TTY

---

### Task 3.2: Implement Color Support Detection

**File:** `src/utils/color-support.ts`

**Functions to implement:**
- `detectColorSupport()` - returns `ColorSupport` object
- `checkNoColor()` - checks NO_COLOR env var
- `checkForceColor()` - checks FORCE_COLOR env var
- `checkTTY()` - checks stdout TTY
- `checkTerm()` - checks TERM env var

**Acceptance Criteria:**
- NO_COLOR respected
- FORCE_COLOR respected
- TTY detection works
- TERM detection works
- Correct level returned (0-3)

---

### Task 3.3: Implement HEX to RGB Conversion

**File:** `src/utils/hex-to-rgb.ts`

**Functions to implement:**
- `hexToRgb(hex)` - converts HEX to RGB object
- `validateHex(hex)` - validates HEX format

**Acceptance Criteria:**
- Supports `#RRGGBB` format
- Supports `#RGB` shorthand
- Supports `RRGGBB` without `#`
- Throws on invalid format

---

### Task 3.4: Implement HSL to RGB Conversion

**File:** `src/utils/hsl-to-rgb.ts`

**Functions to implement:**
- `hslToRgb(h, s, l)` - converts HSL to RGB object

**Acceptance Criteria:**
- Hue: 0-360
- Saturation: 0-100
- Lightness: 0-100
- Returns clamped 0-255 values

---

### Task 3.5: Implement RGB to ANSI 256 Conversion

**File:** `src/utils/rgb-to-ansi256.ts`

**Functions to implement:**
- `rgbToAnsi256(r, g, b)` - converts RGB to ANSI 256 code

**Acceptance Criteria:**
- Grayscale handled (232-255)
- RGB cube handled (16-231)
- Correct formula used

---

### Task 3.6: Implement Environment Detection

**File:** `src/utils/environment.ts`

**Functions to implement:**
- `getEnvironment()` - returns environment info
- `isNode()` - check if Node.js
- `isBrowser()` - check if browser
- `isWindows()` - check if Windows
- `isCI()` - check if CI environment

**Acceptance Criteria:**
- All detection functions work
- Caches results for performance

---

## Phase 4: Core Plugins Implementation

### Task 4.1: Implement baseColorsPlugin

**File:** `src/plugins/core/base-colors.ts`

**Features to implement:**
- 16 base colors (black, red, green, yellow, blue, magenta, cyan, white)
- 16 bright variants (blackBright, redBright, etc.)
- All background variants (bgBlack, bgRed, etc.)
- Aliases: gray/grey, bgGray/bgGrey

**Acceptance Criteria:**
- All 48 colors implemented
- ANSI codes correct
- Plugin registers styles with kernel

---

### Task 4.2: Implement modifiersPlugin

**File:** `src/plugins/core/modifiers.ts`

**Features to implement:**
- bold, dim, italic, underline, strikethrough, inverse, hidden, reset

**Acceptance Criteria:**
- All 8 modifiers implemented
- ANSI codes correct
- Plugin registers styles with kernel

---

### Task 4.3: Implement ansi256Plugin

**File:** `src/plugins/core/ansi256.ts`

**Features to implement:**
- `ansi256(code)` method
- `bgAnsi256(code)` method
- Code validation (0-255)

**Acceptance Criteria:**
- Both foreground and background work
- Throws on invalid codes
- ANSI 256 escape codes correct

---

### Task 4.4: Implement trueColorPlugin

**File:** `src/plugins/core/true-color.ts`

**Features to implement:**
- `rgb(r, g, b)` method
- `bgRgb(r, g, b)` method
- `hex(color)` method
- `bgHex(color)` method
- `hsl(h, s, l)` method
- `bgHsl(h, s, l)` method
- Color conversions (HEX → RGB, HSL → RGB)
- Value validation (RGB: 0-255, HSL: h:0-360, s/l:0-100, HEX format)

**Acceptance Criteria:**
- All color formats work
- Conversions correct
- Validation works
- Throws on invalid values

---

### Task 4.5: Implement nestingPlugin

**File:** `src/plugins/core/nesting.ts`

**Features to implement:**
- Nested style support
- Template literal support in styles

**Acceptance Criteria:**
- Nested styles work correctly
- Styles don't interfere with each other
- Reset codes properly placed

---

### Task 4.6: Implement environmentPlugin

**File:** `src/plugins/core/environment.ts`

**Features to implement:**
- NO_COLOR support
- FORCE_COLOR support
- TTY detection
- Color level enforcement

**Acceptance Criteria:**
- NO_COLOR disables all colors
- FORCE_COLOR forces level
- TTY detection works
- Level correctly applied

---

### Task 4.7: Create Core Plugins Export

**File:** `src/plugins/core/index.ts`

**Exports:**
- `baseColorsPlugin`
- `modifiersPlugin`
- `ansi256Plugin`
- `trueColorPlugin`
- `nestingPlugin`
- `environmentPlugin`

**Acceptance Criteria:**
- All core plugins exported
- Types exported

---

## Phase 5: API Implementation

### Task 5.1: Implement Proxy-Based Chaining API

**File:** `src/core/proxy.ts`

**Features to implement:**
- `ProxyPigment` class
- Property access handlers for modifiers
- Property access handlers for colors
- Method handlers for extended colors
- Function call handler to apply styles
- Zero-allocation style composition

**Acceptance Criteria:**
- `pigment.bold.red('text')` works
- Nested styles work: `pigment.red(`Error: ${pigment.bold('critical')}`)`
- All modifiers and colors chainable
- Extended colors work: `pigment.rgb(255, 0, 0)('text')`
- Background variants work: `pigment.bgRed('text')`

---

### Task 5.2: Implement Function Composition API

**File:** `src/core/composer.ts`

**Features to implement:**
- Individual styler functions (bold, red, italic, etc.)
- `compose(...stylers)` function
- Type-safe composition

**Acceptance Criteria:**
- All individual stylers exported
- `compose(bold, red)` returns composed styler
- Composed styler applies all styles
- Tree-shakeable exports

---

### Task 5.3: Implement Builder Pattern API

**File:** `src/core/builder.ts`

**Features to implement:**
- `BuilderPigment` class
- Methods for all modifiers
- Methods for all colors
- Methods for extended colors
- `paint(text)` method to apply styles

**Acceptance Criteria:**
- `createPigment().bold().red().paint('text')` works
- Methods chain correctly
- `paint()` returns styled string
- All features match proxy API

---

### Task 5.4: Implement Runtime Abstraction

**File:** `src/core/runtime.ts`

**Features to implement:**
- `Runtime` interface
- `NodeRuntime` class
- `BrowserRuntime` class
- Runtime factory function

**Acceptance Criteria:**
- Node.js uses ANSI escape codes
- Browser uses CSS %c styling
- Runtime auto-detected
- Both support same API

---

### Task 5.5: Implement Factory Function

**File:** `src/core/factory.ts`

**Features to implement:**
- `createPigment(options?)` factory function
- Default instance with all core plugins
- Custom instance with custom plugins

**Acceptance Criteria:**
- Default instance includes all core plugins
- Custom plugins can be registered
- Options (level, forceColor, noColor) respected

---

## Phase 6: Optional Plugins Implementation

### Task 6.1: Implement gradientPlugin

**File:** `src/plugins/optional/gradient.ts`

**Features to implement:**
- `gradient(start, end)` method
- `bgGradient(start, end)` method
- Color interpolation
- Rainbow gradient support
- Configurable steps

**Acceptance Criteria:**
- Gradient colors smooth
- Works with all color formats
- Rainbow gradient cycles through spectrum
- Steps configurable

---

### Task 6.2: Implement themePlugin

**File:** `src/plugins/optional/theme.ts`

**Features to implement:**
- Theme presets (monokai, dracula, nord, github, vscode, tokyo-night, catppuccin, one-dark, solarized)
- `theme.keyword`, `theme.string`, `theme.number`, etc.
- `theme.error`, `theme.success`, `theme.warning`, `theme.info`
- Custom theme support

**Acceptance Criteria:**
- All 9 presets implemented
- Theme colors correct
- Custom themes work
- Theme switchable

---

### Task 6.3: Implement semanticPlugin

**File:** `src/plugins/optional/semantic.ts`

**Features to implement:**
- `success(text)` method
- `error(text)` method
- `warning(text)` method
- `info(text)` method
- `debug(text)` method
- Customizable colors

**Acceptance Criteria:**
- All 5 semantic methods work
- Default colors appropriate
- Colors customizable via options

---

### Task 6.4: Implement boxPlugin

**File:** `src/plugins/optional/box.ts`

**Features to implement:**
- `box(text, options?)` method
- Border styles: single, double, rounded, bold, classic
- Configurable padding
- Multiline text support

**Acceptance Criteria:**
- All 5 border styles work
- Padding configurable
- Multiline text handled correctly
- Box borders properly aligned

---

### Task 6.5: Implement templatePlugin

**File:** `src/plugins/optional/template.ts`

**Features to implement:**
- Tagged template literal support
- Syntax: `pigment`{red text}``
- Nested styles in templates
- Variable interpolation

**Acceptance Criteria:**
- Tagged template works
- Style tags parsed correctly
- Variables interpolated
- Nested styles work

---

### Task 6.6: Create Optional Plugins Export

**File:** `src/plugins/optional/index.ts`

**Exports:**
- `gradientPlugin`
- `themePlugin`
- `semanticPlugin`
- `boxPlugin`
- `templatePlugin`
- Option types

**Acceptance Criteria:**
- All optional plugins exported
- Types exported

---

## Phase 7: Ecosystem Plugin Implementation

### Task 7.1: Implement pigmentPlugin

**File:** `src/plugins/ecosystem/pigment-plugin.ts`

**Features to implement:**
- Integration plugin for @oxog packages
- Configurable theme
- Configurable color level
- Styled output helpers

**Acceptance Criteria:**
- Plugin integrates with @oxog/log
- Plugin integrates with @oxog/cli
- Theme configurable
- Level configurable

---

### Task 7.2: Create Ecosystem Plugins Export

**File:** `src/plugins/ecosystem/index.ts`

**Exports:**
- `pigmentPlugin`
- Plugin option types

**Acceptance Criteria:**
- All ecosystem plugins exported
- Types exported

---

### Task 7.3: Create Plugins Main Export

**File:** `src/plugins/index.ts`

**Exports:**
- All core plugins
- All optional plugins
- All ecosystem plugins
- All plugin types

**Acceptance Criteria:**
- All plugins exported
- Types exported
- Named exports work

---

## Phase 8: Chalk Compatibility

### Task 8.1: Implement Chalk Class

**File:** `src/core/chalk.ts`

**Features to implement:**
- `Chalk` class
- Constructor with options
- `level` property (0-3)
- `supportsColor` property
- All color methods
- All modifier methods
- All extended color methods
- Chaining support

**Acceptance Criteria:**
- Matches Chalk v5 API
- All methods work
- Chaining works
- Property access works

---

### Task 8.2: Create Default Instance

**File:** `src/core/chalk.ts`

**Features to implement:**
- Default Chalk instance
- Auto-detect color level

**Acceptance Criteria:**
- Default instance created
- Color level auto-detected

---

## Phase 9: Main Entry Point

### Task 9.1: Implement Main Index

**File:** `src/index.ts`

**Exports to implement:**
- `pigment` (default proxy instance)
- `createPigment` (factory)
- `compose` (function composition)
- Individual stylers (bold, red, etc.)
- All core plugins
- All optional plugins
- All ecosystem plugins
- `supportsColor` utility
- `detectEnvironment` utility
- All types

**Acceptance Criteria:**
- All exports work
- Default export is Chalk-compatible
- Named exports work
- Types exported

---

## Phase 10: Testing

### Task 10.1: Write Kernel Tests

**File:** `tests/unit/kernel.test.ts`

**Test cases:**
- Plugin registration
- Plugin unregistration
- Plugin listing
- Context management
- Event system
- Lifecycle hooks
- Dependency resolution

**Acceptance Criteria:**
- All kernel methods tested
- 100% coverage

---

### Task 10.2: Write ANSI Tests

**File:** `tests/unit/ansi.test.ts`

**Test cases:**
- Modifier code generation
- Color code generation
- ANSI 256 code generation
- RGB code generation
- Reset code generation

**Acceptance Criteria:**
- All code generation functions tested
- 100% coverage

---

### Task 10.3: Write Proxy API Tests

**File:** `tests/unit/proxy.test.ts`

**Test cases:**
- Property access
- Method chaining
- Style application
- Nested styles
- Extended colors
- Background colors

**Acceptance Criteria:**
- All proxy features tested
- 100% coverage

---

### Task 10.4: Write Composer Tests

**File:** `tests/unit/composer.test.ts`

**Test cases:**
- Individual stylers
- Function composition
- Multiple styles
- Order of application

**Acceptance Criteria:**
- All composition features tested
- 100% coverage

---

### Task 10.5: Write Builder Tests

**File:** `tests/unit/builder.test.ts`

**Test cases:**
- Method chaining
- Style application
- All modifiers
- All colors
- Extended colors

**Acceptance Criteria:**
- All builder features tested
- 100% coverage

---

### Task 10.6: Write Utility Tests

**Files:**
- `tests/unit/color-support.test.ts`
- `tests/unit/hex-to-rgb.test.ts`
- `tests/unit/hsl-to-rgb.test.ts`
- `tests/unit/rgb-to-ansi256.test.ts`
- `tests/unit/environment.test.ts`

**Test cases:**
- Color support detection
- NO_COLOR/FORCE_COLOR
- TTY detection
- Color conversions
- Platform detection

**Acceptance Criteria:**
- All utility functions tested
- 100% coverage

---

### Task 10.7: Write Core Plugin Tests

**File:** `tests/unit/plugins/core.test.ts`

**Test cases:**
- baseColorsPlugin
- modifiersPlugin
- ansi256Plugin
- trueColorPlugin
- nestingPlugin
- environmentPlugin

**Acceptance Criteria:**
- All core plugins tested
- 100% coverage

---

### Task 10.8: Write Optional Plugin Tests

**Files:**
- `tests/unit/plugins/gradient.test.ts`
- `tests/unit/plugins/theme.test.ts`
- `tests/unit/plugins/semantic.test.ts`
- `tests/unit/plugins/box.test.ts`
- `tests/unit/plugins/template.test.ts`

**Test cases:**
- All optional plugins
- All features
- Edge cases

**Acceptance Criteria:**
- All optional plugins tested
- 100% coverage

---

### Task 10.9: Write Chalk Compatibility Tests

**File:** `tests/integration/chalk-compat.test.ts`

**Test cases:**
- All Chalk API methods
- Chaining behavior
- Color level property
- supportsColor property
- Instance creation

**Acceptance Criteria:**
- All Chalk v5 features work
- 100% compatibility verified

---

### Task 10.10: Write Browser Tests

**File:** `tests/integration/browser.test.ts`

**Test cases:**
- Browser runtime
- CSS %c styling
- Color mapping
- Platform detection

**Acceptance Criteria:**
- Browser features work
- 100% coverage

---

### Task 10.11: Write Integration Tests

**Files:**
- `tests/integration/nesting.test.ts`
- `tests/integration/ecosystem.test.ts`

**Test cases:**
- Nested styles
- Plugin integration
- End-to-end scenarios

**Acceptance Criteria:**
- All integrations work
- 100% coverage

---

## Phase 11: Examples

### Task 11.1: Create Basic Examples

**Files:**
- `examples/01-basic/minimal.ts`
- `examples/01-basic/all-colors.ts`
- `examples/01-basic/all-modifiers.ts`
- `examples/01-basic/chaining.ts`
- `examples/01-basic/README.md`

**Content:**
- Minimal usage
- All 16 colors + bright variants
- All modifiers
- Chaining examples

**Acceptance Criteria:**
- All examples run
- README explains each example

---

### Task 11.2: Create Plugin Examples

**Files:**
- `examples/02-plugins/gradient.ts`
- `examples/02-plugins/themes.ts`
- `examples/02-plugins/semantic.ts`
- `examples/02-plugins/box-drawing.ts`
- `examples/02-plugins/template-literals.ts`
- `examples/02-plugins/README.md`

**Content:**
- Gradient usage
- Theme presets
- Semantic colors
- Box drawing
- Template literals

**Acceptance Criteria:**
- All examples run
- README explains each example

---

### Task 11.3: Create Error Handling Examples

**Files:**
- `examples/03-error-handling/invalid-colors.ts`
- `examples/03-error-handling/no-color-env.ts`
- `examples/03-error-handling/README.md`

**Content:**
- Invalid color handling
- NO_COLOR environment
- Error recovery

**Acceptance Criteria:**
- All examples run
- README explains each example

---

### Task 11.4: Create TypeScript Examples

**Files:**
- `examples/04-typescript/typed-themes.ts`
- `examples/04-typescript/custom-plugin.ts`
- `examples/04-typescript/README.md`

**Content:**
- Typed theme usage
- Custom plugin creation
- Type safety

**Acceptance Criteria:**
- All examples run
- README explains each example

---

### Task 11.5: Create Integration Examples

**Files:**
- `examples/05-integrations/chalk-migration.ts`
- `examples/05-integrations/with-oxog-log.ts`
- `examples/05-integrations/with-oxog-cli.ts`
- `examples/05-integrations/README.md`

**Content:**
- Chalk to Pigment migration
- @oxog/log integration
- @oxog/cli integration

**Acceptance Criteria:**
- All examples run
- README explains each example

---

### Task 11.6: Create Real-World Examples

**Files:**
- `examples/06-real-world/cli-app/`
- `examples/06-real-world/log-formatter/`
- `examples/06-real-world/progress-bar/`
- `examples/06-real-world/README.md`

**Content:**
- CLI application
- Log formatter
- Progress bar

**Acceptance Criteria:**
- All examples run
- README explains each example

---

## Phase 12: GitHub Workflows

### Task 12.1: Create Deploy Workflow

**File:** `.github/workflows/deploy.yml`

**Features:**
- Trigger on push to main
- Install dependencies
- Run tests with coverage
- Build package
- Build website
- Deploy to GitHub Pages

**Acceptance Criteria:**
- Workflow runs successfully
- Tests pass
- Website deploys
- Pages configured correctly

---

### Task 12.2: Create Publish Workflow

**File:** `.github/workflows/publish.yml`

**Features:**
- Trigger on tag push
- Install dependencies
- Run tests with coverage
- Build package
- Publish to npm with provenance

**Acceptance Criteria:**
- Workflow runs successfully
- Tests pass
- Package published to npm
- Provenance enabled

---

## Phase 13: Documentation

### Task 13.1: Create llms.txt

**File:** `llms.txt`

**Content:**
- < 2000 tokens
- LLM-optimized
- Quick reference
- Examples

**Acceptance Criteria:**
- < 2000 tokens
- Contains all public APIs
- At least 15 examples

---

### Task 13.2: Create README.md

**File:** `README.md`

**Sections:**
- Title and badges
- Description
- Installation
- Quick start
- API documentation
- Examples
- Chalk compatibility
- Plugin system
- Contributing
- License

**Acceptance Criteria:**
- All sections complete
- 15+ examples
- GitHub link only (no social media)
- MIT license

---

## Phase 14: Website

### Task 14.1: Initialize Website Project

**Location:** `website/`

**Setup:**
- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4
- @oxog/codeshine for syntax highlighting
- shadcn/ui components
- Lucide React icons
- JetBrains Mono + Inter fonts

**Commands:**
```bash
cd website
npm create vite@latest . -- --template react-ts
npm install tailwindcss@latest
npm install @oxog/codeshine
npm install lucide-react
```

**Acceptance Criteria:**
- React 19 installed
- Vite 6 installed
- Tailwind v4 installed
- All dependencies installed

---

### Task 14.2: Create Website Pages

**Pages to create:**
- Home page (hero, features, quick start)
- API reference
- Examples
- Plugins
- Chalk migration
- Color picker (interactive)
- Theme preview
- Browser demo

**Acceptance Criteria:**
- All pages created
- Navigation working
- Responsive design

---

### Task 14.3: Implement Interactive Features

**Features:**
- Interactive color picker
- Live code preview
- Theme preview (all presets)
- Chalk migration comparison
- Browser console demo

**Acceptance Criteria:**
- All interactive features work
- Real-time updates
- User-friendly

---

### Task 14.4: Configure Deployment

**Configuration:**
- CNAME file: `website/public/CNAME`
- GitHub Pages configured
- Auto-deploy on push to main

**Acceptance Criteria:**
- CNAME configured
- Domain: pigment.oxog.dev
- Auto-deploy working

---

## Phase 15: Final Polish

### Task 15.1: Verify 100% Test Coverage

**Commands:**
```bash
npm run test:coverage
```

**Acceptance Criteria:**
- All tests pass
- 100% line coverage
- 100% branch coverage
- 100% function coverage

---

### Task 15.2: Verify Build

**Commands:**
```bash
npm run build
```

**Acceptance Criteria:**
- Build succeeds
- ESM output: `dist/index.mjs`
- CJS output: `dist/index.js`
- Types: `dist/index.d.ts`
- Bundle size < 12KB gzipped

---

### Task 15.3: Verify Website Build

**Commands:**
```bash
cd website
npm run build
```

**Acceptance Criteria:**
- Build succeeds
- Output in `dist/`
- All assets bundled

---

### Task 15.4: Run All Examples

**Commands:**
```bash
npm run examples
```

**Acceptance Criteria:**
- All examples run
- No errors
- Output correct

---

### Task 15.5: Final Verification

**Checklist:**
- [ ] All tests passing
- [ ] 100% coverage
- [ ] No TypeScript errors
- [ ] Package builds
- [ ] Website builds
- [ ] All examples run
- [ ] Documentation complete
- [ ] llms.txt created
- [ ] README complete
- [ ] GitHub workflows working
- [ ] Chalk compatibility verified

**Acceptance Criteria:**
- All checklist items complete
- Ready for npm publish

---

## Task Dependencies

### Critical Path (must complete in order)
1.1 → 1.2 → 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6 → 2.7 → 2.8 → 3.1-3.6 → 4.1-4.7 → 5.1-5.5 → 9.1 → 10.1-10.11 → 15.1-15.5

### Parallel Tasks (can run simultaneously)
- 4.1, 4.2, 4.3, 4.4, 4.5, 4.6 (after 2.6)
- 6.1, 6.2, 6.3, 6.4, 6.5 (after 5.5)
- 10.1, 10.2, 10.3, 10.4, 10.5, 10.6 (after respective implementation)
- 11.1, 11.2, 11.3, 11.4, 11.5, 11.6 (after 9.1)
- 12.1, 12.2 (after 15.1)
- 13.1, 13.2 (after 9.1)
- 14.1-14.4 (after 9.1)

---

## Summary

**Total Tasks:** 89
**Estimated Time:** 40-60 hours
**Critical Path Tasks:** 45
**Parallel Task Groups:** 10

Follow this task list sequentially for optimal development workflow. Each task builds upon the previous ones, ensuring a solid foundation before moving to advanced features.
