import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Données pour la recherche
  const sampleProducts = [
    { id: '1', name: 'Panneau Sortie de Secours LED', category: 'Signalisation de sécurité', price: 45.90, priceHT: 38.25, sku: 'SEC-LED-001' },
    { id: '6', name: 'Panneau Interdiction de Fumer', category: 'Signalisation de sécurité', price: 12.50, priceHT: 10.42, sku: 'INT-FUM-006' },
    { id: '10', name: 'Panneau Danger Électrique', category: 'Signalisation de sécurité', price: 18.75, priceHT: 15.63, sku: 'DAN-ELE-010' },
    { id: '14', name: 'Panneau Casque Obligatoire', category: 'Signalisation de sécurité', price: 14.20, priceHT: 11.83, sku: 'EPI-CAS-014' },
    { id: '18', name: 'Panneau Fléchage Directionnel', category: 'Signalétique interne', price: 19.90, priceHT: 16.58, sku: 'ORI-FLE-018' },
    { id: '22', name: 'Pictogramme WC Hommes', category: 'Signalétique interne', price: 16.50, priceHT: 13.75, sku: 'LOC-WCH-022' },
    { id: '27', name: 'Enseigne Lumineuse LED', category: 'Signalétique externe', price: 450.00, priceHT: 375.00, sku: 'ENS-LED-027' },
    { id: '33', name: 'Pictogramme PMR Relief', category: 'Accessibilité', price: 22.50, priceHT: 18.75, sku: 'PMR-REL-033' }
  ];

  const sampleCategories = [
    { 
      id: 'signalisation-securite', 
      name: 'Signalisation de sécurité', 
      description: 'Panneaux de sécurité, incendie, danger et EPI',
      productCount: 17,
      icon: '🚨'
    },
    { 
      id: 'signaletique-interne', 
      name: 'Signalétique interne', 
      description: 'Orientation, identification des locaux, information',
      productCount: 8,
      icon: '🏢'
    },
    { 
      id: 'signaletique-externe', 
      name: 'Signalétique externe', 
      description: 'Enseignes, façades, parking et identification',
      productCount: 6,
      icon: '🏪'
    },
    { 
      id: 'accessibilite', 
      name: 'Accessibilité', 
      description: 'PMR, handicap et signalisation tactile',
      productCount: 4,
      icon: '♿'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 1) {
      // Recherche dans les catégories
      const filteredCategories = sampleCategories.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2);

      // Recherche dans les produits
      const filteredProducts = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4);

      // Combiner les résultats avec un type pour les différencier
      const combined = [
        ...filteredCategories.map(cat => ({ ...cat, type: 'category' })),
        ...filteredProducts.map(prod => ({ ...prod, type: 'product' }))
      ];

      setSearchResults(combined);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleResultClick = (result: any) => {
    setShowSearchResults(false);
    setSearchQuery('');
    
    if (result.type === 'category') {
      navigate(`/products/${result.id}`);
    } else {
      navigate(`/product/${result.id}`);
    }
  };

  const megaMenuData = {
    'signalisation-securite': {
      name: 'Signalisation de sécurité',
      href: '/products/signalisation-securite',
      subcategories: [
        {
          name: 'Sécurité Incendie',
          href: '/products/signalisation-securite/securite-incendie',
          image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Extincteurs', 'Sorties de secours', 'Points de rassemblement', 'Alarmes incendie']
        },
        {
          name: 'Panneaux d\'interdiction',
          href: '/products/signalisation-securite/panneaux-interdiction',
          image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Interdiction de fumer', 'Accès interdit', 'Interdiction de téléphoner', 'Défense d\'entrer']
        },
        {
          name: 'Panneaux de danger',
          href: '/products/signalisation-securite/panneaux-danger',
          image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Danger électrique', 'Matières toxiques', 'Rayonnements', 'Chute d\'objets']
        },
        {
          name: 'EPI Obligatoire',
          href: '/products/signalisation-securite/epi-obligatoire',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Casques', 'Lunettes', 'Gants', 'Chaussures de sécurité']
        }
      ]
    },
    'signaletique-interne': {
      name: 'Signalétique interne',
      href: '/products/signaletique-interne',
      subcategories: [
        {
          name: 'Orientation & Wayfinding',
          href: '/products/signaletique-interne/orientation-wayfinding',
          image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Fléchage directionnel', 'Plans de bâtiment', 'Numérotation', 'Signalétique étages']
        },
        {
          name: 'Identification des locaux',
          href: '/products/signaletique-interne/identification-locaux',
          image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Plaques de porte', 'Pictogrammes WC', 'Salles de réunion', 'Bureaux']
        },
        {
          name: 'Information générale',
          href: '/products/signaletique-interne/information-generale',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Panneaux d\'affichage', 'Consignes', 'Horaires', 'Contact']
        }
      ]
    },
    'signaletique-externe': {
      name: 'Signalétique externe',
      href: '/products/signaletique-externe',
      subcategories: [
        {
          name: 'Enseignes & Façades',
          href: '/products/signaletique-externe/enseignes-facades',
          image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Enseignes lumineuses', 'Lettres découpées', 'Totems', 'Banderoles']
        },
        {
          name: 'Parking & Circulation',
          href: '/products/signaletique-externe/parking-circulation',
          image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Marquage au sol', 'Panneaux de parking', 'Bornes', 'Barrières']
        },
        {
          name: 'Identification',
          href: '/products/signaletique-externe/identification',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Plaques professionnelles', 'Numéros de rue', 'Signalétique d\'entreprise', 'Identification véhicules']
        }
      ]
    },
    'accessibilite': {
      name: 'Accessibilité',
      href: '/products/accessibilite',
      subcategories: [
        {
          name: 'PMR & Handicap',
          href: '/products/accessibilite/pmr-handicap',
          image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Pictogrammes PMR', 'Braille', 'Bandes podotactiles', 'Rampes d\'accès']
        },
        {
          name: 'Signalisation tactile',
          href: '/products/accessibilite/signalisation-tactile',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=300',
          items: ['Plaques braille', 'Main courante tactile', 'Contrastes', 'Relief']
        }
      ]
    }
  };

  const simpleCategories = [
    { name: 'Identification', href: '/products/identification' },
    { name: 'Gravure', href: '/products/gravure' },
    { name: 'Sur-mesure', href: '/products/sur-mesure' },
  ];

  return (
    <div className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-teal-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <span>Livraison gratuite à partir de 300 euros d'achat</span>
            <div className="flex space-x-4">
              <Link to="/account/orders" className="hover:text-teal-200 transition-colors">
                Suivre ma commande
              </Link>
              <Link to="/account/wishlist" className="hover:text-teal-200 transition-colors">
                Mes favoris
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">OZC</span>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">OZC</div>
              <div className="text-sm text-teal-500 font-medium">SIGNALÉTIQUE</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit, une référence..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-teal-500 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2 border-b">
                    {(() => {
                      const categories = searchResults.filter(r => r.type === 'category').length;
                      const products = searchResults.filter(r => r.type === 'product').length;
                      
                      if (categories > 0 && products > 0) {
                        return `${categories} catégorie${categories > 1 ? 's' : ''} et ${products} produit${products > 1 ? 's' : ''} trouvé${products > 1 ? 's' : ''}`;
                      } else if (categories > 0) {
                        return `${categories} catégorie${categories > 1 ? 's' : ''} trouvée${categories > 1 ? 's' : ''}`;
                      } else {
                        return `${products} produit${products > 1 ? 's' : ''} trouvé${products > 1 ? 's' : ''}`;
                      }
                    })()}
                  </div>

                  {/* Catégories */}
                  {searchResults.filter(r => r.type === 'category').length > 0 && (
                    <div className="mb-2">
                      <div className="text-xs font-medium text-gray-700 px-3 py-2 bg-gray-50 rounded">
                        CATÉGORIES
                      </div>
                      {searchResults.filter(r => r.type === 'category').map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleResultClick(category)}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors text-left border-l-4 border-transparent hover:border-blue-400"
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                            {category.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {category.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {category.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-600">
                              {category.productCount} produits
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Produits */}
                  {searchResults.filter(r => r.type === 'product').length > 0 && (
                    <div>
                      {searchResults.filter(r => r.type === 'category').length > 0 && (
                        <div className="text-xs font-medium text-gray-700 px-3 py-2 bg-gray-50 rounded flex justify-between items-center">
                          <span>PRODUITS</span>
                          <span className="text-teal-600 font-medium">
                            {(() => {
                              const products = searchResults.filter(r => r.type === 'product');
                              const prices = products.map(p => p.priceHT);
                              const min = Math.min(...prices);
                              const max = Math.max(...prices);
                              return min === max ? `${min}€ HT` : `${min}€ - ${max}€ HT`;
                            })()}
                          </span>
                        </div>
                      )}
                      {searchResults.filter(r => r.type === 'product').map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleResultClick(product)}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-teal-50 transition-colors text-left border-l-4 border-transparent hover:border-teal-400"
                        >
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <Search size={16} className="text-teal-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span className="truncate">{product.category}</span>
                              <span>•</span>
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {product.sku}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-teal-600">
                              {product.priceHT.toFixed(2)}€ HT
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.price.toFixed(2)}€ TTC
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="border-t p-2 mt-2">
                    <button
                      onClick={() => {
                        setShowSearchResults(false);
                        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="w-full text-center py-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Voir tous les résultats pour "{searchQuery}"
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {showSearchResults && searchQuery.length > 1 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <div className="p-4 text-center">
                  <Search size={24} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Aucun résultat pour "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      setShowSearchResults(false);
                      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                    }}
                    className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Rechercher dans tous les produits
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/account/wishlist"
              className="relative p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              <Heart size={24} />
              <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </Link>
            
            <Link
              to="/account"
              className="p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              <User size={24} />
            </Link>
            
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav 
        className="bg-gray-800 text-white relative"
        onMouseLeave={() => setTimeout(() => setActiveMegaMenu(null), 200)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex py-4">
            {/* Megamenu Categories */}
            {Object.entries(megaMenuData).map(([key, category]) => (
              <div
                key={key}
                className="relative group"
              >
                <Link
                  to={category.href}
                  className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  onMouseEnter={() => setActiveMegaMenu(key)}
                >
                  {category.name}
                  <ChevronDown size={16} className="ml-1" />
                </Link>
              </div>
            ))}
            
            {/* Simple Categories */}
            {simpleCategories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Megamenu Dropdown */}
        {activeMegaMenu && megaMenuData[activeMegaMenu] && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 border-t-4 border-teal-500"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setTimeout(() => setActiveMegaMenu(null), 100)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {megaMenuData[activeMegaMenu].name}
                </h3>
                <Link
                  to={megaMenuData[activeMegaMenu].href}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Voir toute la catégorie →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {megaMenuData[activeMegaMenu].subcategories.map((subcategory, index) => (
                  <Link
                    key={index}
                    to={subcategory.href}
                    className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {subcategory.name}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {subcategory.items.slice(0, 3).map((item, itemIndex) => (
                          <li key={itemIndex} className="hover:text-teal-600 transition-colors">
                            • {item}
                          </li>
                        ))}
                        {subcategory.items.length > 3 && (
                          <li className="text-teal-600 font-medium">
                            + {subcategory.items.length - 3} autres...
                          </li>
                        )}
                      </ul>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 py-4">
            <div className="px-4 space-y-2">
              {Object.entries(megaMenuData).map(([key, category]) => (
                <div key={key}>
                  <Link
                    to={category.href}
                    className="block py-2 text-gray-300 hover:text-white transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="ml-4 space-y-1">
                    {category.subcategories.map((subcategory, index) => (
                      <Link
                        key={index}
                        to={subcategory.href}
                        className="block py-1 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {simpleCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;