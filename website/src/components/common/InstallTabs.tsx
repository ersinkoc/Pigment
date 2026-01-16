import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';
import { NPM_PACKAGE } from '@/lib/constants';

const packageManagers = [
  { name: 'npm', command: `npm install ${NPM_PACKAGE}` },
  { name: 'yarn', command: `yarn add ${NPM_PACKAGE}` },
  { name: 'pnpm', command: `pnpm add ${NPM_PACKAGE}` },
  { name: 'bun', command: `bun add ${NPM_PACKAGE}` },
];

export function InstallTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const { copied, copy } = useClipboard();

  return (
    <div className="w-full max-w-xl">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {packageManagers.map((pm, index) => (
          <button
            key={pm.name}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {pm.name}
          </button>
        ))}
      </div>

      {/* Command */}
      <div className="relative mt-2 flex items-center rounded-lg bg-muted px-4 py-3 font-mono text-sm">
        <code className="flex-1">{packageManagers[activeTab].command}</code>
        <button
          onClick={() => copy(packageManagers[activeTab].command)}
          className="ml-2 p-1.5 rounded hover:bg-accent transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
