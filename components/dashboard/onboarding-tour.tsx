'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useUser } from '@/hooks/use-user';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';

// Import dynamique de react-joyride pour éviter les erreurs SSR
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

interface Step {
  target: string;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'auto';
  disableBeacon?: boolean;
  disableOverlayClose?: boolean;
  spotlightClicks?: boolean;
}

const ONBOARDING_STORAGE_KEY = 'atletia_onboarding_completed';
const ONBOARDING_REMIND_KEY = 'atletia_onboarding_remind_later';

// Component for tour step content
function TourStepContent({ title, description, extra }: { title: string; description: string; extra?: string }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {extra && (
        <p className="text-sm text-muted-foreground">
          <strong>{extra.split(':')[0]}:</strong>{extra.split(':').slice(1).join(':')}
        </p>
      )}
    </div>
  );
}

export function OnboardingTour() {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const t = useTranslations('tour');
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showFinalButtons, setShowFinalButtons] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading || !user) return;

    const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    const remindLater = localStorage.getItem(ONBOARDING_REMIND_KEY);

    if (pathname === '/dashboard' && !completed && !remindLater) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (pathname === '/dashboard' && remindLater && !completed) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted, loading, user, pathname]);

  const steps = useMemo((): Step[] => {
    if (!user) return [];

    const baseSteps: Step[] = [
      {
        target: '[data-tour="dashboard-header"]',
        content: <TourStepContent title={t('welcome.title')} description={t('welcome.description')} extra={t('welcome.start')} />,
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '[data-tour="sidebar"]',
        content: <TourStepContent title={t('sidebar.title')} description={t('sidebar.description')} extra={t('sidebar.tip')} />,
        placement: 'right',
      },
      {
        target: '[data-tour="dashboard-stats"]',
        content: <TourStepContent title={t('stats.title')} description={t('stats.description')} extra={t('stats.realtime')} />,
        placement: 'bottom',
      },
      {
        target: '[data-tour="profile-link"]',
        content: <TourStepContent title={t('profile.title')} description={t('profile.description')} extra={t('profile.important')} />,
        placement: 'right',
      },
      {
        target: '[data-tour="trainings-link"]',
        content: <TourStepContent title={t('trainings.title')} description={t('trainings.description')} extra={t('trainings.filter')} />,
        placement: 'right',
      },
      {
        target: '[data-tour="nutrition-link"]',
        content: <TourStepContent title={t('nutrition.title')} description={t('nutrition.description')} extra={t('nutrition.adapted')} />,
        placement: 'right',
      },
      {
        target: '[data-tour="messaging-link"]',
        content: <TourStepContent title={t('messaging.title')} description={t('messaging.description')} extra={t('messaging.security')} />,
        placement: 'right',
      },
    ];

    // PRO-specific steps
    if (user.role === 'PRO') {
      baseSteps.push(
        {
          target: '[data-tour="clients-link"]',
          content: <TourStepContent title={t('clients.title')} description={t('clients.description')} extra={t('clients.features')} />,
          placement: 'right',
        },
        {
          target: '[data-tour="organizations-link"]',
          content: <TourStepContent title={t('organizations.title')} description={t('organizations.descriptionPro')} extra={t('organizations.customization')} />,
          placement: 'right',
        },
        {
          target: '[data-tour="assistants-link"]',
          content: <TourStepContent title={t('assistants.title')} description={t('assistants.description')} extra={t('assistants.tip')} />,
          placement: 'right',
        },
        {
          target: '[data-tour="calculators-link"]',
          content: <TourStepContent title={t('calculators.title')} description={t('calculators.description')} extra={t('calculators.purpose')} />,
          placement: 'right',
        },
        {
          target: '[data-tour="subscription-link"]',
          content: <TourStepContent title={t('subscription.title')} description={t('subscription.description')} extra={t('subscription.trial')} />,
          placement: 'right',
        }
      );
    }

    // USER-specific steps
    if (user.role === 'USER') {
      baseSteps.push({
        target: '[data-tour="user-organizations-link"]',
        content: <TourStepContent title={t('organizations.title')} description={t('organizations.descriptionUser')} extra={t('organizations.search')} />,
        placement: 'right',
      });
    }

    // Organization selector step
    if (user.organizationMemberships && user.organizationMemberships.length > 0) {
      baseSteps.push({
        target: '[data-tour="organization-selector"]',
        content: <TourStepContent title={t('orgSelector.title')} description={t('orgSelector.description')} extra={t('orgSelector.context')} />,
        placement: 'right',
      });
    }

    return baseSteps;
  }, [user, t]);

  const handleJoyrideCallback = useCallback((data: any) => {
    const { status, type, index } = data;

    if (type === 'step:after' || type === 'tour:start' || type === 'step:before') {
      setStepIndex(index);
    }

    if (type === 'step:after') {
      if (index === steps.length - 1) {
        setShowFinalButtons(true);
      } else {
        setShowFinalButtons(false);
      }
    }

    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      setShowFinalButtons(false);
    }
  }, [steps.length]);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    localStorage.removeItem(ONBOARDING_REMIND_KEY);
    setRun(false);
    setShowFinalButtons(false);
  };

  const handleRemindLater = () => {
    localStorage.setItem(ONBOARDING_REMIND_KEY, 'true');
    setRun(false);
    setShowFinalButtons(false);
  };

  if (!mounted || !user) {
    return null;
  }

  return (
    <>
      {mounted && steps.length > 0 && (
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={handleJoyrideCallback}
          disableOverlayClose={false}
          disableScrolling={false}
          spotlightClicks={false}
          styles={{
            options: {
              primaryColor: '#3b82f6',
              zIndex: 10000,
            },
            tooltip: {
              borderRadius: 8,
            },
            buttonNext: {
              backgroundColor: '#3b82f6',
              borderRadius: 6,
            },
            buttonBack: {
              color: '#3b82f6',
            },
          }}
          locale={{
            back: t('buttons.back'),
            close: t('buttons.close'),
            last: t('buttons.last'),
            next: t('buttons.next'),
            skip: t('buttons.skip'),
          }}
          floaterProps={{
            disableAnimation: false,
          }}
        />
      )}

      {showFinalButtons && run && stepIndex === steps.length - 1 && (
        <div className="fixed bottom-4 right-4 z-[10001] flex gap-2 animate-in slide-in-from-bottom duration-300">
          <Button
            variant="outline"
            onClick={handleRemindLater}
            className="bg-background shadow-lg"
          >
            <Clock className="mr-2 h-4 w-4" />
            {t('buttons.remindLater')}
          </Button>
          <Button onClick={handleComplete} className="shadow-lg">
            <CheckCircle className="mr-2 h-4 w-4" />
            {t('buttons.understood')}
          </Button>
        </div>
      )}
    </>
  );
}

