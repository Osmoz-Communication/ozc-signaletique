import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check, Star, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState('PVC');
  const [selectedSize, setSelectedSize] = useState('A4');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptionsModal(true);
  };

  const handleDirectAddToCart = () => {
    const productWithOptions = {
      ...product,
      quantity: selectedQuantity,
      selectedMaterial,
      selectedSize,
      selectedOptions
    };
    
    addToCart(productWithOptions);
    
    // Toast notification
    showToast(`${product.name} ajouté au panier !`, 'success');
    
    // Animation de feedback
    setIsAddedToCart(true);
    setShowOptionsModal(false);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    // Toast notification
    if (!isWishlisted) {
      showToast(`${product.name} ajouté aux favoris !`, 'success');
    } else {
      showToast(`${product.name} retiré des favoris`, 'info');
    }
  };

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const calculateTotalPrice = () => {
    let basePrice = product.price;
    let optionsPrice = 0;
    
    // Prix des options
    selectedOptions.forEach(option => {
      switch(option) {
        case 'Troué': optionsPrice += 3.50; break;
        case 'Coins arrondis': optionsPrice += 2.00; break;
        case 'Découpe laser': optionsPrice += 8.00; break;
        case 'Gravure laser': optionsPrice += 12.00; break;
        case 'Impression UV': optionsPrice += 15.00; break;
        default: optionsPrice += 0;
      }
    });

    // Multiplicateur matériau
    let materialMultiplier = 1;
    switch(selectedMaterial) {
      case 'Aluminium': materialMultiplier = 1.8; break;
      case 'Inox': materialMultiplier = 2.5; break;
      case 'Laiton': materialMultiplier = 2.2; break;
      case 'Plexiglas': materialMultiplier = 1.6; break;
      default: materialMultiplier = 1;
    }

    const priceHT = (basePrice * materialMultiplier + optionsPrice) * selectedQuantity;
    const priceTTC = priceHT * 1.2; // TVA 20%
    
    return { priceHT, priceTTC };
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-teal-200">
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
          
          {/* Bouton wishlist */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
              }`}
            >
              <Heart 
                size={16} 
                className={isWishlisted ? 'fill-current' : ''} 
              />
            </button>
          </div>
          

        </div>
      </Link>
      
      <div className="p-6">
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg mb-3 group-hover:text-teal-600 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        

        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.priceHT && product.priceTTC ? (
              <>
                <span className="text-sm text-gray-500">
                  {product.priceHT.toFixed(2)}€ HT
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
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`relative overflow-hidden p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
              isAddedToCart
                ? 'bg-green-500 text-white'
                : 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg'
            }`}
          >
            <div className={`flex items-center transition-all duration-300 ${isAddedToCart ? 'scale-0' : 'scale-100'}`}>
              <ShoppingCart size={18} />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isAddedToCart ? 'scale-100' : 'scale-0'}`}>
              <Check size={18} />
            </div>
          </button>
        </div>
        
        {/* Feedback message */}
        {isAddedToCart && (
          <div className="mt-3 text-center">
            <span className="text-sm text-green-600 font-medium animate-pulse">
              ✓ Ajouté au panier
            </span>
          </div>
        )}
      </div>

      {/* Modal Options */}
      {showOptionsModal && createPortal(
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowOptionsModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Personnaliser le produit</h3>
                <button
                  onClick={() => setShowOptionsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex items-start space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                </div>
              </div>

              {/* Main Content - Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                        {selectedQuantity}
                      </span>
                      <button
                        onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Matériau</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['PVC', 'Aluminium', 'Inox', 'Laiton', 'Plexiglas'].map((material) => (
                        <button
                          key={material}
                          onClick={() => setSelectedMaterial(material)}
                          className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                            selectedMaterial === material
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dimension</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['A6', 'A5', 'A4', 'A3', '15x15cm', '20x20cm', '30x30cm', 'Sur mesure'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Options supplémentaires</label>
                    <div className="space-y-2">
                      {[
                        { name: 'Troué', price: 3.50 },
                        { name: 'Coins arrondis', price: 2.00 },
                        { name: 'Découpe laser', price: 8.00 },
                        { name: 'Gravure laser', price: 12.00 },
                        { name: 'Impression UV', price: 15.00 }
                      ].map((option) => (
                        <label key={option.name} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(option.name)}
                            onChange={() => handleOptionToggle(option.name)}
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          <span className="flex-1 text-sm font-medium text-gray-700">{option.name}</span>
                          <span className="text-sm text-teal-600 font-semibold">+{option.price.toFixed(2)}€</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="bg-teal-50 p-4 rounded-xl">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Prix HT</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {calculateTotalPrice().priceHT.toFixed(2)}€
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-teal-200 pt-2">
                        <span className="text-lg font-semibold text-gray-900">Prix TTC</span>
                        <span className="text-2xl font-bold text-teal-600">
                          {calculateTotalPrice().priceTTC.toFixed(2)}€
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {selectedQuantity} × {selectedMaterial} {selectedSize}
                      {selectedOptions.length > 0 && ` + ${selectedOptions.length} option(s)`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowOptionsModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDirectAddToCart}
                  className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={18} />
                  <span>Ajouter au panier</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProductCard;