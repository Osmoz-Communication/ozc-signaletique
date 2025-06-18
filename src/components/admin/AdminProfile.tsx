import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X, Eye, EyeOff, Key } from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    confirmPassword: ''
  });

  const [tempData, setTempData] = useState({ ...profileData });
  const [showPasswordSection, setShowPasswordSection] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    // Validation
    if (tempData.newPassword && tempData.newPassword !== tempData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Simulation de sauvegarde
    setProfileData({ ...tempData });
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600 mt-2">Gérez vos informations personnelles et paramètres de sécurité</p>
          </div>
          {!isEditing ? (
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Key size={16} className="mr-2" />
                Modifier mot de passe
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Edit size={16} className="mr-2" />
                Modifier profil
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={16} className="mr-2" />
                Sauvegarder
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X size={16} className="mr-2" />
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Photo de profil et infos principales */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600">{profileData.role}</p>
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
            </div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations personnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-900">{profileData.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Adresse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.postalCode}</p>
                )}
              </div>
            </div>
          </div>

                     {/* Sécurité */}
           {(isEditing || showPasswordSection) && (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-semibold text-gray-900">Sécurité</h3>
                 {!isEditing && (
                   <button
                     onClick={() => setShowPasswordSection(false)}
                     className="text-gray-400 hover:text-gray-600"
                   >
                     <X size={20} />
                   </button>
                 )}
               </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={tempData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                      placeholder="Saisissez votre mot de passe actuel"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={tempData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Nouveau mot de passe (optionnel)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    value={tempData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Confirmez le nouveau mot de passe"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 