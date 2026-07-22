import React from 'react';
import { AppRoute, Property, Lead, BotConfig } from '../../types';
import { Header } from '../common/Header';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { HeroSection } from '../marketing/HeroSection';
import { SocialProofMarquee } from '../marketing/SocialProofMarquee';
import { BentoGridFeatures } from '../marketing/BentoGridFeatures';
import { PricingSection } from '../marketing/PricingSection';
import { Footer } from '../marketing/Footer';
import { MetricsView } from '../dashboard/MetricsView';
import { PropertiesView } from '../dashboard/PropertiesView';
import { LeadsView } from '../dashboard/LeadsView';
import { BotConfigView } from '../dashboard/BotConfigView';
import { CheckoutView } from '../dashboard/CheckoutView';
import { UserProfileDashboard } from '../profile/UserProfileDashboard';
import { EmbedChatWidget } from '../embed/EmbedChatWidget';
import { AuthModal } from '../auth/AuthModal';

interface DesktopViewProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  properties: Property[];
  leads: Lead[];
  botConfig: BotConfig;
  selectedLeadForChat?: string;
  onClearSelectedLead: () => void;
  onInterveneLead: (leadId: string) => void;
  onAddProperty: (newProp: Omit<Property, 'id' | 'createdAt' | 'documents' | 'featured'>) => Promise<void>;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => Promise<void>;
  onUpdateBotConfig: (config: Partial<BotConfig>) => Promise<void>;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  currentRoute,
  onRouteChange,
  properties,
  leads,
  botConfig,
  selectedLeadForChat,
  onClearSelectedLead,
  onInterveneLead,
  onAddProperty,
  onUpdateLeadStatus,
  onUpdateBotConfig,
}) => {
  const isDashboardRoute = currentRoute.startsWith('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* PC Top Navbar */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={onRouteChange}
        agencyName={botConfig.agencyName}
      />

      {/* Main Content Layout */}
      {isDashboardRoute ? (
        <div className="flex-1 flex min-h-[calc(100vh-4rem)]">
          <DashboardSidebar
            currentRoute={currentRoute}
            onRouteChange={onRouteChange}
            propertiesCount={properties.length}
            leadsCount={leads.length}
          />
          
          <main className="flex-1 overflow-x-hidden bg-slate-950 p-6">
            {currentRoute === 'dashboard-metrics' && (
              <MetricsView leads={leads} onInterveneLead={onInterveneLead} />
            )}
            {currentRoute === 'dashboard-properties' && (
              <PropertiesView properties={properties} onAddProperty={onAddProperty} />
            )}
            {currentRoute === 'dashboard-leads' && (
              <LeadsView
                leads={leads}
                onUpdateLeadStatus={onUpdateLeadStatus}
                selectedLeadForChat={selectedLeadForChat}
                onClearSelectedLead={onClearSelectedLead}
              />
            )}
            {currentRoute === 'dashboard-bot-config' && (
              <BotConfigView botConfig={botConfig} onUpdateBotConfig={onUpdateBotConfig} />
            )}
            {currentRoute === 'dashboard-checkout' && (
              <CheckoutView onRouteChange={onRouteChange} />
            )}
            {(currentRoute === 'dashboard-files' || currentRoute === 'dashboard-profile') && (
              <UserProfileDashboard
                initialTab={currentRoute === 'dashboard-profile' ? 'profile' : 'files'}
                onRouteChange={onRouteChange}
              />
            )}
          </main>
        </div>
      ) : currentRoute === 'embed-preview' ? (
        <div className="flex-1 p-8 max-w-4xl mx-auto space-y-6 text-center">
          <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4">
            <h2 className="text-2xl font-bold text-white">Vista Previa del Widget Embebible Flotante (PC)</h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              El widget abajo a la derecha es exactamente lo que verán tus visitantes en escritorio. Interactúa con él en directo con respuestas RAG simuladas o Gemini Flash.
            </p>
          </div>
          <EmbedChatWidget botConfig={botConfig} properties={properties} />
        </div>
      ) : currentRoute === 'pricing' ? (
        <main className="flex-1">
          <PricingSection onRouteChange={onRouteChange} />
          <Footer />
        </main>
      ) : (
        <main className="flex-1">
          <HeroSection sampleProperties={properties} onRouteChange={onRouteChange} />
          <SocialProofMarquee />
          <BentoGridFeatures />
          <PricingSection onRouteChange={onRouteChange} />
          <Footer />
        </main>
      )}

      {/* Floating Chat Widget across all pages for testing */}
      {currentRoute !== 'embed-preview' && (
        <EmbedChatWidget botConfig={botConfig} properties={properties} />
      )}

      {/* Desktop Centered Popup Modal */}
      <AuthModal />

    </div>
  );
};
