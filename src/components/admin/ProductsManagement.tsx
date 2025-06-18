import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Package, Image, X, Save, Upload, Tag, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  priceHT?: number;
  priceTTC?: number;
  sku?: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  image: string;
  images?: string[];
  description: string;
  shortDescription?: string;
  technicalSpecs?: {
    material: string;
    dimensions: string;
    weight?: string;
    color?: string;
    format?: string;
    installation?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  shipping?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    shippingClass?: string;
  };
  bundleOffer?: BundleOffer;
  tags?: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface BundleOffer {
  id: string;
  name: string;
  products: string[]; // IDs des produits
  discount: number; // Pourcentage de réduction
  isActive: boolean;
}

const ProductsManagement = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Panneau Sortie de Secours LED',
      category: 'Signalisation de sécurité',
      subcategory: 'Sécurité Incendie',
      price: 45.90,
      priceHT: 38.25,
      priceTTC: 45.90,
      sku: 'SEC-LED-001',
      stock: 25,
      status: 'active',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg',
      description: 'Panneau de sortie de secours avec éclairage LED intégré'
    },
    {
      id: '2',
      name: 'Extincteur CO2 5kg',
      category: 'Signalisation de sécurité',
      subcategory: 'Sécurité Incendie',
      price: 89.50,
      priceHT: 74.58,
      priceTTC: 89.50,
      sku: 'EXT-CO2-002',
      stock: 12,
      status: 'active',
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg',
      description: 'Extincteur au CO2 de 5kg pour feux de classe B et C'
    },
    {
      id: '3',
      name: 'Plaque Bureau Direction',
      category: 'Signalétique interne',
      subcategory: 'Identification des locaux',
      price: 24.90,
      priceHT: 20.75,
      priceTTC: 24.90,
      sku: 'LOC-DIR-003',
      stock: 0,
      status: 'inactive',
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg',
      description: 'Plaque de porte en aluminium brossé'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // États pour les modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFormTab, setActiveFormTab] = useState('general');
  
  // Formulaire produit
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: '',
    subcategory: '',
    priceHT: 0,
    priceTTC: 0,
    sku: '',
    stock: 0,
    status: 'draft',
    image: '',
    images: [],
    description: '',
    shortDescription: '',
    technicalSpecs: {
      material: '',
      dimensions: '',
      weight: '',
      color: '',
      format: '',
      installation: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    },
    shipping: {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0
      },
      shippingClass: 'standard'
    },
    tags: [],
    featured: false
  });
  
  // Formulaire offre groupée
  const [bundleForm, setBundleForm] = useState<Partial<BundleOffer>>({
    name: '',
    products: [],
    discount: 0,
    isActive: false
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600', label: 'Rupture' };
    if (stock < 5) return { color: 'text-orange-600', label: 'Stock faible' };
    return { color: 'text-green-600', label: 'En stock' };
  };

  // Fonctions CRUD
  // Fonction d'export CSV
  const exportToCSV = () => {
    const csvData = [
      ['ID', 'Nom', 'Catégorie', 'Prix HT', 'Prix TTC', 'UGS', 'Stock', 'Statut'],
      ...filteredProducts.map(p => [
        p.id,
        p.name,
        p.category,
        p.priceHT?.toString() || p.price.toString(),
        p.priceTTC?.toString() || p.price.toString(),
        p.sku || '',
        p.stock.toString(),
        p.status
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `produits_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Export CSV des produits téléchargé avec succès', 'success');
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productForm.name || '',
      category: productForm.category || '',
      subcategory: productForm.subcategory,
      price: productForm.priceTTC || 0,
      priceHT: productForm.priceHT || 0,
      priceTTC: productForm.priceTTC || 0,
      sku: productForm.sku || '',
      stock: productForm.stock || 0,
      status: productForm.status || 'draft',
      image: productForm.image || 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg',
      description: productForm.description || ''
    };
    
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    resetForm();
    showToast('Produit ajouté avec succès !', 'success');
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id
        ? { ...product, ...productForm }
        : product
    );
    
    setProducts(updatedProducts);
    setShowEditModal(false);
    resetForm();
    showToast('Produit modifié avec succès !', 'success');
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    setProducts(products.filter(product => product.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
    showToast('Produit supprimé avec succès', 'success');
  };

  const handleAddBundle = () => {
    if (!selectedProduct || !bundleForm.name) return;
    
    const bundle: BundleOffer = {
      id: Date.now().toString(),
      name: bundleForm.name,
      products: bundleForm.products || [],
      discount: bundleForm.discount || 0,
      isActive: bundleForm.isActive || false
    };

    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id
        ? { ...product, bundleOffer: bundle }
        : product
    );
    
    setProducts(updatedProducts);
    setShowBundleModal(false);
    resetBundleForm();
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      category: '',
      subcategory: '',
      priceHT: 0,
      priceTTC: 0,
      sku: '',
      stock: 0,
      status: 'draft',
      image: '',
      images: [],
      description: '',
      shortDescription: '',
      technicalSpecs: {
        material: '',
        dimensions: '',
        weight: '',
        color: '',
        format: '',
        installation: ''
      },
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      },
      shipping: {
        weight: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0
        },
        shippingClass: 'standard'
      },
      tags: [],
      featured: false
    });
    setSelectedProduct(null);
  };

  const resetBundleForm = () => {
    setBundleForm({
      name: '',
      products: [],
      discount: 0,
      isActive: false
    });
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setProductForm(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const openBundleModal = (product: Product) => {
    setSelectedProduct(product);
    if (product.bundleOffer) {
      setBundleForm(product.bundleOffer);
    }
    setShowBundleModal(true);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowBundleModal(false);
    setShowProductDetails(false);
    setSelectedProduct(null);
    setActiveFormTab('general');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des produits</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            <span>Exporter CSV</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus size={16} />
            <span>Nouveau produit</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou UGS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="draft">Brouillon</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Toutes les catégories</option>
            <option value="Signalisation de sécurité">Signalisation de sécurité</option>
            <option value="Signalétique interne">Signalétique interne</option>
            <option value="Signalétique externe">Signalétique externe</option>
            <option value="Accessibilité">Accessibilité</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total produits</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Produits actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ruptures de stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stock faible</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.stock > 0 && p.stock < 5).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">
                              {product.name}
                            </span>
                            {product.bundleOffer && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                <Tag size={12} className="mr-1" />
                                Offre -{product.bundleOffer.discount}%
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            UGS: {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                      {product.subcategory && (
                        <div className="text-sm text-gray-500">{product.subcategory}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.priceHT?.toFixed(2)}€ HT
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.priceTTC?.toFixed(2)}€ TTC
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.stock} unités
                      </div>
                      <div className={`text-sm ${stockStatus.color}`}>
                        {stockStatus.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusLabel(product.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => openProductDetails(product)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Voir les détails"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => openEditModal(product)}
                          className="text-teal-600 hover:text-teal-700"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => openBundleModal(product)}
                          className="text-purple-600 hover:text-purple-700"
                          title="Offre groupée"
                        >
                          <Tag size={16} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(product)}
                          className="text-red-600 hover:text-red-700"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {/* Modal Ajout Produit */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Ajouter un produit</h2>
              <button 
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Onglets */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'general', label: 'Général', icon: '📝' },
                  { id: 'images', label: 'Images', icon: '🖼️' },
                  { id: 'specs', label: 'Spécifications', icon: '⚙️' },
                  { id: 'seo', label: 'SEO', icon: '🔍' },
                  { id: 'shipping', label: 'Expédition', icon: '📦' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFormTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeFormTab === tab.id
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
              <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }} className="p-6">
                {/* Onglet Général */}
                {activeFormTab === 'general' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit *</label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">UGS</label>
                        <input
                          type="text"
                          value={productForm.sku}
                          onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Ex: PAN-001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        >
                          <option value="">Sélectionner une catégorie</option>
                          <option value="signalisation-securite">Signalisation de sécurité</option>
                          <option value="signaletique-interne">Signalétique interne</option>
                          <option value="signaletique-externe">Signalétique externe</option>
                          <option value="accessibilite">Accessibilité</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sous-catégorie</label>
                        <input
                          type="text"
                          value={productForm.subcategory}
                          onChange={(e) => setProductForm({...productForm, subcategory: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Ex: Panneaux d'évacuation"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prix HT (€) *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.priceHT}
                          onChange={(e) => {
                            const priceHT = parseFloat(e.target.value);
                            setProductForm({
                              ...productForm, 
                              priceHT,
                              priceTTC: priceHT * 1.2
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prix TTC (€) *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.priceTTC}
                          onChange={(e) => {
                            const priceTTC = parseFloat(e.target.value);
                            setProductForm({
                              ...productForm, 
                              priceTTC,
                              priceHT: priceTTC / 1.2
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                        <input
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                        <select
                          value={productForm.status}
                          onChange={(e) => setProductForm({...productForm, status: e.target.value as 'active' | 'inactive' | 'draft'})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="draft">Brouillon</option>
                          <option value="active">Actif</option>
                          <option value="inactive">Inactif</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={productForm.featured || false}
                          onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                          Produit mis en avant
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description courte</label>
                      <textarea
                        value={productForm.shortDescription}
                        onChange={(e) => setProductForm({...productForm, shortDescription: e.target.value})}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Résumé du produit en quelques mots..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description complète</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Description détaillée du produit..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <input
                        type="text"
                        value={productForm.tags?.join(', ') || ''}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="sécurité, urgence, évacuation (séparés par des virgules)"
                      />
                    </div>
                  </div>
                )}

                {/* Onglet Images */}
                {activeFormTab === 'images' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image principale *</label>
                      <input
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="https://exemple.com/image.jpg"
                        required
                      />
                      {productForm.image && (
                        <div className="mt-3">
                          <img 
                            src={productForm.image} 
                            alt="Aperçu" 
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Images supplémentaires</label>
                      <div className="space-y-3">
                        {(productForm.images || []).map((img, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="url"
                              value={img}
                              onChange={(e) => {
                                const newImages = [...(productForm.images || [])];
                                newImages[index] = e.target.value;
                                setProductForm({...productForm, images: newImages});
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                              placeholder="https://exemple.com/image.jpg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = (productForm.images || []).filter((_, i) => i !== index);
                                setProductForm({...productForm, images: newImages});
                              }}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...(productForm.images || []), ''];
                            setProductForm({...productForm, images: newImages});
                          }}
                          className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                        >
                          <Plus size={16} />
                          <span>Ajouter une image</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Onglet Spécifications */}
                {activeFormTab === 'specs' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Matériau</label>
                        <select
                          value={productForm.technicalSpecs?.material || ''}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            technicalSpecs: { ...productForm.technicalSpecs, material: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Sélectionner un matériau</option>
                          <option value="PVC">PVC</option>
                          <option value="Aluminium">Aluminium</option>
                          <option value="Inox">Inox</option>
                          <option value="Laiton">Laiton</option>
                          <option value="Adhésif">Adhésif</option>
                          <option value="Plexiglas">Plexiglas</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                        <input
                          type="text"
                          value={productForm.technicalSpecs?.dimensions || ''}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            technicalSpecs: { ...productForm.technicalSpecs, dimensions: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Ex: 200 x 100 mm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Poids</label>
                        <input
                          type="text"
                          value={productForm.technicalSpecs?.weight || ''}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            technicalSpecs: { ...productForm.technicalSpecs, weight: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Ex: 150g"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                        <input
                          type="text"
                          value={productForm.technicalSpecs?.color || ''}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            technicalSpecs: { ...productForm.technicalSpecs, color: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Ex: Vert et blanc"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select
                          value={productForm.technicalSpecs?.format || ''}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            technicalSpecs: { ...productForm.technicalSpecs, format: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Sélectionner un format</option>
                          <option value="A4">A4</option>
                          <option value="A3">A3</option>
                          <option value="A2">A2</option>
                          <option value="A1">A1</option>
                          <option value="Petit">Petit</option>
                          <option value="Moyen">Moyen</option>
                          <option value="Grand">Grand</option>
                          <option value="Personnalisé">Personnalisé</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instructions d'installation</label>
                      <textarea
                        value={productForm.technicalSpecs?.installation || ''}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          technicalSpecs: { ...productForm.technicalSpecs, installation: e.target.value }
                        })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Instructions pour l'installation du produit..."
                      />
                    </div>
                  </div>
                )}

                {/* Onglet SEO */}
                {activeFormTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre SEO</label>
                      <input
                        type="text"
                        value={productForm.seo?.metaTitle || ''}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          seo: { ...productForm.seo, metaTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Titre optimisé pour les moteurs de recherche"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommandé: 50-60 caractères</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description SEO</label>
                      <textarea
                        value={productForm.seo?.metaDescription || ''}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          seo: { ...productForm.seo, metaDescription: e.target.value }
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Description pour les résultats de recherche"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommandé: 150-160 caractères</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mots-clés SEO</label>
                      <input
                        type="text"
                        value={productForm.seo?.keywords?.join(', ') || ''}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          seo: { 
                            ...productForm.seo, 
                            keywords: e.target.value.split(',').map(kw => kw.trim()).filter(kw => kw)
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="panneau, sécurité, évacuation (séparés par des virgules)"
                      />
                    </div>
                  </div>
                )}

                {/* Onglet Expédition */}
                {activeFormTab === 'shipping' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Poids (kg)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.shipping?.weight || 0}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            shipping: { ...productForm.shipping, weight: parseFloat(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Classe d'expédition</label>
                        <select
                          value={productForm.shipping?.shippingClass || 'standard'}
                          onChange={(e) => setProductForm({
                            ...productForm, 
                            shipping: { ...productForm.shipping, shippingClass: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="standard">Standard</option>
                          <option value="express">Express</option>
                          <option value="fragile">Fragile</option>
                          <option value="volumineux">Volumineux</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions du colis (cm)</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <input
                            type="number"
                            step="0.1"
                            value={productForm.shipping?.dimensions?.length || 0}
                            onChange={(e) => setProductForm({
                              ...productForm, 
                              shipping: { 
                                ...productForm.shipping, 
                                dimensions: { 
                                  ...productForm.shipping?.dimensions, 
                                  length: parseFloat(e.target.value) 
                                }
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Longueur"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            step="0.1"
                            value={productForm.shipping?.dimensions?.width || 0}
                            onChange={(e) => setProductForm({
                              ...productForm, 
                              shipping: { 
                                ...productForm.shipping, 
                                dimensions: { 
                                  ...productForm.shipping?.dimensions, 
                                  width: parseFloat(e.target.value) 
                                }
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Largeur"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            step="0.1"
                            value={productForm.shipping?.dimensions?.height || 0}
                            onChange={(e) => setProductForm({
                              ...productForm, 
                              shipping: { 
                                ...productForm.shipping, 
                                dimensions: { 
                                  ...productForm.shipping?.dimensions, 
                                  height: parseFloat(e.target.value) 
                                }
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Hauteur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeAllModals}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Save size={16} />
                    <span>Ajouter le produit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification Produit */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Modifier le produit</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleEditProduct(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UGS</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix HT (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.priceHT}
                    onChange={(e) => {
                      const priceHT = parseFloat(e.target.value);
                      setProductForm({
                        ...productForm, 
                        priceHT,
                        priceTTC: priceHT * 1.2
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  <Save size={16} />
                  <span>Sauvegarder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Confirmer la suppression</h2>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer le produit "{selectedProduct.name}" ? 
              Cette action est irréversible.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Offre Groupée */}
      {showBundleModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Configurer l'offre groupée - {selectedProduct.name}
              </h2>
              <button 
                onClick={() => setShowBundleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddBundle(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'offre</label>
                <input
                  type="text"
                  value={bundleForm.name}
                  onChange={(e) => setBundleForm({...bundleForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Ex: Pack Sécurité Incendie"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Réduction (%)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={bundleForm.discount}
                  onChange={(e) => setBundleForm({...bundleForm, discount: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produits inclus</label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                  {products
                    .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
                    .map(product => (
                      <label key={product.id} className="flex items-center space-x-2 py-1">
                        <input
                          type="checkbox"
                          checked={bundleForm.products?.includes(product.id) || false}
                          onChange={(e) => {
                            const currentProducts = bundleForm.products || [];
                            if (e.target.checked) {
                              setBundleForm({
                                ...bundleForm,
                                products: [...currentProducts, product.id]
                              });
                            } else {
                              setBundleForm({
                                ...bundleForm,
                                products: currentProducts.filter(id => id !== product.id)
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm">{product.name}</span>
                        <span className="text-xs text-gray-500">
                          ({product.priceTTC?.toFixed(2)}€)
                        </span>
                      </label>
                    ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bundle-active"
                  checked={bundleForm.isActive || false}
                  onChange={(e) => setBundleForm({...bundleForm, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="bundle-active" className="text-sm font-medium text-gray-700">
                  Activer l'offre groupée
                </label>
              </div>
              
              {selectedProduct.bundleOffer && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Offre actuelle :</strong> {selectedProduct.bundleOffer.name} 
                    ({selectedProduct.bundleOffer.discount}% de réduction)
                  </p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBundleModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Tag size={16} />
                  <span>Configurer l'offre</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement; 