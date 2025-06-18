import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  Bell,
  User,
  LogOut,
  ChevronDown,
  Search,
  Menu,
  X,
  TrendingUp,
  Calculator,
  Download,
  Image,
  MessageSquare,
  Mail
} from 'lucide-react';
import Dashboard from '../components/admin/Dashboard';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';
import CustomersManagement from '../components/admin/CustomersManagement';
import SettingsManagement from '../components/admin/SettingsManagement';
import AdminProfile from '../components/admin/AdminProfile';
import TopProducts from '../components/admin/TopProducts';
import PricingMatrix from '../components/admin/PricingMatrix';
import CataloguesManagement from '../components/admin/CataloguesManagement';
import SliderManagement from '../components/admin/SliderManagement';
import MessagesManagement from '../components/admin/MessagesManagement';
import NewsletterManagement from '../components/admin/NewsletterManagement';

const AdminPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  // Gérer l'état activeTab depuis la navigation
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      // Nettoyer l'état pour éviter les conflits
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const notifications = [
    { id: 1, message: 'Nouvelle commande #CMD005', time: '2 min', unread: true },
    { id: 2, message: 'Stock faible: Panneau Sortie', time: '15 min', unread: true },
    { id: 3, message: 'Commande expédiée #CMD004', time: '1h', unread: false },
    { id: 4, message: 'Nouveau client inscrit', time: '2h', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notif: any) => {
    // Marquer comme lu
    setNotificationsOpen(false);
    
    // Redirection selon le type de notification
    if (notif.message.includes('commande')) {
      setActiveTab('orders');
    } else if (notif.message.includes('Stock faible')) {
      setActiveTab('products');
    } else if (notif.message.includes('client')) {
      setActiveTab('customers');
    }
  };

  const handleProfileSettings = () => {
    setActiveTab('profile');
    setProfileDropdownOpen(false);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'customers', label: 'Clients', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'pricing-matrix', label: 'Matrice de prix', icon: Calculator },
    { id: 'catalogues', label: 'Catalogues', icon: Download },
    { id: 'slider', label: 'Slider accueil', icon: Image },
    { id: 'top-products', label: 'Top Produits', icon: TrendingUp },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsManagement />;
      case 'orders':
        return <OrdersManagement />;
                      case 'customers':
                  return <CustomersManagement />;
                case 'pricing':
                  return <PricingMatrix />;
      case 'top-products':
        return <TopProducts />;
      case 'profile':
        return <AdminProfile />;
      case 'settings':
        return <SettingsManagement />;
      case 'pricing-matrix':
        return <PricingMatrix />;
      case 'catalogues':
        return <CataloguesManagement />;
      case 'slider':
        return <SliderManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'newsletter':
        return <NewsletterManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo et menu mobile */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">OZC</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">Administration</h1>
                  <p className="text-xs text-gray-500">OZC Signalétique</p>
                </div>
              </div>
            </div>

            {/* Actions header */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown notifications */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notif.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm text-gray-900">{notif.message}</p>
                            <span className="text-xs text-gray-500 ml-2">{notif.time}</span>
                          </div>
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-teal-600 hover:text-teal-700 font-medium">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profil */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">Administrateur</p>
                    <p className="text-xs text-gray-500">admin@ozc-signaletique.fr</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* Dropdown profil */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Administrateur</p>
                      <p className="text-xs text-gray-500">admin@ozc-signaletique.fr</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={handleProfileSettings}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User size={16} className="mr-3" />
                        Mon Profil
                      </button>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Settings size={16} className="mr-3" />
                        Paramètres
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut size={16} className="mr-3" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
          flex flex-col
        `}>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer sidebar */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium text-sm">Retour au site</span>
            </button>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">OZC</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Version 2.1.0</p>
                <p className="text-xs text-gray-500">Administration</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 min-h-full">
            <div className="transition-opacity duration-200">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Click outside handlers */}
      {(profileDropdownOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setProfileDropdownOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminPage; 