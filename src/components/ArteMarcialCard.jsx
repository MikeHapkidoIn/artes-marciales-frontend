import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Target, Zap, Plus, Check } from 'lucide-react';

const ArteMarcialCard = ({ arte, isSelected, onComparisonToggle, canSelect }) => {
  const getDemandaColor = (demanda) => {
    switch (demanda.toLowerCase()) {
      case 'baja':
        return 'bg-green-100 text-green-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'media-alta':
        return 'bg-orange-100 text-orange-800';
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'muy alta':
        return 'bg-red-200 text-red-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContactoColor = (contacto) => {
    switch (contacto.toLowerCase()) {
      case 'no-contacto':
        return 'bg-blue-100 text-blue-800';
      case 'semi-contacto':
        return 'bg-purple-100 text-purple-800';
      case 'contacto completo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-6 relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{arte.nombre}</h3>
            <div className="flex items-center space-x-2 text-slate-200">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{arte.paisProcedencia}</span>
            </div>
          </div>
          
          {/* Comparison Toggle */}
          <button
            onClick={() => onComparisonToggle(arte._id)}
            disabled={!canSelect}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? 'bg-green-500 text-white hover:bg-green-600'
                : canSelect
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="mt-3 flex items-center space-x-2 text-slate-200">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{arte.edadOrigen}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandaColor(arte.demandasFisicas)}`}>
            {arte.demandasFisicas}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContactoColor(arte.tipoContacto)}`}>
            {arte.tipoContacto}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {arte.tipo}
          </span>
        </div>

        {/* Focus */}
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-blue-600" />
          <span className="text-gray-700 font-medium">{arte.focus}</span>
        </div>

        {/* Distances */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Distancias de Combate:</h4>
          <div className="flex flex-wrap gap-1">
            {arte.distanciasTrabajadas.map((distancia, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                {distancia}
              </span>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Fortalezas:</h4>
          <div className="space-y-1">
            {arte.fortalezas.slice(0, 3).map((fortaleza, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Zap className="h-3 w-3 text-green-600" />
                <span className="text-sm text-gray-600">{fortaleza}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weapons */}
        {arte.armas.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Armas:</h4>
            <div className="flex flex-wrap gap-1">
              {arte.armas.slice(0, 3).map((arma, index) => (
                <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md">
                  {arma}
                </span>
              ))}
              {arte.armas.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                  +{arte.armas.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Philosophy */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Filosofía:</h4>
          <p className="text-sm text-gray-600 italic">
            {arte.filosofia.length > 80 ? `${arte.filosofia.substring(0, 80)}...` : arte.filosofia}
          </p>
        </div>

        {/* Action Button */}
        <Link
          to={`/arte/${arte._id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center block group-hover:shadow-lg"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default ArteMarcialCard;