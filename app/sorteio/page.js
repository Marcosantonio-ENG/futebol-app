'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SorteioPage() {
  const [jogadores, setJogadores] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  
  // Novas variáveis flexíveis
  const [jogadoresPorTime, setJogadoresPorTime] = useState(5);
  const [qtdTimes, setQtdTimes] = useState(2);
  const [qtdReservas, setQtdReservas] = useState(0); 
  
  const [goleirosHandicap, setGoleirosHandicap] = useState({});
  const [timesGerados, setTimesGerados] = useState([]);

  useEffect(() => {
    carregarJogadores();
  }, []);

  const carregarJogadores = async () => {
    const { data } = await supabase.from('jogadores').select('*, avaliacoes(*)');
    if (data) setJogadores(data);
  };

  const toggleSelecao = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const executarSorteio = () => {
    const elenco = jogadores.filter((j) => selecionados.includes(j.id));
    
    // Validação básica (tem que ter pelo menos 1 jogador de linha por time)
    if (elenco.length < qtdTimes) {
      alert(`Selecione pelo menos ${qtdTimes} jogadores para realizar o sorteio.`);
      return;
    }

    const linha = elenco
      .filter((j) => j.posicao_principal !== 'Goleiro')
      .sort((a, b) => (b.avaliacoes[0]?.nota_geral || 0) - (a.avaliacoes[0]?.nota_geral || 0));

    // Gera as letras dos times dinamicamente (A, B, C, D, E...) baseado na qtdTimes
    const letras = Array.from({ length: qtdTimes }, (_, i) => String.fromCharCode(65 + i));
    
    const estruturaTimes = letras.map((letra) => ({
      nome: `Time ${letra}`,
      handicapGoleiro: Number(goleirosHandicap[letra] || 5),
      jogadores: [],
      somaOvr: Number(goleirosHandicap[letra] || 5),
    }));

    // Snake Draft
    let idTimeAtual = 0;
    let direcao = 1;

    linha.forEach((jogador) => {
      const ovr = Number(jogador.avaliacoes[0]?.nota_geral || 5);
      estruturaTimes[idTimeAtual].jogadores.push(jogador);
      estruturaTimes[idTimeAtual].somaOvr += ovr;

      if (direcao === 1 && idTimeAtual === qtdTimes - 1) {
        direcao = -1;
      } else if (direcao === -1 && idTimeAtual === 0) {
        direcao = 1;
      } else {
        idTimeAtual += direcao;
      }
    });

    setTimesGerados(estruturaTimes);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-emerald-400">⚖️ Sorteio Inteligente</h1>
        <Link href="/" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-4 rounded-lg border border-slate-700">
          ⬅️ Voltar
        </Link>
      </div>

      {/* CONFIGURAÇÃO FLEXÍVEL */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Formato (Em Quadra)</label>
            <select 
              value={jogadoresPorTime} 
              onChange={(e) => setJogadoresPorTime(Number(e.target.value))} 
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-bold"
            >
              {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                <option key={n} value={n}>{n} vs {n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Qtd. de Equipes</label>
            <input 
              type="number" 
              min="2" max="10"
              value={qtdTimes} 
              onChange={(e) => setQtdTimes(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-bold" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Reservas por Time</label>
            <input 
              type="number" 
              min="0" max="10"
              value={qtdReservas} 
              onChange={(e) => setQtdReservas(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-bold" 
              placeholder="0 = Sem banco"
            />
          </div>
        </div>

        {/* ALERTA DE JOGADORES NECESSÁRIOS */}
        <div className="mt-4 p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 flex items-center justify-between">
          <span>Para este formato, você precisa selecionar idealmente:</span>
          <span className="font-black text-emerald-400 text-lg">
            {qtdTimes * (jogadoresPorTime + qtdReservas)} jogadores
          </span>
        </div>

        {/* HANDICAP DINÂMICO DOS GOLEIROS */}
        <div className="border-t border-slate-800 pt-4 mt-6">
          <h3 className="text-sm font-bold text-emerald-400 mb-3">🧤 Handicap de Nota dos Goleiros (1 a 10)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: qtdTimes }, (_, i) => String.fromCharCode(65 + i)).map((letra) => (
              <div key={letra} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <label className="block text-xs text-slate-400 font-bold mb-1">Time {letra}</label>
                <input 
                  type="number" min="1" max="10" 
                  value={goleirosHandicap[letra] || 5} 
                  onChange={(e) => setGoleirosHandicap({ ...goleirosHandicap, [letra]: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center font-bold text-emerald-400" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SELEÇÃO DOS PRESENTES */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">
          👥 Presentes ({selecionados.length} selecionados)
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2">
          {jogadores.map((j) => (
            <button
              key={j.id}
              onClick={() => toggleSelecao(j.id)}
              className={`flex justify-between items-center p-3 rounded-lg border text-left transition-all ${
                selecionados.includes(j.id)
                  ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <p className="font-bold text-sm">{j.nome}</p>
                <p className="text-xs text-slate-500">{j.posicao_principal}</p>
              </div>
              <span className="text-xs font-black text-emerald-400">OVR {j.avaliacoes[0]?.nota_geral || '0.0'}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={executarSorteio}
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 font-bold text-slate-950 py-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all text-lg"
        >
          🎲 Sortear Equipas
        </button>
      </div>

      {/* EXIBIÇÃO DOS TIMES */}
      {timesGerados.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timesGerados.map((time, idx) => {
            const mediaLinha = (time.somaOvr / (time.jogadores.length + 1)).toFixed(1);
            return (
              <div key={idx} className="bg-slate-900 border border-emerald-500/40 rounded-xl p-5 shadow-xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-xl font-bold text-emerald-400">{time.nome}</h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    Média OVR: {mediaLinha}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-3 font-semibold">
                  🧤 Goleiro (Handicap: {time.handicapGoleiro})
                </p>

                <div className="space-y-2">
                  {time.jogadores.map((jogador, index) => (
                    <div key={jogador.id} className={`flex justify-between items-center p-2.5 rounded border text-sm ${index >= jogadoresPorTime ? 'bg-slate-800/30 border-dashed border-slate-700 text-slate-400' : 'bg-slate-800/60 border-slate-700/50'}`}>
                      <span className="font-medium">
                        {index >= jogadoresPorTime && <span className="text-xs bg-slate-700 px-1 rounded mr-2">RES</span>}
                        {jogador.nome}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">{jogador.posicao_principal}</span>
                        <span className="font-bold text-emerald-400 text-xs">⭐ {jogador.avaliacoes[0]?.nota_geral || '0.0'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}