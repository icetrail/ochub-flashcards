import { createFileRoute } from '@tanstack/react-router';
import { LoginCallBack } from '@opencampus/ocid-connect-js';
import { config } from '../config';

export const Route = createFileRoute('/redirect')({
  component: RedirectPage,
});

function RedirectPage() {
  const handleLoginSuccess = () => {
    window.location.href = window.location.origin + config.basePath;
  };

  const handleLoginError = (error: Error) => {
    console.error('Login error:', error);
    window.location.href = window.location.origin + config.basePath;
  };

  const LoadingComponent = () => (
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4" />
      <p className="text-gray-500">Completing login...</p>
    </div>
  );

  const ErrorComponent = () => (
    <div className="text-center">
      <p className="text-red-500">Login failed. Redirecting...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoginCallBack
        successCallback={handleLoginSuccess}
        errorCallback={handleLoginError}
        customLoadingComponent={<LoadingComponent />}
        customErrorComponent={<ErrorComponent />}
      />
    </div>
  );
}
