import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'orders', label: 'Mes commandes', icon: Package },
    { id: 'wishlist', label: 'Liste de souhaits', icon: Heart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const orders = [
    {
      id: 'CMD001',
      date: '2024-03-15',
      status: 'Livré',
      total: 156.80,
      items: [
        { name: 'Panneau Sortie de Secours', quantity: 2, price: 45.90 },
        { name: 'Panneau Interdiction de Fumer', quantity: 1, price: 25.50 }
      ]
    },
    {
      id: 'CMD002',
      date: '2024-03-10',
      status: 'En cours',
      total: 89.50,
      items: [
        { name: 'Panneau Danger Électrique', quantity: 3, price: 29.83 }
      ]
    }
  ];

  const wishlistItems = [
    { id: '1', name: 'Panneau EPI Obligatoire', price: 32.50, image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: '2', name: 'Panneau Premiers Secours', price: 28.90, image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Compte</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="text-teal-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold">{user?.name || 'Utilisateur'}</p>
                  <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-teal-50 text-teal-600 border-l-4 border-teal-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Informations personnelles</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        defaultValue="Jean"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        defaultValue="Dupont"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="jean.dupont@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        defaultValue="01 23 45 67 89"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Rue de la Paix"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        defaultValue="Paris"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal
                      </label>
                      <input
                        type="text"
                        defaultValue="75001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Mes commandes</h2>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-teal-300 hover:shadow-md transition-all duration-200"
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            Commande #{order.id}
                            <ChevronRight className="ml-2 text-gray-400" size={20} />
                          </h3>
                          <p className="text-gray-600">Passée le {order.date}</p>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Livré' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                          <p className="font-bold text-lg mt-1">{order.total.toFixed(2)}€</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>{(item.price * item.quantity).toFixed(2)}€</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-right">
                        <span className="text-sm text-teal-600 font-medium">
                          Cliquez pour voir les détails →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Ma liste de souhaits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-teal-600 font-bold text-lg mb-4">{item.price}€</p>
                      <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Ajouter au panier
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Paramètres</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="ml-2">Recevoir les offres promotionnelles</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="ml-2">Notifications de commande</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="ml-2">Newsletter</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Mettre à jour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;