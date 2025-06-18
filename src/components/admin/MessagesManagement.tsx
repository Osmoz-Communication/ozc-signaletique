import React, { useState } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaReply, FaTrash, FaSearch, FaFilter, FaDownload, FaEye, FaClock, FaUser } from 'react-icons/fa';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
}

const MessagesManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Messages d'exemple
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@entreprise.fr',
      company: 'Entreprise ABC',
      phone: '01 23 45 67 89',
      subject: 'Demande de devis pour signalétique incendie',
      message: 'Bonjour, nous aurions besoin d\'un devis pour l\'installation de panneaux de sécurité incendie dans nos locaux. Nous avons environ 50 panneaux à installer.',
      date: '2024-01-15T10:30:00',
      status: 'new',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@hotel.fr',
      company: 'Hôtel des Roses',
      phone: '04 56 78 90 12',
      subject: 'Signalétique pour hôtel',
      message: 'Nous souhaitons refaire toute la signalétique de notre hôtel 4 étoiles. Pouvez-vous nous proposer des solutions élégantes ?',
      date: '2024-01-14T14:20:00',
      status: 'read',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Pierre Moreau',
      email: 'p.moreau@usine.com',
      company: 'Usine Moreau',
      subject: 'Conformité normes sécurité',
      message: 'Suite à un contrôle, nous devons mettre à jour notre signalétique de sécurité. Urgent.',
      date: '2024-01-14T09:15:00',
      status: 'replied',
      priority: 'high'
    },
    {
      id: '4',
      name: 'Sophie Leroy',
      email: 'sophie.leroy@mairie.fr',
      company: 'Mairie de Villeneuve',
      phone: '05 12 34 56 78',
      subject: 'Signalétique accessibilité PMR',
      message: 'La mairie souhaite améliorer son accessibilité avec une signalétique adaptée aux personnes à mobilité réduite.',
      date: '2024-01-13T16:45:00',
      status: 'read',
      priority: 'medium'
    },
    {
      id: '5',
      name: 'Thomas Bernard',
      email: 'thomas@restaurant.fr',
      subject: 'Panneaux personnalisés restaurant',
      message: 'Bonjour, je souhaiterais des panneaux personnalisés pour mon restaurant avec notre logo.',
      date: '2024-01-12T11:30:00',
      status: 'new',
      priority: 'low'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (message.company && message.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <FaEnvelope className="text-blue-600" />;
      case 'read': return <FaEnvelopeOpen className="text-yellow-600" />;
      case 'replied': return <FaReply className="text-green-600" />;
      default: return <FaEnvelope className="text-gray-600" />;
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ));
  };

  const markAsReplied = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: 'replied' } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const exportCSV = () => {
    const csvContent = [
      ['Date', 'Nom', 'Email', 'Entreprise', 'Téléphone', 'Sujet', 'Message', 'Statut', 'Priorité'],
      ...filteredMessages.map(msg => [
        new Date(msg.date).toLocaleDateString('fr-FR'),
        msg.name,
        msg.email,
        msg.company || '',
        msg.phone || '',
        msg.subject,
        msg.message.replace(/"/g, '""'),
        msg.status,
        msg.priority
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `messages-contact-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const openMessageModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    if (message.status === 'new') {
      markAsRead(message.id);
    }
  };

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
    high: messages.filter(m => m.priority === 'high').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages de Contact</h1>
          <p className="text-gray-600 mt-1">Gérez les messages reçus via le formulaire de contact</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-ozc-600 text-white rounded-lg hover:bg-ozc-700 transition-colors"
        >
          <FaDownload size={16} />
          <span>Exporter CSV</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <div className="text-sm text-gray-500">Nouveaux</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaEnvelopeOpen className="text-yellow-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.read}</div>
              <div className="text-sm text-gray-500">Lus</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaReply className="text-green-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
              <div className="text-sm text-gray-500">Répondus</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center">
            <FaClock className="text-red-500 mr-3" size={20} />
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.high}</div>
              <div className="text-sm text-gray-500">Urgents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, email, entreprise ou sujet..."
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
              <option value="new">Nouveaux</option>
              <option value="read">Lus</option>
              <option value="replied">Répondus</option>
            </select>
          </div>
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {filteredMessages.length} message{filteredMessages.length > 1 ? 's' : ''} affiché{filteredMessages.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Liste des messages */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr 
                  key={message.id} 
                  className={`hover:bg-gray-50 transition-colors ${message.status === 'new' ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getStatusIcon(message.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{message.subject}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{message.message}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{message.name}</div>
                      <div className="text-sm text-gray-500">{message.email}</div>
                      {message.company && (
                        <div className="text-sm text-gray-500">{message.company}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(message.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                      {message.status === 'new' && 'Nouveau'}
                      {message.status === 'read' && 'Lu'}
                      {message.status === 'replied' && 'Répondu'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(message.priority)}`}>
                      {message.priority === 'high' && 'Haute'}
                      {message.priority === 'medium' && 'Moyenne'}
                      {message.priority === 'low' && 'Basse'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openMessageModal(message)}
                        className="p-2 text-gray-400 hover:text-ozc-600 transition-colors"
                        title="Voir le message"
                      >
                        <FaEye size={14} />
                      </button>
                      {message.status !== 'replied' && (
                        <button
                          onClick={() => markAsReplied(message.id)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Marquer comme répondu"
                        >
                          <FaReply size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(message.id)}
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

      {/* Modal de détail du message */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{new Date(selectedMessage.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status === 'new' && 'Nouveau'}
                      {selectedMessage.status === 'read' && 'Lu'}
                      {selectedMessage.status === 'replied' && 'Répondu'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority === 'high' && 'Haute priorité'}
                      {selectedMessage.priority === 'medium' && 'Priorité moyenne'}
                      {selectedMessage.priority === 'low' && 'Basse priorité'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Message</h4>
                    <div className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FaUser className="mr-2" size={16} />
                      Informations de contact
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Nom :</span> {selectedMessage.name}
                      </div>
                      <div>
                        <span className="font-medium">Email :</span> 
                        <a href={`mailto:${selectedMessage.email}`} className="text-ozc-600 hover:text-ozc-700 ml-1">
                          {selectedMessage.email}
                        </a>
                      </div>
                      {selectedMessage.company && (
                        <div>
                          <span className="font-medium">Entreprise :</span> {selectedMessage.company}
                        </div>
                      )}
                      {selectedMessage.phone && (
                        <div>
                          <span className="font-medium">Téléphone :</span> 
                          <a href={`tel:${selectedMessage.phone}`} className="text-ozc-600 hover:text-ozc-700 ml-1">
                            {selectedMessage.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`);
                        markAsReplied(selectedMessage.id);
                      }}
                      className="w-full bg-ozc-600 text-white py-2 px-4 rounded-lg hover:bg-ozc-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaReply size={14} />
                      <span>Répondre par email</span>
                    </button>
                    <button
                      onClick={() => {
                        deleteMessage(selectedMessage.id);
                        setShowMessageModal(false);
                      }}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaTrash size={14} />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManagement; 