export const runtime = 'edge';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions Légales - Atletia',
  description: 'Mentions légales de la plateforme Atletia',
};

export default function MentionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Mentions Légales</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Éditeur du site</h2>
            <p className="mb-4">
              Le site web Atletia est édité par :
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li><strong>Dénomination sociale</strong> : Atletia</li>
              <li><strong>Forme juridique</strong> : [À compléter]</li>
              <li><strong>Capital social</strong> : [À compléter] euros</li>
              <li><strong>Siège social</strong> : [Adresse complète à compléter]</li>
              <li><strong>RCS</strong> : [Ville] [Numéro]</li>
              <li><strong>SIRET</strong> : [Numéro]</li>
              <li><strong>Numéro de TVA intracommunautaire</strong> : [Numéro]</li>
              <li><strong>Directeur de publication</strong> : [Nom]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Hébergeur</h2>
            <p className="mb-4">
              Le site est hébergé par :
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li><strong>Nom</strong> : [Nom de l'hébergeur]</li>
              <li><strong>Adresse</strong> : [Adresse complète]</li>
              <li><strong>Téléphone</strong> : [Numéro]</li>
              <li><strong>Site web</strong> : [URL]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Contact</h2>
            <p className="mb-4">
              Pour toute question ou réclamation, vous pouvez nous contacter :
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li><strong>Email</strong> : contact@atletia.fr</li>
              <li><strong>Adresse postale</strong> : [Adresse complète à compléter]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble du contenu du site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive d'Atletia ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mb-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'Atletia.
            </p>
            <p className="mb-4">
              Toute exploitation non autorisée du site ou de son contenu engage la responsabilité civile et/ou pénale de l'utilisateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Protection des données personnelles</h2>
            <p className="mb-4">
              Les données personnelles collectées sur le site font l'objet d'un traitement informatique destiné à Atletia.
            </p>
            <p className="mb-4">
              Conformément à la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression, de limitation, de portabilité et d'opposition concernant vos données personnelles.
            </p>
            <p className="mb-4">
              Pour plus d'informations, consultez notre <Link href="/legal/privacy" className="text-primary underline">Politique de Confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Cookies</h2>
            <p className="mb-4">
              Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
            <p className="mb-4">
              Pour plus d'informations, consultez notre <Link href="/legal/privacy" className="text-primary underline">Politique de Confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Limitation de responsabilité</h2>
            <p className="mb-4">
              Atletia s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, Atletia ne saurait être tenue responsable :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Des erreurs, omissions ou inexactitudes dans les informations diffusées</li>
              <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
              <li>Des interruptions, suspensions ou dysfonctionnements du site</li>
              <li>Des actes de piratage ou d'intrusion dans les systèmes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Liens hypertextes</h2>
            <p className="mb-4">
              Le site peut contenir des liens hypertextes vers d'autres sites web. Atletia n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu et leur accessibilité.
            </p>
            <p className="mb-4">
              La création de liens hypertextes vers le site est soumise à l'autorisation préalable écrite d'Atletia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Droit applicable</h2>
            <p className="mb-4">
              Les présentes mentions légales sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t">
            <Link href="/" className="text-primary hover:underline">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

