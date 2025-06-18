import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Star, TrendingUp, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { useToast } from '../context/ToastContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, addToCart } = useCart();
  const { showToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number, type: 'percentage' | 'fixed'} | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Codes promo disponibles
  const promoCodes = {
    'WELCOME10': { discount: 10, type: 'percentage' as const, description: '10% de réduction' },
    'FIRST20': { discount: 20, type: 'percentage' as const, description: '20% de réduction première commande' },
    'LIVRAISON': { discount: 15, type: 'fixed' as const, description: '15€ de réduction sur la livraison' },
    'NOEL2024': { discount: 25, type: 'percentage' as const, description: '25% de réduction spéciale Noël' },
    'PRO15': { discount: 15, type: 'percentage' as const, description: '15% de réduction professionnels' }
  };

  // Fonctions pour les codes promo
  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    
    // Simulation d'une vérification API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const upperPromoCode = promoCode.toUpperCase();
    const promo = promoCodes[upperPromoCode as keyof typeof promoCodes];
    
    if (promo) {
      setAppliedPromo({
        code: upperPromoCode,
        discount: promo.discount,
        type: promo.type
      });
      showToast(`Code promo "${upperPromoCode}" appliqué ! ${promo.description}`, 'success');
      setPromoCode('');
    } else {
      showToast('Code promo invalide', 'error');
    }
    
    setIsApplyingPromo(false);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Code promo retiré', 'info');
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    const subtotal = getCartTotal();
    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.discount) / 100;
    } else {
      return Math.min(appliedPromo.discount, subtotal); // Ne peut pas dépasser le sous-total
    }
  };

  const getDiscountedTotal = () => {
    return getCartTotal() - calculateDiscount();
  };

  // Produits recommandés basés sur le contenu du panier
  const getRecommendedProducts = () => {
    const cartCategories = [...new Set(cartItems.map(item => item.category))];
    const cartProductIds = cartItems.map(item => item.id);
    
    return products.filter(product => 
      cartCategories.includes(product.category) && 
      !cartProductIds.includes(product.id)
    ).slice(0, 4);
  };

  const recommendedProducts = getRecommendedProducts();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
          <Link
            to="/products"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Continuer vos achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Articles ({cartItems.length})</h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.category}</p>
                        <p className="text-teal-600 font-bold text-lg">{item.price}€</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 border border-gray-300 rounded">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)}€</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Résumé de commande</h2>
              
              {/* Code Promo Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Tag className="w-5 h-5 text-teal-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Code promo</h3>
                </div>
                
                {!appliedPromo ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Entrez votre code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={!promoCode.trim() || isApplyingPromo}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                      >
                        {isApplyingPromo ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'Appliquer'
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Codes disponibles : WELCOME10, FIRST20, LIVRAISON, NOEL2024, PRO15
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <div>
                        <span className="font-medium text-green-800">{appliedPromo.code}</span>
                        <p className="text-xs text-green-600">
                          {appliedPromo.type === 'percentage' 
                            ? `${appliedPromo.discount}% de réduction`
                            : `${appliedPromo.discount}€ de réduction`
                          }
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{getCartTotal().toFixed(2)}€</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction ({appliedPromo.code})</span>
                    <span>-{calculateDiscount().toFixed(2)}€</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Sous-total après réduction</span>
                  <span className={appliedPromo ? 'font-medium' : ''}>
                    {getDiscountedTotal().toFixed(2)}€
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-green-600">
                    {getDiscountedTotal() >= 300 ? 'Gratuite' : '15.00€'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>{(getDiscountedTotal() * 0.2).toFixed(2)}€</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{(getDiscountedTotal() + (getDiscountedTotal() >= 300 ? 0 : 15) + getDiscountedTotal() * 0.2).toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {getDiscountedTotal() < 300 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    Ajoutez {(300 - getDiscountedTotal()).toFixed(2)}€ pour bénéficier de la livraison gratuite
                  </p>
                </div>
              )}

              <Link
                to="/checkout"
                className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mb-4"
              >
                Procéder au paiement
              </Link>

              <Link
                to="/products"
                className="block w-full text-center text-teal-600 hover:text-teal-700 font-medium"
              >
                Continuer vos achats
              </Link>
            </div>
          </div>
        </div>

        {/* Upsell Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="text-teal-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Produits recommandés pour vous</h2>
              </div>
              <p className="text-gray-600 mb-8">Basé sur les articles de votre panier, ces produits pourraient vous intéresser</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-teal-200">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Badge promo si applicable */}
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -15%
                        </div>
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-teal-600 transition-colors line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description || "Produit de qualité professionnelle pour vos besoins de signalétique."}
                      </p>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.2)</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          {product.priceTTC ? (
                            <>
                              <span className="text-sm text-gray-500">
                                {(product.priceTTC / 1.2).toFixed(2)}€ HT
                              </span>
                              <span className="text-2xl font-bold text-teal-600">
                                {product.priceTTC.toFixed(2)}€ TTC
                              </span>
                            </>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-teal-600">
                                {product.price}€
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {(product.price * 1.18).toFixed(2)}€
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => addToCart({ ...product, quantity: 1 })}
                          className="relative overflow-hidden p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Free Shipping Upsell */}
        {getCartTotal() < 300 && getCartTotal() > 200 && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-yellow-800 mb-2">
                    🚚 Plus que {(300 - getCartTotal()).toFixed(2)}€ pour la livraison gratuite !
                  </h3>
                  <p className="text-yellow-700">
                    Ajoutez un produit de cette sélection pour bénéficier de la livraison gratuite
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-800">
                    -{(300 - getCartTotal()).toFixed(2)}€
                  </div>
                  <div className="text-sm text-yellow-600">pour 15€ d'économie</div>
                </div>
              </div>
              
              {/* Produits pour atteindre la livraison gratuite */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(p => {
                    const price = p.priceTTC || p.price;
                    const remaining = 300 - getCartTotal();
                    return price <= remaining + 50 && price >= remaining - 20 && !cartItems.find(item => item.id === p.id);
                  })
                  .slice(0, 3)
                  .map((product) => (
                    <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-200 hover:border-yellow-300">
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Badge promo */}
                          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Livraison gratuite
                          </div>
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </Link>
                      
                      <div className="p-6">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold text-lg mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {product.description || "Produit de qualité professionnelle pour vos besoins de signalétique."}
                        </p>
                        
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">(4.2)</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {product.priceTTC ? (
                              <>
                                <span className="text-sm text-gray-500">
                                  {(product.priceTTC / 1.2).toFixed(2)}€ HT
                                </span>
                                <span className="text-2xl font-bold text-yellow-600">
                                  {product.priceTTC.toFixed(2)}€ TTC
                                </span>
                              </>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-yellow-600">
                                  {product.price}€
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {(product.price * 1.18).toFixed(2)}€
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => addToCart({ ...product, quantity: 1 })}
                            className="relative overflow-hidden p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 bg-yellow-600 text-white hover:bg-yellow-700 hover:shadow-lg"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;