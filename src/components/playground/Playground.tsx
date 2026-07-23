import React, { useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { Bot } from 'lucide-react';

type TabKey = 'general' | 'finance' | 'rag' | 'files';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'general', label: 'Asistente 24/7' },
  { key: 'finance', label: 'Evaluador de Rentabilidad' },
  { key: 'rag', label: 'Buscador RAG Dossiers' },
  { key: 'files', label: 'Gestor Mis Archivos' },
];

export const Playground: React.FC = () => {
  const [active, setActive] = useState<TabKey>('general');
  const { messages, send, isTyping } = useChat({ initialContext: 'general' });
  const [localMessages, setLocalMessages] = useState(messages);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // When switching tabs we want the send() to use the selected context
  const handleSend = async (text: string) => {
    await send(text, active, localMessages as any);
  };

  return (
    <div className="playground card p-4 rounded-2xl bg-slate-900/90 border border-white/5">
      <div className="tabs flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`px-3 py-1 rounded-lg ${active === t.key ? 'bg-emerald-500 text-slate-900 font-bold' : 'bg-white/3 text-slate-200'}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-panel transition-opacity duration-200">
        {active === 'files' ? (
          <div className="files-manager p-4 rounded-lg bg-black/30 border border-white/5">
            <h4 className="font-bold mb-2">Gestor de Archivos</h4>
            <p className="text-sm text-slate-300 mb-3">Sube documentos y dossiers para búsqueda RAG. (Demo)</p>
            <input type="file" className="mb-2" />
            <div className="text-xs text-slate-400">(En esta demo los archivos no se suben realmente)</div>
          </div>
        ) : (
          <div className="console p-3 rounded-lg bg-black/30 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-800/40 flex items-center justify-center"><Bot className="w-4 h-4 text-emerald-400"/></div>
              <div>
                <div className="text-sm font-bold">{active === 'general' ? 'Asistente 24/7' : active === 'finance' ? 'Evaluador de Rentabilidad' : 'RAG Dossiers'}</div>
                <div className="text-xs text-slate-400">Contexto: {active}</div>
              </div>
            </div>

            <div className="messages max-h-48 overflow-y-auto p-2 space-y-2 text-sm mb-3">
              {localMessages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg ${m.sender === 'user' ? 'bg-emerald-600 text-slate-900' : 'bg-white/5 text-slate-200'}`}>{m.text}</div>
                </div>
              ))}
              {isTyping && <div className="text-xs italic text-slate-400">Aria está pensando...</div>}
            </div>

            <PlaygroundInput onSend={handleSend} placeholder={active === 'finance' ? 'Ej: Calcula el ROI de compra por alquiler...' : active === 'rag' ? 'Buscar en mis dossiers: contrato... ' : 'Escribe tu consulta...'} />
          </div>
        )}
      </div>
    </div>
  );
};

const PlaygroundInput: React.FC<{ onSend: (text: string) => Promise<void>; placeholder?: string }> = ({ onSend, placeholder }) => {
  const [val, setVal] = useState('');
  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); if (!val.trim()) return; await onSend(val); setVal(''); }}
      className="flex gap-2"
    >
      <input className="input flex-1" value={val} onChange={(e) => setVal(e.target.value)} placeholder={placeholder} />
      <button className="btn primary" type="submit">Enviar</button>
    </form>
  );
};

export default Playground;
