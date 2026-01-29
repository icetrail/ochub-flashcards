import { OCAnalytics } from '@opencampus/ochub-utils';
import { config } from '../config';

let analyticsInstance: OCAnalytics | null = null;

export function initAnalytics(): void {
  if (!analyticsInstance) {
    analyticsInstance = OCAnalytics.initialize('flashcards', {
      containerId: config.gaId,
    });
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (analyticsInstance) {
    analyticsInstance.trackEvent(eventName, params || {});
  }
}

export const AnalyticsEvents = {
  DECK_CREATED: 'deck_created',
  DECK_DELETED: 'deck_deleted',
  CARD_CREATED: 'card_created',
  CARD_DELETED: 'card_deleted',
  CARD_VIEWED: 'card_viewed',
  CARD_FLIPPED: 'card_flipped',
  WIDGET_LOADED: 'widget_loaded',
} as const;
