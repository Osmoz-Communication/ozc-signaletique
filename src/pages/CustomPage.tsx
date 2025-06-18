import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Palette, Ruler, Zap, Shield, Building, Car, Accessibility } from 'lucide-react';

const CustomPage = () => {
  const navigate = useNavigate();

  const customCategories = [
    {
      id: 'panneaux-securite',
      title: 'Panneaux de Sécurité',
      description: 'Personnalisez vos panneaux de sécurité selon vos besoins spécifiques',
      icon: Shield,
      image: 'https://images.pexels.com/photos/4917727/pexels-photo-4917727.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Texte personnalisé', 'Couleurs au choix', 'Formats variés', 'Matériaux résistants'],
      color: 'bg-red-500'
    },
    {
      id: 'signaletique-interieure',
      title: 'Signalétique Intérieure',
      description: 'Créez une signalétique intérieure adaptée à votre environnement',
      icon: Building,
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Fléchage directionnel', 'Identification des locaux', 'Numérotation', 'Design cohérent'],
      color: 'bg-blue-500'
    },
    {
      id: 'enseignes-exterieures',
      title: 'Enseignes Extérieures',
      description: 'Concevez des enseignes extérieures qui marquent votre identité',
      icon: Zap,
      image: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Éclairage LED', 'Résistant aux intempéries', 'Grande visibilité', 'Installation incluse'],
      color: 'bg-yellow-500'
    },
    {
      id: 'marquage-sol',
      title: 'Marquage au Sol',
      description: 'Solutions de marquage au sol pour organiser vos espaces',
      icon: Car,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Peinture durable', 'Adhésifs antidérapants', 'Zones de stationnement', 'Passages piétons'],
      color: 'bg-green-500'
    },
    {
      id: 'accessibilite',
      title: 'Accessibilité PMR',
      description: 'Signalétique adaptée aux personnes à mobilité réduite',
      icon: Accessibility,
      image: 'https://images.pexels.com/photos/7670998/pexels-photo-7670998.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Braille intégré', 'Contraste élevé', 'Hauteur adaptée', 'Normes PMR'],
      color: 'bg-purple-500'
    },
    {
      id: 'plaques-gravees',
      title: 'Plaques Gravées',
      description: 'Plaques personnalisées gravées avec précision',
      icon: Palette,
      image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Gravure laser', 'Matériaux nobles', 'Texte personnalisé', 'Logos possibles'],
      color: 'bg-indigo-500'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/custom/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Solutions Sur-Mesure</h1>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Créez des solutions de signalétique parfaitement adaptées à vos besoins. 
              Notre équipe d'experts vous accompagne dans la conception et la réalisation de vos projets.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-teal-700 px-4 py-2 rounded-full">
                <Ruler size={16} />
                <span>Dimensions personnalisées</span>
              </div>
              <div className="flex items-center space-x-2 bg-teal-700 px-4 py-2 rounded-full">
                <Palette size={16} />
                <span>Couleurs au choix</span>
              </div>
              <div className="flex items-center space-x-2 bg-teal-700 px-4 py-2 rounded-full">
                <Zap size={16} />
                <span>Fabrication rapide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez votre type de signalétique</h2>
          <p className="text-gray-600 text-lg">
            Sélectionnez la catégorie qui correspond à votre projet pour accéder aux options de personnalisation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 left-4 w-12 h-12 ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 font-medium">Personnaliser</span>
                    <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre processus de création</h2>
            <p className="text-gray-600 text-lg">
              Un accompagnement personnalisé de la conception à l'installation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conception</h3>
              <p className="text-gray-600">Définition de vos besoins et création du design personnalisé</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Validation</h3>
              <p className="text-gray-600">Présentation du projet et ajustements selon vos retours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fabrication</h3>
              <p className="text-gray-600">Production avec des matériaux de qualité professionnelle</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation</h3>
              <p className="text-gray-600">Pose professionnelle et mise en service de votre signalétique</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour votre projet ?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Nos experts sont là pour vous conseiller et vous accompagner dans la réalisation de votre signalétique sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                Demander un devis gratuit
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPage; 