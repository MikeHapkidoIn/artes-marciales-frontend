import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center space-x-2">
              <Sword className="h-8 w-8 text-yellow-400" />
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Artes Marciales</h1>
              <p className="text-sm text-gray-300">Compara y descubre</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors font-medium">
              Inicio
            </Link>
            <a href="#about" className="hover:text-yellow-400 transition-colors font-medium">
              Acerca de
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;