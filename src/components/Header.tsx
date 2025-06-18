import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, Menu, X, ChevronDown, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
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
      icon: '🚨',
      type: 'category'
    },
    { 
      id: 'signaletique-interne', 
      name: 'Signalétique interne', 
      description: 'Orientation, identification des locaux, information',
      productCount: 8,
      icon: '🏢',
      type: 'category'
    },
    { 
      id: 'signaletique-externe', 
      name: 'Signalétique externe', 
      description: 'Enseignes, façades, parking et identification',
      productCount: 6,
      icon: '🏪',
      type: 'category'
    },
    { 
      id: 'accessibilite', 
      name: 'Accessibilité', 
      description: 'PMR, handicap et signalisation tactile',
      productCount: 4,
      icon: '♿',
      type: 'category'
    }
  ];

  // Sous-catégories pour la recherche
  const sampleSubcategories = [
    // Signalisation de sécurité
    { id: 'securite-incendie', name: 'Sécurité Incendie', parent: 'signalisation-securite', productCount: 5, type: 'subcategory' },
    { id: 'panneaux-interdiction', name: 'Panneaux d\'interdiction', parent: 'signalisation-securite', productCount: 4, type: 'subcategory' },
    { id: 'panneaux-danger', name: 'Panneaux de danger', parent: 'signalisation-securite', productCount: 4, type: 'subcategory' },
    { id: 'epi-obligatoire', name: 'EPI Obligatoire', parent: 'signalisation-securite', productCount: 4, type: 'subcategory' },
    
    // Signalétique interne
    { id: 'orientation-wayfinding', name: 'Orientation & Wayfinding', parent: 'signaletique-interne', productCount: 3, type: 'subcategory' },
    { id: 'identification-locaux', name: 'Identification des locaux', parent: 'signaletique-interne', productCount: 3, type: 'subcategory' },
    { id: 'information-generale', name: 'Information générale', parent: 'signaletique-interne', productCount: 2, type: 'subcategory' },
    
    // Signalétique externe
    { id: 'enseignes-facades', name: 'Enseignes & Façades', parent: 'signaletique-externe', productCount: 2, type: 'subcategory' },
    { id: 'parking-circulation', name: 'Parking & Circulation', parent: 'signaletique-externe', productCount: 2, type: 'subcategory' },
    { id: 'identification', name: 'Identification', parent: 'signaletique-externe', productCount: 2, type: 'subcategory' },
    
    // Accessibilité
    { id: 'pmr-handicap', name: 'PMR & Handicap', parent: 'accessibilite', productCount: 2, type: 'subcategory' },
    { id: 'signalisation-tactile', name: 'Signalisation tactile', parent: 'accessibilite', productCount: 2, type: 'subcategory' }
  ];

  // Sous-sous-catégories pour la recherche
  const sampleSubSubcategories = [
    // Sécurité Incendie
    { id: 'extincteurs', name: 'Extincteurs', parent: 'securite-incendie', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'sorties-secours', name: 'Sorties de secours', parent: 'securite-incendie', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'points-rassemblement', name: 'Points de rassemblement', parent: 'securite-incendie', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'alarmes-incendie', name: 'Alarmes incendie', parent: 'securite-incendie', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    
    // Panneaux d'interdiction
    { id: 'interdiction-fumer', name: 'Interdiction de fumer', parent: 'panneaux-interdiction', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'acces-interdit', name: 'Accès interdit', parent: 'panneaux-interdiction', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'interdiction-telephoner', name: 'Interdiction de téléphoner', parent: 'panneaux-interdiction', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'defense-entrer', name: 'Défense d\'entrer', parent: 'panneaux-interdiction', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    
    // EPI Obligatoire
    { id: 'casques', name: 'Casques', parent: 'epi-obligatoire', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'lunettes', name: 'Lunettes', parent: 'epi-obligatoire', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'gants', name: 'Gants', parent: 'epi-obligatoire', grandParent: 'signalisation-securite', type: 'subsubcategory' },
    { id: 'chaussures-securite', name: 'Chaussures de sécurité', parent: 'epi-obligatoire', grandParent: 'signalisation-securite', type: 'subsubcategory' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 1) {
      const queryLower = query.toLowerCase();
      
      // Recherche dans les catégories principales
      const filteredCategories = sampleCategories.filter(category =>
        category.name.toLowerCase().includes(queryLower) ||
        category.description.toLowerCase().includes(queryLower)
      ).slice(0, 2);

      // Recherche dans les sous-catégories
      const filteredSubcategories = sampleSubcategories.filter(subcategory =>
        subcategory.name.toLowerCase().includes(queryLower)
      ).slice(0, 3);

      // Recherche dans les sous-sous-catégories
      const filteredSubSubcategories = sampleSubSubcategories.filter(subsubcategory =>
        subsubcategory.name.toLowerCase().includes(queryLower)
      ).slice(0, 3);

      // Recherche dans les produits (nom, catégorie, UGS, attributs)
      const filteredProducts = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower) ||
        product.sku.toLowerCase().includes(queryLower) ||
        // Recherche exacte par UGS (sans tirets)
        product.sku.toLowerCase().replace(/-/g, '').includes(queryLower.replace(/-/g, '')) ||
        // Recherche dans les attributs/matériaux
        ['pvc', 'aluminium', 'inox', 'laiton', 'adhésif', 'plexiglas'].some(material => 
          material.includes(queryLower) && product.name.toLowerCase().includes(material)
        ) ||
        // Recherche dans les dimensions
        ['a4', 'a3', 'a1', 'petit', 'moyen', 'grand'].some(size => 
          size.includes(queryLower) && product.name.toLowerCase().includes(size)
        )
      ).slice(0, 4);

      // Combiner tous les résultats
      const combined = [
        ...filteredCategories,
        ...filteredSubcategories,
        ...filteredSubSubcategories,
        ...filteredProducts
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
    
    switch (result.type) {
      case 'category':
        navigate(`/products/${result.id}`);
        break;
      case 'subcategory':
        navigate(`/products/${result.parent}/${result.id}`);
        break;
      case 'subsubcategory':
        navigate(`/products/${result.grandParent}/${result.parent}/${result.id}`);
        break;
      case 'product':
        navigate(`/product/${result.id}`);
        break;
      default:
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
                    { name: 'Sur-mesure', href: '/custom' },
  ];

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-ozc-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
            <span className="text-center sm:text-left">Livraison gratuite à partir de 300 euros d'achat</span>
            <div className="flex space-x-3 sm:space-x-4 text-xs sm:text-sm">
              <Link to="/account/orders" className="hover:text-teal-200 transition-colors whitespace-nowrap">
                Suivre ma commande
              </Link>
              <Link to="/account/wishlist" className="hover:text-teal-200 transition-colors whitespace-nowrap">
                Mes favoris
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">OZC</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gray-900">OZC</div>
              <div className="text-sm text-teal-500 font-medium">SIGNALÉTIQUE</div>
            </div>
          </Link>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
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
                      const subcategories = searchResults.filter(r => r.type === 'subcategory').length;
                      const subsubcategories = searchResults.filter(r => r.type === 'subsubcategory').length;
                      const products = searchResults.filter(r => r.type === 'product').length;
                      
                      const totalCategories = categories + subcategories + subsubcategories;
                      
                      if (totalCategories > 0 && products > 0) {
                        return `${totalCategories} catégorie${totalCategories > 1 ? 's' : ''} et ${products} produit${products > 1 ? 's' : ''} trouvé${products > 1 ? 's' : ''}`;
                      } else if (totalCategories > 0) {
                        return `${totalCategories} catégorie${totalCategories > 1 ? 's' : ''} trouvée${totalCategories > 1 ? 's' : ''}`;
                      } else {
                        return `${products} produit${products > 1 ? 's' : ''} trouvé${products > 1 ? 's' : ''}`;
                      }
                    })()}
                  </div>

                  {/* Catégories */}
                  {(searchResults.filter(r => r.type === 'category' || r.type === 'subcategory' || r.type === 'subsubcategory').length > 0) && (
                    <div className="mb-2">
                      <div className="text-xs font-medium text-gray-700 px-3 py-2 bg-gray-50 rounded">
                        CATÉGORIES
                      </div>
                      {/* Catégories principales */}
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
                      
                      {/* Sous-catégories */}
                      {searchResults.filter(r => r.type === 'subcategory').map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => handleResultClick(subcategory)}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-indigo-50 transition-colors text-left border-l-4 border-transparent hover:border-indigo-400"
                        >
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <div className="text-indigo-600 font-semibold text-sm">SUB</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {subcategory.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              Sous-catégorie de {sampleCategories.find(c => c.id === subcategory.parent)?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-indigo-600">
                              {subcategory.productCount} produits
                            </p>
                          </div>
                        </button>
                      ))}
                      
                      {/* Sous-sous-catégories */}
                      {searchResults.filter(r => r.type === 'subsubcategory').map((subsubcategory) => (
                        <button
                          key={subsubcategory.id}
                          onClick={() => handleResultClick(subsubcategory)}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 transition-colors text-left border-l-4 border-transparent hover:border-purple-400"
                        >
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <div className="text-purple-600 font-semibold text-xs">SUB2</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {subsubcategory.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {sampleSubcategories.find(s => s.id === subsubcategory.parent)?.name} • {sampleCategories.find(c => c.id === subsubcategory.grandParent)?.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-purple-600 font-medium">
                              Spécialité
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Produits */}
                  {searchResults.filter(r => r.type === 'product').length > 0 && (
                    <div>
                      {(searchResults.filter(r => r.type === 'category' || r.type === 'subcategory' || r.type === 'subsubcategory').length > 0) && (
                        <div className="text-xs font-medium text-gray-700 px-3 py-2 bg-gray-50 rounded">
                          PRODUITS
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/account/wishlist"
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              <Heart size={20} className="sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                1
              </span>
            </Link>
            
            <Link
              to="/account"
              className="p-1.5 sm:p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              <User size={20} className="sm:w-6 sm:h-6" />
            </Link>
            
            <button
              onClick={() => setShowCartModal(!showCartModal)}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-teal-500 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-teal-500 transition-colors"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Mobile Search Results */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
              <div className="p-2">
                {searchResults.slice(0, 5).map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 transition-colors text-left rounded"
                  >
                    <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center flex-shrink-0">
                      <Search size={12} className="text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {result.name}
                      </p>
                      {result.type === 'product' && (
                        <p className="text-xs text-gray-500 truncate">
                          {result.category}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
                {searchResults.length > 5 && (
                  <button
                    onClick={() => {
                      setShowSearchResults(false);
                      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                    }}
                    className="w-full text-center py-2 text-xs text-teal-600 hover:text-teal-700 font-medium border-t"
                  >
                    Voir tous les résultats
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav 
        className="bg-gray-800 text-white relative"
        onMouseLeave={() => setTimeout(() => setActiveMegaMenu(null), 200)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex py-4">
            {/* Megamenu Categories - Ordre spécifique */}
            {[
              'signaletique-interne', 
              'signaletique-externe',
              'signalisation-securite',
              'accessibilite'
            ].map((key) => (
              <div
                key={key}
                className="relative group"
              >
                <Link
                  to={megaMenuData[key as keyof typeof megaMenuData].href}
                  className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  onMouseEnter={() => setActiveMegaMenu(key)}
                >
                  {megaMenuData[key as keyof typeof megaMenuData].name}
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
        {activeMegaMenu && megaMenuData[activeMegaMenu as keyof typeof megaMenuData] && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 border-t-4 border-teal-500"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setTimeout(() => setActiveMegaMenu(null), 100)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {megaMenuData[activeMegaMenu as keyof typeof megaMenuData].name}
                </h3>
                <Link
                  to={megaMenuData[activeMegaMenu as keyof typeof megaMenuData].href}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Voir toute la catégorie →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {megaMenuData[activeMegaMenu as keyof typeof megaMenuData].subcategories.map((subcategory: any, index: number) => (
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
                        {subcategory.items.slice(0, 3).map((item: string, itemIndex: number) => (
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
          <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-sm py-6 relative z-50">
            <div className="px-4 space-y-3 text-center">
              {/* Ordre spécifique des catégories principales */}
              {[
                'signaletique-interne', 
                'signaletique-externe',
                'signalisation-securite',
                'accessibilite'
              ].map((key) => (
                <Link
                  key={key}
                  to={megaMenuData[key as keyof typeof megaMenuData].href}
                  className="block py-3 text-gray-300 hover:text-white transition-colors font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {megaMenuData[key as keyof typeof megaMenuData].name}
                </Link>
              ))}
              {simpleCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="block py-3 text-gray-300 hover:text-white transition-colors font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-transparent"
            onClick={() => setShowCartModal(false)}
          ></div>
          
          {/* Modal positioned under cart icon */}
          <div className="absolute top-20 right-4 sm:right-6 lg:right-8">
            <div className="relative w-96 max-w-[calc(100vw-2rem)]">
              {/* Modal content */}
              <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                {cartItems.length === 0 ? (
                  // Empty cart
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
                    <p className="text-gray-600 mb-6 text-sm">Découvrez nos produits de signalétique professionnelle</p>
                    <button
                      onClick={() => {
                        setShowCartModal(false);
                        navigate('/products');
                      }}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      Découvrir nos produits
                    </button>
                  </div>
                ) : (
                  // Cart with items
                  <>
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100/80 bg-gradient-to-r from-gray-50/50 to-teal-50/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <ShoppingCart size={16} className="text-teal-600" />
                          </div>
                          <h3 className="text-base font-semibold text-gray-900">Mon Panier</h3>
                        </div>
                        <button
                          onClick={() => setShowCartModal(false)}
                          className="p-1.5 hover:bg-white/80 rounded-full transition-colors"
                        >
                          <X size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      <div className="p-4 space-y-4">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded-lg flex-shrink-0 shadow-sm"
                              />
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                {item.quantity}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight flex-1 pr-2">{item.name}</h4>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-full transition-colors flex-shrink-0"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="text-sm font-medium min-w-[24px] text-center bg-gray-50 px-2 py-1 rounded-md">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-500">{(item.price / 1.2).toFixed(2)}€ HT</div>
                                  <div className="text-sm font-bold text-teal-600">{item.price}€ TTC</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {cartItems.length > 3 && (
                          <div className="text-center py-2">
                            <button
                              onClick={() => {
                                setShowCartModal(false);
                                navigate('/cart');
                              }}
                              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                              Voir {cartItems.length - 3} article{cartItems.length - 3 > 1 ? 's' : ''} de plus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100/80 bg-gradient-to-r from-gray-50/30 to-teal-50/20">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Sous-total HT</span>
                          <span className="text-sm font-medium text-gray-900">{(getCartTotal() / 1.2).toFixed(2)}€</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">TVA (20%)</span>
                          <span className="text-sm font-medium text-gray-900">{(getCartTotal() - getCartTotal() / 1.2).toFixed(2)}€</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                          <span className="text-base font-semibold text-gray-900">Total TTC</span>
                          <span className="text-lg font-bold text-teal-600">{getCartTotal().toFixed(2)}€</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setShowCartModal(false);
                            navigate('/cart');
                          }}
                          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          Voir le panier
                        </button>
                        <button
                          onClick={() => {
                            setShowCartModal(false);
                            navigate('/checkout');
                          }}
                          className="w-full border-2 border-teal-600 text-teal-600 py-2.5 px-4 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-200"
                        >
                          Commander maintenant
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay pour le menu mobile - ne couvre que le contenu sous le header */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          style={{ top: '100%' }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;