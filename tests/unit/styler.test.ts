import { describe, it, expect } from 'vitest';
import { applyStyle, applyStyles, reset } from '../../src/core/styler';

describe('Styler', () => {
  describe('applyStyle', () => {
    it('should apply style to text', () => {
      const result = applyStyle('test', '\x1b[1m', '\x1b[22m');
      expect(result).toBe('\x1b[1mtest\x1b[22m');
    });

    it('should handle empty text', () => {
      const result = applyStyle('', '\x1b[1m', '\x1b[22m');
      // Empty text returns empty string (like Chalk)
      expect(result).toBe('');
    });

    it('should handle multi-line text', () => {
      const result = applyStyle('line1\nline2', '\x1b[1m', '\x1b[22m');
      expect(result).toBe('\x1b[1mline1\nline2\x1b[22m');
    });

    it('should wrap existing ANSI codes', () => {
      const result = applyStyle('\x1b[31mtest', '\x1b[39m', '\x1b[22m');
      // applyStyle wraps text with open + text + close
      expect(result).toBe('\x1b[39m\x1b[31mtest\x1b[22m');
    });
  });

  describe('applyStyles', () => {
    it('should apply single style', () => {
      const styles = [{ name: 'bold', code: 1, open: '\x1b[1m', close: '\x1b[22m', type: 'modifier' }];
      const result = applyStyles('test', styles);
      expect(result).toBe('\x1b[1mtest\x1b[22m');
    });

    it('should apply multiple styles', () => {
      const styles = [
        { name: 'bold', code: 1, open: '\x1b[1m', close: '\x1b[22m', type: 'modifier' },
        { name: 'red', code: 31, open: '\x1b[31m', close: '\x1b[39m', type: 'color', background: false }
      ];
      const result = applyStyles('test', styles);
      expect(result).toBe('\x1b[1m\x1b[31mtest\x1b[39m\x1b[22m');
    });

    it('should return text unchanged when no styles', () => {
      const result = applyStyles('test', []);
      expect(result).toBe('test');
    });

    it('should close styles in reverse order', () => {
      const styles = [
        { name: 'bold', code: 1, open: '\x1b[1m', close: '\x1b[22m', type: 'modifier' },
        { name: 'dim', code: 2, open: '\x1b[2m', close: '\x1b[22m', type: 'modifier' }
      ];
      const result = applyStyles('test', styles);
      expect(result).toBe('\x1b[1m\x1b[2mtest\x1b[22m\x1b[22m');
    });
  });

  describe('reset', () => {
    it('should prepend reset code to text', () => {
      const result = reset('test');
      expect(result).toBe('\x1b[0mtest');
    });

    it('should reset styled text', () => {
      const styledText = '\x1b[31mred text\x1b[39m';
      const result = reset(styledText);
      expect(result).toBe('\x1b[0m\x1b[31mred text\x1b[39m');
    });
  });
});
