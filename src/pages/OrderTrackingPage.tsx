import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderTrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Données simulées de suivi
  const trackingData: { [key: string]: any } = {
    'FR123456789': {
      orderId: 'CMD001',
      status: 'Livré',
      estimatedDelivery: '2024-03-18',
      actualDelivery: '2024-03-17',
      carrier: 'Chronopost',
      trackingSteps: [
        {
          status: 'Commande créée',
          description: 'Votre commande a été créée et est en cours de traitement',
          date: '2024-03-15T10:30:00',
          location: 'Centre de traitement Paris',
          completed: true
        },
        {
          status: 'Commande expédiée',
          description: 'Votre colis a été pris en charge par notre transporteur',
          date: '2024-03-16T09:00:00',
          location: 'Entrepôt Roissy',
          completed: true
        },
        {
          status: 'En transit',
          description: 'Votre colis est en cours d\'acheminement',
          date: '2024-03-16T14:30:00',
          location: 'Centre de tri Lyon',
          completed: true
        },
        {
          status: 'En cours de livraison',
          description: 'Votre colis est en cours de livraison',
          date: '2024-03-17T08:00:00',
          location: 'Centre de livraison local',
          completed: true
        },
        {
          status: 'Livré',
          description: 'Votre colis a été livré avec succès',
          date: '2024-03-17T15:30:00',
          location: '123 Rue de la Paix, Paris',
          completed: true
        }
      ],
      recipient: 'Jean Dupont',
      address: '123 Rue de la Paix, 75001 Paris'
    },
    'FR987654321': {
      orderId: 'CMD002',
      status: 'En transit',
      estimatedDelivery: '2024-03-25',
      carrier: 'DPD',
      trackingSteps: [
        {
          status: 'Commande créée',
          description: 'Votre commande a été créée et est en cours de traitement',
          date: '2024-03-10T14:20:00',
          location: 'Centre de traitement Paris',
          completed: true
        },
        {
          status: 'Commande expédiée',
          description: 'Votre colis a été pris en charge par notre transporteur',
          date: '2024-03-22T10:00:00',
          location: 'Entrepôt Roissy',
          completed: true
        },
        {
          status: 'En transit',
          description: 'Votre colis est en cours d\'acheminement',
          date: '2024-03-22T16:00:00',
          location: 'Centre de tri Marseille',
          completed: true
        },
        {
          status: 'En cours de livraison',
          description: 'Votre colis sera livré aujourd\'hui',
          date: '',
          location: 'Centre de livraison local',
          completed: false
        },
        {
          status: 'Livré',
          description: 'Votre colis sera livré',
          date: '',
          location: '',
          completed: false
        }
      ],
      recipient: 'Jean Dupont',
      address: '123 Rue de la Paix, 75001 Paris'
    }
  };

  const formatDateFrench = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `le ${day} ${month} ${year} à ${hours}:${minutes}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    setSearchResult(null);

    // Simulation d'une recherche
    setTimeout(() => {
      const result = trackingData[trackingNumber.toUpperCase()];
      if (result) {
        setSearchResult(result);
      } else {
        setError('Numéro de suivi introuvable. Vérifiez votre numéro et réessayez.');
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) {
      return <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>;
    }

    switch (status) {
      case 'Livré':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'En cours de livraison':
        return <Truck className="text-blue-600" size={20} />;
      case 'En transit':
        return <Package className="text-yellow-600" size={20} />;
      default:
        return <CheckCircle className="text-teal-600" size={20} />;
    }
  };

  const recentOrders = [
    { id: 'CMD001', trackingNumber: 'FR123456789', status: 'Livré' },
    { id: 'CMD002', trackingNumber: 'FR987654321', status: 'En transit' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Suivi de Commande</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entrez votre numéro de suivi pour connaître l'état de votre commande en temps réel
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Entrez votre numéro de suivi (ex: FR123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-teal-500 transition-colors disabled:opacity-50"
              >
                {isSearching ? (
                  <div className="animate-spin w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full"></div>
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {isSearching ? 'Recherche...' : 'Suivre ma commande'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Order Header */}
            <div className="bg-teal-50 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Commande #{searchResult.orderId}
                  </h2>
                  <p className="text-gray-600">Transporteur: {searchResult.carrier}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    searchResult.status === 'Livré' 
                      ? 'bg-green-100 text-green-800'
                      : searchResult.status === 'En transit'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {searchResult.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="text-gray-400 mr-2" size={16} />
                  <div>
                    <p className="text-sm text-gray-600">Adresse de livraison</p>
                    <p className="font-medium">{searchResult.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="text-gray-400 mr-2" size={16} />
                  <div>
                    <p className="text-sm text-gray-600">
                      {searchResult.status === 'Livré' ? 'Livré le' : 'Livraison prévue le'}
                    </p>
                    <p className="font-medium">
                      {searchResult.actualDelivery || searchResult.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Suivi détaillé</h3>
              <div className="space-y-6">
                {searchResult.trackingSteps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`mt-1 ${step.completed ? 'text-teal-600' : 'text-gray-300'}`}>
                      {getStatusIcon(step.status, step.completed)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </h4>
                        {step.date && (
                          <span className="text-sm text-gray-500">
                            {formatDateFrench(step.date)}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                      {step.location && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {step.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Mes commandes récentes</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium">Commande #{order.id}</p>
                  <p className="text-sm text-gray-600">N° de suivi: {order.trackingNumber}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Livré' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                  <button
                    onClick={() => {
                      setTrackingNumber(order.trackingNumber);
                      setSearchResult(trackingData[order.trackingNumber]);
                    }}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    Suivre
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/account"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Voir toutes mes commandes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 