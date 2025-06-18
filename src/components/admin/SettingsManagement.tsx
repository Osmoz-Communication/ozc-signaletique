import React, { useState } from 'react';
import { FaSave, FaGlobe, FaEnvelope, FaShieldAlt, FaBell, FaPalette, FaUpload, FaEye, FaSignOutAlt } from 'react-icons/fa';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    // Paramètres généraux
    siteName: 'OZC Signalétique',
    siteDescription: 'Votre spécialiste en signalétique professionnelle',
    contactEmail: 'info@ozc-signaletique.fr',
    contactPhone: '01.84.19.01.04',
    address: '36 rue Bertrand Flornoy, 77120 Coulommiers',
    
    // Paramètres de livraison
    freeShippingThreshold: 300,
    standardShippingCost: 15,
    expressShippingCost: 25,
    
    // Paramètres de notification
    emailNotifications: true,
    orderNotifications: true,
    stockAlerts: true,
    customerNotifications: true,
    
    // Paramètres de sécurité
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireStrongPassword: true,
    twoFactorAuth: false,
    
    // Paramètres d'apparence
    primaryColor: '#0d9488',
    secondaryColor: '#06b6d4',
    logoUrl: '/src/assets/logo.png',
    faviconUrl: '/src/assets/favicon.ico'
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      alert('Paramètres sauvegardés avec succès !');
    }, 1000);
  };

  const handleFileUpload = (type: 'logo' | 'favicon', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'logo') {
        setSettings({...settings, logoUrl: url});
      } else {
        setSettings({...settings, faviconUrl: url});
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin/login';
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: FaGlobe },
    { id: 'shipping', label: 'Livraison', icon: FaEnvelope },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Sécurité', icon: FaShieldAlt },
    { id: 'appearance', label: 'Apparence', icon: FaPalette }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configurez votre application</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt size={16} />
            <span>Déconnexion</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isSaving
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            <FaSave size={16} />
            <span>{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="bg-white rounded-lg shadow-sm p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Paramètres généraux */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Paramètres généraux</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contact
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du site
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Paramètres de livraison */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Paramètres de livraison</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seuil livraison gratuite (€)
                    </label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({...settings, freeShippingThreshold: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coût livraison standard (€)
                    </label>
                    <input
                      type="number"
                      value={settings.standardShippingCost}
                      onChange={(e) => setSettings({...settings, standardShippingCost: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coût livraison express (€)
                    </label>
                    <input
                      type="number"
                      value={settings.expressShippingCost}
                      onChange={(e) => setSettings({...settings, expressShippingCost: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paramètres de notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Paramètres de notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Notifications par email' },
                    { key: 'orderNotifications', label: 'Notifications de commandes' },
                    { key: 'stockAlerts', label: 'Alertes de stock' },
                    { key: 'customerNotifications', label: 'Notifications clients' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => setSettings({...settings, [item.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paramètres de sécurité */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Paramètres de sécurité</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeout de session (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tentatives de connexion max
                    </label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({...settings, maxLoginAttempts: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-medium text-gray-900">Mot de passe fort requis</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.requireStrongPassword}
                        onChange={(e) => setSettings({...settings, requireStrongPassword: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Authentification à deux facteurs (2FA)</span>
                      <p className="text-sm text-gray-500 mt-1">Sécurisez votre compte avec Google Authenticator</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {settings.twoFactorAuth && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Configuration Google Authenticator</h4>
                      <div className="space-y-3">
                        <p className="text-sm text-blue-800">
                          1. Téléchargez Google Authenticator sur votre smartphone
                        </p>
                        <p className="text-sm text-blue-800">
                          2. Scannez le QR code ci-dessous ou entrez la clé manuellement
                        </p>
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="w-32 h-32 bg-white border-2 border-blue-300 rounded-lg flex items-center justify-center">
                            <div className="text-center text-xs text-gray-500">
                              QR Code<br/>Google Auth
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-blue-900 mb-1">
                              Clé secrète manuelle :
                            </label>
                            <code className="block text-sm bg-white border border-blue-200 rounded px-3 py-2 text-blue-800 font-mono">
                              JBSWY3DPEHPK3PXP
                            </code>
                            <p className="text-xs text-blue-600 mt-1">
                              Sauvegardez cette clé dans un endroit sûr
                            </p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-blue-200">
                          <label className="block text-sm font-medium text-blue-900 mb-2">
                            Code de vérification (6 chiffres) :
                          </label>
                          <input
                            type="text"
                            placeholder="123456"
                            maxLength={6}
                            className="w-32 px-3 py-2 border border-blue-300 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Vérifier
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Paramètres d'apparence */}
            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-900">Paramètres d'apparence</h2>
                
                {/* Couleurs */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Couleurs du thème</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Couleur principale
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Couleur secondaire
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logo */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Logo du site</h3>
                  <div className="flex items-start space-x-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Télécharger un nouveau logo
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('logo', e)}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <Upload size={16} />
                          <span>Choisir un fichier</span>
                        </label>
                        <span className="text-sm text-gray-500">PNG, JPG, SVG (max 2MB)</span>
                      </div>
                    </div>
                    {settings.logoUrl && (
                      <div className="flex-shrink-0">
                        <p className="text-sm font-medium text-gray-700 mb-2">Aperçu actuel</p>
                        <div className="w-32 h-16 border border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                          <img
                            src={settings.logoUrl}
                            alt="Logo"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling!.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden text-gray-400 text-xs text-center">
                            Erreur de chargement
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Favicon */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Favicon</h3>
                  <div className="flex items-start space-x-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Télécharger un nouveau favicon
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('favicon', e)}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <label
                          htmlFor="favicon-upload"
                          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <Upload size={16} />
                          <span>Choisir un fichier</span>
                        </label>
                        <span className="text-sm text-gray-500">ICO, PNG (16x16 ou 32x32)</span>
                      </div>
                    </div>
                    {settings.faviconUrl && (
                      <div className="flex-shrink-0">
                        <p className="text-sm font-medium text-gray-700 mb-2">Aperçu dans l'onglet</p>
                        <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
                          <div className="bg-white rounded-t-lg border border-gray-300 p-2 max-w-48">
                            <div className="flex items-center space-x-2">
                              <img
                                src={settings.faviconUrl}
                                alt="Favicon"
                                className="w-4 h-4 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <span className="text-xs text-gray-600 truncate">
                                {settings.siteName}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 text-center">Simulation d'onglet</p>
                        </div>
                      </div>
                    )}
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

export default SettingsManagement; 