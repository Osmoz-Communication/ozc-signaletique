import React, { useState } from 'react';
import { Plus, Edit, Trash2, Download, Upload, Eye, FileText, Users, BarChart3, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Catalogue {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  downloadCount: number;
  requestCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CataloguesManagement = () => {
  const { showToast } = useToast();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([
    {
      id: '1',
      title: 'Catalogue Général 2024',
      description: 'Notre catalogue complet avec toute notre gamme de produits',
      category: 'Général',
      fileUrl: '/catalogues/catalogue-general-2024.pdf',
      fileName: 'catalogue-general-2024.pdf',
      fileSize: '12.5 MB',
      downloadCount: 1245,
      requestCount: 89,
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      title: 'Signalisation de Sécurité',
      description: 'Catalogue spécialisé en signalisation de sécurité et incendie',
      category: 'Sécurité',
      fileUrl: '/catalogues/catalogue-securite-2024.pdf',
      fileName: 'catalogue-securite-2024.pdf',
      fileSize: '8.2 MB',
      downloadCount: 756,
      requestCount: 34,
      isActive: true,
      createdAt: '2024-02-10',
      updatedAt: '2024-11-15'
    },
    {
      id: '3',
      title: 'Signalétique Interne',
      description: 'Solutions de signalétique pour espaces intérieurs',
      category: 'Interne',
      fileUrl: '/catalogues/catalogue-interne-2024.pdf',
      fileName: 'catalogue-interne-2024.pdf',
      fileSize: '6.8 MB',
      downloadCount: 432,
      requestCount: 18,
      isActive: true,
      createdAt: '2024-03-05',
      updatedAt: '2024-10-20'
    },
    {
      id: '4',
      title: 'Signalétique Externe',
      description: 'Enseignes et signalétique pour extérieurs',
      category: 'Externe',
      fileUrl: '/catalogues/catalogue-externe-2024.pdf',
      fileName: 'catalogue-externe-2024.pdf',
      fileSize: '9.1 MB',
      downloadCount: 298,
      requestCount: 22,
      isActive: true,
      createdAt: '2024-04-12',
      updatedAt: '2024-09-30'
    },
    {
      id: '5',
      title: 'Solutions Accessibilité',
      description: 'Signalétique PMR et solutions d\'accessibilité',
      category: 'Accessibilité',
      fileUrl: '/catalogues/catalogue-accessibilite-2024.pdf',
      fileName: 'catalogue-accessibilite-2024.pdf',
      fileSize: '4.3 MB',
      downloadCount: 187,
      requestCount: 15,
      isActive: true,
      createdAt: '2024-05-08',
      updatedAt: '2024-08-25'
    },
    {
      id: '6',
      title: 'Tarifs 2024',
      description: 'Grille tarifaire complète pour tous nos produits',
      category: 'Tarifs',
      fileUrl: '/catalogues/tarifs-2024.pdf',
      fileName: 'tarifs-2024.pdf',
      fileSize: '2.1 MB',
      downloadCount: 892,
      requestCount: 67,
      isActive: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCatalogue, setEditingCatalogue] = useState<Catalogue | null>(null);

  const categories = ['all', 'Général', 'Sécurité', 'Interne', 'Externe', 'Accessibilité', 'Tarifs'];

  const filteredCatalogues = catalogues.filter(catalogue => {
    const matchesSearch = catalogue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         catalogue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || catalogue.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalDownloads = catalogues.reduce((sum, cat) => sum + cat.downloadCount, 0);
  const totalRequests = catalogues.reduce((sum, cat) => sum + cat.requestCount, 0);
  const activeCatalogues = catalogues.filter(cat => cat.isActive).length;

  const toggleActive = (catalogueId: string) => {
    setCatalogues(prev => prev.map(cat => 
      cat.id === catalogueId ? { ...cat, isActive: !cat.isActive } : cat
    ));
    showToast('Statut du catalogue mis à jour', 'success');
  };

  const handleEdit = (catalogue: Catalogue) => {
    setEditingCatalogue(catalogue);
    setShowEditModal(true);
  };

  const handleDelete = (catalogueId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce catalogue ?')) {
      setCatalogues(prev => prev.filter(cat => cat.id !== catalogueId));
      showToast('Catalogue supprimé avec succès', 'success');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Général': return 'bg-blue-100 text-blue-800';
      case 'Sécurité': return 'bg-red-100 text-red-800';
      case 'Interne': return 'bg-green-100 text-green-800';
      case 'Externe': return 'bg-purple-100 text-purple-800';
      case 'Accessibilité': return 'bg-orange-100 text-orange-800';
      case 'Tarifs': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des catalogues</h1>
          <p className="text-gray-600 mt-1">Gérez vos catalogues et suivez leurs performances</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-ozc-600 text-white rounded-lg hover:bg-ozc-700 transition-colors">
            <Plus size={18} />
            <span>Nouveau catalogue</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total catalogues</p>
              <p className="text-2xl font-bold text-gray-900">{catalogues.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Catalogues actifs</p>
              <p className="text-2xl font-bold text-green-600">{activeCatalogues}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total téléchargements</p>
              <p className="text-2xl font-bold text-purple-600">{totalDownloads.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Demandes physiques</p>
              <p className="text-2xl font-bold text-orange-600">{totalRequests}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un catalogue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
            />
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500 bg-white"
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des catalogues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCatalogues.map((catalogue) => (
          <div key={catalogue.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{catalogue.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(catalogue.category)}`}>
                      {catalogue.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{catalogue.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{catalogue.fileSize}</span>
                    <span>•</span>
                    <span>{catalogue.downloadCount} téléchargements</span>
                    <span>•</span>
                    <span>{catalogue.requestCount} demandes</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleActive(catalogue.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      catalogue.isActive 
                        ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                        : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(catalogue)}
                    className="p-2 text-ozc-600 bg-ozc-50 hover:bg-ozc-100 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(catalogue.id)}
                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {((catalogue.downloadCount / totalDownloads) * 100).toFixed(1)}% du total
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Mis à jour le {new Date(catalogue.updatedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-4">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download size={16} />
                  <span>Télécharger</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-ozc-500 text-ozc-600 rounded-lg hover:bg-ozc-50 transition-colors">
                  <Upload size={16} />
                  <span>Remplacer</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCatalogues.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Aucun catalogue trouvé</p>
          <p className="text-gray-400 text-sm">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default CataloguesManagement; 