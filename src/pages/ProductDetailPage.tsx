import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, Star, Truck, Shield, Heart, Minus, Plus, Package, ShoppingCart, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
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
    showToast(`${product.name} ajouté au panier !`, 'success');
  };

  const handleAddPackToCart = () => {
    // Ajouter le produit principal
    addToCart({ ...product, quantity: 1 });
    
    // Ajouter les produits complémentaires du pack
    relatedProducts.slice(0, 2).forEach(relatedProduct => {
      addToCart({ ...relatedProduct, quantity: 1 });
    });
    
    showToast('Pack complet ajouté au panier !', 'success');
  };

  const handleAddRelatedToCart = (relatedProduct: any) => {
    addToCart({ ...relatedProduct, quantity: 1 });
    showToast(`${relatedProduct.name} ajouté au panier !`, 'success');
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">{product.name}</h1>
              {product.sku && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Référence :</span>
                  <span className="text-sm font-mono bg-teal-50 text-teal-700 px-3 py-1 rounded-lg font-semibold">
                    {product.sku}
                  </span>
                </div>
              )}
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
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Description détaillée</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    {/* Description détaillée basée sur la catégorie */}
                    {product.category === 'signalisation-securite' && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Ce panneau de signalisation de sécurité est conçu pour répondre aux normes les plus strictes en matière de sécurité incendie et d'évacuation. Fabriqué avec des matériaux haute qualité, il garantit une visibilité optimale même dans des conditions de faible luminosité.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          <strong>Caractéristiques principales :</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                          <li>Matériau PVC rigide résistant aux UV et aux intempéries</li>
                          <li>Pictogrammes conformes aux normes ISO 3864 et EN ISO 7010</li>
                          <li>Couleurs vives et durables pour une visibilité maximale</li>
                          <li>Installation facile par fixation murale ou suspension</li>
                          <li>Résistant aux produits chimiques et aux variations de température</li>
                        </ul>
                      </>
                    )}
                    
                    {product.category === 'signaletique-interne' && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Cette signalétique interne professionnelle apporte une solution élégante et efficace pour l'orientation et l'identification dans vos locaux. Conçue pour s'intégrer harmonieusement dans tous types d'environnements professionnels.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          <strong>Avantages :</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                          <li>Design moderne et professionnel</li>
                          <li>Matériaux nobles : aluminium brossé, plexiglas, acier inoxydable</li>
                          <li>Personnalisation possible selon vos besoins</li>
                          <li>Installation rapide et discrète</li>
                          <li>Entretien minimal grâce aux matériaux de qualité</li>
                        </ul>
                      </>
                    )}
                    
                    {product.category === 'signaletique-externe' && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Cette signalétique externe est spécialement conçue pour résister aux conditions extérieures les plus difficiles tout en maintenant une excellente visibilité et un aspect professionnel durable dans le temps.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          <strong>Résistance exceptionnelle :</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                          <li>Protection UV intégrée contre la décoloration</li>
                          <li>Résistance aux intempéries (pluie, neige, grêle)</li>
                          <li>Matériaux anti-corrosion pour une longévité maximale</li>
                          <li>Fixations renforcées pour résister aux vents forts</li>
                          <li>Garantie 5 ans contre les défauts de fabrication</li>
                        </ul>
                      </>
                    )}
                    
                    {product.category === 'accessibilite' && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Cette signalétique d'accessibilité respecte scrupuleusement les normes en vigueur pour l'accueil des personnes à mobilité réduite. Elle contribue à créer un environnement inclusif et accessible à tous.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          <strong>Conformité réglementaire :</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                          <li>Conforme aux normes d'accessibilité PMR</li>
                          <li>Contraste élevé pour les personnes malvoyantes</li>
                          <li>Braille intégré pour les personnes non-voyantes</li>
                          <li>Hauteur d'installation optimisée</li>
                          <li>Pictogrammes universels reconnus</li>
                        </ul>
                      </>
                    )}
                    
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-teal-800 mb-2">Installation et maintenance</h4>
                      <p className="text-teal-700 text-sm">
                        Les fixations sont disponibles en supplément selon vos besoins spécifiques. 
                        Pour les installations complexes, notre équipe technique peut vous accompagner sur site.
                      </p>
                    </div>
                  </div>
                </div>
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

        {/* Upsell Section - Pack Premium */}
        <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-teal-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Pack Professionnel</h2>
            <p className="text-gray-600 text-lg">Ensemble complet pour une solution optimale</p>
          </div>
          
          {/* Pack Preview */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
              {/* Produit principal */}
              <div className="relative">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full absolute -top-2 -right-2 z-10">
                  Principal
                </div>
                <div className="bg-teal-50 rounded-xl p-4 border-2 border-teal-200">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg mx-auto mb-3" />
                  <h3 className="font-semibold text-sm text-center mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-teal-600 font-bold text-center">
                    {product.priceTTC ? `${product.priceTTC.toFixed(2)}€` : `${product.price}€`}
                  </p>
                </div>
              </div>

              {/* Produits complémentaires */}
              {relatedProducts.slice(0, 2).map((relatedProduct, index) => (
                <div key={relatedProduct.id} className="relative">
                  <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full absolute -top-2 -right-2 z-10">
                    +{index + 1}
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 hover:border-blue-300 transition-colors">
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="w-20 h-20 object-cover rounded-lg mx-auto mb-3" />
                    <h4 className="font-medium text-sm text-center mb-2 line-clamp-2">{relatedProduct.name}</h4>
                    <p className="text-blue-600 font-bold text-center text-sm">
                      {relatedProduct.priceTTC ? `${relatedProduct.priceTTC.toFixed(2)}€` : `${relatedProduct.price}€`}
                    </p>
                    <button 
                      onClick={() => handleAddRelatedToCart(relatedProduct)}
                      className="w-full mt-2 bg-blue-600 text-white py-1 px-2 rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShoppingCart size={12} />
                      <span>Ajouter seul</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Bonus gratuit */}
              <div className="relative">
                <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full absolute -top-2 -right-2 z-10">
                  Gratuit
                </div>
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-medium text-sm text-center mb-2">Kit de fixation</h4>
                  <p className="text-green-600 font-bold text-center text-sm">Offert</p>
                  <p className="text-xs text-gray-500 text-center mt-1">Valeur 15€</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pack Pricing */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gradient-to-r from-teal-200 to-blue-200">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">Pack Complet</h3>
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                    -15% ÉCONOMIE
                  </span>
                </div>
                <p className="text-gray-600">3 produits + kit de fixation gratuit</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm text-gray-500 line-through">
                    {(Number(product.priceTTC || product.price) + 
                      relatedProducts.slice(0, 2).reduce((sum, p) => sum + Number(p.priceTTC || p.price), 0) + 15).toFixed(2)}€
                  </span>
                  <span className="text-xs text-gray-500">Prix séparé</span>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {((Number(product.priceTTC || product.price) + 
                    relatedProducts.slice(0, 2).reduce((sum, p) => sum + Number(p.priceTTC || p.price), 0)) * 0.85).toFixed(2)}€
                </div>
                <button 
                  onClick={handleAddPackToCart}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-8 rounded-xl font-bold hover:from-teal-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <Package size={20} />
                  <span>Ajouter le pack au panier</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">Vous économisez {((Number(product.priceTTC || product.price) + 
                  relatedProducts.slice(0, 2).reduce((sum, p) => sum + Number(p.priceTTC || p.price), 0) + 15) * 0.15).toFixed(2)}€</p>
              </div>
            </div>
          </div>

          {/* Pack Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Solution complète</h4>
              <p className="text-sm text-gray-600">Tout ce dont vous avez besoin en un seul achat</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Kit de fixation offert</h4>
              <p className="text-sm text-gray-600">Installation facilitée avec le matériel inclus</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">15%</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Économie garantie</h4>
              <p className="text-sm text-gray-600">Prix réduit par rapport à l'achat séparé</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-teal-600 font-bold">
                        {relatedProduct.priceTTC ? `${relatedProduct.priceTTC.toFixed(2)}€` : `${relatedProduct.price}€`}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({ ...relatedProduct, quantity: 1 });
                        }}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;