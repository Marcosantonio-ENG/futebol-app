'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function FinanceiroPage() {
  const [jogadores, setJogadores] = useState([]);
  const [presencas, setPresencas] = useState({});
  const [valorJogo, setValorJogo] = useState(12);
  const [valorChurrasco, setValorChurrasco] = useState(25);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    carregarJogadores();
  }, []);

  const carregarJogadores = async () => {
    const { data } = await supabase.from('jogadores').select('*').order('nome');
    if (data) {
      setJogadores(data);
      const estadoInicial = {};
      data.forEach((j) => {
        estadoInicial[j.id] = {
          vaiJogar: false,
          vaiChurrasco: false,
          pagou: false,
        };
      });
      setPresencas(estadoInicial);
    }
  };

  const toggleEstado = (id, campo) => {
    setPresencas((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: !prev[id]?.[campo],
      },
    }));
  };

  // Cálculos financeiros automatizados
  const confirmadosJogo = Object.values(presencas).filter((p) => p.vaiJogar).length;
  const confirmadosChurrasco = Object.values(presencas).filter((p) => p.vaiChurrasco).length;

  const totalArrecadado = Object.entries(presencas).reduce((acc, [_, p]) => {
    if (!p.pagou) return acc;
    let valor = 0;
    if (p.vaiJogar) valor += Number(valorJogo);
    if (p.vaiChurrasco) valor += Number(valorChurrasco);
    return acc + valor;
  }, 0);

  const totalPendente = Object.entries(presencas).reduce((acc, [_, p]) => {
    if (p.pagou) return acc;
    let valor = 0;
    if (p.vaiJogar) valor += Number(valorJogo);
    if (p.vaiChurrasco) valor += Number(valorChurrasco);
    return acc + valor;
  }, 0);

  // Gera o texto formatado com emojis para o WhatsApp
  const gerarTextoWhatsApp = () => {
    const confirmados = jogadores.filter((j) => presencas[j.id]?.vaiJogar);
    const churrasqueiros = jogadores.filter((j) => presencas[j.id]?.vaiChurrasco);

    let texto = `⚽ *FUTEBOL RAIZ - LISTA DO PRÓXIMO JOGO* ⚽\n\n`;
    texto += `💰 *Valores:* Jogo R$ ${valorJogo},00 | Churrasco R$ ${valorChurrasco},00\n`;
    texto += `-----------------------------------\n\n`;
    texto += `🏃 *CONFIRMADOS (${confirmados.length}):*\n`;

    confirmados.forEach((j, index) => {
      const p = presencas[j.id];
      const statusPag = p.pagou ? '✅ (Pago)' : '❌ (Pendente)';
      const temChurras = p.vaiChurrasco ? ' 🍖' : '';
      texto += `${index + 1}. ${j.nome}${temChurras} - ${statusPag}\n`;
    });

    if (churrasqueiros.length > 0) {
      texto += `\n🍖 *PRESENÇA NO CHURRASCO (${churrasqueiros.length}):*\n`;
      churrasqueiros.forEach((j) => {
        texto += `• ${j.nome}\n`;
      });
    }

    texto += `\n📊 *RESUMO DO CAIXA:*\n`;
    texto += `• Total Arrecadado: R$ ${totalArrecadado},00\n`;
    texto += `• Total a Receber: R$ ${totalPendente},00\n\n`;
    texto += `📲 *Chave Pix:* insira-aqui-sua-chave-pix`;

    return texto;
  };

  const copiarWhatsApp = () => {
    const texto = gerarTextoWhatsApp();
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 max-w-4xl mx-auto">
      {/* NAVEGAÇÃO */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-emerald-400">💵 Gestão Financeira & Pix</h1>
        <Link href="/" className="text-xs bg-slate-800 text-slate-300 font-bold py-2 px-4 rounded-lg border border-slate-700">
          ⬅️ Início
        </Link>
      </div>

      {/* DEFINIÇÃO DE VALORES */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Valor da Partida (R$)</label>
          <input 
            type="number" 
            value={valorJogo} 
            onChange={(e) => setValorJogo(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-bold" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Valor do Churrasco (R$)</label>
          <input 
            type="number" 
            value={valorChurrasco} 
            onChange={(e) => setValorChurrasco(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-bold" 
          />
        </div>
      </div>

      {/* PAINEL DE RESUMO DE CAIXA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Confirmados Jogo</span>
          <span className="text-3xl font-black text-emerald-400">{confirmadosJogo}</span>
        </div>
        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Total Recebido</span>
          <span className="text-3xl font-black text-emerald-400">R$ {totalArrecadado}</span>
        </div>
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4 text-center">
          <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Pendente</span>
          <span className="text-3xl font-black text-amber-400">R$ {totalPendente}</span>
        </div>
      </div>

      {/* TABELA DE CONFIRMAÇÃO E PAGAMENTOS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">📋 Controle de Presença e Pix</h2>
          <button
            onClick={copiarWhatsApp}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase px-4 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            {copiado ? '✅ Copiado!' : '📲 Copiar Lista p/ WhatsApp'}
          </button>
        </div>

        <div className="space-y-3">
          {jogadores.map((j) => {
            const p = presencas[j.id] || {};
            const totalIndividual = (p.vaiJogar ? valorJogo : 0) + (p.vaiChurrasco ? valorChurrasco : 0);

            return (
              <div key={j.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 gap-3">
                <div>
                  <span className="font-bold text-sm block text-white">{j.nome}</span>
                  <span className="text-xs text-slate-400 font-semibold">Total a pagar: R$ {totalIndividual},00</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
                  {/* Botão Jogo */}
                  <button
                    onClick={() => toggleEstado(j.id, 'vaiJogar')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      p.vaiJogar ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    ⚽ Jogo
                  </button>

                  {/* Botão Churrasco */}
                  <button
                    onClick={() => toggleEstado(j.id, 'vaiChurrasco')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      p.vaiChurrasco ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    🍖 Churras
                  </button>

                  {/* Botão Status Pix */}
                  <button
                    onClick={() => toggleEstado(j.id, 'pagou')}
                    className={`px-3 py-1.5 rounded text-xs font-black uppercase transition-all ${
                      p.pagou ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {p.pagou ? 'PAID ✅' : 'PIX ❌'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}