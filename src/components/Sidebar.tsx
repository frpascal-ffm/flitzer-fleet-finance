import React from 'react';
import { 
  LayoutGrid,
  Users,
  Car,
  Euro,
  FileText,
  FileSpreadsheet,
  Fuel,
  BarChart3,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutGrid },
    { name: 'Mitarbeiter', path: '/mitarbeiter', icon: Users },
    { name: 'Fahrzeuge', path: '/fahrzeuge', icon: Car },
    { name: 'Umsätze', path: '/umsaetze', icon: Euro },
    { name: 'Abrechnung', path: '/abrechnung', icon: FileText },
    { name: 'Allgemeine Kosten', path: '/kosten', icon: FileSpreadsheet },
    { name: 'Tankkosten', path: '/tankkosten', icon: Fuel },
    { name: 'Bilanz', path: '/bilanz', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 text-primary">
            <img src="/logo.svg" alt="AutoFlow" className="w-full h-full" />
          </div>
          <span className="text-xl font-semibold text-gray-900">AutoFlow</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-2 mt-auto">
        <Link
          to="/logout"
          className="flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Abmelden</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
