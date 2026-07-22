import React, { useState, useEffect } from 'react';
import { AppRoute, Property, Lead, BotConfig } from './types';
import { INITIAL_PROPERTIES, INITIAL_LEADS, INITIAL_BOT_CONFIG } from './data/mockData';
import { Header } from './components/common/Header';
import { DashboardSidebar } from './components/common/DashboardSidebar';
import { HeroSection } from './components/marketing/HeroSection';
import { SocialProofMarquee } from './components/marketing/SocialProofMarquee';
import { BentoGridFeatures } from './components/marketing/BentoGridFeatures';
import { PricingSection } from './components/marketing/PricingSection';
import { Footer } from './components/marketing/Footer';
import { MetricsView } from './components/dashboard/MetricsView';
import { PropertiesView } from './components/dashboard/PropertiesView';
import { LeadsView } from './components/dashboard/LeadsView';
import { BotConfigView } from './components/dashboard/BotConfigView';
import { CheckoutView } from './components/dashboard/CheckoutView';
import { EmbedChatWidget } from './components/embed/EmbedChatWidget';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('marketing');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [botConfig, setBotConfig] = useState<BotConfig>(INITIAL_BOT_CONFIG);
  const [selectedLeadForChat, setSelectedLeadForChat] = useState<string | undefined>(undefined);

  // Fetch initial state from server API
  useEffect(() => {
    fetch('/api/properties')
      ? fetch('/api/properties')
          .then((res) => res.json())
          .then((data) => {
            if (data.data) setProperties(data.data);
          })
          .catch(() => {})
      : null;

    fetch('/api/leads')
      ? fetch('/api/leads')
          .then((res) => res.json())
          .then((data) => {
            if (data.data) setLeads(data.data);
          })
          .catch(() => {})
      : null;

    fetch('/api/bot-config')
      ? fetch('/api/bot-config')
          .then((res) => res.json())
          .then((data) => {
            if (data.data) setBotConfig(data.data);
          })
          .catch(() => {})
      : null;
  }, []);

  const handleAddProperty = async (newPropData: Omit<Property, 'id' | 'createdAt' | 'documents' | 'featured'>) => {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPropData),
      });
      const result = await res.json();
      if (result.data) {
        setProperties((prev) => [result.data, ...prev]);
      } else {
        const localProp: Property = {
          id: `prop-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
          documents: [],
          featured: false,
          ...newPropData,
        };
        setProperties((prev) => [localProp, ...prev]);
      }
    } catch {
      const localProp: Property = {
        id: `prop-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        documents: [],
        featured: false,
        ...newPropData,
      };
      setProperties((prev) => [localProp, ...prev]);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // ignore
    }
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleUpdateBotConfig = async (updated: Partial<BotConfig>) => {
    const newConfig = { ...botConfig, ...updated };
    setBotConfig(newConfig);
    try {
      await fetch('/api/bot-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    } catch {
      // ignore
    }
  };

  const handleInterveneLead = (leadId: string) => {
    setSelectedLeadForChat(leadId);
    setCurrentRoute('dashboard-leads');
  };

  const isDashboardRoute = currentRoute.startsWith('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header */}
      <Header currentRoute={currentRoute} onRouteChange={setCurrentRoute} agencyName={botConfig.agencyName} />

      {/* Main Content Layout */}
      {isDashboardRoute ? (
        <div className="flex-1 flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar
            currentRoute={currentRoute}
            onRouteChange={setCurrentRoute}
            propertiesCount={properties.length}
            leadsCount={leads.length}
          />
          
          <main className="flex-1 overflow-x-hidden bg-slate-950">
            {currentRoute === 'dashboard-metrics' && (
              <MetricsView leads={leads} onInterveneLead={handleInterveneLead} />
            )}
            {currentRoute === 'dashboard-properties' && (
              <PropertiesView properties={properties} onAddProperty={handleAddProperty} />
            )}
            {currentRoute === 'dashboard-leads' && (
              <LeadsView
                leads={leads}
                onUpdateLeadStatus={handleUpdateLeadStatus}
                selectedLeadForChat={selectedLeadForChat}
                onClearSelectedLead={() => setSelectedLeadForChat(undefined)}
              />
            )}
            {currentRoute === 'dashboard-bot-config' && (
              <BotConfigView botConfig={botConfig} onUpdateBotConfig={handleUpdateBotConfig} />
            )}
            {currentRoute === 'dashboard-checkout' && (
              <CheckoutView onRouteChange={setCurrentRoute} />
            )}
          </main>
        </div>
      ) : currentRoute === 'embed-preview' ? (
        <div className="flex-1 p-8 max-w-4xl mx-auto space-y-6 text-center">
          <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4">
            <h2 className="text-2xl font-bold text-white">Vista Previa del Widget Embebible Flotante</h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              El widget abajo a la derecha es exactamente lo que verán tus visitantes. Interactúa con él en directo con respuestas RAG simuladas o Gemini Flash.
            </p>
          </div>
          <EmbedChatWidget botConfig={botConfig} properties={properties} />
        </div>
      ) : (
        <main className="flex-1">
          <HeroSection sampleProperties={properties} onRouteChange={setCurrentRoute} />
          <SocialProofMarquee />
          <BentoGridFeatures />
          <PricingSection onRouteChange={setCurrentRoute} />
          <Footer />
        </main>
      )}

      {/* Floating Chat Widget across all pages for testing */}
      {currentRoute !== 'embed-preview' && (
        <EmbedChatWidget botConfig={botConfig} properties={properties} />
      )}

    </div>
  );
}
