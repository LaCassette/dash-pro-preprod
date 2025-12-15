'use client';
export const runtime = 'edge';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation - Atletia',
  description: 'Conditions générales d\'utilisation de la plateforme Atletia',
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Conditions Générales d'Utilisation</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Objet et champ d'application</h2>
            <p className="mb-4">
              Les présentes Conditions Générales d'Utilisation (ci-après les "CGU") ont pour objet de définir les conditions et modalités d'utilisation de la plateforme Atletia (ci-après la "Plateforme"), accessible à l'adresse web désignée par Atletia, ainsi que les droits et obligations des parties dans ce cadre.
            </p>
            <p className="mb-4">
              Toute utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU. En cas de non-acceptation de ces CGU, l'utilisateur est tenu de ne pas utiliser la Plateforme.
            </p>
            <p className="mb-4">
              Atletia se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur la Plateforme. Il appartient à l'utilisateur de consulter régulièrement les CGU.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Définitions</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Plateforme</strong> : désigne l'ensemble des services, fonctionnalités et contenus proposés par Atletia via son site web et ses applications.</li>
              <li><strong>Utilisateur</strong> : désigne toute personne physique ou morale accédant et utilisant la Plateforme.</li>
              <li><strong>Compte</strong> : désigne l'espace personnel créé par l'utilisateur pour accéder aux services de la Plateforme.</li>
              <li><strong>Contenu</strong> : désigne l'ensemble des données, informations, textes, images, vidéos, programmes et autres éléments accessibles sur la Plateforme.</li>
              <li><strong>Services</strong> : désigne l'ensemble des fonctionnalités et services proposés par Atletia via la Plateforme.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Acceptation des CGU</h2>
            <p className="mb-4">
              L'utilisation de la Plateforme est subordonnée à l'acceptation préalable et sans réserve des présentes CGU. En créant un compte ou en utilisant la Plateforme, l'utilisateur reconnaît avoir lu, compris et accepté les présentes CGU.
            </p>
            <p className="mb-4">
              L'utilisateur reconnaît également avoir la capacité juridique pour s'engager au titre des présentes CGU. Si l'utilisateur est une personne morale, la personne qui accepte les CGU garantit qu'elle a le pouvoir de lier la personne morale.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Création et gestion du compte</h2>
            <p className="mb-4">
              L'accès à certains services de la Plateforme nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour lors de la création de son compte.
            </p>
            <p className="mb-4">
              L'utilisateur est seul responsable de la confidentialité de ses identifiants de connexion (adresse e-mail et mot de passe). Toute utilisation de son compte, qu'elle soit autorisée ou non, est de sa responsabilité.
            </p>
            <p className="mb-4">
              L'utilisateur s'engage à notifier immédiatement Atletia de toute utilisation non autorisée de son compte ou de toute atteinte à la sécurité de ses identifiants.
            </p>
            <p className="mb-4">
              Atletia se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU, sans préavis ni remboursement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Services proposés</h2>
            <p className="mb-4">
              Atletia propose une plateforme permettant aux professionnels du sport et de la nutrition (coachs, nutritionnistes) de créer, gérer et distribuer des programmes personnalisés à leurs clients.
            </p>
            <p className="mb-4">
              Les services incluent notamment :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>La création et la gestion de programmes sportifs et nutritionnels</li>
              <li>La gestion de clients et d'organisations</li>
              <li>La messagerie entre professionnels et clients</li>
              <li>Des assistants IA pour l'aide à la création de programmes</li>
              <li>Des outils de calcul (BMR, IMC, IMG, RTH, Poids idéal)</li>
            </ul>
            <p className="mb-4">
              Atletia se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services à tout moment, sans préavis ni justification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Obligations de l'utilisateur</h2>
            <p className="mb-4">
              L'utilisateur s'engage à utiliser la Plateforme conformément à sa destination et dans le respect des lois et règlements en vigueur.
            </p>
            <p className="mb-4">
              L'utilisateur s'interdit notamment de :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Utiliser la Plateforme à des fins illégales ou frauduleuses</li>
              <li>Porter atteinte aux droits de tiers (droits de propriété intellectuelle, droit à l'image, vie privée, etc.)</li>
              <li>Diffuser des contenus illicites, diffamatoires, injurieux, obscènes, violents, racistes, xénophobes ou contraires aux bonnes mœurs</li>
              <li>Usurper l'identité d'une autre personne ou d'une entité</li>
              <li>Tenter d'accéder de manière non autorisée aux systèmes informatiques de la Plateforme</li>
              <li>Perturber ou interrompre le fonctionnement de la Plateforme</li>
              <li>Reproduire, copier, vendre, revendre ou exploiter à des fins commerciales tout ou partie de la Plateforme</li>
              <li>Utiliser des robots, scripts ou autres moyens automatisés pour accéder à la Plateforme</li>
              <li>Extraire ou tenter d'extraire des données de la Plateforme par quelque moyen que ce soit</li>
            </ul>
            <p className="mb-4">
              Tout manquement aux présentes obligations peut entraîner la suspension ou la suppression du compte de l'utilisateur, sans préavis ni remboursement, et peut donner lieu à des poursuites judiciaires.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Propriété intellectuelle</h2>
            <p className="mb-4">
              La Plateforme, dans son ensemble, ainsi que chacun de ses éléments (textes, images, vidéos, logos, icônes, graphismes, etc.) sont la propriété exclusive d'Atletia ou de ses partenaires et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mb-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments de la Plateforme, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'Atletia.
            </p>
            <p className="mb-4">
              Les contenus créés par l'utilisateur (programmes, messages, etc.) restent sa propriété. En utilisant la Plateforme, l'utilisateur accorde à Atletia une licence non exclusive, mondiale, gratuite et perpétuelle pour utiliser, reproduire, modifier, adapter, publier et distribuer ces contenus dans le cadre de l'exploitation de la Plateforme.
            </p>
            <p className="mb-4">
              L'utilisateur garantit qu'il dispose de tous les droits nécessaires sur les contenus qu'il publie et qu'ils ne portent pas atteinte aux droits de tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Protection des données personnelles</h2>
            <p className="mb-4">
              Les données personnelles collectées sur la Plateforme font l'objet d'un traitement informatique destiné à Atletia. Les données sont conservées pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
            </p>
            <p className="mb-4">
              Conformément à la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD), l'utilisateur dispose d'un droit d'accès, de rectification, de suppression, de limitation, de portabilité et d'opposition concernant ses données personnelles.
            </p>
            <p className="mb-4">
              Pour plus d'informations, l'utilisateur est invité à consulter la <Link href="/legal/privacy" className="text-primary underline">Politique de Confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Disponibilité et responsabilité</h2>
            <p className="mb-4">
              Atletia s'efforce d'assurer une disponibilité et une accessibilité optimales de la Plateforme. Toutefois, Atletia ne peut garantir une disponibilité ininterrompue et sans erreur de la Plateforme.
            </p>
            <p className="mb-4">
              Atletia ne saurait être tenue responsable :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser la Plateforme</li>
              <li>Des interruptions, suspensions ou dysfonctionnements de la Plateforme</li>
              <li>De la perte de données ou d'informations</li>
              <li>Des actes de piratage ou d'intrusion dans les systèmes</li>
              <li>Des contenus créés et publiés par les utilisateurs</li>
              <li>Des relations entre les utilisateurs de la Plateforme</li>
            </ul>
            <p className="mb-4">
              L'utilisateur reconnaît que l'utilisation de la Plateforme se fait sous sa seule responsabilité. Atletia ne saurait être tenue responsable des décisions prises par les professionnels utilisant la Plateforme concernant les programmes créés pour leurs clients.
            </p>
            <p className="mb-4">
              Atletia décline toute responsabilité concernant l'efficacité, la pertinence ou les résultats des programmes créés via la Plateforme. Les professionnels sont seuls responsables des conseils et programmes qu'ils proposent à leurs clients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">10. Tarification et paiement</h2>
            <p className="mb-4">
              L'accès à certains services de la Plateforme peut être soumis à un abonnement payant. Les tarifs sont indiqués en euros TTC et peuvent être modifiés à tout moment par Atletia.
            </p>
            <p className="mb-4">
              Les paiements sont effectués par carte bancaire ou tout autre moyen de paiement accepté par Atletia. Les paiements sont sécurisés et traités par des prestataires tiers spécialisés.
            </p>
            <p className="mb-4">
              En cas de non-paiement ou de paiement refusé, Atletia se réserve le droit de suspendre ou résilier l'accès aux services payants, sans préavis.
            </p>
            <p className="mb-4">
              Les abonnements sont conclus pour une durée déterminée (mensuelle ou annuelle) et se renouvellent automatiquement sauf résiliation par l'utilisateur avant la date d'échéance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">11. Droit de rétractation</h2>
            <p className="mb-4">
              Conformément à l'article L. 221-18 du Code de la consommation, l'utilisateur dispose d'un délai de quatorze (14) jours calendaires à compter de la souscription d'un abonnement pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalité.
            </p>
            <p className="mb-4">
              Pour exercer ce droit, l'utilisateur doit notifier sa décision de rétractation à Atletia par courrier électronique à l'adresse indiquée dans les mentions légales.
            </p>
            <p className="mb-4">
              Si l'utilisateur a commencé à utiliser les services avant l'expiration du délai de rétractation, il peut être tenu de payer une somme correspondant aux services fournis jusqu'à la communication de sa rétractation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">12. Résiliation</h2>
            <p className="mb-4">
              L'utilisateur peut résilier son compte à tout moment depuis les paramètres de son compte ou en contactant Atletia.
            </p>
            <p className="mb-4">
              Atletia se réserve le droit de suspendre ou résilier l'accès de tout utilisateur en cas de violation des présentes CGU, sans préavis ni remboursement.
            </p>
            <p className="mb-4">
              En cas de résiliation, les données de l'utilisateur seront supprimées conformément à la réglementation en vigueur, sauf obligation légale de conservation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">13. Liens hypertextes</h2>
            <p className="mb-4">
              La Plateforme peut contenir des liens hypertextes vers d'autres sites web. Atletia n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu et leur accessibilité.
            </p>
            <p className="mb-4">
              La création de liens hypertextes vers la Plateforme est soumise à l'autorisation préalable écrite d'Atletia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">14. Cookies</h2>
            <p className="mb-4">
              La Plateforme utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. L'utilisateur peut configurer son navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités de la Plateforme.
            </p>
            <p className="mb-4">
              Pour plus d'informations, l'utilisateur est invité à consulter la <Link href="/legal/privacy" className="text-primary underline">Politique de Confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">15. Force majeure</h2>
            <p className="mb-4">
              Atletia ne saurait être tenue responsable de tout retard ou défaillance dans l'exécution de ses obligations résultant de circonstances indépendantes de sa volonté, notamment en cas de force majeure, de grève, de panne, d'attaque informatique, d'interruption des réseaux de télécommunication ou d'électricité.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">16. Modification des CGU</h2>
            <p className="mb-4">
              Atletia se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur la Plateforme.
            </p>
            <p className="mb-4">
              Il appartient à l'utilisateur de consulter régulièrement les CGU. L'utilisation continue de la Plateforme après la publication des modifications vaut acceptation des nouvelles CGU.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">17. Droit applicable et juridiction compétente</h2>
            <p className="mb-4">
              Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.
            </p>
            <p className="mb-4">
              Conformément aux articles L. 611-1 et R. 612-1 et suivants du Code de la consommation, l'utilisateur a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige qui l'oppose à Atletia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">18. Contact</h2>
            <p className="mb-4">
              Pour toute question relative aux présentes CGU, l'utilisateur peut contacter Atletia :
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li>Par courrier électronique : contact@atletia.fr</li>
              <li>Par courrier postal : Atletia - [Adresse complète à compléter]</li>
            </ul>
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

