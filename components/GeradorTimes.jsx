'use client';
import { Scale, RefreshCw, Check } from 'lucide-react';

export function GeradorTimes() {
  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto p-4 text-white">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2">
        <h2 className="text-emerald-400 font-extrabold text-sm tracking-wider flex items-center gap-2">
          ⚖️ SORTEIO DE EQUIPES
        </h2>
      </div>

      {/* Configurações do Sorteio */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">Formato:</label>
            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white">
              <option>Sintético (5v5)</option>
              <option>Society (7v7)</option>
            </select>
          </div>
          <div>
            <label className="text-zinc-400 block mb-1">Quantidade:</label>
            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white">
              <option>3 Times</option>
              <option>2 Times</option>
            </select>
          </div>
        </div>

        {/* Handicap Goleiros */}
        <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 space-y-2">
          <span className="text-[11px] font-bold text-amber-400 block uppercase">🧤 HANDICAP DOS GOLEIROS</span>
          <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
            <div className="bg-zinc-900 p-1.5 rounded">GOL A: <strong>8.0</strong></div>
            <div className="bg-zinc-900 p-1.5 rounded">GOL B: <strong>6.0</strong></div>
            <div className="bg-zinc-900 p-1.5 rounded">GOL C: <strong>7.0</strong></div>
          </div>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-[0_0_12px_rgba(16,185,129,0.3)]">
          EXECUTAR SORTEIO INTELIGENTE
        </button>
      </div>

      {/* Times Gerados */}
      <div className="space-y-3">
        {/* TIME A */}
        <div className="bg-zinc-900/90 border-l-4 border-l-emerald-500 border border-zinc-800 rounded-xl p-3 text-xs space-y-1">
          <div className="flex justify-between font-bold text-emerald-400 mb-1">
            <span>🟢 TIME A</span>
            <span>Média: 82.4</span>
          </div>
          <p className="text-zinc-300">João (GOL - 8.0)</p>
          <p className="text-zinc-300">Marcos (DEF - 84)</p>
          <p className="text-zinc-300">Kayke (ATA - 86)</p>
        </div>

        {/* TIME B */}
        <div className="bg-zinc-900/90 border-l-4 border-l-blue-500 border border-zinc-800 rounded-xl p-3 text-xs space-y-1">
          <div className="flex justify-between font-bold text-blue-400 mb-1">
            <span>🔵 TIME B</span>
            <span>Média: 82.2</span>
          </div>
          <p className="text-zinc-300">Pedro (GOL - 6.0)</p>
          <p className="text-zinc-300">Ricardo (DEF - 88)</p>
          <p className="text-zinc-300">Rodrigo (ATF - 78)</p>
        </div>
      </div>
    </div>
  );
}