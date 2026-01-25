# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-01-25

### Fixed

- **Nested Styling Bug**: Fixed critical issue where nested color styles would break outer style after inner style ends. Now `pigment.red('Error: ' + pigment.blue('details') + ' here')` correctly restores red color after blue text.
- **`visible` Property**: Fixed `visible` method to correctly return empty string when colors are not supported (was returning text in both cases).
- **Environment Plugin Override**: Fixed `environmentPlugin` overwriting `colorSupport` level set via `createPigment({ level: 3 })` options.
- **Browser Color Detection**: Changed default browser color support from level 3 (TrueColor) to level 1 (basic colors) for safer compatibility with mobile webviews and older browsers.
- **Empty String Optimization**: Empty strings no longer generate unnecessary ANSI codes (`pigment.red('')` now returns `''` instead of `\x1b[31m\x1b[39m`).

### Added

- **`resetColorSupportCache()`**: New utility function to reset cached color support detection, useful for testing when environment variables change.
- **Improved Nesting Algorithm**: Inner style reset codes are now replaced with outer style open codes for proper color restoration.

### Changed

- **Nesting Plugin Simplified**: Removed unused event handler, plugin now only sets the `nesting.enabled` flag for compatibility.
- **Test Coverage**: Increased test count to 692 tests with 100% code coverage.

## [1.0.1] - 2026-01-16

### Fixed

- TypeScript type definitions now correctly bundled with package (`dts: true` in tsup config)
- Fixed `hexToRgb` return type (throws error instead of returning null)
- Fixed `detectColorSupport` and `supportsColor` type signatures to use strict level union
- Fixed proxy context access for type-safe property access
- Fixed v8 coverage configuration to prevent duplicate file reporting

### Changed

- Improved vitest coverage configuration with `all: false` and `clean: true` options
- Updated `PigmentContext.utils` type definitions for stricter type checking

## [1.0.0] - 2026-01-16

### Added

- Initial release of @oxog/pigment
- Chalk-compatible API for terminal styling
- Micro-kernel plugin architecture using @oxog/plugin
- Core plugins:
  - `baseColorsPlugin` - Standard ANSI colors (8 foreground + 8 background)
  - `modifiersPlugin` - Text modifiers (bold, dim, italic, underline, strikethrough, inverse, hidden, reset)
  - `ansi256Plugin` - 256-color palette support
  - `trueColorPlugin` - 24-bit RGB/HSL/Hex color support
  - `nestingPlugin` - Proper ANSI escape code nesting
  - `environmentPlugin` - Automatic color level detection
- Optional plugins:
  - `gradientPlugin` - Smooth color gradients and rainbow effects
  - `themePlugin` - Predefined color themes (monokai, dracula, nord, etc.)
  - `semanticPlugin` - Semantic color methods (success, error, warning, info)
  - `boxPlugin` - Box drawing with multiple border styles
  - `templatePlugin` - Template literal support with color interpolation
- Ecosystem plugin:
  - `pigmentPlugin` - Integration with @oxog ecosystem packages
- Builder pattern API for explicit style composition
- Proxy-based chainable API
- Function composition API
- TypeScript native with full type definitions
- Zero external dependencies (only @oxog/types and @oxog/plugin)
- Support for Node.js 18+
- Automatic color support detection (NO_COLOR, FORCE_COLOR, CI environments)
- Cross-platform support (Windows, macOS, Linux)

### Features

- **Chalk Drop-in Compatibility**: Use pigment as a direct replacement for chalk
- **Plugin System**: Extend functionality with core, optional, or custom plugins
- **Multiple APIs**: Choose between proxy chaining, builder pattern, or function composition
- **Color Levels**: Automatic detection of terminal color capabilities (0-3)
- **Theme Support**: 9 built-in themes for syntax highlighting
- **Gradient Support**: Create smooth color transitions
- **Box Drawing**: ASCII art boxes with multiple border styles

### Technical

- Built with TypeScript 5.x
- Uses Vite/tsup for building
- 100% test coverage with Vitest
- ESM and CommonJS support
- Tree-shakeable exports

## Links

- [Documentation](https://pigment.oxog.dev)
- [GitHub Repository](https://github.com/ersinkoc/pigment)
- [npm Package](https://www.npmjs.com/package/@oxog/pigment)
- [Issue Tracker](https://github.com/ersinkoc/pigment/issues)

[Unreleased]: https://github.com/ersinkoc/pigment/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/ersinkoc/pigment/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/ersinkoc/pigment/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ersinkoc/pigment/releases/tag/v1.0.0
