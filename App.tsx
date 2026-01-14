
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import PetCard from './components/PetCard';
import CartDrawer from './components/CartDrawer';
import AiAssistant from './components/AiAssistant';
import { PETS } from './data/pets';
import { Pet, CartItem, PetCategory } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PetCategory>('全部');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'home' | 'ai'>('home');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const filteredPets = useMemo(() => {
    if (selectedCategory === '全部') return PETS;
    return PETS.filter(pet => pet.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (pet: Pet) => {
    setCart(prev => {
      const existing = prev.find(item => item.pet.id === pet.id);
      if (existing) {
        return prev.map(item => 
          item.pet.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { pet, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (petId: string) => {
    setCart(prev => prev.filter(item => item.pet.id !== petId));
  };

  const updateCartQuantity = (petId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.pet.id === petId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const categories: PetCategory[] = ['全部', '狗狗', '猫咪', '小宠', '水族'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => { setView('home'); setSelectedPet(null); }}
        onAiClick={() => setView('ai')}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {view === 'home' ? (
          <>
            {selectedPet ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => setSelectedPet(null)}
                  className="mb-6 flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                  返回列表
                </button>
                <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedPet.name}</h2>
                        <div className="flex gap-2">
                          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold">{selectedPet.category}</span>
                          <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold">{selectedPet.breed}</span>
                        </div>
                      </div>
                      <span className="text-3xl font-bold text-orange-500">¥{selectedPet.price}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <span className="block text-xs text-gray-400 mb-1">年龄</span>
                        <span className="font-bold text-gray-700">{selectedPet.age}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <span className="block text-xs text-gray-400 mb-1">性别</span>
                        <span className="font-bold text-gray-700">{selectedPet.gender}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-bold text-gray-800 mb-2">性格特征</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPet.traits.map(t => (
                          <span key={t} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-sm italic"># {t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-bold text-gray-800 mb-2">详情介绍</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedPet.description}</p>
                    </div>

                    <div className="mt-auto flex gap-4">
                      <button 
                        onClick={() => addToCart(selectedPet)}
                        className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20"
                      >
                        加入购物车
                      </button>
                      <button className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">寻找您的 <span className="text-orange-500">Pawfect</span> 伙伴</h1>
                    <p className="text-gray-500">每一个生命都值得被温柔对待，带一个小朋友回家吧。</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
                          selectedCategory === cat 
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPets.map(pet => (
                    <PetCard 
                      key={pet.id} 
                      pet={pet} 
                      onAddToCart={addToCart}
                      onViewDetail={setSelectedPet}
                    />
                  ))}
                </div>
                
                {filteredPets.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">哎呀，这个分类暂时还没有小伙伴...</p>
                    <button 
                      onClick={() => setSelectedCategory('全部')}
                      className="mt-4 text-orange-500 font-bold hover:underline"
                    >
                      查看全部
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">AI 选宠咨询</h2>
              <p className="text-gray-500">不知道该选什么宠物？咨询我们的 AI 专家</p>
            </div>
            <AiAssistant />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-500 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5.172a2 2 0 0 0-2.828 0L3.828 8.515a2 2 0 0 0 0 2.828L10 17.172a2 2 0 0 0 2.828 0l3.343-3.343a2 2 0 0 0 0-2.828L10 5.172z"/><path d="M18 10l3.343-3.343a2 2 0 0 1 2.828 0v0a2 2 0 0 1 0 2.828L18 16"/><path d="M6 10l-3.343-3.343a2 2 0 0 0-2.828 0v0a2 2 0 0 0 0 2.828L6 16"/></svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Pawfect Match</span>
            </div>
            <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">
              我们致力于为每一个流浪生命寻找温暖的家。所有的宠物在入店前都经过严格的健康检查和性格评估，确保它们能与您的家庭完美契合。
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6">服务中心</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-orange-500 cursor-pointer transition-colors">购物指南</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">配送方式</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">售后政策</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">养宠百科</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6">关于我们</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-orange-500 cursor-pointer transition-colors">品牌故事</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">门店查询</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">联系我们</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">商务合作</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2024 Pawfect Match 萌宠之家. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <span className="cursor-pointer hover:text-orange-500">隐私权政策</span>
            <span className="cursor-pointer hover:text-orange-500">服务条款</span>
            <span className="cursor-pointer hover:text-orange-500">Cookie 设置</span>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
      />
    </div>
  );
};

export default App;
