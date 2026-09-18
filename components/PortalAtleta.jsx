'use client';
import { Copy, Send, CheckSquare, Award, Flame, ShieldAlert } from 'lucide-react';

export function PortalAtleta() {
  const copiarPix = () => {
    navigator.clipboard.writeText("suachavepix@email.com");
    alert("Chave PIX copiada!");
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto p-4 text-white">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2">
        <h2 className="text-emerald-400 font-extrabold text-sm tracking-wider flex items-center gap-2">
          ⚽ O PORTAL DO ATLETA
        </h2>
        <span className="text-xs text-zinc-400">Edição Semanal</span>
      </div>

      {/* Card FUT Completo */}
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-3">
        <div className="flex gap-4 items-center">
          {/* Cartão de Atleta Estilo EA FC */}
          <div className="w-28 bg-gradient-to-b from-emerald-600 via-emerald-950 to-zinc-950 border-2 border-emerald-400/60 rounded-2xl p-2 text-center shadow-xl relative">
            <span className="text-4xl font-black text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block">86</span>
            <p className="text-[10px] uppercase font-bold text-zinc-300 -mt-1">CT</p>
            <div className="w-14 h-14 bg-zinc-800 rounded-full mx-auto my-2 border-2 border-emerald-400/40 overflow-hidden shadow-inner">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Kayke Mello" className="object-cover w-full h-full" />
            </div>
            <p className="text-xs font-black truncate text-white uppercase tracking-wider">KAYKE MELLO</p>
            <span className="text-[9px] text-emerald-400 block font-semibold">(Nível: Craque)</span>
          </div>

          {/* Hexágono / Status de Atributos */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-1">
              <span className="text-amber-400 font-extrabold text-xs">★ OVR: 86</span>
              <span className="text-zinc-400 font-bold text-xs">ATACANTE</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 bg-zinc-950/80 p-2 rounded-xl border border-zinc-800 text-[11px] font-mono">
              <div className="flex justify-between px-1"><span className="text-zinc-500">TÉC</span> <strong className="text-emerald-400">88</strong></div>
              <div className="flex justify-between px-1"><span className="text-zinc-500">FÍS</span> <strong className="text-emerald-400">80</strong></div>
              <div className="flex justify-between px-1"><span className="text-zinc-500">TÁT</span> <strong className="text-emerald-400">82</strong></div>
              <div className="flex justify-between px-1"><span className="text-zinc-500">MEN</span> <strong className="text-emerald-400">85</strong></div>
            </div>
          </div>
        </div>

        {/* Badges / Conquistas */}
        <div className="flex gap-2 pt-1">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] px-2 py-1 rounded-lg font-bold flex items-center gap-1">
            <Flame size={12} /> Pé Quente
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-1 rounded-lg font-bold flex items-center gap-1">
            <ShieldAlert size={12} /> Inimigo do Fim
          </span>
        </div>
      </div>

      {/* Confirmação & Pagamento */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">NEXT GAME</span>
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm text-zinc-200 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
            <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded" defaultChecked />
            <span>Vou Jogar (R$ 12,00)</span>
          </label>
          <label className="flex items-center gap-3 text-sm text-zinc-200 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
            <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded" defaultChecked />
            <span>Vou no Churrasco (R$ 30,00)</span>
          </label>
        </div>
        <div className="flex justify-between items-center pt-1 text-sm font-bold">
          <span>Total:</span>
          <span className="text-emerald-400 text-base">R$ 42,00</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={copiarPix} className="flex items-center justify-center gap-1.5 bg-zinc-800 text-white text-xs font-bold py-2.5 rounded-xl border border-zinc-700 active:scale-95 transition">
            <Copy size={14} /> COPIAR PIX
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-[0_0_10px_rgba(16,185,129,0.3)] active:scale-95 transition">
            <Send size={14} /> COMPROVANTE
          </button>
        </div>
      </div>

      {/* Estatísticas do Ano */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-1">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">ESTATÍSTICAS</span>
        <p className="text-xs text-zinc-300">⚽ Gols no ano: <strong className="text-white">14</strong></p>
        <p className="text-xs text-zinc-300">🤝 Parceiro de Ouro: <strong className="text-amber-400">Marcos Antônio</strong></p>
      </div>
    </div>
  );
}