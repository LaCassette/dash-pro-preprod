import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales de Résiliation - Atletia',
  description: 'Conditions générales de résiliation de la plateforme Atletia',
};

export default function TerminationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Conditions Générales de Résiliation</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Objet</h2>
            <p className="mb-4">
              Les présentes Conditions Générales de Résiliation (ci-après les "CGR") ont pour objet de définir les conditions et modalités de résiliation des abonnements et de l'accès aux services proposés par Atletia (ci-après "Atletia" ou le "Prestataire").
            </p>
            <p className="mb-4">
              Toute résiliation est soumise aux présentes CGR, qui complètent les Conditions Générales d'Utilisation et les Conditions Générales de Vente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Résiliation par l'utilisateur</h2>
            
            <h3 className="mb-3 text-xl font-semibold">2.1. Droit de résiliation</h3>
            <p className="mb-4">
              L'utilisateur peut résilier son abonnement à tout moment, sans justification, depuis les paramètres de son compte ou en contactant Atletia par courrier électronique à l'adresse : contact@atletia.fr.
            </p>
            <p className="mb-4">
              La résiliation prend effet à la fin de la période d'abonnement en cours. Aucun remboursement ne sera effectué pour la période d'abonnement déjà payée et en cours.
            </p>
            
            <h3 className="mb-3 text-xl font-semibold">2.2. Modalités de résiliation</h3>
            <p className="mb-4">
              Pour être valide, la résiliation doit être effectuée :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Au minimum 48 heures avant la date de renouvellement automatique de l'abonnement</li>
              <li>Par écrit (courrier électronique ou depuis l'interface de la Plateforme)</li>
              <li>En indiquant clairement la volonté de résilier l'abonnement</li>
            </ul>
            <p className="mb-4">
              Atletia confirmera la résiliation par courrier électronique dans un délai de 48 heures.
            </p>
            
            <h3 className="mb-3 text-xl font-semibold">2.3. Conséquences de la résiliation</h3>
            <p className="mb-4">
              En cas de résiliation par l'utilisateur :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>L'accès aux services payants prend fin à la date d'échéance de l'abonnement en cours</li>
              <li>Aucun remboursement n'est dû pour la période d'abonnement déjà payée</li>
              <li>Les données de l'utilisateur seront conservées pendant 30 jours suivant la résiliation, puis supprimées définitivement, sauf obligation légale de conservation</li>
              <li>L'utilisateur peut exporter ses données avant la suppression définitive</li>
              <li>Le renouvellement automatique est immédiatement désactivé</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Résiliation par Atletia</h2>
            
            <h3 className="mb-3 text-xl font-semibold">3.1. Cas de résiliation unilatérale</h3>
            <p className="mb-4">
              Atletia se réserve le droit de résilier immédiatement et sans préavis l'abonnement de tout utilisateur en cas de :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Violation des Conditions Générales d'Utilisation</strong> : non-respect des règles d'utilisation de la Plateforme</li>
              <li><strong>Violation des Conditions Générales de Vente</strong> : défaut de paiement, utilisation frauduleuse</li>
              <li><strong>Activité illicite</strong> : utilisation de la Plateforme à des fins illégales ou frauduleuses</li>
              <li><strong>Atteinte aux droits de tiers</strong> : violation des droits de propriété intellectuelle, diffamation, etc.</li>
              <li><strong>Comportement abusif</strong> : harcèlement, menaces, ou tout comportement portant atteinte à la sécurité ou à l'intégrité de la Plateforme ou des autres utilisateurs</li>
              <li><strong>Tentative d'intrusion</strong> : tentative d'accès non autorisé aux systèmes, piratage, ou toute action visant à perturber le fonctionnement de la Plateforme</li>
              <li><strong>Usurpation d'identité</strong> : utilisation d'une identité autre que la sienne</li>
              <li><strong>Non-paiement</strong> : défaut de paiement de l'abonnement, refus d'autorisation de paiement, ou tout incident de paiement</li>
              <li><strong>Inactivité prolongée</strong> : absence d'utilisation de la Plateforme pendant une période supérieure à 12 mois consécutifs (sous réserve d'un préavis de 30 jours)</li>
            </ul>
            
            <h3 className="mb-3 text-xl font-semibold">3.2. Procédure de résiliation</h3>
            <p className="mb-4">
              En cas de résiliation par Atletia pour manquement grave, la résiliation prend effet immédiatement, sans préavis ni remboursement.
            </p>
            <p className="mb-4">
              Atletia notifie la résiliation à l'utilisateur par courrier électronique à l'adresse enregistrée dans son compte, en précisant les motifs de la résiliation.
            </p>
            <p className="mb-4">
              L'utilisateur dispose d'un délai de 7 jours pour contester la résiliation par courrier électronique. Passé ce délai, la résiliation devient définitive.
            </p>
            
            <h3 className="mb-3 text-xl font-semibold">3.3. Conséquences de la résiliation par Atletia</h3>
            <p className="mb-4">
              En cas de résiliation par Atletia pour manquement :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>L'accès aux services est immédiatement suspendu</li>
              <li>Aucun remboursement n'est dû, même pour la période d'abonnement en cours</li>
              <li>Les données de l'utilisateur peuvent être supprimées immédiatement, sans préavis</li>
              <li>L'utilisateur ne pourra pas créer un nouveau compte sans autorisation préalable d'Atletia</li>
              <li>Atletia se réserve le droit d'engager des poursuites judiciaires si nécessaire</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Résiliation pour cause de force majeure</h2>
            <p className="mb-4">
              En cas de survenance d'un événement de force majeure rendant impossible l'exécution des obligations d'Atletia, l'abonnement peut être suspendu ou résilié sans préavis ni remboursement.
            </p>
            <p className="mb-4">
              Sont considérés comme cas de force majeure, notamment : catastrophes naturelles, guerres, grèves, pannes majeures des réseaux de télécommunication ou d'électricité, décisions gouvernementales, ou tout autre événement indépendant de la volonté d'Atletia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Résiliation pour modification substantielle des services</h2>
            <p className="mb-4">
              Atletia se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services à tout moment, sans préavis.
            </p>
            <p className="mb-4">
              En cas de modification substantielle des services rendant impossible leur utilisation par l'utilisateur, celui-ci peut résilier son abonnement dans un délai de 30 jours suivant la notification de la modification.
            </p>
            <p className="mb-4">
              Aucun remboursement ne sera dû pour la période d'abonnement en cours, sauf si la modification rend les services totalement inutilisables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Protection des données après résiliation</h2>
            <p className="mb-4">
              Après résiliation, les données de l'utilisateur sont conservées pendant une période de 30 jours, pendant laquelle l'utilisateur peut les exporter.
            </p>
            <p className="mb-4">
              Passé ce délai, les données sont supprimées définitivement, sauf :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Obligation légale de conservation (factures, données comptables, etc.)</li>
              <li>Litige en cours nécessitant la conservation des données à titre de preuve</li>
              <li>Données anonymisées utilisées à des fins statistiques</li>
            </ul>
            <p className="mb-4">
              L'utilisateur est seul responsable de la sauvegarde de ses données avant la résiliation. Atletia ne saurait être tenu responsable de la perte de données après résiliation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Interdiction de réinscription</h2>
            <p className="mb-4">
              En cas de résiliation par Atletia pour manquement grave, l'utilisateur s'interdit de créer un nouveau compte ou d'utiliser la Plateforme sous quelque forme que ce soit, directement ou indirectement.
            </p>
            <p className="mb-4">
              Toute tentative de réinscription ou d'accès non autorisé à la Plateforme après résiliation pour manquement peut entraîner des poursuites judiciaires.
            </p>
            <p className="mb-4">
              Atletia se réserve le droit de refuser toute nouvelle inscription d'un utilisateur ayant fait l'objet d'une résiliation pour manquement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Renonciation au remboursement</h2>
            <p className="mb-4">
              L'utilisateur reconnaît et accepte expressément qu'en cas de résiliation, qu'elle soit à son initiative ou à celle d'Atletia pour manquement, aucun remboursement ne sera dû, même pour la période d'abonnement en cours.
            </p>
            <p className="mb-4">
              Cette renonciation s'applique notamment aux cas suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Résiliation volontaire par l'utilisateur</li>
              <li>Résiliation par Atletia pour violation des CGU, CGV ou des présentes CGR</li>
              <li>Résiliation pour défaut de paiement</li>
              <li>Résiliation pour activité illicite ou comportement abusif</li>
              <li>Résiliation pour modification substantielle des services</li>
            </ul>
            <p className="mb-4">
              Seul le droit de rétractation prévu par la loi (14 jours) peut donner lieu à un remboursement, dans les conditions prévues aux CGV.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Responsabilité limitée</h2>
            <p className="mb-4">
              Atletia ne saurait être tenu responsable des dommages directs ou indirects résultant de la résiliation de l'abonnement, qu'elle soit à l'initiative de l'utilisateur ou d'Atletia.
            </p>
            <p className="mb-4">
              L'utilisateur reconnaît que la résiliation peut entraîner la perte de ses données et de son accès aux services, et accepte cette conséquence.
            </p>
            <p className="mb-4">
              Atletia recommande vivement à l'utilisateur d'exporter régulièrement ses données pour éviter toute perte en cas de résiliation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">10. Droit applicable et juridiction compétente</h2>
            <p className="mb-4">
              Les présentes CGR sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.
            </p>
            <p className="mb-4">
              Conformément aux articles L. 611-1 et R. 612-1 et suivants du Code de la consommation, l'utilisateur a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige qui l'oppose à Atletia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">11. Acceptation des CGR</h2>
            <p className="mb-4">
              L'utilisation de la Plateforme et la souscription d'un abonnement impliquent l'acceptation pleine et entière des présentes CGR.
            </p>
            <p className="mb-4">
              L'utilisateur reconnaît avoir lu, compris et accepté les présentes CGR avant toute utilisation de la Plateforme.
            </p>
            <p className="mb-4">
              Atletia se réserve le droit de modifier les présentes CGR à tout moment. Les modifications prennent effet dès leur publication sur la Plateforme.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">12. Contact</h2>
            <p className="mb-4">
              Pour toute question relative aux présentes CGR, l'utilisateur peut contacter Atletia :
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

