import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Package, BarChart3, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image: string;
  category: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  stock: number;
  averageRating: number;
}

interface CategoryStats {
  name: string;
  totalSales: number;
  totalRevenue: number;
  productCount: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const TopProducts = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [sortBy, setSortBy] = useState('sales');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [topProducts] = useState<TopProduct[]>([
    { 
      id: '1',
      name: 'Panneau Sortie de Secours LED', 
      sales: 45, 
      revenue: 1350,
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Signalisation de sécurité',
      trend: 'up',
      trendPercentage: 15.3,
      stock: 25,
      averageRating: 4.8
    },
    { 
      id: '2',
      name: 'Panneau Extincteur Obligatoire', 
      sales: 32, 
      revenue: 960,
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Signalisation de sécurité',
      trend: 'up',
      trendPercentage: 8.7,
      stock: 12,
      averageRating: 4.6
    },
    { 
      id: '3',
      name: 'Panneau Défense de Fumer', 
      sales: 28, 
      revenue: 420,
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Panneaux interdiction',
      trend: 'stable',
      trendPercentage: 0,
      stock: 18,
      averageRating: 4.4
    },
    { 
      id: '4',
      name: 'Panneau Port du Casque', 
      sales: 25, 
      revenue: 625,
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'EPI Obligatoire',
      trend: 'down',
      trendPercentage: -5.2,
      stock: 8,
      averageRating: 4.2
    },
    { 
      id: '5',
      name: 'Panneau Danger Électrique', 
      sales: 22, 
      revenue: 550,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Panneaux de danger',
      trend: 'up',
      trendPercentage: 12.1,
      stock: 15,
      averageRating: 4.5
    },
    { 
      id: '6',
      name: 'Plaque Bureau Direction', 
      sales: 18, 
      revenue: 450,
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Signalétique interne',
      trend: 'up',
      trendPercentage: 6.8,
      stock: 22,
      averageRating: 4.3
    }
  ]);

  const [categoryStats] = useState<CategoryStats[]>([
    {
      name: 'Signalisation de sécurité',
      totalSales: 105,
      totalRevenue: 3150,
      productCount: 15,
      trend: 'up',
      color: 'bg-red-500'
    },
    {
      name: 'Signalétique interne',
      totalSales: 68,
      totalRevenue: 1890,
      productCount: 12,
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      name: 'EPI Obligatoire',
      totalSales: 45,
      totalRevenue: 1125,
      productCount: 8,
      trend: 'stable',
      color: 'bg-orange-500'
    },
    {
      name: 'Panneaux de danger',
      totalSales: 38,
      totalRevenue: 950,
      productCount: 6,
      trend: 'up',
      color: 'bg-yellow-500'
    }
  ]);

  const categories = ['all', ...Array.from(new Set(topProducts.map(p => p.category)))];

  const filteredProducts = topProducts
    .filter(product => categoryFilter === 'all' || product.category === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'sales':
          return b.sales - a.sales;
        case 'revenue':
          return b.revenue - a.revenue;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'trend':
          return b.trendPercentage - a.trendPercentage;
        default:
          return 0;
      }
    });

  const exportProductsData = () => {
    const csvData = [
      ['Produit', 'Catégorie', 'Ventes', 'Chiffre d\'affaires', 'Stock', 'Tendance %', 'Note moyenne'],
      ...filteredProducts.map(p => [
        p.name, 
        p.category, 
        p.sales.toString(), 
        p.revenue.toString(), 
        p.stock.toString(), 
        p.trendPercentage.toString(),
        p.averageRating.toString()
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `top_products_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Export des produits téléchargé avec succès', 'success');
  };

  const viewProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (trend === 'down') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produits les plus vendus</h1>
          <p className="text-gray-600 mt-1">Analyse détaillée des performances de vente</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={exportProductsData}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download size={16} />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* Statistiques par catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryStats.map((category, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <div className="flex items-center">
                {getTrendIcon(category.trend, 0)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{category.name}</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{category.totalSales}</p>
              <p className="text-sm text-gray-500">ventes • {category.totalRevenue}€</p>
              <p className="text-xs text-gray-400">{category.productCount} produits</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filtres et contrôles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Filtre par catégorie */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">Toutes les catégories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="sales">Trier par ventes</option>
              <option value="revenue">Trier par revenus</option>
              <option value="name">Trier par nom</option>
              <option value="trend">Trier par tendance</option>
            </select>
          </div>

          {/* Mode d'affichage */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => viewProductDetails(product.id)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(product.trend, product.trendPercentage)}
                      <Eye size={14} className="text-gray-400 group-hover:text-teal-500 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ventes</span>
                      <span className="text-sm font-semibold text-gray-900">{product.sales} unités</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenus</span>
                      <span className="text-sm font-semibold text-gray-900">{product.revenue}€</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tendance</span>
                      <span className={`text-sm font-medium ${getTrendColor(product.trend)}`}>
                        {product.trendPercentage > 0 ? '+' : ''}{product.trendPercentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock</span>
                      <span className={`text-sm font-medium ${
                        product.stock < 10 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {product.stock} unités
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Produit</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Catégorie</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Ventes</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Revenus</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Tendance</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Note</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">{product.sales} unités</td>
                    <td className="py-4 px-6 font-medium text-gray-900">{product.revenue}€</td>
                    <td className="py-4 px-6">
                      <span className={`font-medium ${
                        product.stock < 10 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(product.trend, product.trendPercentage)}
                        <span className={`text-sm font-medium ${getTrendColor(product.trend)}`}>
                          {product.trendPercentage > 0 ? '+' : ''}{product.trendPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-gray-900">{product.averageRating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => viewProductDetails(product.id)}
                        className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        <Eye size={14} />
                        <span>Voir</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopProducts; 