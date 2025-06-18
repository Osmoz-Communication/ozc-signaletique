import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Calculator } from 'lucide-react';

interface PriceRule {
  id: string;
  name: string;
  material: string;
  dimensions: string;
  options: string[];
  basePrice: number;
  multiplier: number;
  fixedCost: number;
  active: boolean;
}

interface Attribute {
  id: string;
  name: string;
  type: 'material' | 'dimension' | 'option';
  values: string[];
}

const PricingMatrix = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'attributes' | 'calculator'>('rules');
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [newRule, setNewRule] = useState<Partial<PriceRule>>({});

  const [priceRules, setPriceRules] = useState<PriceRule[]>([
    {
      id: '1',
      name: 'Panneau PVC Standard',
      material: 'PVC',
      dimensions: 'A4',
      options: ['Impression numérique'],
      basePrice: 15.00,
      multiplier: 1.0,
      fixedCost: 5.00,
      active: true
    },
    {
      id: '2',
      name: 'Panneau Aluminium Premium',
      material: 'Aluminium',
      dimensions: 'A3',
      options: ['Découpe laser', 'Finition brossée'],
      basePrice: 35.00,
      multiplier: 1.5,
      fixedCost: 10.00,
      active: true
    },
    {
      id: '3',
      name: 'Plaque Inox Gravée',
      material: 'Inox',
      dimensions: 'Personnalisé',
      options: ['Gravure laser', 'Polissage'],
      basePrice: 50.00,
      multiplier: 2.0,
      fixedCost: 15.00,
      active: true
    }
  ]);

  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: '1',
      name: 'Matériaux',
      type: 'material',
      values: ['PVC', 'Aluminium', 'Inox', 'Laiton', 'Plexiglas', 'Adhésif']
    },
    {
      id: '2',
      name: 'Dimensions',
      type: 'dimension',
      values: ['A4 (21x29.7cm)', 'A3 (29.7x42cm)', 'A1 (59.4x84.1cm)', 'Petit (15x15cm)', 'Moyen (30x30cm)', 'Grand (50x50cm)', 'Personnalisé']
    },
    {
      id: '3',
      name: 'Options',
      type: 'option',
      values: ['Impression numérique', 'Découpe laser', 'Gravure laser', 'Finition brossée', 'Polissage', 'Perçage', 'Adhésif renforcé', 'Protection UV']
    }
  ]);

  const [calculator, setCalculator] = useState({
    material: '',
    dimensions: '',
    options: [] as string[],
    quantity: 1,
    result: null as number | null
  });

  const calculatePrice = () => {
    const matchingRule = priceRules.find(rule => 
      rule.material === calculator.material &&
      rule.dimensions === calculator.dimensions &&
      rule.active
    );

    if (matchingRule) {
      let price = matchingRule.basePrice * matchingRule.multiplier + matchingRule.fixedCost;
      
      // Ajouter le coût des options
      calculator.options.forEach(option => {
        switch (option) {
          case 'Découpe laser': price += 8; break;
          case 'Gravure laser': price += 12; break;
          case 'Finition brossée': price += 5; break;
          case 'Polissage': price += 7; break;
          case 'Perçage': price += 3; break;
          case 'Adhésif renforcé': price += 4; break;
          case 'Protection UV': price += 6; break;
          default: price += 2; break;
        }
      });

      // Appliquer la quantité avec dégressif
      let totalPrice = price * calculator.quantity;
      if (calculator.quantity >= 10) totalPrice *= 0.9; // -10% à partir de 10
      if (calculator.quantity >= 50) totalPrice *= 0.85; // -15% à partir de 50

      setCalculator(prev => ({ ...prev, result: totalPrice }));
    }
  };

  const saveRule = () => {
    if (editingRule) {
      setPriceRules(prev => prev.map(rule => 
        rule.id === editingRule ? { ...rule, ...newRule } : rule
      ));
    } else {
      const id = Date.now().toString();
      setPriceRules(prev => [...prev, { id, ...newRule } as PriceRule]);
    }
    setEditingRule(null);
    setNewRule({});
  };

  const deleteRule = (id: string) => {
    setPriceRules(prev => prev.filter(rule => rule.id !== id));
  };

  const startEdit = (rule: PriceRule) => {
    setEditingRule(rule.id);
    setNewRule(rule);
  };

  const cancelEdit = () => {
    setEditingRule(null);
    setNewRule({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Matrice de prix</h1>
          <p className="text-gray-600 mt-1">Gestion centralisée des prix selon les attributs</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'rules', label: 'Règles de prix', icon: Calculator },
            { id: 'attributes', label: 'Attributs', icon: Edit },
            { id: 'calculator', label: 'Calculateur', icon: Calculator }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Add New Rule Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setEditingRule('new')}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus size={16} />
              <span>Nouvelle règle</span>
            </button>
          </div>

          {/* Rules Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matériau
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix de base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Multiplicateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {priceRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{rule.name}</div>
                      <div className="text-sm text-gray-500">
                        {rule.options.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {rule.material}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {rule.dimensions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{rule.basePrice.toFixed(2)}€</div>
                      <div className="text-sm text-gray-500">+ {rule.fixedCost.toFixed(2)}€ fixe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      ×{rule.multiplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rule.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rule.active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => startEdit(rule)}
                        className="text-teal-600 hover:text-teal-700 mr-3"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit/Add Rule Modal */}
          {editingRule && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingRule === 'new' ? 'Nouvelle règle' : 'Modifier la règle'}
                  </h2>
                  <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la règle
                    </label>
                    <input
                      type="text"
                      value={newRule.name || ''}
                      onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Matériau
                    </label>
                    <select
                      value={newRule.material || ''}
                      onChange={(e) => setNewRule(prev => ({ ...prev, material: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Sélectionner</option>
                      {attributes.find(a => a.type === 'material')?.values.map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions
                    </label>
                    <select
                      value={newRule.dimensions || ''}
                      onChange={(e) => setNewRule(prev => ({ ...prev, dimensions: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Sélectionner</option>
                      {attributes.find(a => a.type === 'dimension')?.values.map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix de base (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newRule.basePrice || ''}
                      onChange={(e) => setNewRule(prev => ({ ...prev, basePrice: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Multiplicateur
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={newRule.multiplier || ''}
                      onChange={(e) => setNewRule(prev => ({ ...prev, multiplier: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coût fixe (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newRule.fixedCost || ''}
                      onChange={(e) => setNewRule(prev => ({ ...prev, fixedCost: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={saveRule}
                    className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Save size={16} />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Attributes Tab */}
      {activeTab === 'attributes' && (
        <div className="space-y-6">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{attribute.name}</h3>
              <div className="flex flex-wrap gap-2">
                {attribute.values.map((value, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Calculateur de prix</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matériau
                </label>
                <select
                  value={calculator.material}
                  onChange={(e) => setCalculator(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Sélectionner un matériau</option>
                  {attributes.find(a => a.type === 'material')?.values.map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions
                </label>
                <select
                  value={calculator.dimensions}
                  onChange={(e) => setCalculator(prev => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Sélectionner des dimensions</option>
                  {attributes.find(a => a.type === 'dimension')?.values.map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité
                </label>
                <input
                  type="number"
                  min="1"
                  value={calculator.quantity}
                  onChange={(e) => setCalculator(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={calculatePrice}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Calculator size={16} />
                <span>Calculer le prix</span>
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résultat</h3>
              {calculator.result !== null ? (
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-teal-600">
                    {calculator.result.toFixed(2)}€ HT
                  </div>
                  <div className="text-lg text-gray-600">
                    {(calculator.result * 1.2).toFixed(2)}€ TTC
                  </div>
                  <div className="text-sm text-gray-500">
                    Prix unitaire : {(calculator.result / calculator.quantity).toFixed(2)}€ HT
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Sélectionnez les options et cliquez sur "Calculer"</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingMatrix; 