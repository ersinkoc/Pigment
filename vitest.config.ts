import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'examples', 'website'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'examples/**',
        'website/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.test.ts',
        '**/*.spec.ts',
        '.eslintrc.cjs',
        'src/types.ts'
      ],
      all: false,
      clean: true,
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  }
});
