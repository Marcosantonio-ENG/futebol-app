'use client';
import { Wallet, Calendar, Users, MessageSquare, AlertCircle } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto p-4 text-white">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2">
        <h2 className="text-emerald-400 font-extrabold text-sm tracking-wider flex items-center gap-2">
          ⚙️ PAINEL ADMIN
        </h2>
        <span className="text-xs text-zinc-500">Sair</span>
      </div>

      {/* Caixa Atual */}
      <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <span className="text-xs text-zinc-400 font-bold uppercase flex items-center gap-1.5">
          <Wallet size={14} className="text-emerald-400" /> CAIXA ATUAL
        </span>
        <div className="text-3xl font-black text-white my-1">R$ 850,00</div>
        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          +R$ 120 (esta semana)
        </span>
      </div>

      {/* Próximo Evento */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-400 font-bold uppercase flex items-center gap-1">
            <Calendar size={14} /> PRÓXIMO EVENTO
          </span>
          <span className="text-xs text-emerald-400 font-semibold">Confirmados: 15/16</span>
        </div>
        <p className="text-xs font-bold text-zinc-200">⚽ Jogo + 🍖 Churras | Terça, 15/09</p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button className="bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold py-2 rounded-xl">
            GERAR TIMES
          </button>
          <button className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1">
            <MessageSquare size={13} /> LISTA WHATS
          </button>
        </div>
      </div>

      {/* Top Jogadores OVR */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2">
        <span className="text-xs text-zinc-400 font-bold uppercase">🏆 TOP JOGADORES (OVR)</span>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between bg-zinc-950 p-2 rounded-lg"><span className="text-white">1. Kayke Mello</span><strong className="text-amber-400">★ 86</strong></div>
          <div className="flex justify-between bg-zinc-950 p-2 rounded-lg"><span className="text-white">2. Marcos Silva</span><strong className="text-amber-400">★ 84</strong></div>
          <div className="flex justify-between bg-zinc-950 p-2 rounded-lg"><span className="text-white">3. Ricardo Paris</span><strong className="text-amber-400">★ 82</strong></div>
        </div>
      </div>

      {/* Alerta de Cobrança */}
      <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-3 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2 text-red-300">
          <AlertCircle size={14} />
          <span>Miguel pendente (R$ 12,00)</span>
        </div>
        <button className="bg-red-600 text-white font-bold px-3 py-1 rounded-lg text-[11px]">
          Cobrar
        </button>
      </div>
    </div>
  );
}