import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Download } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-10 h-10 bg-ozc-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OZC</span>
              </div>
              <div>
                <div className="font-bold text-lg">OZC</div>
                <div className="text-sm text-ozc-400">SIGNALÉTIQUE</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Spécialiste de la signalétique industrielle et de sécurité depuis plus de 20 ans.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/osmozcom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ozc-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/osmozcom/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ozc-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/osmoz-com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ozc-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nos Produits</h3>
            <ul className="space-y-2">
              <li><Link to="/products/signaletique-interne" className="text-gray-300 hover:text-ozc-400 transition-colors">Signalétique interne</Link></li>
              <li><Link to="/products/signaletique-externe" className="text-gray-300 hover:text-ozc-400 transition-colors">Signalétique externe</Link></li>
              <li><Link to="/products/signalisation-securite" className="text-gray-300 hover:text-ozc-400 transition-colors">Signalisation de sécurité</Link></li>
              <li><Link to="/products/accessibilite" className="text-gray-300 hover:text-ozc-400 transition-colors">Accessibilité</Link></li>
              <li><Link to="/catalogues" className="text-gray-300 hover:text-ozc-400 transition-colors">Nos catalogues</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-ozc-400 transition-colors">Demander un devis</Link></li>
              <li><Link to="/account/orders" className="text-gray-300 hover:text-ozc-400 transition-colors">Suivre ma commande</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-ozc-400 transition-colors">Retours & échanges</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-ozc-400 transition-colors">Centre d'aide</Link></li>
              <li><Link to="/custom" className="text-gray-300 hover:text-ozc-400 transition-colors">Personnalisation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone size={16} className="text-ozc-400" />
                <span className="text-gray-300">01.84.19.01.04</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail size={16} className="text-ozc-400" />
                <span className="text-gray-300">info@ozc-signaletique.fr</span>
              </div>
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <MapPin size={16} className="text-ozc-400 mt-1" />
                <span className="text-gray-300">
                  36 rue Bertrand Flornoy<br />
                  77120 Coulommiers, France
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} OZC Signalétique. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 mt-4 md:mt-0">
              <Link to="/legal" className="text-gray-400 hover:text-ozc-400 text-sm transition-colors">
                Mentions légales
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-ozc-400 text-sm transition-colors">
                CGV
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-ozc-400 text-sm transition-colors">
                Confidentialité
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-ozc-400 text-sm transition-colors">
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