import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - Atletia',
  description: 'Conditions générales de vente de la plateforme Atletia',
};

export default function CGVPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Conditions Générales de Vente</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Objet</h2>
            <p className="mb-4">
              Les présentes Conditions Générales de Vente (ci-après les "CGV") ont pour objet de définir les conditions et modalités de vente des services proposés par Atletia (ci-après le "Vendeur") via sa plateforme en ligne (ci-après la "Plateforme").
            </p>
            <p className="mb-4">
              Toute commande de services implique l'acceptation sans réserve des présentes CGV par l'acheteur (ci-après le "Client").
            </p>
            <p className="mb-4">
              Les CGV prévalent sur tout autre document, sauf accord écrit contraire du Vendeur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Identification du Vendeur</h2>
            <p className="mb-4">
              La Plateforme est exploitée par Atletia, société [forme sociale] au capital de [montant] euros, immatriculée au RCS de [ville] sous le numéro [numéro], dont le siège social est situé à [adresse complète].
            </p>
            <p className="mb-4">
              Numéro de TVA intracommunautaire : [numéro]
            </p>
            <p className="mb-4">
              Directeur de publication : [nom]
            </p>
            <p className="mb-4">
              Hébergeur : [nom et adresse de l'hébergeur]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Services proposés</h2>
            <p className="mb-4">
              Atletia propose des abonnements à sa plateforme permettant l'accès à des services de création et de gestion de programmes sportifs et nutritionnels.
            </p>
            <p className="mb-4">
              Les services sont décrits de manière précise sur la Plateforme. Le Vendeur se réserve le droit de modifier à tout moment les caractéristiques des services proposés, sous réserve d'en informer préalablement les Clients.
            </p>
            <p className="mb-4">
              Les photographies et graphismes présentés sur la Plateforme ne sont pas contractuels et ne sauraient engager la responsabilité du Vendeur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Tarifs</h2>
            <p className="mb-4">
              Les prix des services sont indiqués en euros TTC (Toutes Taxes Comprises) sur la Plateforme.
            </p>
            <p className="mb-4">
              Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au jour de la commande sera le seul applicable à l'acheteur pour ladite commande.
            </p>
            <p className="mb-4">
              Les tarifs en vigueur sont les suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Abonnement mensuel</strong> : 49€ TTC par mois</li>
              <li><strong>Abonnement annuel</strong> : 499€ TTC par an (soit 41,58€ TTC par mois)</li>
            </ul>
            <p className="mb-4">
              Les prix comprennent l'accès à l'ensemble des fonctionnalités de la Plateforme pour la durée de l'abonnement souscrit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Commande</h2>
            <p className="mb-4">
              Le Client passe commande directement sur la Plateforme en sélectionnant l'abonnement souhaité et en procédant au paiement.
            </p>
            <p className="mb-4">
              Toute commande vaut acceptation des prix et descriptions des services disponibles à la vente. Le Client reconnaît avoir pris connaissance, préalablement à sa commande, des CGV et des caractéristiques essentielles des services.
            </p>
            <p className="mb-4">
              La validation de la commande par le Client emporte acceptation pleine et entière des CGV.
            </p>
            <p className="mb-4">
              Le Vendeur confirme la commande par l'envoi d'un courrier électronique de confirmation à l'adresse indiquée par le Client lors de la commande.
            </p>
            <p className="mb-4">
              Le Vendeur se réserve le droit d'annuler ou de refuser toute commande d'un Client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Paiement</h2>
            <p className="mb-4">
              Le paiement s'effectue par carte bancaire ou tout autre moyen de paiement proposé sur la Plateforme au moment de la commande.
            </p>
            <p className="mb-4">
              Le paiement est exigible immédiatement lors de la passation de la commande pour les abonnements mensuels, et au moment de chaque renouvellement.
            </p>
            <p className="mb-4">
              Pour les abonnements annuels, le paiement s'effectue en une seule fois lors de la souscription.
            </p>
            <p className="mb-4">
              Les transactions sont sécurisées. Le Vendeur ne conserve aucune donnée bancaire. Le traitement des paiements est confié à des prestataires spécialisés certifiés PCI-DSS.
            </p>
            <p className="mb-4">
              En cas de défaut de paiement, de refus d'autorisation de paiement par carte bancaire ou de tout autre incident de paiement, le Vendeur se réserve le droit de suspendre ou d'annuler la commande et/ou l'abonnement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Droit de rétractation</h2>
            <p className="mb-4">
              Conformément aux dispositions de l'article L. 221-18 du Code de la consommation, le Client dispose d'un délai de quatorze (14) jours calendaires à compter de la souscription de l'abonnement pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalité.
            </p>
            <p className="mb-4">
              Pour exercer ce droit, le Client doit notifier sa décision de rétractation au Vendeur par courrier électronique à l'adresse : contact@atletia.fr, ou par courrier postal à l'adresse du siège social.
            </p>
            <p className="mb-4">
              Si le Client a commencé à utiliser les services avant l'expiration du délai de rétractation, il peut être tenu de payer une somme correspondant aux services fournis jusqu'à la communication de sa rétractation, proportionnellement au prix total convenu.
            </p>
            <p className="mb-4">
              En cas de rétractation, le Vendeur remboursera tous les paiements reçus du Client, y compris les frais de livraison, sans retard excessif et, en tout état de cause, au plus tard quatorze (14) jours à compter du jour où le Vendeur est informé de la décision de rétractation du Client.
            </p>
            <p className="mb-4">
              Le remboursement sera effectué en utilisant le même moyen de paiement que celui utilisé par le Client pour la transaction initiale, sauf accord exprès du Client pour un autre moyen de paiement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Exécution des services</h2>
            <p className="mb-4">
              L'accès aux services est immédiat après la validation de la commande et le paiement.
            </p>
            <p className="mb-4">
              Le Client reçoit un courrier électronique de confirmation contenant ses identifiants de connexion et les informations nécessaires à l'utilisation de la Plateforme.
            </p>
            <p className="mb-4">
              Le Vendeur s'engage à fournir les services avec le soin et la diligence d'un professionnel. Toutefois, le Vendeur ne saurait être tenu responsable des dommages résultant d'une utilisation inappropriée de la Plateforme par le Client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Durée et renouvellement</h2>
            <p className="mb-4">
              Les abonnements sont conclus pour une durée déterminée :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Abonnement mensuel : 1 mois, renouvelable automatiquement par tacite reconduction</li>
              <li>Abonnement annuel : 12 mois, renouvelable automatiquement par tacite reconduction</li>
            </ul>
            <p className="mb-4">
              Le renouvellement automatique s'effectue à la date d'échéance de l'abonnement en cours, sauf résiliation par le Client avant cette date.
            </p>
            <p className="mb-4">
              Le Client peut résilier son abonnement à tout moment depuis les paramètres de son compte ou en contactant le Vendeur. La résiliation prend effet à la fin de la période d'abonnement en cours. Aucun remboursement ne sera effectué pour la période en cours.
            </p>
            <p className="mb-4">
              Le Vendeur se réserve le droit de résilier l'abonnement du Client en cas de manquement aux obligations contractuelles ou aux Conditions Générales d'Utilisation, sans préavis ni remboursement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">10. Disponibilité des services</h2>
            <p className="mb-4">
              Le Vendeur s'efforce d'assurer une disponibilité et une accessibilité optimales de la Plateforme. Toutefois, le Vendeur ne peut garantir une disponibilité ininterrompue et sans erreur.
            </p>
            <p className="mb-4">
              Le Vendeur se réserve le droit d'interrompre temporairement l'accès à la Plateforme pour des raisons de maintenance, de mise à jour ou pour toute autre raison technique, sans que cela n'ouvre droit à une indemnité ou à un remboursement.
            </p>
            <p className="mb-4">
              Le Vendeur s'engage à informer les Clients, dans la mesure du possible, de toute interruption prévue de la Plateforme.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">11. Garanties et responsabilité</h2>
            <p className="mb-4">
              Le Vendeur garantit que les services sont conformes à leur description sur la Plateforme.
            </p>
            <p className="mb-4">
              Le Vendeur ne saurait être tenu responsable :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser la Plateforme</li>
              <li>Des interruptions, suspensions ou dysfonctionnements de la Plateforme</li>
              <li>De la perte de données ou d'informations</li>
              <li>Des actes de piratage ou d'intrusion dans les systèmes</li>
              <li>Des contenus créés et publiés par les utilisateurs</li>
              <li>Des décisions prises par les professionnels utilisant la Plateforme concernant les programmes créés pour leurs clients</li>
            </ul>
            <p className="mb-4">
              La responsabilité du Vendeur est limitée au montant des sommes versées par le Client au titre de l'abonnement en cours.
            </p>
            <p className="mb-4">
              Le Vendeur décline toute responsabilité concernant l'efficacité, la pertinence ou les résultats des programmes créés via la Plateforme. Les professionnels sont seuls responsables des conseils et programmes qu'ils proposent à leurs clients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">12. Propriété intellectuelle</h2>
            <p className="mb-4">
              La Plateforme et l'ensemble de ses éléments (textes, images, vidéos, logos, graphismes, etc.) sont la propriété exclusive du Vendeur ou de ses partenaires et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mb-4">
              L'abonnement confère au Client un droit d'utilisation personnelle et non exclusive de la Plateforme, à l'exclusion de tout droit de reproduction, de représentation, de modification ou d'adaptation.
            </p>
            <p className="mb-4">
              Toute utilisation non autorisée de la Plateforme ou de ses éléments peut entraîner des poursuites judiciaires.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">13. Protection des données personnelles</h2>
            <p className="mb-4">
              Les données personnelles collectées dans le cadre de la commande sont traitées conformément à la réglementation en vigueur, notamment le RGPD.
            </p>
            <p className="mb-4">
              Pour plus d'informations, le Client est invité à consulter la <Link href="/legal/privacy" className="text-primary underline">Politique de Confidentialité</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">14. Réclamations et médiation</h2>
            <p className="mb-4">
              Toute réclamation doit être adressée au Vendeur par courrier électronique à l'adresse : contact@atletia.fr, ou par courrier postal à l'adresse du siège social.
            </p>
            <p className="mb-4">
              Conformément aux articles L. 611-1 et R. 612-1 et suivants du Code de la consommation, le Client a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige qui l'oppose au Vendeur.
            </p>
            <p className="mb-4">
              Le Client peut également utiliser la plateforme de règlement en ligne des litiges mise en place par la Commission européenne : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://ec.europa.eu/consumers/odr</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">15. Droit applicable et juridiction compétente</h2>
            <p className="mb-4">
              Les présentes CGV sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">16. Contact</h2>
            <p className="mb-4">
              Pour toute question relative aux présentes CGV, le Client peut contacter le Vendeur :
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

