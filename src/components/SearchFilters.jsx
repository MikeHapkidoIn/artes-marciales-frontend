import React from 'react';
import { Filter, X } from 'lucide-react';

const SearchFilters = ({ filters, setFilters, artesMarciales }) => {
  const getUniqueValues = (field) => {
    return [...new Set(artesMarciales.map(arte => arte[field]).filter(Boolean))].sort();
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      tipo: '',
      paisProcedencia: '',
      tipoContacto: '',
      demandasFisicas: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="text-sm">Limpiar</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <select
            value={filters.tipo}
            onChange={(e) => handleFilterChange('tipo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {getUniqueValues('tipo').map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País de Origen
          </label>
          <select
            value={filters.paisProcedencia}
            onChange={(e) => handleFilterChange('paisProcedencia', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los países</option>
            {getUniqueValues('paisProcedencia').map(pais => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Contacto
          </label>
          <select
            value={filters.tipoContacto}
            onChange={(e) => handleFilterChange('tipoContacto', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {getUniqueValues('tipoContacto').map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demandas Físicas
          </label>
          <select
            value={filters.demandasFisicas}
            onChange={(e) => handleFilterChange('demandasFisicas', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las demandas</option>
            {getUniqueValues('demandasFisicas').map(demanda => (
              <option key={demanda} value={demanda}>{demanda}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;