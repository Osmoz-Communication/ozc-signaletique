import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const ProductsPage = () => {
  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Données des catégories et sous-catégories
  const categoryData = {
    'signalisation-securite': {
      name: 'Signalisation de sécurité',
      description: 'Tous les équipements et panneaux pour assurer la sécurité sur vos sites',
      subcategories: [
        {
          name: 'Sécurité Incendie',
          slug: 'securite-incendie',
          description: 'Panneaux et équipements de sécurité incendie',
          image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 5,
          subSubcategories: [
            { name: 'Extincteurs', slug: 'extincteurs', productCount: 2 },
            { name: 'Sorties de secours', slug: 'sorties-secours', productCount: 1 },
            { name: 'Points de rassemblement', slug: 'points-rassemblement', productCount: 1 },
            { name: 'Alarmes incendie', slug: 'alarmes-incendie', productCount: 1 }
          ]
        },
        {
          name: 'Panneaux d\'interdiction',
          slug: 'panneaux-interdiction',
          description: 'Signalisation d\'interdiction et de restriction',
          image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 4,
          subSubcategories: [
            { name: 'Interdiction de fumer', slug: 'interdiction-fumer', productCount: 1 },
            { name: 'Accès interdit', slug: 'acces-interdit', productCount: 1 },
            { name: 'Interdiction de téléphoner', slug: 'interdiction-telephoner', productCount: 1 },
            { name: 'Défense d\'entrer', slug: 'defense-entrer', productCount: 1 }
          ]
        },
        {
          name: 'Panneaux de danger',
          slug: 'panneaux-danger',
          description: 'Avertissements et signalisation de dangers',
          image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 4,
          subSubcategories: [
            { name: 'Danger électrique', slug: 'danger-electrique', productCount: 1 },
            { name: 'Matières toxiques', slug: 'matieres-toxiques', productCount: 1 },
            { name: 'Rayonnements', slug: 'rayonnements', productCount: 1 },
            { name: 'Chute d\'objets', slug: 'chute-objets', productCount: 1 }
          ]
        },
        {
          name: 'EPI Obligatoire',
          slug: 'epi-obligatoire',
          description: 'Signalisation d\'équipements de protection individuelle',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 4,
          subSubcategories: [
            { name: 'Casques', slug: 'casques', productCount: 1 },
            { name: 'Lunettes', slug: 'lunettes', productCount: 1 },
            { name: 'Gants', slug: 'gants', productCount: 1 },
            { name: 'Chaussures de sécurité', slug: 'chaussures-securite', productCount: 1 }
          ]
        }
      ]
    },
    'signaletique-interne': {
      name: 'Signalétique interne',
      description: 'Solutions de signalétique pour l\'intérieur de vos bâtiments',
      subcategories: [
        {
          name: 'Orientation & Wayfinding',
          slug: 'orientation-wayfinding',
          description: 'Fléchage et orientation dans les bâtiments',
          image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 3,
          subSubcategories: [
            { name: 'Fléchage directionnel', slug: 'flechage-directionnel', productCount: 1 },
            { name: 'Plans de bâtiment', slug: 'plans-batiment', productCount: 1 },
            { name: 'Numérotation', slug: 'numerotation', productCount: 1 },
            { name: 'Signalétique étages', slug: 'signaletique-etages', productCount: 0 }
          ]
        },
        {
          name: 'Identification des locaux',
          slug: 'identification-locaux',
          description: 'Plaques et panneaux d\'identification',
          image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 4,
          subSubcategories: [
            { name: 'Plaques de porte', slug: 'plaques-porte', productCount: 1 },
            { name: 'Pictogrammes WC', slug: 'pictogrammes-wc', productCount: 2 },
            { name: 'Salles de réunion', slug: 'salles-reunion', productCount: 1 },
            { name: 'Bureaux', slug: 'bureaux', productCount: 0 }
          ]
        },
        {
          name: 'Information générale',
          slug: 'information-generale',
          description: 'Panneaux d\'information et d\'affichage',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 2,
          subSubcategories: [
            { name: 'Panneaux d\'affichage', slug: 'panneaux-affichage', productCount: 1 },
            { name: 'Consignes', slug: 'consignes', productCount: 1 },
            { name: 'Horaires', slug: 'horaires', productCount: 0 },
            { name: 'Contact', slug: 'contact', productCount: 0 }
          ]
        }
      ]
    },
    'signaletique-externe': {
      name: 'Signalétique externe',
      description: 'Signalétique pour l\'extérieur et les espaces publics',
      subcategories: [
        {
          name: 'Enseignes & Façades',
          slug: 'enseignes-facades',
          description: 'Enseignes et signalétique de façade',
          image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 2,
          subSubcategories: [
            { name: 'Enseignes lumineuses', slug: 'enseignes-lumineuses', productCount: 1 },
            { name: 'Lettres découpées', slug: 'lettres-decoupees', productCount: 1 },
            { name: 'Totems', slug: 'totems', productCount: 0 },
            { name: 'Banderoles', slug: 'banderoles', productCount: 0 }
          ]
        },
        {
          name: 'Parking & Circulation',
          slug: 'parking-circulation',
          description: 'Signalisation de parking et circulation',
          image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 2,
          subSubcategories: [
            { name: 'Marquage au sol', slug: 'marquage-sol', productCount: 1 },
            { name: 'Panneaux de parking', slug: 'panneaux-parking', productCount: 1 },
            { name: 'Bornes', slug: 'bornes', productCount: 0 },
            { name: 'Barrières', slug: 'barrieres', productCount: 0 }
          ]
        },
        {
          name: 'Identification',
          slug: 'identification',
          description: 'Plaques et signalétique d\'identification',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 2,
          subSubcategories: [
            { name: 'Plaques professionnelles', slug: 'plaques-professionnelles', productCount: 1 },
            { name: 'Numéros de rue', slug: 'numeros-rue', productCount: 1 },
            { name: 'Signalétique d\'entreprise', slug: 'signaletique-entreprise', productCount: 0 },
            { name: 'Identification véhicules', slug: 'identification-vehicules', productCount: 0 }
          ]
        }
      ]
    },
    'accessibilite': {
      name: 'Accessibilité',
      description: 'Solutions pour l\'accessibilité et l\'inclusion',
      subcategories: [
        {
          name: 'PMR & Handicap',
          slug: 'pmr-handicap',
          description: 'Signalétique pour personnes à mobilité réduite',
          image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 2,
          subSubcategories: [
            { name: 'Pictogrammes PMR', slug: 'pictogrammes-pmr', productCount: 1 },
            { name: 'Braille', slug: 'braille', productCount: 0 },
            { name: 'Bandes podotactiles', slug: 'bandes-podotactiles', productCount: 0 },
            { name: 'Rampes d\'accès', slug: 'rampes-acces', productCount: 0 }
          ]
        },
        {
          name: 'Signalisation tactile',
          slug: 'signalisation-tactile',
          description: 'Signalétique tactile et pour malvoyants',
          image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400',
          productCount: 2,
          subSubcategories: [
            { name: 'Plaques braille', slug: 'plaques-braille', productCount: 1 },
            { name: 'Main courante tactile', slug: 'main-courante-tactile', productCount: 0 },
            { name: 'Contrastes', slug: 'contrastes', productCount: 0 },
            { name: 'Relief', slug: 'relief', productCount: 1 }
          ]
        }
      ]
    }
  };

  const currentCategory = category ? categoryData[category as keyof typeof categoryData] : null;
  const currentSubcategory = currentCategory && subcategory 
    ? currentCategory.subcategories.find(sub => sub.slug === subcategory)
    : null;
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category from URL
    if (category) {
      filtered = filtered.filter(product => 
        product.category === category
      );
    }

    // Filter by subcategory from URL
    if (subcategory) {
      filtered = filtered.filter(product => 
        product.subcategory === subcategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.some(cat => 
          product.category.includes(cat) || 
          (product.subcategory && product.subcategory.includes(cat))
        )
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const productPrice = product.priceTTC || product.price;
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });

    // Filter by materials
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product =>
        selectedMaterials.some(material => 
          product.description.toLowerCase().includes(material.toLowerCase())
        )
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        selectedSizes.some(size => 
          product.name.toLowerCase().includes(size.toLowerCase()) ||
          product.description.toLowerCase().includes(size.toLowerCase())
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = a.priceTTC || a.price;
          const priceB = b.priceTTC || b.price;
          return priceA - priceB;
        case 'price-high':
          const priceA2 = a.priceTTC || a.price;
          const priceB2 = b.priceTTC || b.price;
          return priceB2 - priceA2;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [category, subcategory, searchQuery, selectedCategories, priceRange, selectedMaterials, selectedSizes, sortBy]);

  const categoryNames = {
    'signalisation-securite': 'Signalisation de sécurité',
    'signaletique-interne': 'Signalétique interne',
    'signaletique-externe': 'Signalétique externe',
    'accessibilite': 'Accessibilité'
  };
  
  const subcategoryNames = {
    'securite-incendie': 'Sécurité Incendie',
    'panneaux-interdiction': 'Panneaux d\'interdiction',
    'panneaux-danger': 'Panneaux de danger',
    'epi-obligatoire': 'EPI Obligatoire',
    'orientation-wayfinding': 'Orientation & Wayfinding',
    'identification-locaux': 'Identification des locaux',
    'information-generale': 'Information générale',
    'enseignes-facades': 'Enseignes & Façades',
    'parking-circulation': 'Parking & Circulation',
    'identification': 'Identification',
    'pmr-handicap': 'PMR & Handicap',
    'signalisation-tactile': 'Signalisation tactile'
  };

  const categories = Array.from(new Set(products.map(p => p.category))).map(cat => categoryNames[cat] || cat);
  const subcategories = Array.from(new Set(products.map(p => p.subcategory).filter(Boolean))).map(sub => subcategoryNames[sub] || sub);
  const materials = ['PVC', 'Aluminium', 'Inox', 'Laiton', 'Adhésif'];
  const sizes = ['A4', 'A3', 'A1', 'Petit', 'Moyen', 'Grand'];

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
            {category && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  <Link 
                    to={`/products/${category}`} 
                    className={`${subcategory ? 'text-gray-700 hover:text-teal-600' : 'text-gray-500'}`}
                  >
                    {currentCategory?.name || category.replace('-', ' ')}
                  </Link>
                </div>
              </li>
            )}
            {subcategory && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  <span className="text-gray-500">
                    {currentCategory?.subcategories?.find(sub => sub.slug === subcategory)?.name || subcategory}
                  </span>
                </div>
              </li>
            )}
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {subcategory 
                ? currentCategory?.subcategories?.find(sub => sub.slug === subcategory)?.name || subcategory
                : currentCategory?.name || (category ? category.replace('-', ' ').charAt(0).toUpperCase() + category.replace('-', ' ').slice(1) : 'Tous les produits')
              }
            </h1>
            {currentCategory && !subcategory && (
              <p className="text-gray-600 mb-4 max-w-2xl">{currentCategory.description}</p>
            )}
            <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-teal-50 text-teal-600' : 'text-gray-400'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-teal-50 text-teal-600' : 'text-gray-400'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="name">Trier par nom</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              <Filter size={20} />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        {/* Sous-catégories */}
        {currentCategory && !subcategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explorez nos sous-catégories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCategory.subcategories.map((subcategory, index) => (
                <Link
                  key={index}
                  to={`/products/${category}/${subcategory.slug}`}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-teal-200"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-sm font-medium">
                        <span>{subcategory.productCount} produits</span>
                        <ChevronRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-teal-600 transition-colors">
                      {subcategory.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {subcategory.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-600 font-semibold">
                        {subcategory.productCount} produits
                      </span>
                      <div className="flex items-center text-teal-600 group-hover:text-teal-700 transition-colors">
                        <span className="text-sm font-medium mr-1">Découvrir</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sous-sous-catégories */}
        {currentSubcategory && currentSubcategory.subSubcategories && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explorez nos spécialités</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentSubcategory.subSubcategories.map((subSubcategory, index) => (
                <Link
                  key={index}
                  to={`/products/${category}/${subcategory}/${subSubcategory.slug}`}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-teal-200 cursor-pointer"
                >
                  <div className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">
                        {subSubcategory.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-teal-600 transition-colors">
                      {subSubcategory.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-600 font-semibold">
                        {subSubcategory.productCount} produit{subSubcategory.productCount > 1 ? 's' : ''}
                      </span>
                      {subSubcategory.productCount > 0 && (
                        <div className="flex items-center text-teal-600 group-hover:text-teal-700 transition-colors">
                          <span className="text-sm font-medium mr-1">Voir</span>
                          <ChevronRight size={16} />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`transition-all duration-300 ease-in-out ${
            showFilters 
              ? 'lg:w-80 opacity-100 translate-x-0' 
              : 'lg:w-0 opacity-0 -translate-x-full lg:translate-x-0'
          } ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className={`bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ${
              showFilters ? 'scale-100' : 'scale-95 lg:scale-100'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Filtres</h3>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMaterials([]);
                    setSelectedSizes([]);
                    setPriceRange([0, 500]);
                  }}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Réinitialiser
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <span>Catégories</span>
                  {selectedCategories.length > 0 && (
                    <span className="ml-2 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, cat]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== cat));
                          }
                        }}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Prix</h4>
                <div className="space-y-4">
                  <div className="px-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="mx-2 text-gray-500">-</span>
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Max"
                    />
                    <span className="ml-2 text-sm text-gray-600">€</span>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {subcategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <span>Sous-catégories</span>
                    {selectedCategories.filter(cat => subcategories.includes(cat)).length > 0 && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {selectedCategories.filter(cat => subcategories.includes(cat)).length}
                      </span>
                    )}
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {subcategories.map((subcat) => (
                      <label key={subcat} className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(subcat)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, subcat]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== subcat));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm">{subcat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <span>Matériaux</span>
                  {selectedMaterials.length > 0 && (
                    <span className="ml-2 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                      {selectedMaterials.length}
                    </span>
                  )}
                </h4>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMaterials([...selectedMaterials, material]);
                          } else {
                            setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                          }
                        }}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <span>Formats</span>
                  {selectedSizes.length > 0 && (
                    <span className="ml-2 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                      {selectedSizes.length}
                    </span>
                  )}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSizes([...selectedSizes, size]);
                          } else {
                            setSelectedSizes(selectedSizes.filter(s => s !== size));
                          }
                        }}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedMaterials.length > 0 || selectedSizes.length > 0) && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Filtres actifs</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full"
                      >
                        {cat}
                        <button
                          onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                          className="ml-1 hover:text-teal-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedMaterials.map((material) => (
                      <span
                        key={material}
                        className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {material}
                        <button
                          onClick={() => setSelectedMaterials(selectedMaterials.filter(m => m !== material))}
                          className="ml-1 hover:text-blue-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedSizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                      >
                        {size}
                        <button
                          onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}
                          className="ml-1 hover:text-purple-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className={`flex-1 transition-all duration-300 ${
            showFilters ? 'lg:ml-0' : 'lg:ml-0'
          }`}>
            {filteredProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Découvrez nos produits</h2>
                <p className="text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} 
                  {category && ` dans ${categoryNames[category] || category}`}
                  {subcategory && ` - ${subcategoryNames[subcategory] || subcategory}`}
                </p>
              </div>
            )}
            
            {viewMode === 'grid' ? (
              <div className={`grid gap-8 transition-all duration-300 ${
                showFilters 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
              }`}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
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
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;