import { useState } from 'react';

export function useChat(options?: { initialContext?: 'general' | 'finance' | 'rag' }) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (message: string, context: string = 'general', history: any[] = []) => {
    setError(null);
    if (!message || !message.trim()) return null;

    // Optimistic UI: add user bubble and one agent placeholder
    setMessages((m) => [...m, { sender: 'user', text: message }]);
    setMessages((m) => [...m, { sender: 'agent', text: '' }]); // placeholder
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, context }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error((payload && payload.error) || `AI error ${res.status}`);
      }

      const data = await res.json();
      const reply = data?.text || 'No pude obtener respuesta.';

      // Reemplazar el último placeholder del agente con la respuesta
      setMessages((prev) => {
        const copy = [...prev];
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === 'agent') {
            copy[i].text = reply;
            break;
          }
        }
        return copy;
      });

      return reply;
    } catch (err: any) {
      const errMsg = err?.message || 'Error al contactar IA';

      // REEMPLAZAR el último placeholder del agente con el error (no añadir burbuja extra)
      setMessages((prev) => {
        const copy = [...prev];
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === 'agent') {
            copy[i].text = `Error: ${errMsg}`;
            break;
          }
        }
        return copy;
      });

      setError(errMsg);
      return null;
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, setMessages, isTyping, error, send };
}
