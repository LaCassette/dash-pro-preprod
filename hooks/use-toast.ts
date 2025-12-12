'use client';

import { toast as sonnerToast } from 'sonner';

export function useToast() {
  return {
    toast: (props: {
      title: string;
      description?: string;
      variant?: 'default' | 'destructive';
      onClick?: () => void;
    }) => {
      const toastOptions: any = {
        description: props.description,
      };

      if (props.onClick) {
        toastOptions.action = {
          label: 'Voir',
          onClick: props.onClick,
        };
      }

      if (props.variant === 'destructive') {
        sonnerToast.error(props.title, toastOptions);
      } else {
        sonnerToast.info(props.title, toastOptions);
      }
    },
  };
}

