import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, Star, Truck, Shield, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Link to="/products" className="text-teal-600 hover:text-teal-700">
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-teal-600">
                Accueil
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronDown className="rotate-[-90deg] w-5 h-5 text-gray-400" />
                <Link to="/products" className="ml-1 text-gray-700 hover:text-teal-600 md:ml-2">
                  Produits
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronDown className="rotate-[-90deg] w-5 h-5 text-gray-400" />
                <span className="ml-1 text-gray-500 md:ml-2">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} ${i}`}
                    className="w-full h-20 object-cover cursor-pointer hover:opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-teal-600 font-medium">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">(24 avis)</span>
              </div>
            </div>

            <div className="mb-8">
              {product.priceHT && product.priceTTC ? (
                <div className="space-y-1">
                  <div className="text-lg text-gray-600">
                    {product.priceHT.toFixed(2)}€ HT
                  </div>
                  <div className="text-4xl font-bold text-teal-600">
                    {product.priceTTC.toFixed(2)}€ TTC
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-4xl font-bold text-teal-600">{product.price}€</span>
                  <span className="text-sm text-gray-500 ml-2">TTC</span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-8">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-teal-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Ajouter au panier
              </button>

              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-3">
                <Truck className="text-teal-600" size={20} />
                <span className="text-sm">Livraison gratuite à partir de 300€</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-teal-600" size={20} />
                <span className="text-sm">Garantie 2 ans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'description' && 'Description'}
                  {tab === 'specifications' && 'Spécifications'}
                  {tab === 'reviews' && 'Avis clients'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'description' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Description détaillée</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                  commodo consequat.
                </p>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Spécifications techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Matériau:</span>
                      <span className="font-medium">PVC rigide</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium">200 x 300 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Épaisseur:</span>
                      <span className="font-medium">3 mm</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Résistance:</span>
                      <span className="font-medium">UV et intempéries</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Installation:</span>
                      <span className="font-medium">Fixation murale</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Norme:</span>
                      <span className="font-medium">ISO 3864</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Avis clients (24)</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${j < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">Jean D.</span>
                        <span className="text-gray-500 text-sm">12 mars 2024</span>
                      </div>
                      <p className="text-gray-700">
                        Excellent produit, très bonne qualité. Installation facile et rendu professionnel.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-teal-600 font-bold">{relatedProduct.price}€</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;