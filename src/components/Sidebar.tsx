
import React from 'react';
import { 
  FileX, 
  Users, 
  FilePlus,
  FileMinus 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: FileX },
    { name: 'Mitarbeiter', path: '/mitarbeiter', icon: Users },
    { name: 'Fahrzeuge', path: '/fahrzeuge', icon: FilePlus },
    { name: 'Umsätze', path: '/umsaetze', icon: FileMinus },
    { name: 'Abrechnung', path: '/abrechnung', icon: FileX },
    { name: 'Allgemeine Kosten', path: '/kosten', icon: FileMinus },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">AutoFlow</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <FileX className="w-5 h-5" />
          <span>Abmelden</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
