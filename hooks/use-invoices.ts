import { useState, useEffect } from 'react';
import { useUser } from './use-user';
import Stripe from 'stripe';

export function useInvoices() {
  const { user } = useUser();
  const [invoices, setInvoices] = useState<Stripe.Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch('/api/stripe/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInvoices(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user]);

  return { invoices, loading };
}

