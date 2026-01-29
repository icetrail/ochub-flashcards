import type { ReactNode } from 'react';

interface WidgetLayoutProps {
  children: ReactNode;
}

export function WidgetLayout({ children }: WidgetLayoutProps) {
  return (
    <div className="bg-gray-50 p-2">
      {children}
    </div>
  );
}
