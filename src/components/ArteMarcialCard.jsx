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

  
  const backgroundImage = arte.imagenes && arte.imagenes.length > 0 
    ? arte.imagenes[0] 
    : `https://res.cloudinary.com/dchedntcz/image/upload/v1752521799/1104079-amazing-karate-wallpaper-2560x1440-for-htc_gdji4h.jpg`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-200 overflow-hidden group transform hover:-translate-y-1">
      {/* Header con imagen de fondo */}
      <div 
        className="relative h-48 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.9)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Overlay decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-900/30"></div>
        
        <div className="relative z-10 flex justify-between items-start h-full">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{arte.nombre}</h3>
            <div className="flex items-center space-x-2 text-blue-100 mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{arte.paisProcedencia}</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{arte.edadOrigen}</span>
            </div>
          </div>
          
          {/* token comparador */}
          <button
            onClick={() => onComparisonToggle(arte._id)}
            disabled={!canSelect}
            className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm ${
              isSelected
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : canSelect
                ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                : 'bg-gray-400/50 text-gray-200 cursor-not-allowed'
            }`}
          >
            {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDemandaColor(arte.demandasFisicas)}`}>
            {arte.demandasFisicas}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getContactoColor(arte.tipoContacto)}`}>
            {arte.tipoContacto}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {arte.tipo}
          </span>
        </div>

        {/* Foco del arte marcial */}
        <div className="flex items-center space-x-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <span className="text-blue-800 font-medium text-sm">{arte.focus}</span>
        </div>

        {/* Distancias */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            Distancias de Combate:
          </h4>
          <div className="flex flex-wrap gap-1">
            {arte.distanciasTrabajadas.map((distancia, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md border border-blue-200">
                {distancia}
              </span>
            ))}
          </div>
        </div>

        {/* fortalezas */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
            Fortalezas:
          </h4>
          <div className="space-y-1">
            {arte.fortalezas.slice(0, 3).map((fortaleza, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Zap className="h-3 w-3 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{fortaleza}</span>
              </div>
            ))}
            {arte.fortalezas.length > 3 && (
              <div className="text-xs text-gray-500 ml-5">
                +{arte.fortalezas.length - 3} más fortalezas
              </div>
            )}
          </div>
        </div>

        {/* Armas */}
        {arte.armas.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
              Armas:
            </h4>
            <div className="flex flex-wrap gap-1">
              {arte.armas.slice(0, 3).map((arma, index) => (
                <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md border border-amber-200">
                  {arma}
                </span>
              ))}
              {arte.armas.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-200">
                  +{arte.armas.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Filosofia */}
        <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
            Filosofía:
          </h4>
          <p className="text-sm text-gray-700 italic leading-relaxed">
            {arte.filosofia.length > 100 ? `${arte.filosofia.substring(0, 100)}...` : arte.filosofia}
          </p>
        </div>

        {/* Boton detalles */}
        <Link
          to={`/arte/${arte._id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center block group-hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <span>Ver Detalles</span>
          <Target className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ArteMarcialCard;