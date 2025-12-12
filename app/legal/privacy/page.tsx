import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Atletia',
  description: 'Politique de confidentialité et protection des données personnelles de la plateforme Atletia',
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Politique de Confidentialité</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
            <p className="mb-4">
              Atletia (ci-après "nous", "notre" ou "Atletia") s'engage à protéger la confidentialité et la sécurité des données personnelles de ses utilisateurs (ci-après "vous" ou "l'utilisateur").
            </p>
            <p className="mb-4">
              La présente Politique de Confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
            <p className="mb-4">
              En utilisant notre Plateforme, vous acceptez les pratiques décrites dans cette politique.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Responsable du traitement</h2>
            <p className="mb-4">
              Le responsable du traitement des données personnelles est :
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li><strong>Dénomination</strong> : Atletia</li>
              <li><strong>Adresse</strong> : [Adresse complète à compléter]</li>
              <li><strong>Email</strong> : hello@atletia.fit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Données collectées</h2>
            
            <h3 className="mb-3 text-xl font-semibold">3.1. Données collectées directement</h3>
            <p className="mb-4">
              Nous collectons les données suivantes lorsque vous créez un compte ou utilisez notre Plateforme :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Données d'identification</strong> : nom, prénom, adresse email, photo de profil</li>
              <li><strong>Données d'authentification</strong> : identifiants de connexion (gérés par Auth0)</li>
              <li><strong>Données de profil</strong> : rôle (USER, PRO, ADMIN), organisations membres</li>
              <li><strong>Données de santé</strong> : données du profil sportif et nutritionnel (âge, poids, taille, sexe biologique, objectifs, etc.) - ces données sont chiffrées</li>
              <li><strong>Données de communication</strong> : messages échangés via la messagerie (chiffrés)</li>
              <li><strong>Données de contenu</strong> : programmes créés, sessions d'assistants IA</li>
              <li><strong>Données de paiement</strong> : informations de facturation (traitées par des prestataires tiers certifiés PCI-DSS)</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">3.2. Données collectées automatiquement</h3>
            <p className="mb-4">
              Lors de votre navigation sur la Plateforme, nous collectons automatiquement :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Données techniques</strong> : adresse IP, type de navigateur, système d'exploitation, résolution d'écran</li>
              <li><strong>Données de navigation</strong> : pages visitées, durée de visite, clics, parcours utilisateur</li>
              <li><strong>Cookies et technologies similaires</strong> : voir section 8</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Finalités du traitement</h2>
            <p className="mb-4">
              Nous utilisons vos données personnelles pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Exécution du contrat</strong> : fourniture des services, gestion de votre compte, traitement des paiements</li>
              <li><strong>Amélioration des services</strong> : analyse de l'utilisation, développement de nouvelles fonctionnalités</li>
              <li><strong>Communication</strong> : envoi de notifications, réponses à vos demandes, support client</li>
              <li><strong>Sécurité</strong> : prévention de la fraude, détection d'activités suspectes, sécurisation de la Plateforme</li>
              <li><strong>Obligations légales</strong> : conservation des données comptables, respect des obligations fiscales</li>
              <li><strong>Marketing</strong> : envoi de newsletters (avec votre consentement), promotion de nos services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Base légale du traitement</h2>
            <p className="mb-4">
              Le traitement de vos données personnelles est fondé sur :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>L'exécution d'un contrat</strong> : pour la fourniture des services souscrits</li>
              <li><strong>Votre consentement</strong> : pour l'envoi de newsletters, l'utilisation de cookies non essentiels</li>
              <li><strong>L'intérêt légitime</strong> : pour l'amélioration des services, la sécurité, la prévention de la fraude</li>
              <li><strong>Les obligations légales</strong> : pour la conservation des données comptables et fiscales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Conservation des données</h2>
            <p className="mb-4">
              Nous conservons vos données personnelles pour les durées suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Données de compte actif</strong> : pendant toute la durée de votre abonnement et 30 jours après résiliation</li>
              <li><strong>Données de facturation</strong> : 10 ans (obligation légale comptable)</li>
              <li><strong>Données de navigation</strong> : 13 mois maximum</li>
              <li><strong>Cookies</strong> : selon la durée indiquée dans les paramètres de chaque cookie</li>
              <li><strong>Données supprimées</strong> : suppression définitive après les délais de conservation, sauf obligation légale</li>
            </ul>
            <p className="mb-4">
              Après résiliation de votre compte, vos données sont conservées 30 jours pour permettre leur exportation, puis supprimées définitivement, sauf obligation légale de conservation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Sécurité des données</h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>L'accès non autorisé</li>
              <li>La perte ou la destruction accidentelle</li>
              <li>La divulgation non autorisée</li>
              <li>La modification non autorisée</li>
            </ul>
            <p className="mb-4">
              <strong>Mesures de sécurité mises en place :</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Chiffrement</strong> : chiffrement AES-256-GCM pour les données sensibles (profils santé, messages)</li>
              <li><strong>Authentification</strong> : authentification sécurisée via Auth0 avec OAuth 2.0</li>
              <li><strong>HTTPS</strong> : toutes les communications sont sécurisées par SSL/TLS</li>
              <li><strong>Contrôle d'accès</strong> : accès restreint aux données selon les rôles et permissions</li>
              <li><strong>Sauvegardes</strong> : sauvegardes régulières et sécurisées des données</li>
              <li><strong>Surveillance</strong> : monitoring et détection d'intrusions</li>
            </ul>
            <p className="mb-4">
              Malgré ces mesures, aucun système n'est totalement sécurisé. Nous ne pouvons garantir une sécurité absolue.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Cookies et technologies similaires</h2>
            <p className="mb-4">
              Nous utilisons des cookies et technologies similaires pour :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Assurer le fonctionnement de la Plateforme (cookies essentiels)</li>
              <li>Mémoriser vos préférences (thème, langue, etc.)</li>
              <li>Analyser l'utilisation de la Plateforme (cookies analytiques)</li>
              <li>Améliorer votre expérience utilisateur</li>
            </ul>
            <p className="mb-4">
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités de la Plateforme.
            </p>
            <p className="mb-4">
              Les cookies essentiels ne nécessitent pas votre consentement. Les cookies non essentiels (analytiques, marketing) nécessitent votre consentement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Partage des données</h2>
            <p className="mb-4">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
            <p className="mb-4">
              Nous pouvons partager vos données avec :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Prestataires de services</strong> : hébergeurs, services de paiement, services d'authentification (Auth0), services d'analyse (tous certifiés et conformes RGPD)</li>
              <li><strong>Autorités compétentes</strong> : en cas d'obligation légale ou de demande judiciaire</li>
              <li><strong>Autres utilisateurs</strong> : dans le cadre de l'utilisation normale de la Plateforme (ex. : messages entre professionnels et clients, programmes partagés)</li>
            </ul>
            <p className="mb-4">
              Tous nos prestataires sont soumis à des obligations strictes de confidentialité et de sécurité.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">10. Transferts internationaux</h2>
            <p className="mb-4">
              Vos données peuvent être transférées et stockées dans des pays situés en dehors de l'Union Européenne, notamment aux États-Unis (pour Auth0 et certains services cloud).
            </p>
            <p className="mb-4">
              Ces transferts sont encadrés par des garanties appropriées conformes au RGPD :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Clauses contractuelles types de la Commission européenne</li>
              <li>Certifications Privacy Shield (si applicable)</li>
              <li>Autres garanties appropriées reconnues par la Commission européenne</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">11. Vos droits</h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données (sous certaines conditions)</li>
              <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données pour des motifs légitimes</li>
              <li><strong>Droit de retirer votre consentement</strong> : retirer votre consentement à tout moment (pour les traitements basés sur le consentement)</li>
              <li><strong>Droit de définir des directives post-mortem</strong> : définir le sort de vos données après votre décès</li>
            </ul>
            <p className="mb-4">
              Pour exercer ces droits, contactez-nous à : <strong>contact@atletia.fr</strong> ou via les paramètres de votre compte.
            </p>
            <p className="mb-4">
              Nous répondrons à votre demande dans un délai d'un mois. Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">12. Données des mineurs</h2>
            <p className="mb-4">
              Notre Plateforme n'est pas destinée aux mineurs de moins de 16 ans. Nous ne collectons pas sciemment de données personnelles concernant des mineurs.
            </p>
            <p className="mb-4">
              Si nous apprenons qu'un mineur nous a fourni des données personnelles, nous les supprimerons immédiatement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">13. Modifications de la politique</h2>
            <p className="mb-4">
              Nous pouvons modifier cette Politique de Confidentialité à tout moment. Les modifications prennent effet dès leur publication sur la Plateforme.
            </p>
            <p className="mb-4">
              Nous vous informerons des modifications importantes par courrier électronique ou via une notification sur la Plateforme.
            </p>
            <p className="mb-4">
              Il vous appartient de consulter régulièrement cette politique pour prendre connaissance des éventuelles modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">14. Contact</h2>
            <p className="mb-4">
              Pour toute question concernant cette Politique de Confidentialité ou pour exercer vos droits, contactez-nous :
            </p>
            <ul className="list-none pl-0 space-y-2 mb-4">
              <li><strong>Email</strong> : contact@atletia.fr</li>
              <li><strong>Adresse postale</strong> : [Adresse complète à compléter]</li>
            </ul>
            <p className="mb-4">
              <strong>Délégué à la Protection des Données (DPO)</strong> : [Nom et coordonnées à compléter si applicable]
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

