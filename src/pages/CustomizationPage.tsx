import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download, Palette, Ruler, Type, ShoppingCart, Eye, RotateCcw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';

const CustomizationPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addToCart } = useCart();

  const [customization, setCustomization] = useState({
    text: '',
    fontSize: 24,
    color: '#ffffff',
    backgroundColor: '#dc2626',
    width: 300,
    height: 200,
    material: 'pvc',
    thickness: '3mm',
    mounting: 'adhesif',
    quantity: 1
  });

  const [preview, setPreview] = useState(true);

  const categoryData = {
    'panneaux-securite': {
      title: 'Panneaux de Sécurité',
      description: 'Créez votre panneau de sécurité personnalisé',
      basePrice: 25.00,
      templates: [
        { id: 1, name: 'Sortie de secours', text: 'SORTIE DE SECOURS', color: '#ffffff', bg: '#22c55e' },
        { id: 2, name: 'Danger', text: 'DANGER', color: '#ffffff', bg: '#dc2626' },
        { id: 3, name: 'Interdiction', text: 'INTERDIT', color: '#ffffff', bg: '#dc2626' },
        { id: 4, name: 'Obligation', text: 'OBLIGATOIRE', color: '#ffffff', bg: '#2563eb' }
      ]
    },
    'signaletique-interieure': {
      title: 'Signalétique Intérieure',
      description: 'Personnalisez votre signalétique intérieure',
      basePrice: 18.00,
      templates: [
        { id: 1, name: 'Bureau', text: 'BUREAU', color: '#1f2937', bg: '#f3f4f6' },
        { id: 2, name: 'Toilettes', text: 'TOILETTES', color: '#ffffff', bg: '#6b7280' },
        { id: 3, name: 'Accueil', text: 'ACCUEIL', color: '#ffffff', bg: '#0d9488' },
        { id: 4, name: 'Salle de réunion', text: 'SALLE DE RÉUNION', color: '#1f2937', bg: '#e5e7eb' }
      ]
    },
    'enseignes-exterieures': {
      title: 'Enseignes Extérieures',
      description: 'Concevez votre enseigne extérieure',
      basePrice: 150.00,
      templates: [
        { id: 1, name: 'Entreprise', text: 'VOTRE ENTREPRISE', color: '#ffffff', bg: '#1f2937' },
        { id: 2, name: 'Commerce', text: 'BOUTIQUE', color: '#fbbf24', bg: '#dc2626' },
        { id: 3, name: 'Restaurant', text: 'RESTAURANT', color: '#ffffff', bg: '#7c2d12' },
        { id: 4, name: 'Service', text: 'SERVICES', color: '#ffffff', bg: '#0d9488' }
      ]
    },
    'marquage-sol': {
      title: 'Marquage au Sol',
      description: 'Créez votre marquage au sol',
      basePrice: 35.00,
      templates: [
        { id: 1, name: 'Parking', text: 'PARKING', color: '#ffffff', bg: '#3b82f6' },
        { id: 2, name: 'Sens interdit', text: 'SENS INTERDIT', color: '#ffffff', bg: '#dc2626' },
        { id: 3, name: 'Piétons', text: 'PASSAGE PIÉTONS', color: '#1f2937', bg: '#fbbf24' },
        { id: 4, name: 'Livraison', text: 'ZONE LIVRAISON', color: '#ffffff', bg: '#16a34a' }
      ]
    },
    'accessibilite': {
      title: 'Accessibilité PMR',
      description: 'Signalétique adaptée PMR',
      basePrice: 40.00,
      templates: [
        { id: 1, name: 'Accès PMR', text: 'ACCÈS PMR', color: '#ffffff', bg: '#7c3aed' },
        { id: 2, name: 'Toilettes PMR', text: 'TOILETTES PMR', color: '#ffffff', bg: '#2563eb' },
        { id: 3, name: 'Parking PMR', text: 'PARKING PMR', color: '#ffffff', bg: '#0d9488' },
        { id: 4, name: 'Ascenseur PMR', text: 'ASCENSEUR PMR', color: '#1f2937', bg: '#f59e0b' }
      ]
    },
    'plaques-gravees': {
      title: 'Plaques Gravées',
      description: 'Plaques personnalisées gravées',
      basePrice: 45.00,
      templates: [
        { id: 1, name: 'Plaque entreprise', text: 'VOTRE ENTREPRISE', color: '#1f2937', bg: '#f3f4f6' },
        { id: 2, name: 'Plaque bureau', text: 'BUREAU DIRECTION', color: '#ffffff', bg: '#1f2937' },
        { id: 3, name: 'Plaque métal', text: 'PLAQUE MÉTAL', color: '#ffffff', bg: '#6b7280' },
        { id: 4, name: 'Plaque dorée', text: 'PLAQUE DORÉE', color: '#1f2937', bg: '#fbbf24' }
      ]
    }
  };

  const currentCategory = categoryData[categoryId as keyof typeof categoryData];

  const materials = [
    { id: 'pvc', name: 'PVC', price: 0 },
    { id: 'alu', name: 'Aluminium', price: 15 },
    { id: 'inox', name: 'Inox', price: 25 },
    { id: 'plexi', name: 'Plexiglas', price: 20 }
  ];

  const thicknesses = [
    { id: '3mm', name: '3mm', price: 0 },
    { id: '5mm', name: '5mm', price: 8 },
    { id: '10mm', name: '10mm', price: 15 }
  ];

  const mountings = [
    { id: 'adhesif', name: 'Adhésif', price: 0 },
    { id: 'vis', name: 'Visserie', price: 5 },
    { id: 'ventouse', name: 'Ventouses', price: 8 },
    { id: 'aimant', name: 'Magnétique', price: 12 }
  ];

  const calculatePrice = () => {
    if (!currentCategory) return 0;
    
    let price = currentCategory.basePrice;
    
    // Ajout du prix du matériau
    const material = materials.find(m => m.id === customization.material);
    if (material) price += material.price;
    
    // Ajout du prix de l'épaisseur
    const thickness = thicknesses.find(t => t.id === customization.thickness);
    if (thickness) price += thickness.price;
    
    // Ajout du prix de la fixation
    const mounting = mountings.find(m => m.id === customization.mounting);
    if (mounting) price += mounting.price;
    
    // Calcul selon les dimensions (prix au m²)
    const surface = (customization.width * customization.height) / 1000000; // en m²
    if (surface > 0.06) { // Si plus de 300x200mm
      price += (surface - 0.06) * 100; // 100€/m² supplémentaire
    }
    
    return price * customization.quantity;
  };

  const applyTemplate = (template: any) => {
    setCustomization({
      ...customization,
      text: template.text,
      color: template.color,
      backgroundColor: template.bg
    });
  };

  const resetCustomization = () => {
    setCustomization({
      text: '',
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: '#dc2626',
      width: 300,
      height: 200,
      material: 'pvc',
      thickness: '3mm',
      mounting: 'adhesif',
      quantity: 1
    });
  };

  const addToCartCustom = () => {
    if (!customization.text.trim()) {
      showToast('Veuillez saisir un texte pour votre produit personnalisé', 'error');
      return;
    }

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `${currentCategory?.title} personnalisé - "${customization.text}"`,
      description: `Produit personnalisé: ${customization.text} - ${customization.width}x${customization.height}mm - ${materials.find(m => m.id === customization.material)?.name}`,
      price: calculatePrice() / customization.quantity,
      priceHT: (calculatePrice() / customization.quantity) * 0.833,
      priceTTC: calculatePrice() / customization.quantity,
      sku: `CUSTOM-${categoryId?.toUpperCase()}-${Date.now()}`,
      category: 'sur-mesure',
      subcategory: categoryId || 'general',
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400',
      quantity: customization.quantity
    };

    addToCart(customProduct);
    showToast(`Produit personnalisé ajouté au panier !`, 'success');
  };

  const downloadPreview = () => {
    // Simulation du téléchargement d'un aperçu
    showToast('Aperçu téléchargé !', 'success');
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Catégorie non trouvée</h2>
          <button
            onClick={() => navigate('/custom')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Retour aux catégories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/custom')}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux catégories
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{currentCategory.title}</h1>
              <p className="text-gray-600 mt-2">{currentCategory.description}</p>
            </div>
            
            <div className="flex items-center mt-4 lg:mt-0 space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Prix estimé</p>
                <p className="text-2xl font-bold text-teal-600">{calculatePrice().toFixed(2)}€</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panneau de personnalisation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Modèles prédéfinis */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Modèles prédéfinis</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentCategory.templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-teal-500 transition-colors text-sm"
                    style={{ backgroundColor: template.bg, color: template.color }}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Texte */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Type className="mr-2" size={20} />
                Texte
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre texte
                  </label>
                  <textarea
                    value={customization.text}
                    onChange={(e) => setCustomization({...customization, text: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={3}
                    placeholder="Saisissez votre texte..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille de police: {customization.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={customization.fontSize}
                    onChange={(e) => setCustomization({...customization, fontSize: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Couleurs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Palette className="mr-2" size={20} />
                Couleurs
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur du texte
                  </label>
                  <input
                    type="color"
                    value={customization.color}
                    onChange={(e) => setCustomization({...customization, color: e.target.value})}
                    className="w-full h-10 rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur de fond
                  </label>
                  <input
                    type="color"
                    value={customization.backgroundColor}
                    onChange={(e) => setCustomization({...customization, backgroundColor: e.target.value})}
                    className="w-full h-10 rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Ruler className="mr-2" size={20} />
                Dimensions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Largeur (mm)
                  </label>
                  <input
                    type="number"
                    value={customization.width}
                    onChange={(e) => setCustomization({...customization, width: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="50"
                    max="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hauteur (mm)
                  </label>
                  <input
                    type="number"
                    value={customization.height}
                    onChange={(e) => setCustomization({...customization, height: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="50"
                    max="2000"
                  />
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matériau
                  </label>
                  <select
                    value={customization.material}
                    onChange={(e) => setCustomization({...customization, material: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name} {material.price > 0 && `(+${material.price}€)`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Épaisseur
                  </label>
                  <select
                    value={customization.thickness}
                    onChange={(e) => setCustomization({...customization, thickness: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {thicknesses.map((thickness) => (
                      <option key={thickness.id} value={thickness.id}>
                        {thickness.name} {thickness.price > 0 && `(+${thickness.price}€)`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fixation
                  </label>
                  <select
                    value={customization.mounting}
                    onChange={(e) => setCustomization({...customization, mounting: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {mountings.map((mounting) => (
                      <option key={mounting.id} value={mounting.id}>
                        {mounting.name} {mounting.price > 0 && `(+${mounting.price}€)`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <input
                    type="number"
                    value={customization.quantity}
                    onChange={(e) => setCustomization({...customization, quantity: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aperçu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Aperçu en temps réel</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={resetCustomization}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw size={16} />
                    <span>Réinitialiser</span>
                  </button>
                  <button
                    onClick={downloadPreview}
                    className="flex items-center space-x-2 px-4 py-2 text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    <Download size={16} />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              {/* Aperçu du produit */}
              <div className="flex items-center justify-center min-h-96 bg-gray-100 rounded-xl p-8">
                <div 
                  className="flex items-center justify-center rounded-lg shadow-lg border-2 border-gray-300"
                  style={{
                    width: `${Math.min(customization.width, 400)}px`,
                    height: `${Math.min(customization.height, 300)}px`,
                    backgroundColor: customization.backgroundColor,
                    color: customization.color,
                    fontSize: `${customization.fontSize}px`,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: '20px',
                    wordWrap: 'break-word',
                    overflow: 'hidden'
                  }}
                >
                  {customization.text || 'Votre texte ici...'}
                </div>
              </div>

              {/* Informations du produit */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Dimensions:</span>
                    <p className="font-medium">{customization.width} × {customization.height} mm</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Matériau:</span>
                    <p className="font-medium">{materials.find(m => m.id === customization.material)?.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Épaisseur:</span>
                    <p className="font-medium">{customization.thickness}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Fixation:</span>
                    <p className="font-medium">{mountings.find(m => m.id === customization.mounting)?.name}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={addToCartCustom}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
                >
                  <ShoppingCart size={20} />
                  <span>Ajouter au panier - {calculatePrice().toFixed(2)}€</span>
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage; 