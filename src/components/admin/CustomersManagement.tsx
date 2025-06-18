import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, Eye, Edit, Trash2, Search, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  registrationDate: string;
}

const CustomersManagement = () => {
  const { showToast } = useToast();
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@entreprise-abc.fr',
      phone: '01 23 45 67 89',
      company: 'Entreprise ABC',
      address: '123 Rue de la Paix, 75001 Paris',
      totalOrders: 12,
      totalSpent: 3450.75,
      lastOrder: '2024-12-15',
      status: 'active',
      registrationDate: '2023-06-15'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@sarl-martin.fr',
      phone: '04 56 78 90 12',
      company: 'SARL Martin',
      address: '456 Avenue des Champs, 69000 Lyon',
      totalOrders: 8,
      totalSpent: 2890.50,
      lastOrder: '2024-12-14',
      status: 'active',
      registrationDate: '2023-08-22'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@ae-durand.fr',
      phone: '05 67 89 01 23',
      address: '321 Rue de la République, 13000 Marseille',
      totalOrders: 3,
      totalSpent: 1250.25,
      lastOrder: '2024-12-12',
      status: 'active',
      registrationDate: '2024-01-10'
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@societe-bernard.fr',
      phone: '03 78 90 12 34',
      company: 'Société Bernard',
      address: '654 Place de la Mairie, 59000 Lille',
      totalOrders: 5,
      totalSpent: 1890.00,
      lastOrder: '2024-11-28',
      status: 'inactive',
      registrationDate: '2023-11-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fonction d'export CSV
  const exportToCSV = () => {
    const csvData = [
      ['Nom', 'Email', 'Téléphone', 'Entreprise', 'Adresse', 'Commandes', 'Total dépensé', 'Dernière commande', 'Statut', 'Date inscription'],
      ...filteredCustomers.map(customer => [
        customer.name,
        customer.email,
        customer.phone,
        customer.company || '',
        customer.address,
        customer.totalOrders.toString(),
        customer.totalSpent.toString(),
        customer.lastOrder,
        getStatusLabel(customer.status),
        customer.registrationDate
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clients_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Export CSV des clients téléchargé avec succès', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const avgCustomerValue = totalRevenue / totalCustomers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des clients</h1>
          <p className="text-gray-600 mt-1">Gérez votre base de clients</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={16} />
          <span>Exporter CSV</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total clients</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clients actifs</p>
              <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <span className="text-teal-600 font-bold">€</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CA total</p>
              <p className="text-2xl font-bold text-gray-900">{totalRevenue.toFixed(0)}€</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold">€</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valeur moyenne</p>
              <p className="text-2xl font-bold text-gray-900">{avgCustomerValue.toFixed(0)}€</p>
            </div>
          </div>
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
                placeholder="Rechercher par nom, email ou entreprise..."
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
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commandes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dépenses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière commande
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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-semibold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        {customer.company && (
                          <div className="text-sm text-gray-500">{customer.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail size={14} className="mr-2 text-gray-400" />
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Phone size={14} className="mr-2 text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.totalOrders} commande{customer.totalOrders > 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.totalSpent.toFixed(2)}€
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.lastOrder).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {getStatusLabel(customer.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-gray-900" title="Voir les détails">
                        <Eye size={16} />
                      </button>
                      <button className="text-teal-600 hover:text-teal-700" title="Modifier">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-700" title="Supprimer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun client trouvé</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default CustomersManagement; 