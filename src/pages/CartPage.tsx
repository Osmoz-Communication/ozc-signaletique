import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, addToCart } = useCart();

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
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{getCartTotal().toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-green-600">
                    {getCartTotal() >= 300 ? 'Gratuite' : '15.00€'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>{(getCartTotal() * 0.2).toFixed(2)}€</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{(getCartTotal() + (getCartTotal() >= 300 ? 0 : 15) + getCartTotal() * 0.2).toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {getCartTotal() < 300 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    Ajoutez {(300 - getCartTotal()).toFixed(2)}€ pour bénéficier de la livraison gratuite
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
                  <div key={product.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    </Link>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(4.2)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-teal-600 font-bold text-sm">
                        {product.priceTTC ? `${product.priceTTC.toFixed(2)}€` : `${product.price}€`}
                      </p>
                      <button
                        onClick={() => addToCart({ ...product, quantity: 1 })}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700 transition-colors"
                      >
                        Ajouter
                      </button>
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
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter(p => {
                    const price = p.priceTTC || p.price;
                    const remaining = 300 - getCartTotal();
                    return price <= remaining + 50 && price >= remaining - 20 && !cartItems.find(item => item.id === p.id);
                  })
                  .slice(0, 3)
                  .map((product) => (
                    <div key={product.id} className="bg-white rounded-lg p-4 border border-yellow-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-700 font-bold text-sm">
                          {product.priceTTC ? `${product.priceTTC.toFixed(2)}€` : `${product.price}€`}
                        </span>
                        <button
                          onClick={() => addToCart({ ...product, quantity: 1 })}
                          className="bg-yellow-600 text-white px-2 py-1 rounded text-xs hover:bg-yellow-700 transition-colors"
                        >
                          Ajouter
                        </button>
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