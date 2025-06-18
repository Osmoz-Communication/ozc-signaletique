import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqData = [
    {
      id: 'commandes',
      title: 'Commandes & Paiement',
      icon: '🛒',
      questions: [
        {
          id: 'comment-commander',
          question: 'Comment passer une commande sur votre site ?',
          answer: 'Pour passer une commande, ajoutez simplement les produits souhaités à votre panier, puis cliquez sur "Finaliser ma commande". Vous devrez créer un compte ou vous connecter, puis renseigner vos informations de livraison et de paiement.'
        },
        {
          id: 'moyens-paiement',
          question: 'Quels sont les moyens de paiement acceptés ?',
          answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), les virements bancaires, et les paiements par chèque pour les commandes professionnelles. Tous les paiements en ligne sont sécurisés par notre partenaire bancaire CIC.'
        },
        {
          id: 'modifier-commande',
          question: 'Puis-je modifier ma commande après validation ?',
          answer: 'Les modifications sont possibles uniquement dans les 3 jours suivant la validation de votre commande et avant expédition. Contactez-nous rapidement au 01.84.19.01.04 ou par email à info@ozc-signaletique.fr.'
        }
      ]
    },
    {
      id: 'livraison',
      title: 'Livraison & Expédition',
      icon: '🚚',
      questions: [
        {
          id: 'delais-livraison',
          question: 'Quels sont les délais de livraison ?',
          answer: 'Les délais varient selon les produits : 2-3 jours ouvrés pour les produits en stock, 5-10 jours pour les produits personnalisés. Les délais sont indiqués sur chaque fiche produit.'
        },
        {
          id: 'frais-port',
          question: 'Quels sont les frais de port ?',
          answer: 'La livraison est gratuite pour toute commande supérieure à 300€ HT en France métropolitaine. En dessous, les frais de port sont calculés selon le poids et la destination.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <span className="ml-1 text-gray-500 md:ml-2">Centre d'aide</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Centre d'aide</h1>
          <p className="text-xl text-gray-600">Trouvez rapidement les réponses à vos questions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          
          {faqData.map((category) => (
            <div key={category.id} className="mb-8 last:mb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">{category.icon}</span>
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openQuestion === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                    
                    {openQuestion === faq.id && (
                      <div className="px-6 pb-4 border-t border-gray-200">
                        <p className="text-gray-700 pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 bg-teal-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <div className="flex justify-center space-x-4">
              <a
                href="tel:0184190104"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
              >
                Nous appeler
              </a>
              <a
                href="mailto:info@ozc-signaletique.fr"
                className="border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-600 hover:text-white"
              >
                Nous écrire
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 