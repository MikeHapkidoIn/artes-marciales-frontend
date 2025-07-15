import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import ArteMarcialCard from './components/ArteMarcialCard';
import ComparisonModal from './components/ComparisonModal';
import ArteMarcialDetail from './components/ArteMarcialDetail';
import LoadingSpinner from './components/LoadingSpinner';
import { Search } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [artesMarciales, setArtesMarciales] = useState([]);
  const [filteredArtes, setFilteredArtes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tipo: '',
    paisProcedencia: '',
    tipoContacto: '',
    demandasFisicas: ''
  });
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    fetchArtesMarciales();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [artesMarciales, searchTerm, filters]);

  const fetchArtesMarciales = async () => {
    try {
      setLoading(true);
      console.log('Fetching from:', `${API_BASE_URL}/api/artes-marciales`);
      const response = await axios.get(`${API_BASE_URL}/api/artes-marciales`);
      console.log('Response:', response.data);
      setArtesMarciales(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error al cargar las artes marciales');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = artesMarciales;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(arte =>
        arte.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arte.paisProcedencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arte.focus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(arte => arte[key] === value);
      }
    });

    setFilteredArtes(filtered);
  };

  const handleComparisonToggle = (arteId) => {
    setSelectedForComparison(prev => {
      if (prev.includes(arteId)) {
        return prev.filter(id => id !== arteId);
      } else if (prev.length < 3) {
        return [...prev, arteId];
      }
      return prev;
    });
  };

  const handleShowComparison = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparison(true);
    }
  };

  const clearComparison = () => {
    setSelectedForComparison([]);
    setShowComparison(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <Routes>
          <Route path="/" element={
            <main className="container mx-auto px-4 py-8">
              {/* Search and Filters */}
              <div className="mb-8">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar artes marciales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <SearchFilters
                  filters={filters}
                  setFilters={setFilters}
                  artesMarciales={artesMarciales}
                />
              </div>

              {/* Comparison Bar */}
              {selectedForComparison.length > 0 && (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">
                      {selectedForComparison.length} arte{selectedForComparison.length !== 1 ? 's' : ''} seleccionado{selectedForComparison.length !== 1 ? 's' : ''} para comparar
                    </span>
                    <div className="space-x-2">
                      {selectedForComparison.length >= 2 && (
                        <button
                          onClick={handleShowComparison}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Comparar
                        </button>
                      )}
                      <button
                        onClick={clearComparison}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Results */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Artes Marciales ({filteredArtes.length})
                </h2>
                
                {filteredArtes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No se encontraron artes marciales que coincidan con tu búsqueda.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArtes.map((arte) => (
                      <ArteMarcialCard
                        key={arte._id}
                        arte={arte}
                        isSelected={selectedForComparison.includes(arte._id)}
                        onComparisonToggle={handleComparisonToggle}
                        canSelect={selectedForComparison.length < 3 || selectedForComparison.includes(arte._id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Comparison Modal */}
              {showComparison && (
                <ComparisonModal
                  selectedIds={selectedForComparison}
                  onClose={() => setShowComparison(false)}
                />
              )}
            </main>
          } />
          
          <Route path="/arte/:id" element={<ArteMarcialDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;