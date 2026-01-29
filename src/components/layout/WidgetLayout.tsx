import type { ReactNode } from 'react';

interface WidgetLayoutProps {
  children: ReactNode;
}

export function WidgetLayout({ children }: WidgetLayoutProps) {
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}
