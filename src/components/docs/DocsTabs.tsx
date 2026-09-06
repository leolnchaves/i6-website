import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import type { DocTab } from '@/utils/docsBlocks';

interface DocsTabsProps {
  tabs: DocTab[];
  activeKey: string;
  onSelect: (key: string) => void;
  children: ReactNode;
  label?: string;
}

/**
 * Method tabs inside a single documentation page (API / SDK / server to server).
 *
 * The active tab lives in the URL (`?tab=`), never in local state, so the panel
 * body is rendered by the parent and passed in as children — a tab change is a
 * full re-render of the content, which keeps heading ids stable.
 */
const DocsTabs = ({ tabs, activeKey, onSelect, children, label }: DocsTabsProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const target = buttons?.[(index + tabs.length) % tabs.length];
    if (!target) return;
    target.focus();
    onSelect(target.dataset.tabKey!);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  return (
    <div className="mt-10">
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        className="mb-8 flex flex-wrap gap-2 border-b border-border pb-3"
      >
        {tabs.map((tab, index) => {
          const active = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`docs-tab-${tab.key}`}
              data-tab-key={tab.key}
              aria-selected={active}
              aria-controls={`docs-tabpanel-${tab.key}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(tab.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`docs-tabpanel-${activeKey}`}
        aria-labelledby={`docs-tab-${activeKey}`}
        tabIndex={0}
        className="focus:outline-none"
      >
        {children}
      </div>
    </div>
  );
};

export default DocsTabs;
