import React, { useState, useEffect } from 'react';
import { X, Target, MapPin, Clock, Zap, AlertTriangle, Sword } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ComparisonModal = ({ selectedIds, onClose }) => {
  const [artesMarciales, setArtesMarciales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparisonData();
  }, [selectedIds]);

  const fetchComparisonData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/compare`, {
        ids: selectedIds
      });
      setArtesMarciales(response.data.data);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const ComparisonRow = ({ label, icon: Icon, children }) => (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">{label}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando comparación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Comparación de Artes Marciales</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* contenido */}
        <div className="p-6">
          {/* nombres en la cabecera */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {artesMarciales.map((arte) => (
              <div key={arte._id} className="text-center">
                <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-slate-800 to-slate-600 text-white p-4 rounded-lg">
                  {arte.nombre}
                </h3>
              </div>
            ))}
          </div>

          {/* informacion basica */}
          <ComparisonRow label="Información Básica" icon={MapPin}>
            {artesMarciales.map((arte) => (
              <div key={arte._id} className="space-y-2">
                <p><strong>País:</strong> {arte.paisProcedencia}</p>
                <p><strong>Origen:</strong> {arte.edadOrigen}</p>
                <p><strong>Tipo:</strong> {arte.tipo}</p>
              </div>
            ))}
          </ComparisonRow>

          {/* foco del arte marcial*/}
          <ComparisonRow label="Enfoque" icon={Target}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <p className="font-medium text-blue-600">{arte.focus}</p>
              </div>
            ))}
          </ComparisonRow>

          {/* demandas fisicas */}
          <ComparisonRow label="Demandas Físicas" icon={Zap}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandaColor(arte.demandasFisicas)}`}>
                  {arte.demandasFisicas}
                </span>
              </div>
            ))}
          </ComparisonRow>

          {/* tipo de contacto */}
          <ComparisonRow label="Tipo de Contacto" icon={Target}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {arte.tipoContacto}
                </span>
              </div>
            ))}
          </ComparisonRow>

          {/* distancias trabajadas */}
          <ComparisonRow label="Distancias de Combate" icon={Target}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <div className="flex flex-wrap gap-1">
                  {arte.distanciasTrabajadas.map((distancia, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                      {distancia}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </ComparisonRow>

          {/* fortalezas */}
          <ComparisonRow label="Fortalezas" icon={Zap}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <ul className="space-y-1">
                  {arte.fortalezas.map((fortaleza, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{fortaleza}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ComparisonRow>

          {/* debilidades */}
          <ComparisonRow label="Debilidades" icon={AlertTriangle}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <ul className="space-y-1">
                  {arte.debilidades.map((debilidad, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{debilidad}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ComparisonRow>

          {/* armas */}
          <ComparisonRow label="Armas" icon={Sword}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                {arte.armas.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {arte.armas.map((arma, index) => (
                      <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md">
                        {arma}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">Sin armas</span>
                )}
              </div>
            ))}
          </ComparisonRow>

          {/* tecnicas */}
          <ComparisonRow label="Técnicas Principales" icon={Target}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <ul className="space-y-1">
                  {arte.tecnicas.slice(0, 5).map((tecnica, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{tecnica}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ComparisonRow>

          {/* filosofia */}
          <ComparisonRow label="Filosofía" icon={Target}>
            {artesMarciales.map((arte) => (
              <div key={arte._id}>
                <p className="text-sm text-gray-600 italic">{arte.filosofia}</p>
              </div>
            ))}
          </ComparisonRow>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;