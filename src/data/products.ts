import { Product } from '../types';

export const products: Product[] = [
  // Signalisation de sécurité - Sécurité Incendie
  {
    id: '1',
    name: 'Panneau Sortie de Secours LED',
    description: 'Panneau de signalisation sortie de secours avec pictogramme luminescent et éclairage LED intégré conforme aux normes ISO',
    price: 45.90,
    priceHT: 38.25,
    priceTTC: 45.90,
    sku: 'SEC-LED-001',
    category: 'signalisation-securite',
    subcategory: 'securite-incendie',
    image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Panneau Extincteur CO2',
    description: 'Panneau de signalisation extincteur CO2 avec pictogramme et texte multilingue',
    price: 18.50,
    priceHT: 15.42,
    priceTTC: 18.50,
    sku: 'EXT-CO2-002',
    category: 'signalisation-securite',
    subcategory: 'securite-incendie',
    image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Panneau Point de Rassemblement',
    description: 'Panneau point de rassemblement évacuation avec symbole et numérotation',
    price: 32.80,
    priceHT: 27.33,
    priceTTC: 32.80,
    sku: 'RAS-EVA-003',
    category: 'signalisation-securite',
    subcategory: 'securite-incendie',
    image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Panneau Alarme Incendie',
    description: 'Panneau de signalisation alarme incendie avec bouton poussoir',
    price: 24.90,
    priceHT: 20.75,
    priceTTC: 24.90,
    sku: 'ALR-INC-004',
    category: 'signalisation-securite',
    subcategory: 'securite-incendie',
    image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Panneau Premiers Secours',
    description: 'Panneau de signalisation premiers secours avec croix verte réfléchissante',
    price: 22.30,
    priceHT: 18.58,
    priceTTC: 22.30,
    sku: 'SEC-MED-005',
    category: 'signalisation-securite',
    subcategory: 'securite-incendie',
    image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalisation de sécurité - Panneaux d'interdiction
  {
    id: '6',
    name: 'Panneau Interdiction de Fumer',
    description: 'Panneau d\'interdiction de fumer en PVC rigide, résistant aux UV et intempéries',
    price: 12.50,
    priceHT: 10.42,
    priceTTC: 12.50,
    sku: 'INT-FUM-006',
    category: 'signalisation-securite',
    subcategory: 'panneaux-interdiction',
    image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    name: 'Panneau Accès Interdit',
    description: 'Panneau d\'interdiction accès interdit au personnel non autorisé',
    price: 15.90,
    priceHT: 13.25,
    priceTTC: 15.90,
    category: 'signalisation-securite',
    subcategory: 'panneaux-interdiction',
    image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    name: 'Panneau Interdiction de Téléphoner',
    description: 'Panneau interdiction d\'utiliser un téléphone portable',
    price: 13.75,
    priceHT: 11.46,
    priceTTC: 13.75,
    category: 'signalisation-securite',
    subcategory: 'panneaux-interdiction',
    image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '9',
    name: 'Panneau Défense d\'Entrer',
    description: 'Panneau d\'interdiction défense d\'entrer zone privée',
    price: 17.85,
    priceHT: 14.88,
    priceTTC: 17.85,
    category: 'signalisation-securite',
    subcategory: 'panneaux-interdiction',
    image: 'https://images.pexels.com/photos/4919730/pexels-photo-4919730.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalisation de sécurité - Panneaux de danger
  {
    id: '10',
    name: 'Panneau Danger Électrique',
    description: 'Panneau de danger électrique haute tension avec symbole universel de danger',
    price: 18.75,
    priceHT: 15.63,
    priceTTC: 18.75,
    category: 'signalisation-securite',
    subcategory: 'panneaux-danger',
    image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '11',
    name: 'Panneau Matières Toxiques',
    description: 'Panneau de danger matières toxiques avec pictogramme tête de mort',
    price: 21.40,
    priceHT: 17.83,
    priceTTC: 21.40,
    category: 'signalisation-securite',
    subcategory: 'panneaux-danger',
    image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '12',
    name: 'Panneau Rayonnements Ionisants',
    description: 'Panneau de danger rayonnements ionisants avec symbole radioactif',
    price: 28.60,
    priceHT: 23.83,
    priceTTC: 28.60,
    category: 'signalisation-securite',
    subcategory: 'panneaux-danger',
    image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '13',
    name: 'Panneau Attention Chute',
    description: 'Panneau de danger attention risque de chute avec pictogramme',
    price: 16.90,
    priceHT: 14.08,
    priceTTC: 16.90,
    category: 'signalisation-securite',
    subcategory: 'panneaux-danger',
    image: 'https://images.pexels.com/photos/4919731/pexels-photo-4919731.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalisation de sécurité - EPI Obligatoire
  {
    id: '14',
    name: 'Panneau Casque Obligatoire',
    description: 'Panneau EPI casque de protection obligatoire',
    price: 14.20,
    priceHT: 11.83,
    priceTTC: 14.20,
    category: 'signalisation-securite',
    subcategory: 'epi-obligatoire',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '15',
    name: 'Panneau Lunettes Obligatoires',
    description: 'Panneau EPI lunettes de protection obligatoires',
    price: 13.80,
    priceHT: 11.50,
    priceTTC: 13.80,
    category: 'signalisation-securite',
    subcategory: 'epi-obligatoire',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '16',
    name: 'Panneau Gants Obligatoires',
    description: 'Panneau EPI gants de protection obligatoires',
    price: 12.90,
    priceHT: 10.75,
    priceTTC: 12.90,
    category: 'signalisation-securite',
    subcategory: 'epi-obligatoire',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '17',
    name: 'Panneau Chaussures Sécurité',
    description: 'Panneau EPI chaussures de sécurité obligatoires',
    price: 15.50,
    priceHT: 12.92,
    priceTTC: 15.50,
    category: 'signalisation-securite',
    subcategory: 'epi-obligatoire',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalétique interne - Orientation & Wayfinding
  {
    id: '18',
    name: 'Panneau Fléchage Directionnel',
    description: 'Panneau directionnel avec flèche personnalisable pour orientation',
    price: 19.90,
    priceHT: 16.58,
    priceTTC: 19.90,
    category: 'signaletique-interne',
    subcategory: 'orientation-wayfinding',
    image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '19',
    name: 'Plan de Bâtiment Vous Êtes Ici',
    description: 'Plan de bâtiment avec indication "Vous êtes ici" et itinéraires',
    price: 85.00,
    priceHT: 70.83,
    priceTTC: 85.00,
    category: 'signaletique-interne',
    subcategory: 'orientation-wayfinding',
    image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '20',
    name: 'Panneau Numérotation Étage',
    description: 'Panneau de numérotation d\'étage avec chiffres relief',
    price: 32.50,
    priceHT: 27.08,
    priceTTC: 32.50,
    category: 'signaletique-interne',
    subcategory: 'orientation-wayfinding',
    image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalétique interne - Identification des locaux
  {
    id: '21',
    name: 'Plaque de Porte Bureau',
    description: 'Plaque de porte en aluminium brossé avec gravure laser',
    price: 28.90,
    priceHT: 24.08,
    priceTTC: 28.90,
    category: 'signaletique-interne',
    subcategory: 'identification-locaux',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '22',
    name: 'Pictogramme WC Hommes',
    description: 'Pictogramme toilettes hommes en relief avec braille',
    price: 16.50,
    priceHT: 13.75,
    priceTTC: 16.50,
    category: 'signaletique-interne',
    subcategory: 'identification-locaux',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '23',
    name: 'Pictogramme WC Femmes',
    description: 'Pictogramme toilettes femmes en relief avec braille',
    price: 16.50,
    priceHT: 13.75,
    priceTTC: 16.50,
    category: 'signaletique-interne',
    subcategory: 'identification-locaux',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '24',
    name: 'Panneau Salle de Réunion',
    description: 'Panneau salle de réunion avec porte-document amovible',
    price: 45.80,
    priceHT: 38.17,
    priceTTC: 45.80,
    category: 'signaletique-interne',
    subcategory: 'identification-locaux',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalétique interne - Information générale
  {
    id: '25',
    name: 'Panneau d\'Affichage Mural',
    description: 'Panneau d\'affichage mural avec cadre aluminium et fond liège',
    price: 125.00,
    priceHT: 104.17,
    priceTTC: 125.00,
    category: 'signaletique-interne',
    subcategory: 'information-generale',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '26',
    name: 'Panneau Consignes de Sécurité',
    description: 'Panneau consignes de sécurité personnalisables selon votre établissement',
    price: 38.90,
    priceHT: 32.42,
    priceTTC: 38.90,
    category: 'signaletique-interne',
    subcategory: 'information-generale',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalétique externe - Enseignes & Façades
  {
    id: '27',
    name: 'Enseigne Lumineuse LED',
    description: 'Enseigne lumineuse LED personnalisable pour façade commerciale',
    price: 450.00,
    priceHT: 375.00,
    priceTTC: 450.00,
    category: 'signaletique-externe',
    subcategory: 'enseignes-facades',
    image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '28',
    name: 'Lettres Découpées Inox',
    description: 'Lettres découpées en acier inoxydable pour enseigne de prestige',
    price: 85.00,
    priceHT: 70.83,
    priceTTC: 85.00,
    category: 'signaletique-externe',
    subcategory: 'enseignes-facades',
    image: 'https://images.pexels.com/photos/4792503/pexels-photo-4792503.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalétique externe - Parking & Circulation
  {
    id: '29',
    name: 'Marquage au Sol Place Handicapé',
    description: 'Kit de marquage au sol pour place de parking handicapé',
    price: 65.00,
    priceHT: 54.17,
    priceTTC: 65.00,
    category: 'signaletique-externe',
    subcategory: 'parking-circulation',
    image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '30',
    name: 'Panneau Parking Privé',
    description: 'Panneau parking privé défense de stationner',
    price: 24.90,
    priceHT: 20.75,
    priceTTC: 24.90,
    category: 'signaletique-externe',
    subcategory: 'parking-circulation',
    image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Signalétique externe - Identification
  {
    id: '31',
    name: 'Plaque Professionnelle Gravée',
    description: 'Plaque professionnelle en aluminium avec gravure laser de qualité',
    price: 75.00,
    priceHT: 62.50,
    priceTTC: 75.00,
    category: 'signaletique-externe',
    subcategory: 'identification',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '32',
    name: 'Numéro de Rue Design',
    description: 'Numéro de rue moderne en acier inoxydable avec éclairage LED',
    price: 95.00,
    priceHT: 79.17,
    priceTTC: 95.00,
    category: 'signaletique-externe',
    subcategory: 'identification',
    image: 'https://images.pexels.com/photos/4425961/pexels-photo-4425961.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Accessibilité - PMR & Handicap
  {
    id: '33',
    name: 'Pictogramme PMR Relief',
    description: 'Pictogramme personne à mobilité réduite en relief avec braille',
    price: 22.50,
    priceHT: 18.75,
    priceTTC: 22.50,
    category: 'accessibilite',
    subcategory: 'pmr-handicap',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '34',
    name: 'Bande Podotactile Adhésive',
    description: 'Bande podotactile d\'éveil à la vigilance adhésive',
    price: 35.80,
    priceHT: 29.83,
    priceTTC: 35.80,
    category: 'accessibilite',
    subcategory: 'pmr-handicap',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // Accessibilité - Signalisation tactile
  {
    id: '35',
    name: 'Plaque Braille Personnalisée',
    description: 'Plaque avec texte en braille et relief pour malvoyants',
    price: 45.00,
    priceHT: 37.50,
    priceTTC: 45.00,
    category: 'accessibilite',
    subcategory: 'signalisation-tactile',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '36',
    name: 'Main Courante Tactile',
    description: 'Main courante avec signalisation tactile pour escaliers',
    price: 125.00,
    priceHT: 104.17,
    priceTTC: 125.00,
    category: 'accessibilite',
    subcategory: 'signalisation-tactile',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];