import React, { useState } from 'react';
import { Heart, X, ShoppingCart, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { addToCart } = useCart();
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                    >
                      <X size={16} className="text-gray-600 group-hover:text-red-600" />
                    </button>
                    {!item.inStock && (
                      <div className="absolute top-3 left-3 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        Rupture de stock
                      </div>
                    )}
                    {item.originalPrice && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-teal-600 font-medium uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-teal-600 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-teal-600">
                          {item.price.toFixed(2)}€
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {item.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        item.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.inStock ? 'En stock' : 'Rupture'}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                          item.inStock
                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        {item.inStock ? 'Ajouter au panier' : 'Indisponible'}
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Ajouté le {new Date(item.addedDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
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