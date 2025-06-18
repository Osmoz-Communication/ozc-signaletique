import React, { useState } from 'react';
import { Download, FileText, Send, Check, Star, Package, Truck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const CataloguesPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    catalogues: [] as string[]
  });

  const catalogues = [
    {
      id: 'securite',
      title: 'Signalisation de Sécurité',
      description: 'Catalogue complet de nos panneaux de sécurité incendie, évacuation et EPI',
      pages: 48,
      size: '12.5 MB',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 'interne',
      title: 'Signalétique Interne',
      description: 'Solutions de signalétique pour l\'intérieur : orientation, identification, information',
      pages: 36,
      size: '8.2 MB',
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 'externe',
      title: 'Signalétique Externe',
      description: 'Enseignes, totems et signalétique extérieure résistante aux intempéries',
      pages: 28,
      size: '15.8 MB',
      image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 'accessibilite',
      title: 'Accessibilité PMR',
      description: 'Signalétique tactile et solutions d\'accessibilité pour personnes à mobilité réduite',
      pages: 24,
      size: '6.4 MB',
      image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 'general',
      title: 'Catalogue Général',
      description: 'Notre catalogue complet avec tous nos produits et solutions de signalétique',
      pages: 120,
      size: '28.7 MB',
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 'tarifs',
      title: 'Grille Tarifaire',
      description: 'Tarifs professionnels et conditions commerciales',
      pages: 16,
      size: '2.1 MB',
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    }
  ];

  const handleDownload = (catalogueId: string, title: string) => {
    // Simuler le téléchargement
    showToast(`Téléchargement du catalogue "${title}" en cours...`, 'success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCatalogueToggle = (catalogueId: string) => {
    setFormData(prev => ({
      ...prev,
      catalogues: prev.catalogues.includes(catalogueId)
        ? prev.catalogues.filter(id => id !== catalogueId)
        : [...prev.catalogues, catalogueId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.catalogues.length === 0) {
      showToast('Veuillez sélectionner au moins un catalogue', 'error');
      return;
    }
    showToast('Votre demande a été envoyée ! Vous recevrez vos catalogues sous 3-5 jours ouvrés.', 'success');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      catalogues: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Catalogues</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez l'ensemble de nos solutions de signalétique professionnelle. 
            Téléchargez gratuitement nos catalogues ou recevez-les directement chez vous.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Téléchargement Gratuit</h3>
            <p className="text-gray-600 text-sm">Accès immédiat à tous nos catalogues en format PDF haute qualité</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Livraison Gratuite</h3>
            <p className="text-gray-600 text-sm">Recevez vos catalogues papier directement à votre adresse sous 3-5 jours</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Contenu Exclusif</h3>
            <p className="text-gray-600 text-sm">Tarifs professionnels, conseils techniques et nouveautés en avant-première</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Catalogues disponibles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Téléchargement Immédiat</h2>
            <div className="space-y-4">
              {catalogues.map((catalogue) => (
                <div
                  key={catalogue.id}
                  className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
                    catalogue.featured ? 'border-teal-200 bg-teal-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={catalogue.image}
                        alt={catalogue.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{catalogue.title}</h3>
                          {catalogue.featured && (
                            <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Populaire
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{catalogue.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                          <span className="flex items-center space-x-1">
                            <FileText size={12} />
                            <span>{catalogue.pages} pages</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Package size={12} />
                            <span>{catalogue.size}</span>
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownload(catalogue.id, catalogue.title)}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 text-sm font-medium"
                        >
                          <Download size={16} />
                          <span>Télécharger PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demande de catalogues physiques */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recevoir par Courrier</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Demande de catalogues papier</h3>
                <p className="text-gray-600 text-sm">
                  Remplissez ce formulaire pour recevoir gratuitement nos catalogues imprimés. 
                  Idéal pour partager avec vos équipes ou consulter hors ligne.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Catalogues souhaités *
                  </label>
                  <div className="space-y-2">
                    {catalogues.map((catalogue) => (
                      <label
                        key={catalogue.id}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.catalogues.includes(catalogue.id)}
                          onChange={() => handleCatalogueToggle(catalogue.id)}
                          className="text-teal-600 rounded focus:ring-teal-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{catalogue.title}</div>
                          <div className="text-xs text-gray-500">{catalogue.pages} pages</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Envoyer ma demande</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Vos données sont protégées et ne seront utilisées que pour l'envoi de catalogues.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour choisir ?</h3>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            Nos experts sont disponibles pour vous conseiller et vous aider à sélectionner 
            les solutions de signalétique les plus adaptées à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01.84.19.01.04"
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              01.84.19.01.04
            </a>
            <a
              href="mailto:info@ozc-signaletique.fr"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              info@ozc-signaletique.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CataloguesPage; 