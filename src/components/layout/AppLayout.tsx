import type { ReactNode } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
}

export function AppLayout({ children, title, showBack = false }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isPractice = location.pathname.includes('/practice');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showBack && (
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-1 text-gray-600 hover:text-gray-900"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          {title && <h1 className="text-lg font-semibold text-gray-900">{title}</h1>}
        </header>
      )}
      {!showBack && title && (
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </header>
      )}
      <main className="flex-1 p-4 pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => navigate({ to: '/' })}
            className={`flex flex-col items-center justify-center w-full h-full ${
              !isPractice ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            <span className="text-xs mt-1">Decks</span>
          </button>
          <button
            onClick={() => navigate({ to: '/practice' })}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isPractice ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v18" />
              <rect x="4" y="8" width="16" height="8" rx="1" />
            </svg>
            <span className="text-xs mt-1">Practice</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
