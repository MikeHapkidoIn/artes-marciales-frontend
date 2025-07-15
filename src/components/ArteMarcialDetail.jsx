import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Target, Zap, AlertTriangle, Sword, Book, Users } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ArteMarcialDetail = () => {
  const { id } = useParams();
  const [arte, setArte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArteDetail();
  }, [id]);

  const fetchArteDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/artes-marciales/${id}`);
      setArte(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los detalles del arte marcial');
      console.error('Error fetching arte detail:', err);
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

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">{error}</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!arte) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Volver a la lista</span>
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{arte.nombre}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>{arte.paisProcedencia}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{arte.edadOrigen}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandaColor(arte.demandasFisicas)}`}>
              {arte.demandasFisicas}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getContactoColor(arte.tipoContacto)}`}>
              {arte.tipoContacto}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Focus */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Enfoque Principal</h2>
            </div>
            <p className="text-lg text-gray-700 font-medium">{arte.focus}</p>
          </div>

          {/* Filosofia */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Filosofía</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{arte.filosofia}</p>
          </div>

          {/* Historia */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Historia</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{arte.historia}</p>
          </div>

          {/* Tecnicas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Técnicas Principales</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {arte.tecnicas.map((tecnica, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-700">{tecnica}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Información Básica</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Tipo:</span>
                <p className="font-medium">{arte.tipo}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Tipo de Contacto:</span>
                <p className="font-medium">{arte.tipoContacto}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Demandas Físicas:</span>
                <p className="font-medium">{arte.demandasFisicas}</p>
              </div>
            </div>
          </div>

          {/* Distancias de combate */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Distancias de Combate</h3>
            <div className="space-y-2">
              {arte.distanciasTrabajadas.map((distancia, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md mr-2 mb-2">
                  {distancia}
                </span>
              ))}
            </div>
          </div>

          {/* Armas */}
          {arte.armas.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sword className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-bold text-gray-800">Armas</h3>
              </div>
              <div className="space-y-2">
                {arte.armas.map((arma, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-md mr-2 mb-2">
                    {arma}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fortalezas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">Fortalezas</h3>
            </div>
            <ul className="space-y-2">
              {arte.fortalezas.map((fortaleza, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{fortaleza}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Debilidades */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-800">Debilidades</h3>
            </div>
            <ul className="space-y-2">
              {arte.debilidades.map((debilidad, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{debilidad}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArteMarcialDetail;