import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const PrivacyPage = () => {
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
                <span className="ml-1 text-gray-500 md:ml-2">Politique de confidentialité</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notre politique de confidentialité en toute transparence</h2>
            <p className="text-gray-700">
              Nous vous rappelons que vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent (art. 34 de la loi "Informatique et libertés" du 6 janvier 1978). Pour exercer ce droit, adressez-vous par e-mail à <a href="mailto:info@ozc-signaletique.fr" className="text-teal-600 hover:text-teal-700">info@ozc-signaletique.fr</a> ou par courrier à OSMOZ COMMUNICATION, 36 rue Bertrand Flornoy, 77120 Coulommiers, France.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Collecte des données</h2>
            
            <h3 className="text-lg font-medium text-gray-800 mb-3">Qu'est-ce qu'une donnée personnelle ?</h3>
            <p className="text-gray-700 mb-4">
              Le terme « donnée personnelle » regroupe toutes les informations qui permettent d'identifier une personne : nom, adresse postale, numéro de téléphone, adresse électronique ou adresse IP…
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-3">Quelles sont mes données personnelles collectées ?</h3>
            <p className="text-gray-700 mb-4">
              OZC Signalétique peut être amenée à collecter vos nom, adresse postale, adresse email, mot de passe, numéros de téléphone, données de navigation, historique de commandes, préférences et centres d'intérêts, produits consultés, éléments relatifs au suivi de votre commande.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-3">Qui est responsable du traitement sur mes données personnelles ?</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-2">
                <strong>OZC Signalétique</strong> est le responsable de traitement (La personne, l'autorité publique ou l'organisme qui détermine les finalités c'est-à-dire à quoi servent les données et les moyens)
              </p>
              <p className="text-gray-700">
                OZC Signalétique Service Marketing – Protection des données personnelles<br />
                36 rue Bertrand Flornoy, 77120 Coulommiers, France
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">À quoi servent vos données ?</h2>
            
            <h3 className="text-lg font-medium text-gray-800 mb-3">Traitements opérés sur le fondement légal de l'exécution de nos obligations contractuelles</h3>
            <p className="text-gray-700 mb-4">Commande, livraison, facturation, service après-vente.</p>

            <h3 className="text-lg font-medium text-gray-800 mb-3">Traitements opérés sur le fondement légal de votre consentement</h3>
            <ul className="text-gray-700 mb-4 list-disc list-inside">
              <li>Jeu-concours</li>
              <li>Prospections commerciales</li>
              <li>Gestion du programme de fidélité</li>
              <li>Dépose des cookies pour proposer des contenus et de la publicité ciblée adaptés à vos centres d'intérêt</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mb-3">Traitements opérés sur le fondement de l'intérêt légitime poursuivi par OZC Signalétique</h3>
            <ul className="text-gray-700 mb-4 list-disc list-inside">
              <li>Enquête de satisfaction</li>
              <li>Contrôle d'éventuelles fraudes</li>
              <li>Gestion des avis produits</li>
              <li>Analyses statistiques</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">À qui sont destinées vos données ?</h2>
            <p className="text-gray-700">
              Les données collectées sur ce Site sont à destination de la société OZC Signalétique, en sa qualité de responsable de traitement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Comment sont protégées vos données ?</h2>
            <p className="text-gray-700">
              ozc-signaletique.fr prend toutes les précautions pour préserver la sécurité de vos données afin, notamment, d'empêcher leur divulgation à des tiers non-autorisés. À ce titre, nous mettons en place toutes les mesures nécessaires à la sécurisation de ses dispositifs informatiques.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Conservation</h2>
            <p className="text-gray-700 mb-4">
              Les données de la base de prospection active sont conservées trois ans à compter de la fin de la relation commerciale ou du dernier contact.
            </p>
            <p className="text-gray-700">
              Les données nécessaires au respect d'une obligation légale sont conservées conformément aux dispositions en vigueur (notamment mais non exclusivement celles prévues par le code de commerce, le code civil et le code de la consommation).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quels sont vos droits ?</h2>
            <p className="text-gray-700 mb-4">Vous bénéficiez :</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">D'un droit d'accès :</h3>
                <p className="text-gray-700">Le droit pour toute personne d'obtenir la communication de toutes les informations la concernant détenues par OZC Signalétique.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">D'un droit de rectification :</h3>
                <p className="text-gray-700">Le droit pour toute personne d'obtenir la rectification des informations inexactes la concernant détenues par OZC Signalétique.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">D'un droit d'opposition :</h3>
                <p className="text-gray-700">Le droit d'opposition s'exerce soit au moment de la collecte d'informations, soit plus tard, en s'adressant au responsable du fichier.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">D'un droit de portabilité :</h3>
                <p className="text-gray-700">La personne a le droit d'obtenir que ses données à caractère personnel soient transmises dans un format structuré.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">D'un droit d'introduire une réclamation :</h3>
                <p className="text-gray-700">Auprès d'une autorité de contrôle.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enregistrement de données au moyen de cookies</h2>
            
            <h3 className="text-lg font-medium text-gray-800 mb-3">Qu'est ce qu'un cookie ?</h3>
            <p className="text-gray-700 mb-4">
              Un cookie est un petit fichier contenant diverses informations textuelles. Il est déposé sur votre terminal (ordinateur, tablette, smartphone…) via votre navigateur, par le site web que vous visitez.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-3">Les différents types de cookies</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800">Les cookies essentiels</h4>
                <p className="text-gray-700">Ces cookies sont nécessaires au bon fonctionnement de notre site et vous permettent d'utiliser les fonctionnalités de base (accès compte client, ajout un produit au panier,…).</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800">Les cookies de confort</h4>
                <p className="text-gray-700">Ces cookies amènent des fonctionnalités supplémentaires qui sont susceptibles d'intéresser l'internaute, sans pour autant être indispensable au fonctionnement de base du site.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800">Les cookies analytiques</h4>
                <p className="text-gray-700">Ces cookies nous permettent de connaître l'utilisation et les performances de notre site et d'en améliorer le fonctionnement.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800">Les cookies publicitaires</h4>
                <p className="text-gray-700">Ces cookies collectent des informations sur vos habitudes de navigation dans le but de vous présenter des publicités adaptées à vos centres d'intérêt.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
            <p className="text-gray-700">
              Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-gray-700">
                <strong>Par email :</strong> <a href="mailto:info@ozc-signaletique.fr" className="text-teal-600 hover:text-teal-700">info@ozc-signaletique.fr</a><br />
                <strong>Par courrier :</strong> OZC Signalétique Service Marketing – Protection des données personnelles<br />
                36 rue Bertrand Flornoy, 77120 Coulommiers, France
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 