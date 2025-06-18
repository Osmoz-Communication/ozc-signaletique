import React, { useState } from 'react';
import { Heart, X, ShoppingCart, Filter, Star, Gift, Truck, Clock, Tag, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [sortBy, setSortBy] = useState('recent');

  // Données simulées des favoris
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      name: 'Panneau Sortie de Secours LED',
      price: 45.90,
      originalPrice: 52.90,
      category: 'Sécurité Incendie',
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      addedDate: '2024-03-20',
      description: 'Panneau de sortie de secours avec éclairage LED intégré'
    },
    {
      id: '2',
      name: 'Panneau Interdiction de Fumer',
      price: 28.90,
      originalPrice: null,
      category: 'Panneaux d\'interdiction',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      addedDate: '2024-03-18',
      description: 'Panneau d\'interdiction de fumer conforme aux normes'
    },
    {
      id: '3',
      name: 'Panneau Danger Électrique',
      price: 32.50,
      originalPrice: 38.00,
      category: 'Panneaux de danger',
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: false,
      addedDate: '2024-03-15',
      description: 'Panneau d\'avertissement pour zones électriques dangereuses'
    },
    {
      id: '4',
      name: 'Panneau EPI Obligatoire',
      price: 24.50,
      originalPrice: null,
      category: 'Signalisation de sécurité',
      image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      addedDate: '2024-03-12',
      description: 'Panneau indiquant le port d\'équipements de protection individuelle'
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
      quantity: 1
    });
    showToast(`${item.name} ajouté au panier`, 'success');
  };

  // Données pour l'upsell basées sur la stratégie
  const specialOffers = [
    {
      id: 'pack-security',
      name: 'Pack Sécurité Incendie',
      originalPrice: 196.13,
      salePrice: 156.90,
      discount: 20,
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Kit complet de signalisation incendie avec panneaux, éclairage et fixations',
      items: ['Panneau Sortie de Secours LED', 'Extincteur', 'Plan d\'évacuation', 'Kit de fixation']
    },
    {
      id: 'pack-complete',
      name: 'Pack Signalétique Complète',
      originalPrice: 275.88,
      salePrice: 234.50,
      discount: 15,
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Solution complète de signalétique pour entreprise',
      items: ['Panneaux directionnels', 'Signalétique de sécurité', 'Plaques de porte', 'Supports muraux']
    },
    {
      id: 'pack-accessibility',
      name: 'Pack Accessibilité PMR',
      originalPrice: 99.89,
      salePrice: 89.90,
      discount: 10,
      image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Signalétique d\'accessibilité conforme aux normes PMR',
      items: ['Pictogrammes PMR', 'Signalétique braille', 'Bandes podotactiles', 'Guide-fils']
    }
  ];

  const recommendedProducts = [
    {
      id: 'rec-1',
      name: 'Kit de Fixation Universel',
      price: 15.90,
      originalPrice: 19.90,
      category: 'Accessoires',
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Kit de fixation pour tous types de panneaux',
      badge: 'Recommandé'
    },
    {
      id: 'rec-2',
      name: 'Éclairage LED pour Panneaux',
      price: 24.90,
      category: 'Éclairage',
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Éclairage LED autonome pour signalétique',
      badge: 'Populaire'
    },
    {
      id: 'rec-3',
      name: 'Nettoyant Spécial Panneaux',
      price: 12.50,
      category: 'Entretien',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Produit d\'entretien pour signalétique',
      badge: 'Nouveau'
    }
  ];

  const handleAddPackToCart = (pack: any) => {
    addToCart({
      id: pack.id,
      name: pack.name,
      price: pack.salePrice,
      category: 'Pack',
      image: pack.image,
      description: pack.description,
      quantity: 1
    });
    showToast(`${pack.name} ajouté au panier`, 'success');
  };

  const handleAddRecommendedToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      quantity: 1
    });
    showToast(`${product.name} ajouté au panier`, 'success');
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Favoris</h1>
          <p className="text-gray-600">
            {wishlistItems.length} produit{wishlistItems.length !== 1 ? 's' : ''} dans votre liste de souhaits
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-gray-400" size={48} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Votre liste de favoris est vide
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Découvrez nos produits et ajoutez vos articles préférés à votre liste de souhaits
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <>
            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Filter className="text-gray-400" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="recent">Plus récents</option>
                  <option value="name">Nom A-Z</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                </select>
              </div>
              
              <button
                onClick={() => setWishlistItems([])}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Vider la liste
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-teal-200">
                  <Link to={`/product/${item.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Badge promo si applicable */}
                      {item.originalPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </div>
                      )}
                      
                      {/* Badge rupture de stock */}
                      {!item.inStock && (
                        <div className="absolute top-3 left-3 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                          Rupture de stock
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Bouton remove wishlist */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFromWishlist(item.id);
                          }}
                          className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-teal-600 font-medium uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>
                    
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-teal-600 transition-colors line-clamp-2 leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        {item.originalPrice ? (
                          <>
                            <span className="text-2xl font-bold text-teal-600">
                              {item.price.toFixed(2)}€
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {item.originalPrice.toFixed(2)}€
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-teal-600">
                            {item.price.toFixed(2)}€
                          </span>
                        )}
                      </div>
                      
                      <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                        item.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.inStock ? 'En stock' : 'Rupture'}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`w-full p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center space-x-2 ${
                        item.inStock
                          ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>{item.inStock ? 'Ajouter au panier' : 'Indisponible'}</span>
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Ajouté le {new Date(item.addedDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Offres Spéciales - Upsell Section */}
            <div className="mt-16 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Offres Spéciales
                  </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Complétez votre équipement avec nos packs exclusifs et économisez jusqu'à 20%
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specialOffers.map((offer) => (
                  <div key={offer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src={offer.image}
                        alt={offer.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{offer.discount}%
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Gift className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Inclus dans ce pack :</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {offer.items.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-teal-600">
                            {offer.salePrice.toFixed(2)}€
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {offer.originalPrice.toFixed(2)}€
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            Économisez {(offer.originalPrice - offer.salePrice).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddPackToCart(offer)}
                        className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart size={16} />
                        <span>Profiter de l'offre</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Produits Recommandés - Cross-selling */}
            <div className="mt-16 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <TrendingUp className="mr-2 text-teal-600" size={24} />
                  Recommandé pour vous
                </h2>
                <p className="text-gray-600">
                  D'autres clients ayant des favoris similaires ont aussi acheté
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                        product.badge === 'Recommandé' ? 'bg-blue-100 text-blue-800' :
                        product.badge === 'Populaire' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {product.badge}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <span className="text-xs text-teal-600 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-1 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-teal-600">
                            {product.price.toFixed(2)}€
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice.toFixed(2)}€
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddRecommendedToCart(product)}
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart size={14} />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avantages de l'achat groupé */}
            <div className="mt-16 mb-12">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Pourquoi acheter en pack ?
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Économies garanties</h3>
                    <p className="text-gray-600 text-sm">Jusqu'à 20% de réduction par rapport aux achats individuels</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Livraison groupée</h3>
                    <p className="text-gray-600 text-sm">Une seule livraison pour tous vos produits, plus écologique</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Qualité assurée</h3>
                    <p className="text-gray-600 text-sm">Produits testés ensemble pour une compatibilité parfaite</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call-to-Action pour livraison gratuite */}
            <div className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
                <div className="flex items-center justify-center mb-3">
                  <Truck className="w-6 h-6 mr-2" />
                  <span className="font-bold text-lg">Livraison gratuite</span>
                </div>
                <p className="mb-4">
                  Profitez de la livraison gratuite dès 75€ d'achat
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Offre limitée dans le temps</span>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                Continuer mes achats
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 