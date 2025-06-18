import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-teal-600">
                Accueil
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronDown className="rotate-[-90deg] w-5 h-5 text-gray-400" />
                <span className="ml-1 text-gray-500 md:ml-2">Conditions générales de vente</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions générales de vente</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 1 – Objet</h2>
            <p className="text-gray-700 mb-4">
              La SARL OSMOZ COMMUNICATION dispose d'un savoir-faire reconnu dans la vente de signalétiques et de supports d'impressions adhésifs, non adhésifs, films de découpe, films décoration, films spéciaux et autres accessoires techniques, ci-après dénommés « Produits ».
            </p>
            <p className="text-gray-700 mb-4">
              Les présentes conditions générales de vente ont pour objet de définir les droits et obligations respectifs de OSMOZ COMMUNICATION et de ses Clients dans la vente des produits. Les présentes conditions générales de vente constituent, conformément à l'article L 441-1 du Code de commerce, le socle unique de la relation commerciale entre les parties.
            </p>
            <p className="text-gray-700">
              Conformément à la réglementation en vigueur, ces Conditions Générales de Vente sont systématiquement communiquées à tout Client qui en fait la demande, pour lui permettre de passer commande auprès du Fournisseur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 2 – Généralités</h2>
            <p className="text-gray-700 mb-4">
              Les présentes conditions générales de vente s'appliquent à toutes les commandes de nos produits, sauf accord dérogatoire exprès et préalable à la commande, convenu par écrit entre les parties.
            </p>
            <p className="text-gray-700">
              En conséquence, la passation d'une commande par un Client emporte l'adhésion sans réserve de ce dernier, aux présentes conditions générales de vente, qui prévalent sur tout autre document du Client, et notamment sur toutes conditions générales d'achat, sauf accord dérogatoire exprès, écrit et préalable de OSMOZ COMMUNICATION.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 3 – Commandes</h2>
            <p className="text-gray-700 mb-4">
              Les commandes transmises à OSMOZ COMMUNICATION sont fermes et définitives. Elles ne pourront être modifiées que sur acceptation écrite de OSMOZ COMMUNICATION et à la condition que la demande de modification du Client, formulée par écrit lui parvienne au plus tard 3 jours avant la date de livraison initialement convenue.
            </p>
            <p className="text-gray-700 mb-4">
              Les ventes ne sont parfaites qu'après acceptation expresse et par écrit de la commande du Client, par OSMOZ COMMUNICATION.
            </p>
            <p className="text-gray-700">
              Pour les commandes passées exclusivement sur internet, l'enregistrement d'une commande sur le site de OSMOZ COMMUNICATION (www.ozc-signaletique.fr) est réalisé lorsque le Client accepte les présentes Conditions Générales de Vente en cochant la case prévue à cet effet et valide sa commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 4 – Prix – Conditions de paiement</h2>
            <p className="text-gray-700 mb-4">
              Les Produits sont fournis aux tarifs de OSMOZ COMMUNICATION en vigueur au jour de la passation de la commande. Ces prix sont révisables par OSMOZ COMMUNICATION sans préavis. Ces prix sont nets et HT.
            </p>
            <p className="text-gray-700 mb-4">
              Sauf conditions spécifiques mentionnées en bas de facture, le paiement doit intervenir dans les délais conclus lors de l'ouverture de compte auprès de nos services.
            </p>
            <p className="text-gray-700">
              Aucun escompte ne sera pratiqué par OSMOZ COMMUNICATION pour paiement comptant ou anticipé.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 5 – Livraison</h2>
            <p className="text-gray-700 mb-4">
              OSMOZ COMMUNICATION s'efforce de livrer les produits commandés dans les délais envisagés lors de la commande. Cependant, les délais de livraison ne sont donnés qu'à titre informatif et indicatif.
            </p>
            <p className="text-gray-700 mb-4">
              La livraison est faite franco de port à partir de 300 euros hors taxe de commande, pour les clients en France Métropolitaine.
            </p>
            <p className="text-gray-700">
              Si les Produits livrés ne sont pas conformes aux spécifications indiquées dans l'accusé de réception de la commande ou sont affectés d'un vice apparent, il appartient au Client d'effectuer toutes les réserves nécessaires auprès du transporteur, à réception des Produits et en tout état de cause par lettre recommandée avec AR dans les 3 jours de la livraison.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 6 – Retard de paiement</h2>
            <p className="text-gray-700 mb-4">
              Toute somme non payée à l'échéance entrainera de plein droit, à compter du jour suivant la date de règlement portée sur la facture, et sans qu'une mise en demeure préalable soit nécessaire, l'application de pénalités de retard, d'un montant égal à trois fois le taux de l'intérêt légal en vigueur.
            </p>
            <p className="text-gray-700">
              En sus des pénalités de retard, conformément aux dispositions légales, une indemnité pour frais de recouvrement de 40 € sera due par le Client, à l'égard de la société, dès le premier jour du retard de paiement, pour chaque facture payée en retard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 7 – Clause résolutoire</h2>
            <p className="text-gray-700 mb-4">
              En cas d'inexécution totale ou partielle par le Client de l'une de ses obligations et spécialement le non-respect d'une échéance de paiement, OSMOZ COMMUNICATION pourra décider la résolution de la vente et la résiliation des commandes en cours.
            </p>
            <p className="text-gray-700">
              Cette résolution aura lieu de plein droit 15 jours après l'envoi, par lettre recommandée avec AR d'une mise en demeure, restée, en tout ou partie, sans effet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 8 – Réserve de propriété</h2>
            <p className="text-gray-700 mb-4">
              Le transfert de propriété des produits est suspendu jusqu'à leur complet paiement par le Client, en principal et accessoires, même en cas d'octroi de délais de paiement.
            </p>
            <p className="text-gray-700">
              Nonobstant la réserve de propriété, les risques sont transférés à l'acquéreur dès la livraison.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 9 – Garantie</h2>
            <p className="text-gray-700 mb-4">
              OSMOZ COMMUNICATION garantit les Produits contre les vices cachés dans les conditions et limites de la garantie de ses propres fournisseurs et ne pourra être tenue au-delà en sa qualité d'intermédiaire.
            </p>
            <p className="text-gray-700">
              La garantie cesse de plein droit dès lors que le Client n'a pas averti OSMOZ COMMUNICATION du vice allégué dans un délai de vingt jours francs à partir de la date de commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 10 – Force majeure</h2>
            <p className="text-gray-700 mb-4">
              Sont considérés comme cas de force majeure les événements indépendants de la volonté des parties, qu'elles ne pouvaient raisonnablement ni prévoir, ni éviter ou surmonter ; et dont la survenance rend impossible l'exécution des obligations.
            </p>
            <p className="text-gray-700">
              Sont notamment expressément assimilés à des cas de force majeure déchargeant OSMOZ COMMUNICATION de son obligation de livrer dans les délais initialement prévus : l'incendie, l'inondation, les grèves de production ou de transport, y compris de toute partie de son personnel, les pénuries de matière première, d'énergie et de moyens de transport, les pandémies restreignant la liberté de circuler et l'ouverture des entreprises ou commerces.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 11 – Propriété intellectuelle</h2>
            <p className="text-gray-700">
              OSMOZ COMMUNICATION conserve l'ensemble des droits de propriété industrielle et intellectuelle afférents aux Produits, photos et notices qui ne peuvent être communiqués sans son autorisation écrite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 12 – Données personnelles</h2>
            <p className="text-gray-700 mb-4">
              Les données personnelles recueillies auprès des Clients font l'objet d'un traitement réalisé par OSMOZ COMMUNICATION. Elles sont indispensables au traitement de la commande. Elles seront conservées aussi longtemps que nécessaire pour l'exécution des commandes.
            </p>
            <p className="text-gray-700">
              Conformément à la réglementation applicable, le Client dispose d'un droit d'accès, de rectification, d'effacement, et de portabilité des données le concernant, ainsi que du droit de s'opposer au traitement pour motif légitime, droits qu'il peut exercer en s'adressant au responsable de traitement à l'adresse postale du siège social de la société ou par email : info@ozc-signaletique.fr.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 13 – Litiges</h2>
            <p className="text-gray-700">
              Tout litige relatif à la conclusion, l'interprétation, l'exécution ou la cessation du présent contrat sera soumis, à défaut de résolution amiable, au Tribunal de Commerce de MEAUX.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 