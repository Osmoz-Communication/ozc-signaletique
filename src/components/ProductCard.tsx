import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    
    // Animation de feedback
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
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
        <div className="mb-3">
          <span className="text-xs text-teal-600 font-bold uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        
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
    </div>
  );
};

export default ProductCard;