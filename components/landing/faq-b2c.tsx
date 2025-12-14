'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'L\'app est vraiment gratuite ?',
        answer: 'Oui, 100% gratuite ! Tu as accès à toutes les fonctionnalités sans payer un centime. Pas d\'abonnement caché, pas de version "premium" obligatoire. On finance l\'app autrement pour te permettre de profiter de tout gratuitement.',
    },
    {
        question: 'Comment l\'IA personnalise-t-elle mes programmes ?',
        answer: 'L\'IA analyse ton profil (âge, niveau, objectifs, disponibilités, préférences...) pour créer des programmes 100% adaptés. Plus tu utilises l\'app, plus elle te comprend et affine ses recommandations.',
    },
    {
        question: 'Dois-je avoir du matériel de sport ?',
        answer: 'Pas nécessairement ! L\'app te propose des exercices adaptés à ce que tu as. Tu peux faire des séances à la maison sans matériel, ou utiliser les équipements de ta salle si tu en as une.',
    },
    {
        question: 'L\'app est-elle adaptée aux débutants ?',
        answer: 'Absolument ! Que tu n\'aies jamais fait de sport ou que tu sois athlète confirmé, l\'IA adapte les programmes à ton niveau. Elle te guide avec des vidéos et des explications claires.',
    },
    {
        question: 'Puis-je suivre ma nutrition aussi ?',
        answer: 'Oui ! L\'app propose des programmes nutritionnels personnalisés en plus du sport. Tu peux suivre tes repas, recevoir des suggestions et obtenir un accompagnement complet.',
    },
    {
        question: 'Est-ce que je peux être accompagné par un vrai coach ?',
        answer: 'Oui, l\'app permet de te connecter avec un coach professionnel si tu le souhaites. Ton coach peut voir tes progrès et adapter tes programmes. C\'est optionnel et ne change pas le fait que l\'app reste gratuite.',
    },
    {
        question: 'Mes données sont-elles sécurisées ?',
        answer: 'Oui, ta sécurité est notre priorité. Nous utilisons un chiffrement de niveau bancaire (AES-256-GCM) et sommes conformes au RGPD. Tes données ne sont jamais partagées avec des tiers.',
    },
    {
        question: 'L\'app fonctionne-t-elle hors ligne ?',
        answer: 'Certaines fonctionnalités sont accessibles hors ligne (tes programmes sauvegardés, le timer...). Pour les fonctionnalités IA et sync, une connexion internet est nécessaire.',
    },
];

export function FAQB2C() {
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
                        Tu Te Demandes...
                    </h2>
                    <p className="text-lg text-slate-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Tout ce que tu dois savoir sur ATLETIA ✨
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
