# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/ersinkoc/pigment/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/ersinkoc/pigment/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ersinkoc/pigment/releases/tag/v1.0.0
