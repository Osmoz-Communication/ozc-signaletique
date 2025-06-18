import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Download, ShoppingCart, Heart, Star, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addToCart } = useCart();

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
          sku: 'SEC-LED-001',
          category: 'Signalisation de sécurité',
          image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=300'
        },
        { 
          id: '2',
          name: 'Panneau Interdiction de Fumer', 
          quantity: 1, 
          price: 25.50,
          sku: 'INT-FUM-002',
          category: 'Signalisation de sécurité',
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
          sku: 'DAN-ELE-003',
          category: 'Signalisation de sécurité',
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

  // Produits recommandés pour l'upsell
  const recommendedProducts = [
    {
      id: 'r1',
      name: 'Kit de Fixation Universel',
      price: 15.90,
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=300',
      reason: 'Complément parfait pour vos panneaux'
    },
    {
      id: 'r2',
      name: 'Éclairage LED de Secours',
      price: 35.50,
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300',
      reason: 'Améliore la visibilité de nuit'
    },
    {
      id: 'r3',
      name: 'Nettoyant Spécial Panneaux',
      price: 12.90,
      image: 'https://images.pexels.com/photos/4099124/pexels-photo-4099124.jpeg?auto=compress&cs=tinysrgb&w=300',
      reason: 'Maintient vos panneaux comme neufs'
    }
  ];

  const order = orderData[orderId as keyof typeof orderData];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Commande introuvable</h2>
          <p className="text-gray-600 mb-6">La commande que vous recherchez n'existe pas.</p>
          <button
            onClick={() => navigate('/account')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Retour au compte
          </button>
        </div>
      </div>
    );
  }

  // Fonction pour générer et télécharger un PDF
  const downloadInvoicePDF = async () => {
    try {
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();

      // Configuration du document
      doc.setFontSize(20);
      doc.setTextColor(13, 148, 136); // Couleur teal
      doc.text('OZC SIGNALETIQUE', 20, 30);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Spécialiste en signalétique et communication visuelle', 20, 40);
      doc.text('www.ozc-signaletique.fr', 20, 50);

      // Informations de facture
      doc.setFontSize(16);
      doc.text(`FACTURE N° ${order.id}`, 20, 80);
      
      doc.setFontSize(10);
      doc.text(`Date: ${new Date(order.date).toLocaleDateString('fr-FR')}`, 20, 95);
      doc.text(`Statut: ${order.status}`, 20, 105);

      // Adresse de facturation
      doc.text('ADRESSE DE FACTURATION:', 120, 95);
      doc.text(order.shippingAddress.name, 120, 105);
      doc.text(order.shippingAddress.address, 120, 115);
      doc.text(`${order.shippingAddress.postalCode} ${order.shippingAddress.city}`, 120, 125);

      // Articles
      let yPos = 150;
      doc.text('ARTICLES COMMANDES:', 20, yPos);
      yPos += 15;

      order.items.forEach((item) => {
        doc.text(`${item.name}`, 20, yPos);
        doc.text(`Qte: ${item.quantity}`, 100, yPos);
        doc.text(`${item.price.toFixed(2)}€`, 150, yPos);
        doc.text(`${(item.price * item.quantity).toFixed(2)}€`, 180, yPos);
        yPos += 10;
      });

      // Total
      yPos += 10;
      doc.setFontSize(12);
      doc.text(`TOTAL TTC: ${order.total.toFixed(2)}€`, 150, yPos);

      // Téléchargement
      doc.save(`Facture_${order.id}.pdf`);
      
      // Notification de succès
      showToast('Facture PDF téléchargée avec succès !', 'success');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      showToast('Erreur lors de la génération du PDF', 'error');
    }
  };

  // Fonction pour commander à nouveau un article
  const reorderItem = (item: any) => {
    // Convertir l'item de commande en format CartItem
    const cartItem = {
      id: item.id,
      name: item.name,
      description: `Produit de la commande #${orderId}`,
      price: item.price,
      priceHT: item.price * 0.833, // Calcul approximatif HT
      priceTTC: item.price,
      sku: item.sku || `PROD-${item.id}`,
      category: item.category || 'signalisation-securite',
      subcategory: 'generale',
      image: item.image,
      quantity: item.quantity
    };
    
    addToCart(cartItem);
    showToast(`${item.name} (x${item.quantity}) ajouté au panier !`, 'success');
  };

  // Fonction pour voir un produit
  const viewProduct = (item: any) => {
    navigate(`/product/${item.id}`);
  };

  // Fonction pour ajouter un produit recommandé au panier
  const addRecommendedToCart = (product: any) => {
    showToast(`${product.name} ajouté au panier !`, 'success');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livré': return <CheckCircle className="text-green-600" size={20} />;
      case 'En cours': return <Clock className="text-yellow-600" size={20} />;
      case 'Expédié': return <Truck className="text-blue-600" size={20} />;
      default: return <Package className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Expédié': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec retour */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/account')}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour au compte
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Commande #{order.id}</h1>
              <p className="text-gray-600 mt-2">
                Passée {formatDateFrench(order.date + 'T10:30:00')}
              </p>
            </div>
            
            <div className="flex items-center mt-4 lg:mt-0 space-x-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="ml-2">{order.status}</span>
              </div>
              <button
                onClick={downloadInvoicePDF}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Colonne principale - Articles et détails */}
          <div className="xl:col-span-3 space-y-8">
            {/* Articles commandés */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Articles commandés</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => viewProduct(item)}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <h3 
                              className="text-lg font-medium text-gray-900 cursor-pointer hover:text-teal-600 transition-colors"
                              onClick={() => viewProduct(item)}
                            >
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">UGS: {item.sku}</p>
                            <p className="text-sm text-gray-500">Catégorie: {item.category}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="text-sm text-gray-600">Quantité: {item.quantity}</span>
                              <span className="text-lg font-semibold text-gray-900">
                                {(item.price * item.quantity).toFixed(2)}€
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 lg:mt-0">
                            <button
                              onClick={() => reorderItem(item)}
                              className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
                            >
                              <RefreshCw size={14} className="mr-2" />
                              Commander à nouveau
                            </button>
                            <button
                              onClick={() => viewProduct(item)}
                              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Voir le produit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suivi de commande */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Suivi de votre commande</h2>
              
              <div className="space-y-4">
                {order.statusHistory.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.completed ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Clock size={16} />
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 className={`font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </h3>
                        {step.date && (
                          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                            {formatDateFrench(step.date)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {order.trackingNumber && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Numéro de suivi</p>
                      <p className="text-blue-700 font-mono">{order.trackingNumber}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Suivre le colis
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Produits recommandés - Upselling */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Complétez votre équipement</h2>
                <span className="text-sm text-teal-600 font-medium">Recommandations personnalisées</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.reason}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">{product.price.toFixed(2)}€</span>
                      <button
                        onClick={() => addRecommendedToCart(product)}
                        className="flex items-center px-3 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <ShoppingCart size={14} className="mr-1" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Offre spéciale bundle */}
              <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Offre spéciale : Pack Maintenance</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Kit de fixation + Nettoyant + Éclairage LED
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-lg font-bold text-teal-600">54.90€</span>
                      <span className="text-sm text-gray-500 line-through ml-2">64.30€</span>
                      <span className="text-sm text-green-600 font-medium ml-2">-15%</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Profiter de l'offre
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Informations de livraison et résumé */}
          <div className="xl:col-span-1 space-y-6">
            {/* Résumé de commande */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="text-gray-900">{(order.total / 1.2).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TVA (20%)</span>
                  <span className="text-gray-900">{(order.total - order.total / 1.2).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-semibold text-gray-900">{order.total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse de livraison</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Package size={16} className="mr-2" />
                  Retourner un article
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Contacter le support
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Continuer mes achats
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