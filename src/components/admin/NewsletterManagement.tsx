import React, { useState } from 'react';
import { FaEnvelope, FaDownload, FaSearch, FaTrash, FaEye, FaEyeSlash, FaCalendar, FaBuilding, FaUser } from 'react-icons/fa';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  company?: string;
  subscriptionDate: string;
  status: 'active' | 'unsubscribed';
  source: 'website' | 'manual' | 'import';
  lastEmailSent?: string;
  openRate?: number;
}

const NewsletterManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([
    {
      id: '1',
      email: 'jean.dupont@entreprise.fr',
      name: 'Jean Dupont',
      company: 'Entreprise ABC',
      subscriptionDate: '2024-01-15T10:30:00',
      status: 'active',
      source: 'website',
      lastEmailSent: '2024-01-10T09:00:00',
      openRate: 85
    },
    {
      id: '2',
      email: 'marie.martin@hotel.fr',
      name: 'Marie Martin',
      company: 'Hôtel des Roses',
      subscriptionDate: '2024-01-14T14:20:00',
      status: 'active',
      source: 'website',
      lastEmailSent: '2024-01-10T09:00:00',
      openRate: 92
    },
    {
      id: '3',
      email: 'pierre.moreau@usine.com',
      company: 'Usine Moreau',
      subscriptionDate: '2024-01-12T16:45:00',
      status: 'active',
      source: 'manual',
      lastEmailSent: '2024-01-10T09:00:00',
      openRate: 78
    },
    {
      id: '4',
      email: 'sophie.leroy@mairie.fr',
      name: 'Sophie Leroy',
      company: 'Mairie de Villeneuve',
      subscriptionDate: '2024-01-10T11:30:00',
      status: 'unsubscribed',
      source: 'website',
      lastEmailSent: '2024-01-05T09:00:00',
      openRate: 45
    },
    {
      id: '5',
      email: 'thomas@restaurant.fr',
      name: 'Thomas Bernard',
      subscriptionDate: '2024-01-08T09:15:00',
      status: 'active',
      source: 'website',
      lastEmailSent: '2024-01-10T09:00:00',
      openRate: 67
    }
  ]);

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subscriber.name && subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (subscriber.company && subscriber.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || subscriber.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.status === 'active').length,
    unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
    thisMonth: subscribers.filter(s => {
      const subDate = new Date(s.subscriptionDate);
      const now = new Date();
      return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
    }).length,
    avgOpenRate: Math.round(
      subscribers
        .filter(s => s.openRate)
        .reduce((sum, s) => sum + (s.openRate || 0), 0) / 
      subscribers.filter(s => s.openRate).length
    )
  };

  const toggleSubscriberSelection = (email: string) => {
    setSelectedEmails(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const selectAllVisible = () => {
    const visibleEmails = filteredSubscribers.map(s => s.email);
    setSelectedEmails(visibleEmails);
  };

  const clearSelection = () => {
    setSelectedEmails([]);
  };

  const exportCSV = (selectedOnly = false) => {
    const dataToExport = selectedOnly 
      ? subscribers.filter(s => selectedEmails.includes(s.email))
      : filteredSubscribers;

    const csvContent = [
      ['Email', 'Nom', 'Entreprise', 'Date d\'inscription', 'Statut', 'Source', 'Dernier email', 'Taux d\'ouverture'],
      ...dataToExport.map(sub => [
        sub.email,
        sub.name || '',
        sub.company || '',
        new Date(sub.subscriptionDate).toLocaleDateString('fr-FR'),
        sub.status === 'active' ? 'Actif' : 'Désabonné',
        sub.source === 'website' ? 'Site web' : sub.source === 'manual' ? 'Manuel' : 'Import',
        sub.lastEmailSent ? new Date(sub.lastEmailSent).toLocaleDateString('fr-FR') : '',
        sub.openRate ? `${sub.openRate}%` : ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-${selectedOnly ? 'selection' : 'complete'}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportEmailList = (selectedOnly = false) => {
    const emails = selectedOnly 
      ? selectedEmails
      : filteredSubscribers.filter(s => s.status === 'active').map(s => s.email);

    const emailList = emails.join('\n');
    const blob = new Blob([emailList], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `emails-${selectedOnly ? 'selection' : 'actifs'}-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'website': return <FaEnvelope className="text-blue-500" size={14} />;
      case 'manual': return <FaUser className="text-green-500" size={14} />;
      case 'import': return <FaDownload className="text-purple-500" size={14} />;
      default: return <FaEnvelope className="text-gray-500" size={14} />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'website': return 'Site web';
      case 'manual': return 'Manuel';
      case 'import': return 'Import';
      default: return source;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-600 mt-1">Gérez les abonnés à votre newsletter</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => exportEmailList(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaEnvelope size={16} />
            <span>Exporter emails actifs</span>
          </button>
          <button
            onClick={() => exportCSV(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-ozc-600 text-white rounded-lg hover:bg-ozc-700 transition-colors"
          >
            <FaDownload size={16} />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">Total abonnés</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEye className="text-green-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-500">Actifs</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEyeSlash className="text-red-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.unsubscribed}</div>
              <div className="text-sm text-gray-500">Désabonnés</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaCalendar className="text-blue-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.thisMonth}</div>
              <div className="text-sm text-gray-500">Ce mois</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEnvelope className="text-purple-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.avgOpenRate}%</div>
              <div className="text-sm text-gray-500">Taux d'ouverture</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par email, nom ou entreprise..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="unsubscribed">Désabonnés</option>
            </select>
          </div>
          <div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
            >
              <option value="all">Toutes les sources</option>
              <option value="website">Site web</option>
              <option value="manual">Manuel</option>
              <option value="import">Import</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            {filteredSubscribers.length} abonné{filteredSubscribers.length > 1 ? 's' : ''} affiché{filteredSubscribers.length > 1 ? 's' : ''}
            {selectedEmails.length > 0 && (
              <span className="ml-2 text-ozc-600 font-medium">
                • {selectedEmails.length} sélectionné{selectedEmails.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {selectedEmails.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => exportCSV(true)}
                className="text-sm px-3 py-1 bg-ozc-100 text-ozc-700 rounded hover:bg-ozc-200 transition-colors"
              >
                Exporter sélection
              </button>
              <button
                onClick={() => exportEmailList(true)}
                className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                Emails sélection
              </button>
              <button
                onClick={clearSelection}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredSubscribers.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={selectAllVisible}
                className="text-sm text-ozc-600 hover:text-ozc-700 font-medium"
              >
                Sélectionner tout ({filteredSubscribers.length})
              </button>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Désélectionner tout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmails.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                    onChange={selectedEmails.length === filteredSubscribers.length ? clearSelection : selectAllVisible}
                    className="rounded border-gray-300 text-ozc-600 focus:ring-ozc-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abonné</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ouverture</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr 
                  key={subscriber.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedEmails.includes(subscriber.email) ? 'bg-ozc-50' : ''
                  } ${subscriber.status === 'unsubscribed' ? 'opacity-60' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(subscriber.email)}
                      onChange={() => toggleSubscriberSelection(subscriber.email)}
                      className="rounded border-gray-300 text-ozc-600 focus:ring-ozc-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{subscriber.email}</div>
                      {subscriber.name && (
                        <div className="text-sm text-gray-500">{subscriber.name}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {subscriber.company && (
                        <>
                          <FaBuilding className="text-gray-400 mr-2" size={12} />
                          <span className="text-sm text-gray-900">{subscriber.company}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(subscriber.subscriptionDate).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getSourceIcon(subscriber.source)}
                      <span className="ml-2 text-sm text-gray-600">{getSourceLabel(subscriber.source)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      subscriber.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscriber.status === 'active' ? 'Actif' : 'Désabonné'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {subscriber.openRate && (
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-ozc-600 h-2 rounded-full" 
                            style={{ width: `${subscriber.openRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{subscriber.openRate}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="p-2 text-gray-400 hover:text-ozc-600 transition-colors"
                        title="Envoyer un email"
                      >
                        <FaEnvelope size={14} />
                      </a>
                      <button
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
                            setSubscribers(prev => prev.filter(s => s.id !== subscriber.id));
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSubscribers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FaEnvelope className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun abonné trouvé</h3>
          <p className="text-gray-500">
            {searchQuery || statusFilter !== 'all' || sourceFilter !== 'all'
              ? 'Aucun abonné ne correspond aux critères de recherche.'
              : 'Aucun abonné à la newsletter pour le moment.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsletterManagement; 