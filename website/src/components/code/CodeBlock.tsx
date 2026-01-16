import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { CodeBlock as CodeshinBlock } from '@oxog/codeshine/react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  highlightLines?: (number | string)[];
  className?: string;
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = true,
  showCopyButton = true,
  highlightLines,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Theme mapping for site compatibility
  const codeshinTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

  return (
    <div
      className={`relative group rounded-xl overflow-hidden border border-border bg-card shadow-sm my-4 ${className}`}
    >
      {/* IDE Header - macOS style */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
          </div>
          {/* Filename or language */}
          {filename && (
            <span className="text-sm text-muted-foreground font-mono">
              {filename}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {language}
          </span>
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Codeshine Syntax Highlighted Code Block */}
      <div className="codeshine-wrapper overflow-x-auto [&_.cs-codeblock]:bg-transparent! [&_.cs-codeblock]:m-0! [&_.cs-codeblock]:rounded-none! [&_.cs-codeblock]:border-0! [&_.cs-header]:hidden! [&_.cs-line]:block [&_.cs-line]:min-h-[1.5em] [&_.cs-line-number]:inline-block [&_.cs-line-number]:w-8 [&_.cs-line-number]:pr-4 [&_.cs-line-number]:text-right [&_.cs-line-number]:select-none [&_.cs-line-number]:text-muted-foreground">
        <CodeshinBlock
          code={code.trim()}
          language={language}
          theme={codeshinTheme}
          lineNumbers={showLineNumbers}
          highlightLines={highlightLines}
          copyButton={false}
          showLanguageBadge={false}
          wrapLines={false}
        />
      </div>
    </div>
  );
}
