import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Package, 
  Users, 
  ShoppingCart, 
  Euro, 
  Calendar,
  Download,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Filter,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  totalProducts: number;
  productsChange: number;
  totalCustomers: number;
  customersChange: number;
}

interface RecentActivity {
  id: string;
  type: 'order' | 'product' | 'customer';
  message: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image: string;
  category: string;
  trend: 'up' | 'down' | 'stable';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [dateRange, setDateRange] = useState('7d');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const [notifications] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'order',
      message: 'Nouvelle commande #CMD004 de 450€',
      time: 'Il y a 5 minutes',
      status: 'success'
    },
    {
      id: '2',
      type: 'product',
      message: 'Stock faible: Panneau Sortie de Secours (3 unités)',
      time: 'Il y a 15 minutes',
      status: 'warning'
    },
    {
      id: '3',
      type: 'customer',
      message: 'Nouveau client: SAS Dupont inscrit',
      time: 'Il y a 1 heure',
      status: 'success'
    },
    {
      id: '4',
      type: 'order',
      message: 'Commande #CMD003 expédiée',
      time: 'Il y a 2 heures',
      status: 'success'
    }
  ]);

  const [stats] = useState<DashboardStats>({
    totalRevenue: 45250.75,
    revenueChange: 12.5,
    totalOrders: 127,
    ordersChange: 8.2,
    totalProducts: 38,
    productsChange: 5.3,
    totalCustomers: 89,
    customersChange: 15.7
  });

  const [topProducts] = useState<TopProduct[]>([
    { 
      id: '1',
      name: 'Panneau Sortie de Secours LED', 
      sales: 45, 
      revenue: 1350,
      image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Signalisation de sécurité',
      trend: 'up'
    },
    { 
      id: '2',
      name: 'Panneau Extincteur Obligatoire', 
      sales: 32, 
      revenue: 960,
      image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Signalisation de sécurité',
      trend: 'up'
    },
    { 
      id: '3',
      name: 'Panneau Défense de Fumer', 
      sales: 28, 
      revenue: 420,
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Signalisation de sécurité',
      trend: 'stable'
    },
    { 
      id: '4',
      name: 'Panneau Port du Casque', 
      sales: 25, 
      revenue: 625,
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'EPI Obligatoire',
      trend: 'down'
    },
    { 
      id: '5',
      name: 'Panneau Danger Électrique', 
      sales: 22, 
      revenue: 550,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Panneaux de Danger',
      trend: 'up'
    }
  ]);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    if (value === 'custom') {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
    }
  };

  const applyCustomDateRange = () => {
    if (customStartDate && customEndDate) {
      showToast('Période personnalisée appliquée', 'success');
      setShowCustomDatePicker(false);
    } else {
      showToast('Veuillez sélectionner les deux dates', 'error');
    }
  };

  const exportData = (format: 'csv') => {
    // Simulation d'export CSV
    const csvData = [
      ['Produit', 'Ventes', 'Chiffre d\'affaires', 'Catégorie'],
      ...topProducts.map(p => [p.name, p.sales.toString(), p.revenue.toString(), p.category])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dashboard_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Export CSV téléchargé avec succès', 'success');
  };

  const viewProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const viewAllTopProducts = () => {
    navigate('/osmozcom77120', { state: { activeTab: 'top-products' } });
  };

  const getNotificationIcon = (type: string, status: string) => {
    if (status === 'success') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'warning') return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    if (status === 'error') return <AlertCircle className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-gray-500" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec filtres modernisés */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Sélecteur de période modernisé */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">90 derniers jours</option>
              <option value="1y">1 an</option>
              <option value="custom">Période personnalisée</option>
            </select>
          </div>

          {/* Bouton d'export CSV uniquement */}
          <button
            onClick={() => exportData('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download size={16} />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* Sélecteur de dates personnalisé */}
      {showCustomDatePicker && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Période personnalisée</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={applyCustomDateRange}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Appliquer
              </button>
              <button
                onClick={() => setShowCustomDatePicker(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString('fr-FR')}€</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{stats.revenueChange}%</span>
                <span className="text-sm text-gray-500 ml-1">vs période précédente</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Euro className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{stats.ordersChange}%</span>
                <span className="text-sm text-gray-500 ml-1">vs période précédente</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{stats.productsChange}%</span>
                <span className="text-sm text-gray-500 ml-1">nouveaux ce mois</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{stats.customersChange}%</span>
                <span className="text-sm text-gray-500 ml-1">nouveaux ce mois</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produits les plus vendus - Cliquables avec images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Produits les plus vendus</h2>
              <button
                onClick={viewAllTopProducts}
                className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Voir tout
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => viewProductDetails(product.id)}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-teal-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(product.trend)}
                        <Eye size={14} className="text-gray-400 group-hover:text-teal-500 transition-colors" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">{product.sales} ventes</span>
                      <span className="text-sm font-semibold text-gray-900">{product.revenue}€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type, notification.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 