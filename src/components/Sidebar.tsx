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
    { name: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { name: 'Fahrer', path: '/fahrer', icon: Users },
    { name: 'Fahrzeuge', path: '/fahrzeuge', icon: Car },
    { name: 'Umsätze', path: '/umsaetze', icon: Euro },
    { name: 'Abrechnung', path: '/abrechnung', icon: FileText },
    { name: 'Allgemeine Kosten', path: '/kosten', icon: FileSpreadsheet },
    { name: 'Tankkosten', path: '/tankkosten', icon: Fuel },
    { name: 'Bilanz', path: '/bilanz', icon: BarChart3 },
  ];

  return (
    <aside className="w-56 min-w-56 flex-shrink-0 h-screen overflow-y-auto bg-white border-r border-gray-100 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 text-primary">
            <img src="/logo.svg" alt="AutoFlow" className="w-full h-full" />
          </div>
          <span className="text-xl font-semibold text-gray-900">AutoFlow</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-blue-600'
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
          className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Abmelden</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
