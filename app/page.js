'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [posicao, setPosicao] = useState('Atacante');
  const [tecnica, setTecnica] = useState(5);
  const [tatica, setTatica] = useState(5);
  const [fisico, setFisico] = useState(5);
  const [mental, setMental] = useState(5);
  const [mensagem, setMensagem] = useState('');
  const [jogadores, setJogadores] = useState([]);

  const carregarJogadores = async () => {
    const { data, error } = await supabase
      .from('jogadores')
      .select('*, avaliacoes(*)');
      
    if (!error && data) {
      setJogadores(data);
    }
  };

  useEffect(() => {
    carregarJogadores();
  }, []);

  const salvarJogador = async (e) => {
    e.preventDefault();
    setMensagem('A guardar...');

    const { data: jogador, error: errJogador } = await supabase
      .from('jogadores')
      .insert([{ nome, cpf, posicao_principal: posicao }])
      .select()
      .single();

    if (errJogador) {
      setMensagem('Erro ao guardar jogador.');
      return;
    }

    const notaGeral = ((Number(tecnica) + Number(tatica) + Number(fisico) + Number(mental)) / 4).toFixed(1);

    const { error: errAvaliacao } = await supabase.from('avaliacoes').insert([
      {
        jogador_id: jogador.id,
        nota_tecnica: tecnica,
        nota_tatica: tatica,
        nota_fisica: fisico,
        nota_mental: mental,
        nota_geral: notaGeral,
      },
    ]);

    if (!errAvaliacao) {
      setMensagem('✅ Jogador cadastrado com sucesso!');
      setNome('');
      setCpf('');
      carregarJogadores();
      setTimeout(() => setMensagem(''), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center">
      {/* NAVEGAÇÃO SUPERIOR (MENU COMPLETO) */}
      <div className="max-w-5xl w-full flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-black text-emerald-400 tracking-wider uppercase">Futebol Raiz</h1>
          <p className="text-xs text-slate-400">Painel de Controlo do Clube</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/sorteio" className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs uppercase px-3.5 py-2.5 rounded-lg border border-slate-700 transition-all">
            ⚖️ Sorteio
          </Link>
          <Link href="/beira-quadra" className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs uppercase px-3.5 py-2.5 rounded-lg border border-slate-700 transition-all">
            ⏱️ Beira Quadra
          </Link>
          <Link href="/financeiro" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase px-3.5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
            💵 Financeiro/Pix
          </Link>
        </div>
      </div>

      {/* FORMULÁRIO DE CADASTRO */}
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-12">
        <h2 className="text-xl font-bold text-emerald-400 mb-4 text-center">⚽ Cadastrar Atleta</h2>
        
        {mensagem && (
          <div className="mb-4 p-3 bg-slate-800 border border-emerald-500/50 rounded-lg text-center text-sm font-semibold text-emerald-300">
            {mensagem}
          </div>
        )}

        <form onSubmit={salvarJogador} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Nome Completo</label>
            <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">CPF (Login)</label>
              <input type="text" required value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Posição</label>
              <select value={posicao} onChange={(e) => setPosicao(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 font-medium">
                <option>Goleiro</option>
                <option>Zagueiro</option>
                <option>Lateral</option>
                <option>Meia</option>
                <option>Atacante</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Atributos Técnicos (1 a 10)</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><label className="block text-slate-400 mb-1 font-semibold">Técnica: <span className="text-emerald-400 font-bold">{tecnica}</span></label><input type="range" min="1" max="10" value={tecnica} onChange={(e) => setTecnica(e.target.value)} className="w-full accent-emerald-500" /></div>
              <div><label className="block text-slate-400 mb-1 font-semibold">Tática: <span className="text-emerald-400 font-bold">{tatica}</span></label><input type="range" min="1" max="10" value={tatica} onChange={(e) => setTatica(e.target.value)} className="w-full accent-emerald-500" /></div>
              <div><label className="block text-slate-400 mb-1 font-semibold">Físico: <span className="text-emerald-400 font-bold">{fisico}</span></label><input type="range" min="1" max="10" value={fisico} onChange={(e) => setFisico(e.target.value)} className="w-full accent-emerald-500" /></div>
              <div><label className="block text-slate-400 mb-1 font-semibold">Mental: <span className="text-emerald-400 font-bold">{mental}</span></label><input type="range" min="1" max="10" value={mental} onChange={(e) => setMental(e.target.value)} className="w-full accent-emerald-500" /></div>
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 font-black text-slate-950 py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] uppercase tracking-wider text-sm">
            Guardar Atleta
          </button>
        </form>
      </div>

      {/* GALERIA DE CARTINHAS ESTILO FIFA */}
      <div className="max-w-5xl w-full">
        <h2 className="text-xl font-black text-white uppercase tracking-wider mb-8 border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>🏆 Cartinhas do Elenco</span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            {jogadores.length} Atletas
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {jogadores.map((jogador) => {
            const avaliacao = jogador.avaliacoes[0] || {};
            
            return (
              <div 
                key={jogador.id} 
                className="relative w-64 h-[380px] bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 border-2 border-emerald-400/80 rounded-t-[3rem] rounded-b-[2rem] p-4 shadow-[0_0_25px_rgba(16,185,129,0.25)] flex flex-col justify-between overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:border-emerald-300"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start pt-2 px-2">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_2px_10px_rgba(16,185,129,0.5)]">
                      {avaliacao.nota_geral || '0.0'}
                    </span>
                    <span className="text-[11px] font-black uppercase text-emerald-200 tracking-widest bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 mt-1">
                      {jogador.posicao_principal?.substring(0, 3)}
                    </span>
                  </div>

                  <div className="text-xl opacity-80">⚽</div>
                </div>

                <div className="relative z-10 flex flex-col items-center my-1">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-t from-slate-900 to-slate-800 border-2 border-emerald-400/60 flex items-center justify-center shadow-lg relative overflow-hidden group">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>

                <div className="relative z-10 text-center border-b border-t border-emerald-500/30 py-1.5 my-1 bg-slate-900/60 backdrop-blur-sm">
                  <h3 className="text-base font-black text-white uppercase tracking-wider truncate px-2 drop-shadow-md">
                    {jogador.nome}
                  </h3>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-1 px-4 py-2 bg-slate-950/70 rounded-xl border border-emerald-500/20 text-xs font-bold">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">TÉC</span>
                    <span className="text-emerald-300 font-extrabold">{avaliacao.nota_tecnica || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">FÍS</span>
                    <span className="text-emerald-300 font-extrabold">{avaliacao.nota_fisica || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">TÁT</span>
                    <span className="text-emerald-300 font-extrabold">{avaliacao.nota_tatica || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">MEN</span>
                    <span className="text-emerald-300 font-extrabold">{avaliacao.nota_mental || 0}</span>
                  </div>
                </div>

                <div className="relative z-10 text-center text-[10px] text-emerald-500/70 font-semibold tracking-widest uppercase pb-1">
                  FUTEBOL RAIZ • EA CARD
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}