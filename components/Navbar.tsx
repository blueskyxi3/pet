
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onAiClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onHomeClick, onAiClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-3 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onHomeClick}
      >
        <div className="bg-orange-500 p-2 rounded-xl group-hover:bg-orange-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5.172a2 2 0 0 0-2.828 0L3.828 8.515a2 2 0 0 0 0 2.828L10 17.172a2 2 0 0 0 2.828 0l3.343-3.343a2 2 0 0 0 0-2.828L10 5.172z"/><path d="M18 10l3.343-3.343a2 2 0 0 1 2.828 0v0a2 2 0 0 1 0 2.828L18 16"/><path d="M6 10l-3.343-3.343a2 2 0 0 0-2.828 0v0a2 2 0 0 0 0 2.828L6 16"/></svg>
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">Pawfect Match</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <button onClick={onHomeClick} className="hover:text-orange-500 transition-colors">首页</button>
        <button className="hover:text-orange-500 transition-colors">宠物百科</button>
        <button onClick={onAiClick} className="hover:text-orange-500 transition-colors flex items-center gap-1">
          <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">AI</span>
          选宠助手
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onAiClick}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        <button 
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          onClick={onCartClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
