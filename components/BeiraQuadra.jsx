'use client';
import { useState, useEffect } from 'react';
import { Play, Pause, Square, UserCheck, X } from 'lucide-react';

export function BeiraQuadra() {
  const [golsA, setGolsA] = useState(2);
  const [golsB, setGolsB] = useState(1);
  const [tempoSegundos, setTempoSegundos] = useState(872);
  const [rodando, setRodando] = useState(false);
  const [modalGol, setModalGol] = useState({ aberto: false, time: null });

  const [historico, setHistorico] = useState([
    { tempo: "12'", jogador: "Kayke Mello", time: "A" },
    { tempo: "08'", jogador: "Ricardo Paris", time: "B" },
    { tempo: "03'", jogador: "Marcos Silva", time: "A" },
  ]);

  const jogadoresA = ['Kayke Mello', 'Marcos Silva', 'João (GOL)'];
  const jogadoresB = ['Ricardo Paris', 'Rodrigo', 'Pedro (GOL)'];

  useEffect(() => {
    let interval = null;
    if (rodando) {
      interval = setInterval(() => {
        setTempoSegundos((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [rodando]);

  const formatarTempo = (totalSegundos) => {
    const min = Math.floor(totalSegundos / 60);
    const seg = totalSegundos % 60;
    return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  };

  const registrarGol = (nomeJogador) => {
    const min = Math.floor(tempoSegundos / 60);
    const novoRegistro = {
      tempo: `${min}'`,
      jogador: nomeJogador,
      time: modalGol.time,
    };

    if (modalGol.time === 'A') {
      setGolsA((prev) => prev + 1);
    } else {
      setGolsB((prev) => prev + 1);
    }

    setHistorico([novoRegistro, ...historico]);
    setModalGol({ aberto: false, time: null });
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto p-4 text-white relative">
      <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <span className="text-xs text-emerald-400 font-extrabold tracking-widest uppercase block">
          ⏱️ JOGO EM ANDAMENTO
        </span>

        {/* Placar Gigante */}
        <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <div className="flex-1 text-center">
            <span className="text-xs text-emerald-400 font-bold block mb-1">TIME A</span>
            <span className="text-5xl font-black text-white">{golsA}</span>
          </div>
          <span className="text-2xl font-black text-zinc-600">X</span>
          <div className="flex-1 text-center">
            <span className="text-xs text-blue-400 font-bold block mb-1">TIME B</span>
            <span className="text-5xl font-black text-white">{golsB}</span>
          </div>
        </div>

        {/* Cronômetro e Controles da Partida */}
        <div className="flex justify-between items-center bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
          <span className="text-zinc-400 font-mono text-xs font-bold flex items-center gap-1.5">
            Tempo: <strong className="text-emerald-400 text-sm">{formatarTempo(tempoSegundos)}</strong>
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setRodando(!rodando)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                rodando 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {rodando ? <Pause size={12} /> : <Play size={12} />}
              {rodando ? 'Pausar' : 'Iniciar'}
            </button>
            <button 
              onClick={() => { setRodando(false); setTempoSegundos(0); }}
              className="px-3 py-1.5 bg-red-950/80 text-red-400 border border-red-800/40 rounded-lg font-bold text-xs flex items-center gap-1"
            >
              <Square size={12} /> Encerrar
            </button>
          </div>
        </div>

        {/* Botões XL para Celular */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setModalGol({ aberto: true, time: 'A' })} 
            className="h-16 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-emerald-400 rounded-xl font-bold text-base active:scale-95 transition"
          >
            ⚽ + GOL A
          </button>
          <button 
            onClick={() => setModalGol({ aberto: true, time: 'B' })} 
            className="h-16 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-400 rounded-xl font-bold text-base active:scale-95 transition"
          >
            ⚽ + GOL B
          </button>
        </div>

        {/* Histórico dos Gols */}
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-left text-xs space-y-1 font-mono">
          <span className="text-zinc-500 font-bold block mb-1">Histórico:</span>
          {historico.map((item, index) => (
            <p key={index} className="text-zinc-300">
              {item.tempo} - Gol: <strong className={item.time === 'A' ? 'text-emerald-400' : 'text-blue-400'}>{item.jogador}</strong> ({item.time})
            </p>
          ))}
        </div>
      </div>

      {/* Modal Selecionar Autor do Gol */}
      {modalGol.aberto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-xs rounded-2xl p-4 space-y-3 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
                <UserCheck size={16} className={modalGol.time === 'A' ? 'text-emerald-400' : 'text-blue-400'} />
                QUEM FEZ O GOL? ({modalGol.time === 'A' ? 'TIME A' : 'TIME B'})
              </h3>
              <button onClick={() => setModalGol({ aberto: false, time: null })} className="text-zinc-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 pt-1">
              {(modalGol.time === 'A' ? jogadoresA : jogadoresB).map((nome, idx) => (
                <button
                  key={idx}
                  onClick={() => registrarGol(nome)}
                  className="w-full text-left bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-xs font-bold text-zinc-200 active:scale-95 transition flex justify-between items-center"
                >
                  <span>{nome}</span>
                  <span className="text-emerald-400">⚽</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}