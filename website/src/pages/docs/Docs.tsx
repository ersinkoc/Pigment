import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const sidebarItems = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Colors', href: '/docs/colors' },
      { title: 'Modifiers', href: '/docs/modifiers' },
      { title: 'Chaining', href: '/docs/chaining' },
      { title: 'Nesting', href: '/docs/nesting' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Plugins', href: '/plugins' },
      { title: 'Custom Plugins', href: '/docs/custom-plugins' },
      { title: 'Color Detection', href: '/docs/color-detection' },
    ],
  },
  {
    title: 'Migration',
    items: [
      { title: 'From Chalk', href: '/docs/chalk-migration' },
    ],
  },
];

export function Docs() {
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="sticky top-20 space-y-6">
            {sidebarItems.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                          location.pathname === item.href
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Docs</span>
          </nav>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
