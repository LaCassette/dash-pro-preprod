'use client';

import { NotificationsProvider } from './notifications-provider';
import { ProAccessGuard } from './pro-access-guard';
import { OnboardingTour } from './onboarding-tour';

export function DashboardClient() {
  return (
    <>
      <NotificationsProvider />
      <ProAccessGuard />
      <OnboardingTour />
    </>
  );
}

