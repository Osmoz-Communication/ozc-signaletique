import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Truck, Package, CheckCircle, Clock, Search, Filter, X, MapPin, Calendar, User, Phone, Mail, Download, TrendingUp, ShoppingBag, BarChart3, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  date: string;
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const OrdersManagement = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CMD001',
      customerName: 'Entreprise ABC',
      customerEmail: 'contact@entreprise-abc.fr',
      customerPhone: '01 23 45 67 89',
      total: 1250.00,
      status: 'shipped',
      items: [
        { id: '1', name: 'Panneau Sortie de Secours', quantity: 3, price: 25.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' },
        { id: '2', name: 'Extincteur Obligatoire', quantity: 2, price: 30.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' }
      ],
      date: '2024-12-15',
      shippingAddress: '123 Rue de la Paix, 75001 Paris',
      trackingNumber: 'FR123456789',
      notes: 'Livraison urgente demandée'
    },
    {
      id: 'CMD002',
      customerName: 'SARL Martin',
      customerEmail: 'martin@sarl-martin.fr',
      customerPhone: '04 56 78 90 12',
      total: 890.50,
      status: 'preparing',
      items: [
        { id: '3', name: 'Défense de Fumer', quantity: 5, price: 15.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' },
        { id: '4', name: 'Port du Casque Obligatoire', quantity: 3, price: 20.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' }
      ],
      date: '2024-12-14',
      shippingAddress: '456 Avenue des Champs, 69000 Lyon'
    },
    {
      id: 'CMD003',
      customerName: 'SAS Dupont',
      customerEmail: 'dupont@sas-dupont.fr',
      customerPhone: '05 34 56 78 90',
      total: 2100.75,
      status: 'delivered',
      items: [
        { id: '5', name: 'Danger Électrique', quantity: 4, price: 22.50, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' },
        { id: '6', name: 'Interdiction d\'Entrer', quantity: 6, price: 18.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' }
      ],
      date: '2024-12-13',
      shippingAddress: '789 Boulevard Victor Hugo, 31000 Toulouse',
      trackingNumber: 'FR987654321'
    },
    {
      id: 'CMD004',
      customerName: 'Entreprise Delta',
      customerEmail: 'contact@delta.fr',
      customerPhone: '02 34 56 78 90',
      total: 450.00,
      status: 'confirmed',
      items: [
        { id: '7', name: 'Panneau Sortie', quantity: 2, price: 35.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' }
      ],
      date: '2024-11-28',
      shippingAddress: '321 Rue de la République, 44000 Nantes'
    },
    {
      id: 'CMD005',
      customerName: 'SARL Gamma',
      customerEmail: 'gamma@sarl.fr',
      total: 680.25,
      status: 'delivered',
      items: [
        { id: '8', name: 'Panneau Urgence', quantity: 3, price: 28.00, image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg' }
      ],
      date: '2024-11-25',
      shippingAddress: '654 Avenue de la Liberté, 13000 Marseille'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showEditOrder, setShowEditOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Calculs des statistiques
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const ordersThisMonth = orders.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
  });
  
  const totalProductsSold = orders.reduce((total, order) => 
    total + order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0
  );
  
  const productsThisMonth = ordersThisMonth.reduce((total, order) => 
    total + order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0
  );
  
  // Fonction d'export CSV
  const exportToCSV = () => {
    const csvData = [
      ['Numéro', 'Client', 'Email', 'Téléphone', 'Total', 'Statut', 'Date', 'Adresse'],
      ...filteredOrders.map(order => [
        order.id,
        order.customerName,
        order.customerEmail,
        order.customerPhone || '',
        order.total.toString(),
        getStatusLabel(order.status),
        order.date,
        order.shippingAddress
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `commandes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Export CSV des commandes téléchargé avec succès', 'success');
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const openEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowEditOrder(true);
  };

  const updateOrderStatus = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const statusOrder = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    const nextStatus = statusOrder[currentIndex + 1] || order.status;

    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: nextStatus as Order['status'] } : o
    ));
    
    showToast(`Commande ${orderId} mise à jour vers "${getStatusLabel(nextStatus)}"`, 'success');
  };

  const goToTracking = (orderId: string) => {
    navigate(`/order-tracking?order=${orderId}`);
  };

  const copyTrackingNumber = async (trackingNumber: string) => {
    try {
      await navigator.clipboard.writeText(trackingNumber);
      showToast('Numéro de suivi copié dans le presse-papiers', 'success');
    } catch (err) {
      showToast('Erreur lors de la copie', 'error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'preparing': return 'En préparation';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Gestion des commandes</h1>
          <p className="text-gray-600 mt-2">Suivez et gérez toutes vos commandes en temps réel</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Download size={18} />
          <span className="font-medium">Exporter CSV</span>
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total commandes */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-1">Total commandes</p>
              <p className="text-3xl font-bold text-blue-900">{orders.length}</p>
              <p className="text-xs text-blue-600 mt-1">Toutes périodes</p>
            </div>
            <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-blue-700" />
            </div>
          </div>
        </div>

        {/* Commandes du mois */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Commandes du mois</p>
              <p className="text-3xl font-bold text-green-900">{ordersThisMonth.length}</p>
              <p className="text-xs text-green-600 mt-1">Décembre 2024</p>
            </div>
            <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-700" />
            </div>
          </div>
        </div>

        {/* Produits totaux vendus */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">Produits totaux vendus</p>
              <p className="text-3xl font-bold text-purple-900">{totalProductsSold}</p>
              <p className="text-xs text-purple-600 mt-1">Toutes périodes</p>
            </div>
            <div className="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-purple-700" />
            </div>
          </div>
        </div>

        {/* Produits vendus ce mois-ci */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-sm border border-orange-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-1">Produits vendus ce mois</p>
              <p className="text-3xl font-bold text-orange-900">{productsThisMonth}</p>
              <p className="text-xs text-orange-600 mt-1">Décembre 2024</p>
            </div>
            <div className="w-14 h-14 bg-orange-200 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-orange-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filtres */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par numéro ou client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors bg-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="preparing">En préparation</option>
                <option value="shipped">Expédiée</option>
                <option value="delivered">Livrée</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Commande
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">#{order.id}</div>
                    <div className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('fr-FR')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{order.total.toFixed(2)}€</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openOrderDetails(order)}
                        className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Voir les détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => openEditOrder(order)}
                        className="text-teal-600 hover:text-teal-700 p-2 rounded-lg hover:bg-teal-50 transition-colors"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => goToTracking(order.id)}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Suivi de la commande"
                      >
                        <Truck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
            <p className="text-gray-400 text-sm">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Modal Détails Commande */}
      {showOrderDetails && selectedOrder && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowOrderDetails(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Commande #{selectedOrder.id}</h2>
                <p className="text-gray-600">
                  {new Date(selectedOrder.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button 
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Statut et informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Statut</h3>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Total</h3>
                  <p className="text-2xl font-bold text-teal-600">{selectedOrder.total.toFixed(2)}€</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Articles</h3>
                  <p className="text-xl font-semibold">{selectedOrder.items.length} produits</p>
                </div>
              </div>

              {/* Informations client */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="mr-2" size={20} />
                  Informations client
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
                    <p className="font-medium text-gray-900">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900 flex items-center">
                      <Mail size={16} className="mr-2" />
                      {selectedOrder.customerEmail}
                    </p>
                  </div>
                  {selectedOrder.customerPhone && (
                    <div>
                      <p className="text-sm text-gray-600">Téléphone</p>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Phone size={16} className="mr-2" />
                        {selectedOrder.customerPhone}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Adresse de livraison</p>
                    <p className="font-medium text-gray-900 flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Articles commandés */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="mr-2" size={20} />
                  Articles commandés
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <button
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="text-left group"
                        >
                          <h4 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors flex items-center">
                            {item.name}
                            <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                        </button>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.price.toFixed(2)}€</p>
                        <p className="text-sm text-gray-600">
                          Total: {(item.quantity * item.price).toFixed(2)}€
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                        title="Voir le produit"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suivi et notes */}
              {selectedOrder.trackingNumber && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="mr-2" size={20} />
                    Suivi de livraison
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => goToTracking(selectedOrder.id)}
                      className="font-mono text-lg text-teal-600 hover:text-teal-700 underline hover:no-underline transition-colors"
                    >
                      {selectedOrder.trackingNumber}
                    </button>
                    <button
                      onClick={() => copyTrackingNumber(selectedOrder.trackingNumber)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Copier le numéro"
                    >
                      <Copy size={16} />
                      <span>Copier</span>
                    </button>
                    <button
                      onClick={() => goToTracking(selectedOrder.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Truck size={16} />
                      <span>Suivre la commande</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedOrder.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-700">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification Commande */}
      {showEditOrder && selectedOrder && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowEditOrder(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Modifier la commande #{selectedOrder.id}</h2>
              <button 
                onClick={() => setShowEditOrder(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Order['status'];
                      setOrders(orders.map(o => 
                        o.id === selectedOrder.id ? { ...o, status: newStatus } : o
                      ));
                      setSelectedOrder({ ...selectedOrder, status: newStatus });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="preparing">En préparation</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de suivi</label>
                  <input
                    type="text"
                    value={selectedOrder.trackingNumber || ''}
                    onChange={(e) => {
                      const newTrackingNumber = e.target.value;
                      setOrders(orders.map(o => 
                        o.id === selectedOrder.id ? { ...o, trackingNumber: newTrackingNumber } : o
                      ));
                      setSelectedOrder({ ...selectedOrder, trackingNumber: newTrackingNumber });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ex: FR123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={selectedOrder.notes || ''}
                    onChange={(e) => {
                      const newNotes = e.target.value;
                      setOrders(orders.map(o => 
                        o.id === selectedOrder.id ? { ...o, notes: newNotes } : o
                      ));
                      setSelectedOrder({ ...selectedOrder, notes: newNotes });
                    }}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Notes internes..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditOrder(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditOrder(false)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement; 