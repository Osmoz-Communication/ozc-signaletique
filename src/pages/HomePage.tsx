import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Award, HeadphonesIcon, Leaf, CheckCircle, Star, Download, FileText, ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage = () => {
  const featuredProducts = products.slice(0, 8);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Données du hero slider
  const heroSlides = [
    {
      id: 1,
      title: 'Toute la signalétique',
      titleAccent: 'professionnelle',
      subtitle: 'Solutions complètes de signalisation industrielle et de sécurité, fabriquées en France avec 20 ans d\'expertise.',
      primaryButton: { text: 'Découvrir nos produits', link: '/products' },
      secondaryButton: { text: 'Nos catalogues', link: '/catalogues' },
      backgroundGradient: 'from-ozc-600 via-ozc-500 to-blue-600',
      backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Sécurité incendie',
      titleAccent: 'certifiée',
      subtitle: 'Panneaux et pictogrammes conformes aux dernières normes de sécurité incendie. Installation professionnelle garantie.',
      primaryButton: { text: 'Voir la gamme incendie', link: '/products/signalisation-securite/securite-incendie' },
      secondaryButton: { text: 'Demander un devis', link: '/custom' },
      backgroundGradient: 'from-red-600 via-red-500 to-orange-600',
      backgroundImage: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1200&h=600&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Personnalisation',
      titleAccent: 'sur mesure',
      subtitle: 'Créez votre signalétique unique avec nos solutions de personnalisation avancées. Matériaux premium et finitions soignées.',
      primaryButton: { text: 'Personnaliser', link: '/custom' },
      secondaryButton: { text: 'Voir les options', link: '/customization' },
      backgroundGradient: 'from-purple-600 via-purple-500 to-pink-600',
      backgroundImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'Accessibilité',
      titleAccent: 'pour tous',
      subtitle: 'Signalétique tactile et visuelle conforme PMR. Solutions d\'accessibilité pour tous les publics.',
      primaryButton: { text: 'Gamme accessibilité', link: '/products/accessibilite' },
      secondaryButton: { text: 'Nos conseils', link: '/faq' },
      backgroundGradient: 'from-green-600 via-emerald-500 to-teal-600',
      backgroundImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center'
    },
    {
      id: 5,
      title: 'Identification',
      titleAccent: 'professionnelle',
      subtitle: 'Plaques, étiquettes et supports d\'identification durables pour tous vos besoins de marquage professionnel.',
      primaryButton: { text: 'Voir l\'identification', link: '/products/identification' },
      secondaryButton: { text: 'Personnaliser', link: '/custom' },
      backgroundGradient: 'from-blue-600 via-indigo-500 to-purple-600',
      backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop&crop=center'
    }
  ];

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Gestion du swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const categories = [
    {
      name: 'Sécurité Incendie',
      count: '252 Éléments',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/signalisation-securite/securite-incendie'
    },
    {
      name: 'Signalétique Interne',
      count: '1464 Éléments',
      image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/signaletique-interne'
    },
    {
      name: 'Signalétique Externe',
      count: '187 Éléments',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/signaletique-externe'
    },
    {
      name: 'Accessibilité',
      count: '84 Éléments',
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=300',
      href: '/products/accessibilite'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Slider */}
      <section className="relative overflow-hidden group">
        <div 
          className="relative h-[35vh] lg:h-[40vh] min-h-[450px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Image de fond */}
              {slide.backgroundImage && (
                <div className="absolute inset-0">
                  <img 
                    src={slide.backgroundImage} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
              )}
              
              {/* Overlay dégradé */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.backgroundGradient} ${slide.backgroundImage ? 'opacity-60' : 'opacity-85'} z-10`}>
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              
              {/* Formes décoratives */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full blur-md transform rotate-45"></div>
              </div>
              
              <div className="relative h-full flex items-center z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="flex items-center justify-center h-full py-4 lg:py-6">
                    {/* Contenu textuel centré */}
                    <div className="text-white text-center max-w-4xl relative z-40">
                      <div className="mb-6 lg:mb-8">
                        <span className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 border border-white/50 shadow-2xl">
                          OZC Signalétique
                        </span>
                      </div>
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 leading-tight">
                        {slide.title}
                        <span className="block text-white/90 mt-1 sm:mt-2">{slide.titleAccent}</span>
                      </h1>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 lg:mb-6 opacity-90 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 mb-4 lg:mb-6">
                        <Link
                          to={slide.primaryButton.link}
                          className="inline-flex items-center justify-center bg-white text-gray-900 px-4 sm:px-5 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                        >
                          {slide.primaryButton.text}
                          <ChevronRight className="ml-2" size={18} />
                        </Link>
                        <Link
                          to={slide.secondaryButton.link}
                          className="inline-flex items-center justify-center border-2 border-white text-white px-4 sm:px-5 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 text-sm sm:text-base"
                        >
                          {slide.secondaryButton.text}
                          <Download className="ml-2" size={18} />
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation - visible au survol du slider (desktop uniquement) */}
        <button
          onClick={prevSlide}
          className="hidden lg:block absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full p-3 lg:p-4 transition-all duration-300 z-50 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="hidden lg:block absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full p-3 lg:p-4 transition-all duration-300 z-50 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicateurs en bas */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
          <div className="flex space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-3 bg-white' 
                    : 'w-3 h-3 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Nos Catégories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

      {/* Free Delivery Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-10"></div>
              
              <div className="relative p-6 sm:p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                        <Truck className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Livraison Gratuite</h2>
                        <p className="text-green-600 font-semibold">Dès 300€ d'achat</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Livraison sous 48h partout en France</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Suivi de commande en temps réel</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Emballage sécurisé et écologique</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Livraison sur site possible</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to="/products"
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                      >
                        <span>Commencer mes achats</span>
                        <ChevronRight className="ml-2" size={20} />
                      </Link>
                      <Link 
                        to="/shipping"
                        className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center"
                      >
                        En savoir plus
                      </Link>
                    </div>
                  </div>
                  
                  {/* Visual */}
                  <div className="relative">
                    <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-8 text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Truck className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">300€</h3>
                      <p className="text-gray-600 mb-4">Montant minimum pour la livraison gratuite</p>
                      
                      {/* Progress bar example */}
                      <div className="bg-gray-200 rounded-full h-3 mb-4">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-sm text-gray-500">Plus que 75€ pour la livraison gratuite !</p>
                    </div>
                    
                    {/* Floating badges */}
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      48h
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Gratuit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Produits Populaires</h2>
            <Link
              to="/products"
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center text-sm sm:text-base"
            >
              Voir tous les produits
              <ChevronRight className="ml-1" size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Catalogues Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Découvrez nos catalogues</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Téléchargez gratuitement nos catalogues professionnels ou recevez-les directement chez vous
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Téléchargement digital */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Téléchargement Immédiat</h3>
                <p className="text-gray-600">Accès instantané à tous nos catalogues en PDF</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <Link to="/catalogues" className="block">
                  <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-teal-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Catalogue Général</div>
                        <div className="text-sm text-gray-600">120 pages - 28.7 MB</div>
                      </div>
                    </div>
                    <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Populaire
                    </span>
                  </div>
                </Link>
                
                <Link to="/catalogues" className="block">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-gray-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Signalisation Sécurité</div>
                        <div className="text-sm text-gray-600">48 pages - 12.5 MB</div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/catalogues" className="block">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-gray-600" />
                      <div>
                        <div className="font-semibold text-gray-900">+ 4 autres catalogues</div>
                        <div className="text-sm text-gray-600">Signalétique interne, externe...</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              
              <Link
                to="/catalogues"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Télécharger maintenant</span>
              </Link>
            </div>
            
            {/* Catalogues physiques */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Livraison Gratuite</h3>
                <p className="text-gray-600">Recevez vos catalogues papier sous 3-5 jours</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700">Catalogues papier haute qualité</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700">Idéal pour partager en équipe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700">Consultation hors ligne</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700">Livraison partout en France</span>
                </div>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-teal-800">Bonus exclusif</span>
                </div>
                <p className="text-teal-700 text-sm">
                  Tarifs professionnels et conseils techniques inclus dans la version papier
                </p>
              </div>
              
              <Link
                to="/catalogues"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
              >
                <Truck size={18} />
                <span>Commander mes catalogues</span>
              </Link>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Plus de 2000 professionnels nous font confiance
            </p>
            <Link
              to="/catalogues"
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              Voir tous nos catalogues
              <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* UL GREENGUARD Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Content */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Notre engagement écologique</h2>
                    <p className="text-green-600 font-semibold">avec la certification UL GREENGUARD Gold</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-6">
                  Notre imprimante HP Latex est fièrement certifiée <strong>UL GREENGUARD Gold</strong>, 
                  un gage de qualité et de respect pour l'environnement. Cette certification garantit 
                  des encres écologiques avec de faibles émissions de composés organiques volatils (COV).
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sécurité accrue</h4>
                      <p className="text-gray-600 text-sm">Respect des critères sanitaires stricts pour limiter les émissions de plus de 360 substances chimiques</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Conformité rigoureuse</h4>
                      <p className="text-gray-600 text-sm">Alignement avec la méthode standard du Département de la santé publique de Californie (California Section 01350)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Durabilité</h4>
                      <p className="text-gray-600 text-sm">Processus de fabrication et tests réguliers pour réduire l'impact environnemental intérieur</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg border border-green-200 mb-6">
                  <p className="text-green-800 text-sm">
                    <strong>Pourquoi cette certification est-elle importante ?</strong><br />
                    En choisissant nos services, vous optez pour une impression respectueuse de votre santé et de la planète. 🌱
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.ul.com/services/ul-greenguard-certification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    En savoir plus sur UL GREENGUARD
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    Nous contacter
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Visual */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  {/* Logo UL GREENGUARD simulé */}
                  <div className="w-32 h-32 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
                    <div className="text-white font-bold text-center">
                      <div className="text-lg">UL</div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto my-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs">GREENGUARD</div>
                      <div className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full mt-1">GOLD</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">UL GREENGUARD Gold</h3>
                  <p className="text-gray-600 mb-6">
                    Notre imprimante HP Latex est fièrement certifiée pour des encres écologiques 
                    avec de faibles émissions de composés organiques volatils (COV).
                  </p>
                  
                  {/* Benefits grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-900">Sécurité</div>
                      <div className="text-xs text-gray-600">Émissions contrôlées</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-900">Qualité</div>
                      <div className="text-xs text-gray-600">Tests rigoureux</div>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <Leaf className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-900">Écologique</div>
                      <div className="text-xs text-gray-600">Respect environnement</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-900">Certifié</div>
                      <div className="text-xs text-gray-600">Norme internationale</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Certifié
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Besoin d'un devis personnalisé ?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
            Notre équipe d'experts est là pour vous accompagner dans vos projets
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Demander un devis
            <ChevronRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;