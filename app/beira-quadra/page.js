'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function BeiraQuadraPage() {
  const [jogadores, setJogadores] = useState([]);
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  
  const [placarA, setPlacarA] = useState(0);
  const [placarB, setPlacarB] = useState(0);
  const [historicoGols, setHistoricoGols] = useState([]);
  
  const [jogadorSelecionado, setJogadorSelecionado] = useState('');
  const [timeGol, setTimeGol] = useState('A');

  useEffect(() => {
    carregarJogadores();
  }, []);

  // Lógica do Cronómetro
  useEffect(() => {
    let intervalo = null;
    if (ativo) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [ativo]);

  const carregarJogadores = async () => {
    const { data } = await supabase.from('jogadores').select('*').order('nome');
    if (data) setJogadores(data);
  };

  // Formata o tempo em MM:SS
  const formatarTempo = () => {
    const mins = Math.floor(segundos / 60).toString().padStart(2, '0');
    const segs = (segundos % 60).toString().padStart(2, '0');
    return `${mins}:${segs}`;
  };

  const registrarGol = () => {
    if (!jogadorSelecionado) {
      alert('Selecione o marcador do golo!');
      return;
    }

    const autor = jogadores.find((j) => j.id === jogadorSelecionado);
    const minutoAtual = Math.floor(segundos / 60);

    if (timeGol === 'A') setPlacarA((prev) => prev + 1);
    else setPlacarB((prev) => prev + 1);

    const novoGol = {
      id: Date.now(),
      jogadorId: autor.id,
      nomeJogador: autor.nome,
      time: timeGol,
      minuto: minutoAtual,
    };

    setHistoricoGols([novoGol, ...historicoGols]);
  };

  const resetarPartida = () => {
    if (confirm('Deseja reiniciar o placar e o cronómetro?')) {
      setAtivo(false);
      setSegundos(0);
      setPlacarA(0);
      setPlacarB(0);
      setHistoricoGols([]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 max-w-2xl mx-auto flex flex-col justify-between">
      {/* NAVEGAÇÃO */}
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
        <h1 className="text-xl font-black text-emerald-400">⏱️ Beira de Quadra</h1>
        <Link href="/" className="text-xs bg-slate-800 text-slate-300 font-bold py-2 px-3 rounded-lg border border-slate-700">
          ⬅️ Início
        </Link>
      </div>

      {/* CRONÓMETRO CENTRAL */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl mb-6">
        <div className="text-6xl font-black font-mono text-emerald-400 tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          {formatarTempo()}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setAtivo(!ativo)}
            className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
              ativo 
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
            }`}
          >
            {ativo ? '⏸️ Pausar' : '▶️ Iniciar'}
          </button>
          <button
            onClick={resetarPartida}
            className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-xl border border-slate-700 text-xs"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* PLACAR */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-2xl p-4 text-center">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">Time A</span>
          <span className="text-5xl font-black text-white">{placarA}</span>
        </div>
        <div className="bg-slate-900 border-2 border-blue-500/40 rounded-2xl p-4 text-center">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">Time B</span>
          <span className="text-5xl font-black text-white">{placarB}</span>
        </div>
      </div>

      {/* REGISTO RÁPIDO DE GOLOS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">⚽ Marcar Golo</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Autor do Golo</label>
            <select
              value={jogadorSelecionado}
              onChange={(e) => setJogadorSelecionado(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="">Selecione o jogador...</option>
              {jogadores.map((j) => (
                <option key={j.id} value={j.id}>{j.nome} ({j.posicao_principal})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setTimeGol('A'); registrarGol(); }}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold py-2.5 rounded-lg text-xs uppercase"
            >
              Golo p/ Time A
            </button>
            <button
              onClick={() => { setTimeGol('B'); registrarGol(); }}
              className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 font-bold py-2.5 rounded-lg text-xs uppercase"
            >
              Golo p/ Time B
            </button>
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE GOLOS DA PARTIDA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">📋 Linha do Tempo</h3>
        
        {historicoGols.length === 0 ? (
          <p className="text-xs text-slate-600 text-center py-4">Nenhum golo marcado ainda.</p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {historicoGols.map((gol) => (
              <div key={gol.id} className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg text-xs border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚽</span>
                  <span className="font-bold text-white">{gol.nomeJogador}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${gol.time === 'A' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    TIME {gol.time}
                  </span>
                </div>
                <span className="text-slate-400 font-mono">{gol.minuto} min</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}