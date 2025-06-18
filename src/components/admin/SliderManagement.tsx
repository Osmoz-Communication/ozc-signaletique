import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye, FaEyeSlash, FaGripVertical } from 'react-icons/fa';

interface SlideData {
  id: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  primaryButton: { text: string; link: string };
  secondaryButton: { text: string; link: string };
  backgroundGradient: string;
  backgroundImage?: string;
  active: boolean;
  order: number;
}

const SliderManagement = () => {
  const [slides, setSlides] = useState<SlideData[]>([
    {
      id: '1',
      title: 'Toute la signalétique',
      titleAccent: 'professionnelle',
      subtitle: 'Solutions complètes de signalisation industrielle et de sécurité, fabriquées en France avec 20 ans d\'expertise.',
      primaryButton: { text: 'Découvrir nos produits', link: '/products' },
      secondaryButton: { text: 'Nos catalogues', link: '/catalogues' },
      backgroundGradient: 'from-ozc-600 via-ozc-500 to-blue-600',
      backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center',
      active: true,
      order: 1
    },
    {
      id: '2',
      title: 'Sécurité incendie',
      titleAccent: 'certifiée',
      subtitle: 'Panneaux et pictogrammes conformes aux dernières normes de sécurité incendie. Installation professionnelle garantie.',
      primaryButton: { text: 'Voir la gamme incendie', link: '/products/signalisation-securite/securite-incendie' },
      secondaryButton: { text: 'Demander un devis', link: '/custom' },
      backgroundGradient: 'from-red-600 via-red-500 to-orange-600',
      backgroundImage: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1200&h=600&fit=crop&crop=center',
      active: true,
      order: 2
    },
    {
      id: '3',
      title: 'Personnalisation',
      titleAccent: 'sur mesure',
      subtitle: 'Créez votre signalétique unique avec nos solutions de personnalisation avancées. Matériaux premium et finitions soignées.',
      primaryButton: { text: 'Personnaliser', link: '/custom' },
      secondaryButton: { text: 'Voir les options', link: '/customization' },
      backgroundGradient: 'from-purple-600 via-purple-500 to-pink-600',
      backgroundImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop&crop=center',
      active: true,
      order: 3
    }
  ]);

  const [editingSlide, setEditingSlide] = useState<SlideData | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveSlide = (slideData: SlideData) => {
    if (editingSlide) {
      setSlides(prev => prev.map(slide => 
        slide.id === slideData.id ? slideData : slide
      ));
    } else {
      const newSlide = {
        ...slideData,
        id: Date.now().toString(),
        order: slides.length + 1
      };
      setSlides(prev => [...prev, newSlide]);
    }
    setEditingSlide(null);
    setShowAddModal(false);
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce slide ?')) {
      setSlides(prev => prev.filter(slide => slide.id !== id));
    }
  };

  const toggleSlideActive = (id: string) => {
    setSlides(prev => prev.map(slide => 
      slide.id === id ? { ...slide, active: !slide.active } : slide
    ));
  };

  const [draggedSlide, setDraggedSlide] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, slideId: string) => {
    setDraggedSlide(slideId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSlideId: string) => {
    e.preventDefault();
    
    if (!draggedSlide || draggedSlide === targetSlideId) {
      setDraggedSlide(null);
      return;
    }

    setSlides(prev => {
      const draggedIndex = prev.findIndex(s => s.id === draggedSlide);
      const targetIndex = prev.findIndex(s => s.id === targetSlideId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newSlides = [...prev];
      const [draggedSlideData] = newSlides.splice(draggedIndex, 1);
      newSlides.splice(targetIndex, 0, draggedSlideData);
      
      // Réorganiser les ordres
      newSlides.forEach((slide, index) => {
        slide.order = index + 1;
      });
      
      return newSlides;
    });
    
    setDraggedSlide(null);
  };

  const gradientOptions = [
    { value: 'from-ozc-600 via-ozc-500 to-blue-600', label: 'OZC Bleu', preview: 'bg-gradient-to-r from-ozc-600 via-ozc-500 to-blue-600' },
    { value: 'from-red-600 via-red-500 to-orange-600', label: 'Rouge Orange', preview: 'bg-gradient-to-r from-red-600 via-red-500 to-orange-600' },
    { value: 'from-purple-600 via-purple-500 to-pink-600', label: 'Violet Rose', preview: 'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600' },
    { value: 'from-green-600 via-teal-500 to-blue-500', label: 'Vert Bleu', preview: 'bg-gradient-to-r from-green-600 via-teal-500 to-blue-500' },
    { value: 'from-gray-800 via-gray-700 to-gray-900', label: 'Gris Foncé', preview: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900' },
    { value: 'from-indigo-600 via-blue-500 to-cyan-500', label: 'Indigo Cyan', preview: 'bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Slider</h1>
          <p className="text-gray-600 mt-1">Gérez les slides de la page d'accueil</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-ozc-600 text-white rounded-lg hover:bg-ozc-700 transition-colors"
        >
          <FaPlus size={16} />
          <span>Ajouter un slide</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Slides actifs ({slides.filter(s => s.active).length})</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {slides.sort((a, b) => a.order - b.order).map((slide) => (
            <div 
              key={slide.id} 
              className={`p-6 transition-all duration-200 ${
                draggedSlide === slide.id ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, slide.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slide.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-32 h-20 rounded-lg bg-gradient-to-br ${slide.backgroundGradient} relative overflow-hidden`}>
                    {slide.backgroundImage && (
                      <img 
                        src={slide.backgroundImage} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-xs font-bold truncate">{slide.title}</div>
                        <div className="text-xs opacity-75 truncate">{slide.titleAccent}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {slide.title} <span className="text-gray-500">{slide.titleAccent}</span>
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">{slide.subtitle}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Bouton 1: {slide.primaryButton.text}</span>
                        <span>Bouton 2: {slide.secondaryButton.text}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                        <FaGripVertical size={14} />
                      </div>
                      <button
                        onClick={() => toggleSlideActive(slide.id)}
                        className={`p-2 transition-colors ${
                          slide.active ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-green-600'
                        }`}
                      >
                        {slide.active ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                      </button>
                      <button
                        onClick={() => setEditingSlide(slide)}
                        className="p-2 text-gray-400 hover:text-ozc-600"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(editingSlide || showAddModal) && (
        <SlideModal
          slide={editingSlide}
          gradientOptions={gradientOptions}
          onSave={handleSaveSlide}
          onClose={() => {
            setEditingSlide(null);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

const SlideModal = ({ 
  slide, 
  gradientOptions, 
  onSave, 
  onClose 
}: {
  slide: SlideData | null;
  gradientOptions: any[];
  onSave: (slide: SlideData) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<SlideData>(
    slide || {
      id: '',
      title: '',
      titleAccent: '',
      subtitle: '',
      primaryButton: { text: '', link: '' },
      secondaryButton: { text: '', link: '' },
      backgroundGradient: 'from-ozc-600 via-ozc-500 to-blue-600',
      backgroundImage: '',
      active: true,
      order: 0
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {slide ? 'Modifier le slide' : 'Ajouter un slide'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre principal
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre accent
                  </label>
                  <input
                    type="text"
                    value={formData.titleAccent}
                    onChange={(e) => setFormData({...formData, titleAccent: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-titre
                  </label>
                  <textarea
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bouton principal
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Texte du bouton"
                      value={formData.primaryButton.text}
                      onChange={(e) => setFormData({
                        ...formData, 
                        primaryButton: {...formData.primaryButton, text: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Lien (ex: /products)"
                      value={formData.primaryButton.link}
                      onChange={(e) => setFormData({
                        ...formData, 
                        primaryButton: {...formData.primaryButton, link: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bouton secondaire
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Texte du bouton"
                      value={formData.secondaryButton.text}
                      onChange={(e) => setFormData({
                        ...formData, 
                        secondaryButton: {...formData.secondaryButton, text: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Lien (ex: /catalogues)"
                      value={formData.secondaryButton.link}
                      onChange={(e) => setFormData({
                        ...formData, 
                        secondaryButton: {...formData.secondaryButton, link: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dégradé de fond
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {gradientOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, backgroundGradient: option.value})}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.backgroundGradient === option.value 
                          ? 'border-ozc-500 scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`h-12 rounded ${option.preview} mb-2`}></div>
                      <div className="text-xs font-medium text-center">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de fond (optionnelle)
                </label>
                <input
                  type="url"
                  value={formData.backgroundImage || ''}
                  onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
                  placeholder="URL de l'image"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ozc-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-6 border-t">
              <button
                type="submit"
                className="flex-1 bg-ozc-600 text-white py-3 rounded-lg font-semibold hover:bg-ozc-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaSave size={16} />
                <span>{slide ? 'Modifier' : 'Ajouter'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SliderManagement; 