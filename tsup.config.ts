import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/plugins/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  target: 'es2022',
  external: [],
  banner: {
    js: '/**\n * @oxog/pigment - Zero-dependency terminal styling\n * MIT License - https://pigment.oxog.dev\n */'
  }
});
