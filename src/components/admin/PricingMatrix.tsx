import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calculator, Grid, Settings, DollarSign, Download, Upload, Eye, Search, Filter, ChevronDown, Check } from 'lucide-react';

interface PriceEntry {
  id: string;
  material: string;
  dimension: string;
  price: number;
  options: string[];
  active: boolean;
}

interface Material {
  id: string;
  name: string;
  color: string;
}

interface Dimension {
  id: string;
  name: string;
  size: string;
}

interface Option {
  id: string;
  name: string;
  price: number;
}

// Composant Dropdown personnalisé
const CustomDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  className = "" 
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500 bg-white text-left flex justify-between items-center"
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
            <div 
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
            >
              <span className="text-gray-500">{placeholder}</span>
              {value === '' && <Check size={16} className="text-ozc-600" />}
            </div>
            {options.map(option => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
                {value === option.value && <Check size={16} className="text-ozc-600" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PricingMatrix = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'config'>('matrix');
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PriceEntry[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showAddDimensionModal, setShowAddDimensionModal] = useState(false);
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [showEditPriceModal, setShowEditPriceModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'material' | 'dimension' | 'option', id: string, name: string} | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<PriceEntry | null>(null);

  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'PVC', color: 'bg-blue-500' },
    { id: '2', name: 'Aluminium', color: 'bg-gray-500' },
    { id: '3', name: 'Inox', color: 'bg-slate-600' },
    { id: '4', name: 'Laiton', color: 'bg-yellow-600' },
    { id: '5', name: 'Plexiglas', color: 'bg-cyan-500' },
    { id: '6', name: 'Adhésif', color: 'bg-green-500' }
  ]);

  const [dimensions, setDimensions] = useState<Dimension[]>([
    { id: '1', name: 'A6', size: '10.5x14.8cm' },
    { id: '2', name: 'A5', size: '14.8x21cm' },
    { id: '3', name: 'A4', size: '21x29.7cm' },
    { id: '4', name: 'A3', size: '29.7x42cm' },
    { id: '5', name: 'A2', size: '42x59.4cm' },
    { id: '6', name: 'A1', size: '59.4x84.1cm' },
    { id: '7', name: 'Petit', size: '15x15cm' },
    { id: '8', name: 'Moyen', size: '30x30cm' },
    { id: '9', name: 'Grand', size: '50x50cm' }
  ]);

  const [options, setOptions] = useState<Option[]>([
    { id: '1', name: 'Troué', price: 3.50 },
    { id: '2', name: 'Coins arrondis', price: 2.00 },
    { id: '3', name: 'Découpe laser', price: 8.00 },
    { id: '4', name: 'Gravure laser', price: 12.00 },
    { id: '5', name: 'Impression UV', price: 15.00 },
    { id: '6', name: 'Finition brossée', price: 5.00 },
    { id: '7', name: 'Polissage miroir', price: 8.50 },
    { id: '8', name: 'Adhésif renforcé', price: 4.00 }
  ]);

  const [priceEntries, setPriceEntries] = useState<PriceEntry[]>([
    // Prix PVC
    { id: '1-1', material: 'PVC', dimension: 'A6', price: 8.50, options: [], active: true },
    { id: '1-2', material: 'PVC', dimension: 'A5', price: 11.20, options: [], active: true },
    { id: '1-3', material: 'PVC', dimension: 'A4', price: 15.00, options: [], active: true },
    { id: '1-4', material: 'PVC', dimension: 'A3', price: 25.50, options: [], active: true },
    { id: '1-5', material: 'PVC', dimension: 'A2', price: 42.00, options: [], active: true },
    { id: '1-6', material: 'PVC', dimension: 'A1', price: 68.00, options: [], active: true },
    { id: '1-7', material: 'PVC', dimension: 'Petit', price: 12.00, options: [], active: true },
    { id: '1-8', material: 'PVC', dimension: 'Moyen', price: 22.50, options: [], active: true },
    { id: '1-9', material: 'PVC', dimension: 'Grand', price: 58.00, options: [], active: true },
    
    // Prix Aluminium
    { id: '2-1', material: 'Aluminium', dimension: 'A6', price: 15.50, options: [], active: true },
    { id: '2-2', material: 'Aluminium', dimension: 'A5', price: 19.80, options: [], active: true },
    { id: '2-3', material: 'Aluminium', dimension: 'A4', price: 28.00, options: [], active: true },
    { id: '2-4', material: 'Aluminium', dimension: 'A3', price: 45.00, options: [], active: true },
    { id: '2-5', material: 'Aluminium', dimension: 'A2', price: 78.00, options: [], active: true },
    { id: '2-6', material: 'Aluminium', dimension: 'A1', price: 125.00, options: [], active: true },
    { id: '2-7', material: 'Aluminium', dimension: 'Petit', price: 22.00, options: [], active: true },
    { id: '2-8', material: 'Aluminium', dimension: 'Moyen', price: 38.50, options: [], active: true },
    { id: '2-9', material: 'Aluminium', dimension: 'Grand', price: 95.00, options: [], active: true },
    
    // Prix Inox
    { id: '3-1', material: 'Inox', dimension: 'A6', price: 22.50, options: [], active: true },
    { id: '3-2', material: 'Inox', dimension: 'A5', price: 28.50, options: [], active: true },
    { id: '3-3', material: 'Inox', dimension: 'A4', price: 38.00, options: [], active: true },
    { id: '3-4', material: 'Inox', dimension: 'A3', price: 65.00, options: [], active: true },
    { id: '3-5', material: 'Inox', dimension: 'A2', price: 110.00, options: [], active: true },
    { id: '3-6', material: 'Inox', dimension: 'A1', price: 185.00, options: [], active: true },
    { id: '3-7', material: 'Inox', dimension: 'Petit', price: 32.00, options: [], active: true },
    { id: '3-8', material: 'Inox', dimension: 'Moyen', price: 55.00, options: [], active: true },
    { id: '3-9', material: 'Inox', dimension: 'Grand', price: 140.00, options: [], active: true }
  ]);

  // Recherche en temps réel
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = priceEntries.filter(entry => {
      const query = searchQuery.toLowerCase();
      const dimension = dimensions.find(d => d.name === entry.dimension);
      
      return (
        entry.material.toLowerCase().includes(query) ||
        entry.dimension.toLowerCase().includes(query) ||
        (dimension && dimension.size.toLowerCase().includes(query)) ||
        entry.options.some(option => option.toLowerCase().includes(query)) ||
        entry.price.toString().includes(query)
      );
    });

    setSearchResults(results);
    setShowSearchResults(true);
  }, [searchQuery, priceEntries]);

  const displayedEntries = showSearchResults ? searchResults : priceEntries;

  const groupedEntries = displayedEntries.reduce((acc, entry) => {
    if (!acc[entry.material]) {
      acc[entry.material] = [];
    }
    acc[entry.material].push(entry);
    return acc;
  }, {} as Record<string, PriceEntry[]>);

  const updatePrice = (entryId: string, newPrice: number) => {
    setPriceEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, price: newPrice } : entry
    ));
  };

  const toggleActive = (entryId: string) => {
    setPriceEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, active: !entry.active } : entry
    ));
  };

  const exportCSV = () => {
    const csvContent = [
      ['Matériau', 'Dimension', 'Prix', 'Options', 'Actif'],
      ...priceEntries.map(entry => [
        entry.material,
        entry.dimension,
        entry.price.toString(),
        entry.options.join(';'),
        entry.active ? 'Oui' : 'Non'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'matrice-prix.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const openEditModal = (entry: PriceEntry) => {
    setSelectedEntry(entry);
    setShowEditPriceModal(true);
  };

  const updateEntryWithOptions = (entryId: string, newPrice: number, newOptions: string[]) => {
    setPriceEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, price: newPrice, options: newOptions } : entry
    ));
  };

  const addMaterial = (name: string, color: string) => {
    const newMaterial = {
      id: Date.now().toString(),
      name,
      color
    };
    setMaterials(prev => [...prev, newMaterial]);
    setShowAddMaterialModal(false);
  };

  const addDimension = (name: string, size: string) => {
    const newDimension = {
      id: Date.now().toString(),
      name,
      size
    };
    setDimensions(prev => [...prev, newDimension]);
    setShowAddDimensionModal(false);
  };

  const addOption = (name: string, price: number) => {
    const newOption = {
      id: Date.now().toString(),
      name,
      price
    };
    setOptions(prev => [...prev, newOption]);
    setShowAddOptionModal(false);
  };

  const confirmDelete = (type: 'material' | 'dimension' | 'option', id: string, name: string) => {
    setItemToDelete({ type, id, name });
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;

    switch (itemToDelete.type) {
      case 'material':
        setMaterials(prev => prev.filter(m => m.id !== itemToDelete.id));
        setPriceEntries(prev => prev.filter(e => e.material !== itemToDelete.name));
        break;
      case 'dimension':
        setDimensions(prev => prev.filter(d => d.id !== itemToDelete.id));
        setPriceEntries(prev => prev.filter(e => e.dimension !== itemToDelete.name));
        break;
      case 'option':
        setOptions(prev => prev.filter(o => o.id !== itemToDelete.id));
        setPriceEntries(prev => prev.map(e => ({
          ...e,
          options: e.options.filter(opt => opt !== itemToDelete.name)
        })));
        break;
    }

    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Matrice des prix</h1>
          <p className="text-gray-600 mt-1">Gérez vos tarifs par matériau et dimension</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={exportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'matrix'
                ? 'border-ozc-500 text-ozc-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Grid size={18} />
              <span>Grille des prix</span>
            </div>
          </button>
            <button
            onClick={() => setActiveTab('config')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'config'
                ? 'border-ozc-500 text-ozc-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
            <div className="flex items-center space-x-2">
              <Settings size={18} />
              <span>Configuration</span>
            </div>
            </button>
        </nav>
      </div>

      {activeTab === 'matrix' && (
        <div>
          {/* Barre de recherche unique */}
          <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6">
            <div className="relative max-w-2xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche universelle
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par matériau, dimension, prix ou option... (ex: PVC A4, Aluminium, 15.00, Troué)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500 text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-3 border-b border-gray-100 bg-gray-50">
                        <div className="text-sm font-medium text-gray-700">
                          {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                        </div>
                      </div>
                      {searchResults.slice(0, 10).map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() => {
                            setSearchQuery('');
                            openEditModal(entry);
                          }}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">
                                {entry.material} - {entry.dimension}
                              </div>
                              <div className="text-sm text-gray-500">
                                {entry.options.length > 0 && `Options: ${entry.options.join(', ')}`}
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-ozc-600">
                              {entry.price.toFixed(2)}€
                            </div>
                          </div>
                        </div>
                      ))}
                      {searchResults.length > 10 && (
                        <div className="p-3 text-center text-sm text-gray-500">
                          ... et {searchResults.length - 10} autre{searchResults.length - 10 > 1 ? 's' : ''} résultat{searchResults.length - 10 > 1 ? 's' : ''}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucun résultat trouvé pour "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                {showSearchResults 
                  ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''} pour "${searchQuery}"`
                  : `${priceEntries.length} entrée${priceEntries.length > 1 ? 's' : ''} au total`
                }
              </div>
              {showSearchResults && (
            <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="text-sm text-ozc-600 hover:text-ozc-700 font-medium"
                >
                  Afficher tout
            </button>
              )}
            </div>
          </div>

          {/* Grille des prix */}
          <div className="space-y-6">
            {Object.entries(groupedEntries).map(([material, entries]) => {
              const materialData = materials.find(m => m.name === material);
              return (
                <div key={material} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${materialData?.color || 'bg-gray-400'}`}></div>
                      <h3 className="text-lg font-semibold text-gray-900">{material}</h3>
                      <span className="text-sm text-gray-500">({entries.length} tailles)</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {entries.map(entry => {
                        const dimension = dimensions.find(d => d.name === entry.dimension);
                        const isEditing = editingEntry === entry.id;
                        
                        return (
                          <div 
                            key={entry.id} 
                            className={`border rounded-lg p-4 transition-all ${
                              entry.active 
                                ? 'border-gray-200 bg-white' 
                                : 'border-gray-100 bg-gray-50 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{entry.dimension}</h4>
                                <p className="text-xs text-gray-500">{dimension?.size}</p>
                      </div>
                              <div className="flex items-center space-x-1">
                      <button
                                  onClick={() => openEditModal(entry)}
                                  className="p-1 text-gray-400 hover:text-ozc-600 transition-colors"
                                  title="Éditer le prix et les options"
                      >
                                  <Edit size={14} />
                      </button>
                      <button
                                  onClick={() => toggleActive(entry.id)}
                                  className={`p-1 transition-colors ${
                                    entry.active 
                                      ? 'text-green-600 hover:text-green-700' 
                                      : 'text-gray-400 hover:text-green-600'
                                  }`}
                                  title={entry.active ? 'Désactiver' : 'Activer'}
                                >
                                  <Eye size={14} />
                      </button>
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-2xl font-bold text-ozc-600">{entry.price.toFixed(2)}€</div>
                              <div className="text-xs text-gray-500">Prix de base</div>
          </div>

                            {/* Options */}
                            {entry.options.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="text-xs text-gray-500 mb-1">Options incluses :</div>
                                <div className="space-y-1">
                                  {entry.options.map((optionName, index) => {
                                    const option = options.find(o => o.name === optionName);
                                    return (
                                      <div key={index} className="flex justify-between text-xs">
                                        <span className="text-gray-600">{optionName}</span>
                                        {option && <span className="text-ozc-600">+{option.price}€</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="mt-2 pt-2 border-t border-gray-100">
                                  <div className="text-sm font-semibold text-gray-900">
                                    Total: {(entry.price + entry.options.reduce((sum, optionName) => {
                                      const option = options.find(o => o.name === optionName);
                                      return sum + (option?.price || 0);
                                    }, 0)).toFixed(2)}€
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Matériaux */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Matériaux</h3>
            <div className="space-y-3">
              {materials.map(material => (
                <div key={material.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${material.color}`}></div>
                    <span className="font-medium">{material.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-ozc-600">
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => confirmDelete('material', material.id, material.name)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowAddMaterialModal(true)}
              className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-ozc-500 hover:text-ozc-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter un matériau</span>
            </button>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h3>
            <div className="space-y-3">
              {dimensions.map(dimension => (
                <div key={dimension.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium">{dimension.name}</div>
                    <div className="text-sm text-gray-500">{dimension.size}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-ozc-600">
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => confirmDelete('dimension', dimension.id, dimension.name)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowAddDimensionModal(true)}
              className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-ozc-500 hover:text-ozc-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter une dimension</span>
            </button>
          </div>

          {/* Options */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
            <div className="space-y-3">
              {options.map(option => (
                <div key={option.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-500">+{option.price}€</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-ozc-600">
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => confirmDelete('option', option.id, option.name)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowAddOptionModal(true)}
              className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-ozc-500 hover:text-ozc-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter une option</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal d'édition de prix */}
      {showEditPriceModal && selectedEntry && (
        <EditPriceModal 
          entry={selectedEntry}
          options={options}
          onSave={(price, selectedOptions) => {
            updateEntryWithOptions(selectedEntry.id, price, selectedOptions);
            setShowEditPriceModal(false);
            setSelectedEntry(null);
          }}
          onClose={() => {
            setShowEditPriceModal(false);
            setSelectedEntry(null);
          }}
        />
      )}

      {/* Modal d'ajout de matériau */}
      {showAddMaterialModal && (
        <AddMaterialModal 
          onSave={addMaterial}
          onClose={() => setShowAddMaterialModal(false)}
        />
      )}

      {/* Modal d'ajout de dimension */}
      {showAddDimensionModal && (
        <AddDimensionModal 
          onSave={addDimension}
          onClose={() => setShowAddDimensionModal(false)}
        />
      )}

      {/* Modal d'ajout d'option */}
      {showAddOptionModal && (
        <AddOptionModal 
          onSave={addOption}
          onClose={() => setShowAddOptionModal(false)}
        />
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
                  <p className="text-sm text-gray-500">Cette action est irréversible</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">
                  Êtes-vous sûr de vouloir supprimer <strong>{itemToDelete.name}</strong> ?
                </p>
                {itemToDelete.type === 'material' && (
                  <p className="text-sm text-amber-600 mt-2">
                    ⚠️ Tous les prix associés à ce matériau seront également supprimés.
                  </p>
                )}
                {itemToDelete.type === 'dimension' && (
                  <p className="text-sm text-amber-600 mt-2">
                    ⚠️ Tous les prix associés à cette dimension seront également supprimés.
                  </p>
                )}
                {itemToDelete.type === 'option' && (
                  <p className="text-sm text-amber-600 mt-2">
                    ⚠️ Cette option sera retirée de tous les prix qui l'utilisent.
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Supprimer définitivement
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setItemToDelete(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Modal d'édition de prix
const EditPriceModal = ({ entry, options, onSave, onClose }: {
  entry: PriceEntry;
  options: Option[];
  onSave: (price: number, selectedOptions: string[]) => void;
  onClose: () => void;
}) => {
  const [price, setPrice] = useState(entry.price);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(entry.options);

  const toggleOption = (optionName: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionName) 
        ? prev.filter(o => o !== optionName)
        : [...prev, optionName]
    );
  };

  const totalPrice = price + selectedOptions.reduce((sum, optionName) => {
    const option = options.find(o => o.name === optionName);
    return sum + (option?.price || 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Éditer {entry.material} - {entry.dimension}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Prix de base */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix de base
                    </label>
              <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                  </div>
                </div>

            {/* Tableau récapitulatif des options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Récapitulatif des prix avec options
              </label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {/* Prix de base */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Prix de base ({entry.material} - {entry.dimension})</span>
                    <span className="font-semibold text-gray-900">{price.toFixed(2)}€</span>
                  </div>
                  
                  {/* Options individuelles */}
                  {options.map(option => (
                    <div key={option.id} className="flex justify-between items-center py-2 text-sm">
                      <span className="text-gray-600">+ {option.name}</span>
                      <span className="text-gray-600">{(price + option.price).toFixed(2)}€</span>
                    </div>
                  ))}
                  
                  {/* Combinaisons multiples si applicable */}
                  {selectedOptions.length > 0 && (
                    <>
                      <div className="border-t border-gray-300 pt-3 mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-2">Options actuellement sélectionnées :</div>
                        {selectedOptions.map((optionName, index) => {
                          const option = options.find(o => o.name === optionName);
                          return (
                            <div key={index} className="flex justify-between items-center py-1 text-sm">
                              <span className="text-ozc-600">• {optionName}</span>
                              <span className="text-ozc-600">+{option?.price.toFixed(2)}€</span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2 font-bold">
                          <span className="text-gray-900">Total avec options sélectionnées</span>
                          <span className="text-ozc-600">{totalPrice.toFixed(2)}€</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <strong>Note :</strong> Ce tableau montre les prix individuels avec chaque option. 
                  Pour modifier les options associées à ce tarif, utilisez la section Configuration.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onSave(price, entry.options)}
              className="flex-1 bg-ozc-600 text-white py-3 rounded-lg font-semibold hover:bg-ozc-700 transition-colors"
            >
              Sauvegarder le prix de base
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Modal d'ajout de matériau
const AddMaterialModal = ({ onSave, onClose }: {
  onSave: (name: string, color: string) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('bg-blue-500');

  const colors = [
    { value: 'bg-blue-500', label: 'Bleu' },
    { value: 'bg-red-500', label: 'Rouge' },
    { value: 'bg-green-500', label: 'Vert' },
    { value: 'bg-yellow-500', label: 'Jaune' },
    { value: 'bg-purple-500', label: 'Violet' },
    { value: 'bg-pink-500', label: 'Rose' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-gray-500', label: 'Gris' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), color);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Ajouter un matériau</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du matériau
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                placeholder="Ex: Acier inoxydable"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur d'affichage
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(colorOption => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() => setColor(colorOption.value)}
                    className={`h-12 rounded-lg border-2 transition-all ${colorOption.value} ${
                      color === colorOption.value ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    title={colorOption.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-ozc-600 text-white py-3 rounded-lg font-semibold hover:bg-ozc-700 transition-colors"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Composant Modal d'ajout de dimension
const AddDimensionModal = ({ onSave, onClose }: {
  onSave: (name: string, size: string) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && size.trim()) {
      onSave(name.trim(), size.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Ajouter une dimension</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la dimension
                </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                placeholder="Ex: A0, XL, Custom..."
                required
              />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille (dimensions)
                </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                placeholder="Ex: 84.1×118.9cm"
                required
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-ozc-600 text-white py-3 rounded-lg font-semibold hover:bg-ozc-700 transition-colors"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Composant Modal d'ajout d'option
const AddOptionModal = ({ onSave, onClose }: {
  onSave: (name: string, price: number) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && price >= 0) {
      onSave(name.trim(), price);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Ajouter une option</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'option
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                placeholder="Ex: Laminage mat"
                required
              />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix supplémentaire
                </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
              </div>
              </div>

            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-ozc-600 text-white py-3 rounded-lg font-semibold hover:bg-ozc-700 transition-colors"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PricingMatrix; 