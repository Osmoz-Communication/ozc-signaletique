import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, Grid, List, Star, Award, Truck, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const SpecialtyDetailPage = () => {
  const { category, subcategory, specialty } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  // Données des spécialités pour chaque sous-catégorie
  const specialtyData: any = {
    'signalisation-securite': {
      'securite-incendie': {
        'extincteurs': {
          name: 'Extincteurs',
          description: 'Équipements de lutte contre l\'incendie certifiés et conformes aux normes en vigueur',
          image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Certification CE et NF',
            'Maintenance incluse',
            'Installation professionnelle',
            'Garantie 5 ans'
          ],
          productCount: 2,
          averageRating: 4.8,
          certifications: ['CE', 'NF', 'ISO 9001']
        },
        'sorties-secours': {
          name: 'Sorties de secours',
          description: 'Signalétique d\'évacuation lumineuse et panneaux de sortie de secours conformes',
          image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Éclairage LED intégré',
            'Autonomie 3h minimum',
            'Résistant aux chocs',
            'Installation facile'
          ],
          productCount: 1,
          averageRating: 4.9,
          certifications: ['CE', 'NF', 'ISO 3864']
        },
        'points-rassemblement': {
          name: 'Points de rassemblement',
          description: 'Panneaux de signalisation des points de rassemblement pour évacuation d\'urgence',
          image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Visibilité maximale',
            'Matériaux résistants',
            'Fixation sécurisée',
            'Normes européennes'
          ],
          productCount: 1,
          averageRating: 4.7,
          certifications: ['CE', 'ISO 3864']
        }
      },
      'panneaux-interdiction': {
        'interdiction-fumer': {
          name: 'Interdiction de fumer',
          description: 'Panneaux d\'interdiction de fumer conformes à la réglementation',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Pictogramme normalisé',
            'Résistant aux UV',
            'Plusieurs formats',
            'Adhésif inclus'
          ],
          productCount: 1,
          averageRating: 4.6,
          certifications: ['CE', 'ISO 3864']
        }
      }
    }
  };

  const currentSpecialty = specialtyData[category as string]?.[subcategory as string]?.[specialty as string];

  // Filtrer les produits pour cette spécialité
  const specialtyProducts = products.filter(product => {
    // Utiliser le champ specialty pour un filtrage précis
    if (product.specialty === specialty) {
      return true;
    }
    
    // Fallback sur l'ancien système de filtrage par nom
    const productName = product.name.toLowerCase();
    const specialtyName = specialty?.toLowerCase() || '';
    
    if (specialty === 'extincteurs') {
      return productName.includes('extincteur') || productName.includes('extinguish');
    }
    if (specialty === 'sorties-secours') {
      return productName.includes('sortie') || productName.includes('secours') || productName.includes('évacuation') || productName.includes('éclairage');
    }
    if (specialty === 'interdiction-fumer') {
      return productName.includes('fumer') || productName.includes('smoking');
    }
    if (specialty === 'points-rassemblement') {
      return productName.includes('rassemblement') || productName.includes('évacuation');
    }
    
    return productName.includes(specialtyName);
  });

  const sortedProducts = [...specialtyProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (!currentSpecialty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Spécialité non trouvée</h1>
          <Link to="/products" className="text-teal-600 hover:text-teal-700">
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link to="/products" className="text-gray-700 hover:text-teal-600">
                  Produits
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link to={`/products/${category}`} className="text-gray-700 hover:text-teal-600">
                  {category?.replace('-', ' ')}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <Link to={`/products/${category}/${subcategory}`} className="text-gray-700 hover:text-teal-600">
                  {subcategory?.replace('-', ' ')}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-gray-500">{currentSpecialty.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={currentSpecialty.image}
                alt={currentSpecialty.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <h1 className="text-4xl font-bold text-gray-900 mr-4">
                  {currentSpecialty.name}
                </h1>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600 font-medium">
                    {currentSpecialty.averageRating}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {currentSpecialty.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">
                    {currentSpecialty.productCount}
                  </div>
                  <div className="text-sm text-gray-600">Produits</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentSpecialty.certifications.length}
                  </div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
              </div>

              {/* Caractéristiques */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Caractéristiques principales</h3>
                <ul className="space-y-2">
                  {currentSpecialty.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {currentSpecialty.certifications.map((cert: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avantages */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Pourquoi choisir nos {currentSpecialty.name.toLowerCase()} ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualité garantie</h3>
              <p className="text-gray-600 text-sm">Produits certifiés conformes aux normes européennes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Livraison rapide</h3>
              <p className="text-gray-600 text-sm">Expédition sous 24h pour les produits en stock</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expertise</h3>
              <p className="text-gray-600 text-sm">20 ans d'expérience dans la signalétique professionnelle</p>
            </div>
          </div>
        </div>

        {/* Header des produits */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Nos produits {currentSpecialty.name.toLowerCase()}
            </h2>
            <p className="text-gray-600">
              {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} disponible{sortedProducts.length > 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="name">Nom A-Z</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
            </select>
            
            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {sortedProducts.map((product) => (
              viewMode === 'grid' ? (
                <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ) : (
                <div key={product.id} className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-teal-600 font-bold text-xl">{product.price}€</p>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="text-gray-400" size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600 mb-8">
              Aucun produit ne correspond à cette spécialité pour le moment.
            </p>
            <Link
              to={`/products/${category}/${subcategory}`}
              className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Retour à la sous-catégorie
            </Link>
          </div>
        )}

        {/* Call to Action */}
        {sortedProducts.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Besoin d'aide pour choisir ?
              </h3>
              <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
                Nos experts sont là pour vous conseiller et vous accompagner dans le choix 
                de vos équipements de {currentSpecialty.name.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Nous contacter
                </Link>
                <Link
                  to="/devis"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtyDetailPage; 