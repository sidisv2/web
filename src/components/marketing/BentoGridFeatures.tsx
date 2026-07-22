import React from 'react';
import { 
  FileText, 
  Zap, 
  Flame, 
  ThermometerSnowflake, 
  ThermometerSun, 
  MessageSquare, 
  Layers, 
  Bot, 
  ShieldCheck, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

export const BentoGridFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arquitectura B2B Enterprise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diseñado para Convertir Visitas Web en <br />
            <span className="text-emerald-400">Contratos Firmados</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Tu fuerza de ventas impulsada por inteligencia artificial generativa con acceso instantáneo a planos, catálogos y dossieres de calidades.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: IA & RAG Motor (Spans 2 cols on md) */}
          <div className="md:col-span-2 rounded-3xl bg-slate-900/80 border border-white/10 p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Comprensión RAG de Planos, Dossieres PDF y Memoria de Calidades
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Sube las escrituras, planos en PDF o memorias de acabados de tus promociones. El motor Gemini RAG analiza las características exactas y responde dudas sobre metros cuadrados útiles, terrazas, orientación solar y plazas de garaje.
              </p>
            </div>

            {/* Visual AI Graphic */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Bot className="w-4 h-4" /> Gemini 3.6 Flash RAG Engine
                </span>
                <span className="text-emerald-400 font-bold">Documentos Inyectados: 12 PDFs</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/20 text-slate-300">
                <p className="text-emerald-400 font-semibold mb-1">🔍 Consulta del Cliente:</p>
                <p className="italic">"¿El chalet de La Moraleja incluye instalación fotovoltaica y cuál es el coste estimado de IBI?"</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                <p className="font-semibold text-emerald-400 mb-1">⚡ Respuesta Extraída del PDF Dossier:</p>
                <p>"Sí. Incluye 14 paneles solares de 450W en cubierta. Según el certificado adjunto, el IBI anual es de 2.140€."</p>
              </div>
            </div>
          </div>

          {/* Card 2: Speed Metric < 1 Sec */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Respuesta Ultrarrápida &lt; 1s</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                El 78% de los compradores reservan con la primera agencia que contesta. Tu bot no hace esperar al cliente.
              </p>
            </div>

            <div className="mt-8 text-center p-6 rounded-2xl bg-slate-950 border border-emerald-500/20">
              <div className="text-5xl font-extrabold text-emerald-400 tracking-tight font-mono tabular-nums">
                0.8s
              </div>
              <p className="text-xs text-slate-400 mt-2">Latencia percibida en streaming</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Atención Ininterrumpida 24/7</span>
              </div>
            </div>
          </div>

          {/* Card 3: Lead Scoring (Hot, Warm, Cold) */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Clasificación Automática de Leads</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                La IA evalúa presupuesto, capacidad financiera y urgencia de compra categorizando cada prospecto en tiempo real.
              </p>
            </div>

            <div className="mt-6 space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-red-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-white">Lead Caliente (Hot)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300">Score 94/100</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-white">Lead Tibio (Warm)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">Score 68/100</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThermometerSnowflake className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-white">Lead Frío (Cold)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">Score 35/100</span>
              </div>
            </div>
          </div>

          {/* Card 4: WhatsApp Business & Integración Omnicanal (Spans 2 cols on md) */}
          <div className="md:col-span-2 rounded-3xl bg-slate-900/80 border border-white/10 p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Conexión con WhatsApp Business & CRM Agencias</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Los mensajes capturados en el widget de tu web o en WhatsApp se envían automáticamente al CRM de la agencia (Salesforce, Idealista Tools, Wasi o HubSpot) notificando a tus asesores humanos.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 font-semibold">
                WhatsApp Business API
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 font-semibold">
                Idealista Tools Sync
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 font-semibold">
                Salesforce Real Estate
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 font-semibold">
                Webhooks Custom
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
