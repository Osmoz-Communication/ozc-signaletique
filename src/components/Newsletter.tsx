import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'inscription
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <section className="relative bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Merci pour votre inscription !
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Vous recevrez bientôt nos dernières actualités et offres exclusives.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="inline-flex items-center px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continuer la navigation
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-white to-teal-50 overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full -translate-x-32 -translate-y-32 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full translate-x-48 translate-y-48 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-teal-200 to-teal-200 rounded-full -translate-x-16 -translate-y-16 opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Titre principal */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-500 rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Restez informé de nos 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-600"> nouveautés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recevez en avant-première nos nouveaux produits, conseils techniques et offres spéciales pour professionnels
            </p>
          </div>

          {/* Formulaire */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email professionnelle"
                  required
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-600 text-white font-semibold text-lg rounded-xl hover:from-teal-700 hover:to-teal-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Inscription...</span>
                  </>
                ) : (
                  <>
                    <span>S'inscrire</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            {/* Note de confidentialité */}
            <p className="mt-4 text-sm text-gray-500">
              En vous inscrivant, vous acceptez de recevoir nos communications. 
              <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline ml-1">
                Politique de confidentialité
              </a>
            </p>
          </div>

          {/* Avantages */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expertise technique</h3>
              <p className="text-gray-600">Conseils et guides pratiques pour vos projets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Offres exclusives</h3>
              <p className="text-gray-600">Promotions et tarifs préférentiels réservés aux abonnés</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nouveautés produits</h3>
              <p className="text-gray-600">Découvrez en avant-première nos dernières innovations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 