'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Combien de temps prend la configuration ?',
    answer: 'La configuration est très rapide ! En moins de 5 minutes, vous pouvez créer votre compte, configurer votre profil et commencer à créer vos premiers programmes. Notre interface intuitive vous guide à chaque étape.',
  },
  {
    question: 'Puis-je essayer avant de payer ?',
    answer: 'Absolument ! Nous offrons un essai gratuit de 14 jours, sans carte bancaire requise. Vous avez accès à toutes les fonctionnalités pendant cette période pour tester la plateforme en conditions réelles.',
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Oui, la sécurité est notre priorité. Nous utilisons un chiffrement AES-256-GCM de niveau bancaire, sommes conformes au RGPD, et vos données sont stockées sur des serveurs sécurisés en Europe. Nous ne partageons jamais vos données avec des tiers.',
  },
  {
    question: 'Puis-je migrer mes données existantes ?',
    answer: 'Oui, nous proposons un service d\'import de données pour faciliter votre transition. Notre équipe peut vous aider à migrer vos clients, programmes et autres données importantes vers Atletia.',
  },
  {
    question: 'Y a-t-il une limite au nombre de clients ?',
    answer: 'Non, il n\'y a aucune limite au nombre de clients que vous pouvez gérer sur Atletia. Que vous ayez 10 ou 1000 clients, vous payez le même prix. C\'est l\'un de nos avantages concurrentiels majeurs.',
  },
  {
    question: 'Puis-je travailler en équipe ?',
    answer: 'Oui ! Avec le plan Annuel, vous pouvez créer des organisations et inviter d\'autres professionnels à collaborer. Partagez des programmes, gérez des clients en commun et communiquez via la messagerie intégrée.',
  },
  {
    question: 'Les assistants IA sont-ils personnalisables ?',
    answer: 'Absolument ! Vous pouvez créer vos propres assistants IA avec des prompts personnalisés, leur donner accès aux profils de vos clients, et les configurer pour répondre aux questions spécifiques de votre domaine.',
  },
  {
    question: 'Que se passe-t-il si je ne suis pas satisfait ?',
    answer: 'Nous offrons une garantie satisfait ou remboursé. Si vous n\'êtes pas satisfait dans les 14 premiers jours, nous vous remboursons intégralement, sans questions posées.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-violet-400 font-medium text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Questions fréquentes
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mt-3 mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            FAQ
          </h2>
          <p className="text-lg text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Tout ce que vous devez savoir sur Atletia ✨
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-700/50 rounded-xl bg-slate-800/30 backdrop-blur-sm px-6 hover:border-violet-500/30 transition-colors"
              >
                <AccordionTrigger
                  className="text-left text-white hover:text-violet-400 transition-colors py-5"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-slate-400 pb-5"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
