'use client';
import { LayoutDashboard, User, Shuffle, Dices } from 'lucide-react';

export function MobileNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'atleta', label: 'Atleta', icon: User },
    { id: 'admin', label: 'Admin', icon: LayoutDashboard },
    { id: 'sorteio', label: 'Sorteio', icon: Shuffle },
    { id: 'beira', label: 'Beira', icon: Dices },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 border-t border-emerald-500/30 backdrop-blur-lg px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-emerald-400 scale-105' : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              <Icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}