import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Fonction pour formater les dates en français
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

  // Données simulées - dans une vraie app, ces données viendraient d'une API
  const orderData = {
    'CMD001': {
      id: 'CMD001',
      date: '2024-03-15',
      status: 'Livré',
      total: 156.80,
      shippingAddress: {
        name: 'Jean Dupont',
        address: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      },
      trackingNumber: 'FR123456789',
      estimatedDelivery: '2024-03-18',
      actualDelivery: '2024-03-17',
      items: [
        { 
          id: '1',
          name: 'Panneau Sortie de Secours', 
          quantity: 2, 
          price: 45.90,
          image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=300'
        },
        { 
          id: '2',
          name: 'Panneau Interdiction de Fumer', 
          quantity: 1, 
          price: 25.50,
          image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
      ],
      statusHistory: [
        { status: 'Commande passée', date: '2024-03-15T10:30:00', completed: true },
        { status: 'Commande confirmée', date: '2024-03-15T11:00:00', completed: true },
        { status: 'En préparation', date: '2024-03-15T14:00:00', completed: true },
        { status: 'Expédié', date: '2024-03-16T09:00:00', completed: true },
        { status: 'Livré', date: '2024-03-17T15:30:00', completed: true }
      ]
    },
    'CMD002': {
      id: 'CMD002',
      date: '2024-03-10',
      status: 'En cours',
      total: 89.50,
      shippingAddress: {
        name: 'Jean Dupont',
        address: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      },
      trackingNumber: 'FR987654321',
      estimatedDelivery: '2024-03-25',
      items: [
        { 
          id: '3',
          name: 'Panneau Danger Électrique', 
          quantity: 3, 
          price: 29.83,
          image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
      ],
      statusHistory: [
        { status: 'Commande passée', date: '2024-03-10T14:20:00', completed: true },
        { status: 'Commande confirmée', date: '2024-03-10T14:45:00', completed: true },
        { status: 'En préparation', date: '2024-03-11T09:00:00', completed: true },
        { status: 'Expédié', date: '', completed: false },
        { status: 'Livré', date: '', completed: false }
      ]
    }
  };

  const order = orderData[orderId as keyof typeof orderData];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Commande introuvable</h1>
          <p className="text-gray-600 mb-6">La commande que vous recherchez n'existe pas.</p>
          <button
            onClick={() => navigate('/account')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Retour au compte
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livré':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'En cours':
        return <Clock className="text-yellow-600" size={24} />;
      case 'Expédié':
        return <Truck className="text-blue-600" size={24} />;
      default:
        return <Package className="text-gray-600" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expédié':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/account')}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour à mon compte
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Commande #{order.id}</h1>
              <p className="text-gray-600">Passée le {order.date}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                {getStatusIcon(order.status)}
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{order.total.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles commandés */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Articles commandés</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
                      <p className="text-sm text-gray-600">{item.price.toFixed(2)}€ / unité</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Récapitulatif des prix */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-teal-600">{order.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Suivi de commande */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Suivi de la commande</h2>
              <div className="space-y-4">
                {order.statusHistory.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-teal-600' : 'bg-gray-300'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="text-white" size={16} />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </p>
                      {step.date && (
                        <p className="text-sm text-gray-600">{formatDateFrench(step.date)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Informations de livraison */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
              <div className="text-gray-600">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {order.trackingNumber && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Numéro de suivi</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">{order.trackingNumber}</p>
                  </div>
                  {order.status === 'Livré' && order.actualDelivery ? (
                    <div>
                      <p className="text-sm text-gray-600">Livré le</p>
                      <p className="font-medium">{order.actualDelivery}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">Livraison estimée</p>
                      <p className="font-medium">{order.estimatedDelivery}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                  Télécharger la facture
                </button>
                {order.status === 'Livré' && (
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Retourner un article
                  </button>
                )}
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Contacter le support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 