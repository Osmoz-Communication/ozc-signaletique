import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X, Eye, EyeOff, Key, Settings, BarChart3, Clock, CheckCircle, AlertCircle, Camera, Bell, Lock, Globe, Palette, Monitor } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminProfile = () => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'OZC',
    email: 'admin@ozc-signaletique.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Signalétique',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    role: 'Administrateur Principal',
    department: 'Direction',
    joinDate: '2023-01-15',
    lastLogin: '2024-03-20T14:30:00',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    bio: 'Administrateur principal en charge de la gestion de la plateforme OZC Signalétique.',
    website: 'https://ozc-signaletique.fr',
    linkedin: 'https://linkedin.com/company/ozc-signaletique'
  });

  const [preferences, setPreferences] = useState({
    language: 'fr',
    timezone: 'Europe/Paris',
    theme: 'light',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    weeklyReports: true,
    orderAlerts: true,
    stockAlerts: true,
    customerAlerts: false,
    autoLogout: '4h',
    dashboardView: 'detailed',
    defaultCurrency: 'EUR'
  });

  const [tempData, setTempData] = useState({ ...profileData });
  const [tempPreferences, setTempPreferences] = useState({ ...preferences });
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Statistiques de l'admin
  const adminStats = {
    totalLogins: 1247,
    averageSessionTime: '2h 34m',
    lastActivityDays: 2,
    ordersProcessed: 89,
    customersHelped: 156,
    reportsGenerated: 23,
    systemUptime: '99.8%',
    securityScore: 95
  };

  const recentActivities = [
    { action: 'Connexion au système', time: '2024-03-20T14:30:00', type: 'login' },
    { action: 'Export des commandes CSV', time: '2024-03-20T13:15:00', type: 'export' },
    { action: 'Modification produit #1234', time: '2024-03-20T11:45:00', type: 'edit' },
    { action: 'Traitement commande #CMD005', time: '2024-03-20T10:20:00', type: 'order' },
    { action: 'Sauvegarde base de données', time: '2024-03-19T23:00:00', type: 'system' }
  ];

  // Fonction pour formater les dates en français
  const formatDateFrench = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a moins d\'une heure';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
    setTempPreferences({ ...preferences });
  };

  const handleSave = () => {
    // Validation
    if (tempData.newPassword && tempData.newPassword !== tempData.confirmPassword) {
      showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }

    if (tempData.newPassword && tempData.newPassword.length < 8) {
      showToast('Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }

    // Simulation de sauvegarde
    setProfileData({ ...tempData });
    setPreferences({ ...tempPreferences });
    setIsEditing(false);
    showToast('Profil mis à jour avec succès !', 'success');
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setTempPreferences(prev => ({ ...prev, [field]: value }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <User className="w-4 h-4 text-blue-500" />;
      case 'export': return <BarChart3 className="w-4 h-4 text-green-500" />;
      case 'edit': return <Edit className="w-4 h-4 text-orange-500" />;
      case 'order': return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'system': return <Settings className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'preferences', name: 'Préférences', icon: Settings },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'activity', name: 'Activité', icon: BarChart3 }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600 mt-2">Gérez vos informations personnelles, préférences et paramètres de sécurité</p>
          </div>
          {!isEditing ? (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
              >
                <Key size={16} className="mr-2" />
                Modifier mot de passe
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
              >
                <Edit size={16} className="mr-2" />
                Modifier profil
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <Save size={16} className="mr-2" />
                Sauvegarder
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                <X size={16} className="mr-2" />
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent size={16} className="mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo de profil et infos principales */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={48} className="text-white" />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Camera size={16} className="text-gray-600" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-teal-600 font-medium">{profileData.role}</p>
                <p className="text-sm text-gray-500">{profileData.department}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="text-gray-400 mr-3" />
                  <span className="text-gray-600">Membre depuis le {new Date(profileData.joinDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Shield size={16} className="text-gray-400 mr-3" />
                  <span className="text-gray-600">Dernière connexion: {formatDateFrench(profileData.lastLogin)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className="text-green-500 mr-3" />
                  <span className="text-gray-600">Score sécurité: {adminStats.securityScore}%</span>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Statistiques</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-teal-600">{adminStats.totalLogins}</p>
                    <p className="text-xs text-gray-500">Connexions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{adminStats.ordersProcessed}</p>
                    <p className="text-xs text-gray-500">Commandes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{adminStats.customersHelped}</p>
                    <p className="text-xs text-gray-500">Clients aidés</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{adminStats.reportsGenerated}</p>
                    <p className="text-xs text-gray-500">Rapports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-3">{profileData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-3">{profileData.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center py-3">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center py-3">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.phone}</p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-3">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Adresse</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center py-3">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.address}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-3">{profileData.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-3">{profileData.postalCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Préférences générales */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Settings className="mr-2" size={20} />
              Préférences générales
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                <select
                  value={isEditing ? tempPreferences.language : preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                <select
                  value={isEditing ? tempPreferences.timezone : preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  <option value="Europe/London">Europe/London (GMT+0)</option>
                  <option value="America/New_York">America/New_York (GMT-5)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
                <select
                  value={isEditing ? tempPreferences.theme : preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Déconnexion automatique</label>
                <select
                  value={isEditing ? tempPreferences.autoLogout : preferences.autoLogout}
                  onChange={(e) => handlePreferenceChange('autoLogout', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="1h">1 heure</option>
                  <option value="4h">4 heures</option>
                  <option value="8h">8 heures</option>
                  <option value="never">Jamais</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Bell className="mr-2" size={20} />
              Notifications
            </h3>
            
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Notifications par email' },
                { key: 'smsNotifications', label: 'Notifications par SMS' },
                { key: 'marketingEmails', label: 'Emails marketing' },
                { key: 'weeklyReports', label: 'Rapports hebdomadaires' },
                { key: 'orderAlerts', label: 'Alertes commandes' },
                { key: 'stockAlerts', label: 'Alertes stock' },
                { key: 'customerAlerts', label: 'Alertes clients' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">{item.label}</label>
                  <input
                    type="checkbox"
                    checked={isEditing ? tempPreferences[item.key as keyof typeof tempPreferences] : preferences[item.key as keyof typeof preferences]}
                    onChange={(e) => handlePreferenceChange(item.key, e.target.checked)}
                    disabled={!isEditing}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded disabled:opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sécurité du compte */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Lock className="mr-2" size={20} />
              Sécurité du compte
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-800">Score de sécurité: {adminStats.securityScore}%</span>
                </div>
                <p className="text-sm text-green-600 mt-1">Votre compte est bien sécurisé</p>
              </div>

              {showPasswordSection && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium text-gray-900">Changer le mot de passe</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={tempData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                        placeholder="Mot de passe actuel"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={tempData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Nouveau mot de passe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={tempData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Confirmer le mot de passe"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Changer le mot de passe
                    </button>
                    <button
                      onClick={() => setShowPasswordSection(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Recommandations de sécurité</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600">Mot de passe fort activé</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600">Connexion sécurisée (HTTPS)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-gray-600">Authentification à deux facteurs recommandée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions actives */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Monitor className="mr-2" size={20} />
              Sessions actives
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Session actuelle</p>
                    <p className="text-sm text-gray-500">Chrome sur Windows • Paris, France</p>
                    <p className="text-xs text-gray-400">IP: 192.168.1.100</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Session mobile</p>
                    <p className="text-sm text-gray-500">Safari sur iPhone • Paris, France</p>
                    <p className="text-xs text-gray-400">Dernière activité: Il y a 2h</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activité récente */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Clock className="mr-2" size={20} />
              Activité récente
            </h3>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{formatDateFrench(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Statistiques</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Temps de session moyen</span>
                  <span className="text-sm font-bold text-gray-900">{adminStats.averageSessionTime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Uptime système</span>
                  <span className="text-sm font-bold text-green-600">{adminStats.systemUptime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Score sécurité</span>
                  <span className="text-sm font-bold text-blue-600">{adminStats.securityScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile; 