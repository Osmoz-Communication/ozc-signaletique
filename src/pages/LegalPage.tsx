import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const LegalPage = () => {
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
                <span className="ml-1 text-gray-500 md:ml-2">Mentions légales</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions légales</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations légales</h2>
            <div className="prose prose-gray max-w-none">
              <p>Le site www.ozc-signaletique.fr est la propriété de la société :</p>
              
              <div className="bg-gray-50 p-4 rounded-lg my-4">
                <strong>OSMOZ COMMUNICATION</strong><br />
                36 rue Bertrand Flornoy<br />
                77120 Coulommiers<br />
                France<br />
                Tél : 01.84.19.01.04<br /><br />
                
                TVA intra-communautaire : FR 86 800 216 301<br />
                Siret : 800 216 301 000 39<br />
                Code APE : 7021Z
              </div>
              
              <p>Le directeur de la publication du site Internet est Monsieur Jean-Marc DUMINIL, en qualité de représentant légal de la Société OSMOZ COMMUNICATION.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Crédits photographiques</h2>
            <p className="text-gray-700">
              Sauf mention contraire, les photographies présentes sur le présent site sont la propriété de OSMOZ COMMUNICATION.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-700 mb-4">
              La structure générale ainsi que les logiciels, textes, images animées ou non, sons, savoir-faire… et tous les autres éléments composant le site sont la propriété exclusive de OSMOZ COMMUNICATION ou sont régulièrement exploités sous licence.
            </p>
            <p className="text-gray-700">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques ou photographiques.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Paiement sécurisé</h2>
            <p className="text-gray-700">
              Le paiement par carte bancaire est effectué par transaction sécurisée, directement auprès de notre banque partenaire CIC.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
            <p className="text-gray-700">
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse : 
              <a href="mailto:info@ozc-signaletique.fr" className="text-teal-600 hover:text-teal-700 ml-1">
                info@ozc-signaletique.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalPage; 