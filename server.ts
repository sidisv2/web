import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { INITIAL_PROPERTIES, INITIAL_LEADS, INITIAL_BOT_CONFIG } from './src/data/mockData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory data store for live sessions & interactive demos
  let properties = [...INITIAL_PROPERTIES];
  let leads = [...INITIAL_LEADS];
  let botConfig = { ...INITIAL_BOT_CONFIG };

  // Helper for lazy Gemini initialization
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined. Using fallback AI responses.');
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // --- API ROUTES ---
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'PropTech AI Agent Platform', timestamp: new Date().toISOString() });
  });

  // Get Properties
  app.get('/api/properties', (req, res) => {
    res.json({ success: true, data: properties });
  });

  // Create Property
  app.post('/api/properties', (req, res) => {
    const newProperty = {
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      documents: [],
      featured: false,
      status: 'available' as const,
      ...req.body,
    };
    properties.unshift(newProperty);
    res.json({ success: true, data: newProperty });
  });

  // Get Leads
  app.get('/api/leads', (req, res) => {
    res.json({ success: true, data: leads });
  });

  // Update Lead Status / Temperature
  app.patch('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const leadIndex = leads.findIndex((l) => l.id === id);
    if (leadIndex !== -1) {
      leads[leadIndex] = { ...leads[leadIndex], ...req.body };
      res.json({ success: true, data: leads[leadIndex] });
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  });

  // Get/Update Bot Config
  app.get('/api/bot-config', (req, res) => {
    res.json({ success: true, data: botConfig });
  });

  app.post('/api/bot-config', (req, res) => {
    botConfig = { ...botConfig, ...req.body };
    res.json({ success: true, data: botConfig });
  });

  // Streaming AI Chat Endpoint (RAG Injection with Gemini)
  app.post('/api/chat', async (req, res) => {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare RAG Context from active properties
    const propertyCatalogContext = properties
      .map(
        (p) =>
          `- [ID: ${p.id}] ${p.title} (${p.type.toUpperCase()}) en ${p.location.zone}, ${p.location.city}. Precio: $${p.price.toLocaleString('en-US')} USD. ${p.features.bedrooms} hab, ${p.features.bathrooms} baños, ${p.features.areaM2} m². Terraza: ${p.features.terraceM2 || 0}m², Piscina: ${p.features.pool ? 'Sí' : 'No'}, Garaje: ${p.features.garage ? 'Sí' : 'No'}. Código: ${p.code}. Descripción: ${p.description}`
      )
      .join('\n');

    const systemPrompt = `
Eres "${botConfig.agentName}", la asistente virtual de inteligencia artificial especializada en bienes raíces para la agencia "${botConfig.agencyName}" en Latinoamérica.
Tu objetivo es ayudar a clientes interesados en comprar, alquilar o invertir en propiedades inmobiliarias de alto nivel en América Latina (México, Colombia, Argentina, Chile, Perú, Uruguay, etc.).

REGLAS DE ACTUACIÓN:
1. Responde de forma sofisticada, cálida, profesional y directa en español latinoamericano.
2. Utiliza la siguiente lista de propiedades en catálogo como fuente de verdad para recomendar inmuebles cuando coincidan con los criterios del cliente:
${propertyCatalogContext}

3. Si el cliente menciona presupuesto, ciudad/zona (Polanco, El Poblado, San Isidro, Puerto Madero, Vitacura, etc.), número de dormitorios o amenidades (piscina, garaje, terraza), identifica la propiedad más relevante del catálogo y ofrécesela amablemente detallando sus fortalezas con precios en USD ($).
4. Si el cliente expresa interés firme en visitar un inmueble o coordinar una llamada, solicítale sus datos y coordinen por WhatsApp.
5. Mantén respuestas concisas (máximo 2-3 párrafos cortos) e incluye viñetas si listas características.
`;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback simulated streaming response if no API key is provided
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const matchingProp = properties.find((p) =>
        message.toLowerCase().includes(p.location.city.toLowerCase()) ||
        message.toLowerCase().includes(p.type) ||
        message.toLowerCase().includes('lujo') ||
        message.toLowerCase().includes('madrid')
      ) || properties[0];

      const fallbackText = `¡Hola! Con gusto te asesoro. En nuestro catálogo exclusivo contamos con excelentes opciones, como por ejemplo: **${matchingProp.title}** en ${matchingProp.location.zone} (${matchingProp.location.city}). Cuenta con ${matchingProp.features.bedrooms} dormitorios, ${matchingProp.features.areaM2} m² y su precio es de ${matchingProp.price.toLocaleString('es-ES')}€. ¿Te gustaría agendar una visita presencial esta semana?`;

      const words = fallbackText.split(' ');
      for (const word of words) {
        res.write(`data: ${JSON.stringify({ text: word + ' ' })}\n\n`);
        await new Promise((r) => setTimeout(r, 40));
      }
      res.write(`data: ${JSON.stringify({ done: true, recommendedPropertyId: matchingProp.id })}\n\n`);
      return res.end();
    }

    try {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Format conversation history for Gemini chat
      const formattedContents = [
        ...history.map((h: { sender: string; content: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.6-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err: unknown) {
      console.error('Gemini API Streaming Error:', err);
      res.write(`data: ${JSON.stringify({ error: 'Error procesando la respuesta de la IA' })}\n\n`);
      res.end();
    }
  });

  // Embedded Widget Script generator
  app.get('/embed/script.js', (req, res) => {
    const host = req.headers.host || 'localhost:3000';
    const protocol = req.protocol || 'http';
    const script = `
(function() {
  var agentId = document.currentScript.getAttribute('data-agent-id') || 'prop-agent-001';
  var iframe = document.createElement('iframe');
  iframe.src = '${protocol}://${host}/embed/chat/' + agentId;
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '380px';
  iframe.style.height = '620px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
  iframe.style.zIndex = '999999';
  iframe.allow = 'camera; microphone';
  document.body.appendChild(iframe);
})();
`;
    res.setHeader('Content-Type', 'application/javascript');
    res.send(script);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PropTech AI Agent Enterprise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
