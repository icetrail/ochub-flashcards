import { createRootRoute, Outlet } from '@tanstack/react-router';
import { OCConnect } from '@opencampus/ocid-connect-js';
import { config } from '../config';
import { initAnalytics } from '../services/analyticsService';

initAnalytics();

const opts = {
  clientId: config.ocClientId,
  redirectUri: `${window.location.origin}${config.basePath}redirect`,
  referralCode: 'FLASHCARDS',
};

export const Route = createRootRoute({
  component: () => (
    <OCConnect opts={opts} sandboxMode={config.ocSandbox}>
      <Outlet />
    </OCConnect>
  ),
});
