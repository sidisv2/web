import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';

export const ChatSlideOver: React.FC<{ isOpen: boolean; onClose: () => void; initialContext?: string }> = ({ isOpen, onClose, initialContext = 'general' }) => {
  const { messages, send, isTyping } = useChat({ initialContext: initialContext as any });
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 80);
    }
  }, [isOpen, messages, isTyping]);

  const getSentCount = () => {
    try { return parseInt(localStorage.getItem('sent_messages_count') || '0', 10); } catch { return 0; }
  };
  const incrementSentCount = () => {
    try { const s = getSentCount() + 1; localStorage.setItem('sent_messages_count', String(s)); } catch {}
  };

  const isAdmin = Boolean(user?.role === 'admin' || localStorage.getItem('aria_prop_mock_role') === 'admin');

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    if (!isAdmin) {
      const sent = getSentCount();
      if (sent >= 2) {
        openAuthModal('login');
        return;
      }
    }

    await send(input, initialContext, messages);
    if (!isAdmin) incrementSentCount();
    setInput('');
  };

  return (
    <div className={`slide-over fixed inset-0 z-50 pointer-events-none ${isOpen ? 'open' : ''}`}>
      <div className="overlay pointer-events-auto" onClick={onClose} />
      <aside className={`drawer pointer-events-auto bg-slate-900 text-slate-100 w-full max-w-md right-0 h-full shadow-2xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center gap-3">
          <h3 className="font-bold">Aria — Asistente</h3>
          <button className="ml-auto" onClick={onClose} aria-label="Cerrar"><X /></button>
        </div>

        <div className="p-4 overflow-y-auto flex-1" style={{ maxHeight: '70vh' }}>
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.sender === 'user' ? 'user' : 'agent'} mb-2`}>
              <div className="bubble" dangerouslySetInnerHTML={{ __html: (m.text || '').replace(/\n/g, '<br/>') }} />
            </div>
          ))}
          {isTyping && <div className="typing"><span className="typing-dots"><span></span><span></span><span></span></span> Aria está escribiendo...</div>}
          <div ref={endRef} />
        </div>

        <form onSubmit={submit} className="p-4 border-t flex gap-2">
          <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu mensaje..." />
          <button type="submit" className="btn primary">Enviar</button>
        </form>
      </aside>
    </div>
  );
};

export default ChatSlideOver;
