import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Award, HeadphonesIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage = () => {
  const featuredProducts = products.slice(0, 8);

  const categories = [
    {
      name: 'Sécurité Incendie',
      count: '252 Éléments',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/sécurité-incendie'
    },
    {
      name: 'Identification Logistique',
      count: '132 Éléments',
      image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/identification-logistique'
    },
    {
      name: 'Hygiène',
      count: '109 Éléments',
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/hygiène'
    },
    {
      name: 'Maintenance',
      count: '12 Éléments',
      image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/maintenance'
    },
    {
      name: 'Radioactivité',
      count: '84 Éléments',
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/radioactivité'
    },
    {
      name: 'Signalétique Interne',
      count: '1464 Éléments',
      image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/signalétique-interne'
    },
    {
      name: 'Panneaux D\'interdiction',
      count: '122 Éléments',
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/panneaux-interdiction'
    },
    {
      name: 'Panneaux De Danger',
      count: '187 Éléments',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/panneaux-danger'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Toute la signalétique
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Solutions professionnelles de signalisation industrielle et de sécurité
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Découvrir nos produits
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-teal-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Livraison gratuite</h3>
              <p className="text-gray-600">À partir de 300€ d'achat</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-teal-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Qualité garantie</h3>
              <p className="text-gray-600">Produits certifiés aux normes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-teal-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">20 ans d'expérience</h3>
              <p className="text-gray-600">Expert en signalétique</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="text-teal-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Support client</h3>
              <p className="text-gray-600">Assistance personnalisée</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-teal-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Produits Populaires</h2>
            <Link
              to="/products"
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center"
            >
              Voir tous les produits
              <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un devis personnalisé ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Notre équipe d'experts est là pour vous accompagner dans vos projets
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Demander un devis
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;