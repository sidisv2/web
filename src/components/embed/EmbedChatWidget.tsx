// Reemplaza el contenido del componente EmbedChatWidget actual por esta versión
import React, { useState, useRef, useEffect } from 'react';
import { Property, BotConfig } from '../../types';
import { Send, Bot } from 'lucide-react';
import PaywallModal from '../chat/PaywallModal';
import { supabase } from '../../lib/supabaseClient';
import { TwitterActionCard } from '../marketing/TwitterActionCard';

interface EmbedChatWidgetProps {
  botConfig: BotConfig;
  properties: Property[];
}

export const EmbedChatWidget: React.FC<EmbedChatWidgetProps> = ({ botConfig, properties }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; property?: Property }>>([
    { sender: 'agent', text: botConfig.welcomeMessage || '¡Hola! Soy Aria. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Track sent messages count in localStorage
  const getSentCount = () => {
    try { return parseInt(localStorage.getItem('sent_messages_count') || '0', 10); } catch { return 0; }
  };
  const setSentCount = (v: number) => { try { localStorage.setItem('sent_messages_count', String(v)); } catch {} };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Check Supabase profile to allow bypass if plan_activo
  const checkUserPlanActive = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) return false;
      const { data: profiles } = await supabase.from('profiles').select('estado_cuenta,trial_ends_at').eq('id', user.id).single();
      const estado = (profiles as any)?.estado_cuenta;
      if (estado === 'plan_activo') return true;
      if (estado === 'prueba_7dias' || (profiles as any)?.trial_ends_at) {
        const t = (profiles as any)?.trial_ends_at;
        if (t && new Date(t) > new Date()) return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSend = async (text?: string) => {
    const textToSend = text || inputValue;
    if (!textToSend.trim()) return;

    // If user has active plan, allow sending unlimited
    const isPlanActive = await checkUserPlanActive();
    if (!isPlanActive) {
      const sent = getSentCount();
      if (sent >= 1) {
        // block, show subscription modal
        setInputDisabled(true);
        setShowPaywall(true);
        return;
      }
      setSentCount(sent + 1);
    }

    // proceed sending
    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.map((m) => ({ sender: m.sender, content: m.text })),
        }),
      });

      if (!response.body) {
        setIsTyping(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      // Add placeholder agent response (streaming will update it)
      setMessages((prev) => [...prev, { sender: 'agent', text: '', property: undefined }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.sender === 'agent') last.text = fullText;
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [...prev, { sender: 'agent', text: 'Lo siento, hubo un error procesando la respuesta.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* CTA card hacia Twitter/X */}
      <TwitterActionCard onSelectPrompt={(prompt) => handleSend(prompt)} />

      {/* Chat container (principal) */}
      <div className="chat-container rounded-3xl overflow-hidden flex flex-col">
        <div className="chat-header p-4" style={{ backgroundColor: botConfig.primaryColor || '#10b981' }}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <Bot />
            </div>
            <div>
              <h4 className="font-bold">{botConfig.agentName || 'Aria Prop IA'}</h4>
              <p className="text-xs">{botConfig.agencyName}</p>
            </div>
            <div className="ml-auto badge">Widget Embebido</div>
          </div>
        </div>

        <div className="chat-messages p-4 overflow-y-auto flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`message ${m.sender === 'user' ? 'user' : 'agent'}`}>
              <div className="bubble">{m.text}</div>
              {m.property && (
                <div className="prop-card">
                  <img src={m.property.images[0]} alt={m.property.title} />
                  <div>{m.property.title}</div>
                </div>
              )}
            </div>
          ))}
          {isTyping && <div className="typing">Aria está escribiendo...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input p-3 border-t">
          <input
            type="text"
            disabled={inputDisabled}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta..."
            className="input"
          />
          <button onClick={() => handleSend()} className="send-btn" disabled={inputDisabled}>
            <Send />
          </button>
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => {
          setShowPaywall(false);
          setInputDisabled(false);
        }}
        onSubscriptionActivated={() => {
          setSentCount(0);
          setInputDisabled(false);
        }}
      />
    </div>
  );
};

export default EmbedChatWidget;
