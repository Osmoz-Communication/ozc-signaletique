import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OZC</span>
              </div>
              <div>
                <div className="font-bold text-lg">OZC</div>
                <div className="text-sm text-teal-400">SIGNALÉTIQUE</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Spécialiste de la signalétique industrielle et de sécurité depuis plus de 20 ans.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nos Produits</h3>
            <ul className="space-y-2">
              <li><Link to="/products/signalétique-interne" className="text-gray-300 hover:text-teal-400 transition-colors">Signalétique interne</Link></li>
              <li><Link to="/products/signalétique-externe" className="text-gray-300 hover:text-teal-400 transition-colors">Signalétique externe</Link></li>
              <li><Link to="/products/signalisation-sécurité" className="text-gray-300 hover:text-teal-400 transition-colors">Signalisation de sécurité</Link></li>
              <li><Link to="/products/identification" className="text-gray-300 hover:text-teal-400 transition-colors">Identification</Link></li>
              <li><Link to="/products/accessibilité" className="text-gray-300 hover:text-teal-400 transition-colors">Accessibilité</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-teal-400 transition-colors">Contactez-nous</Link></li>
              <li><Link to="/account/orders" className="text-gray-300 hover:text-teal-400 transition-colors">Suivre ma commande</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-teal-400 transition-colors">Retours & échanges</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-teal-400 transition-colors">Centre d'aide</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-teal-400 transition-colors">Livraison</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-teal-400" />
                <span className="text-gray-300">01.84.19.01.04</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-teal-400" />
                <span className="text-gray-300">info@ozc-signaletique.fr</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-teal-400 mt-1" />
                <span className="text-gray-300">
                  36 rue Bertrand Flornoy<br />
                  77120 Coulommiers, France
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 OZC Signalétique. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <Link to="/legal" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Mentions légales
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                CGV
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Confidentialité
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;