
import React from 'react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onAddToCart: (pet: Pet) => void;
  onViewDetail: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onAddToCart, onViewDetail }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => onViewDetail(pet)}>
        <img 
          src={pet.image} 
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm">
          {pet.category}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1">
          {pet.traits.slice(0, 2).map(trait => (
            <span key={trait} className="bg-orange-500/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full">
              {trait}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
          <span className="text-orange-500 font-bold text-lg">¥{pet.price}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-1">{pet.breed} · {pet.age} · {pet.gender}</p>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onViewDetail(pet)}
            className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            详情
          </button>
          <button 
            onClick={() => onAddToCart(pet)}
            className="flex-1 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            加入
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
