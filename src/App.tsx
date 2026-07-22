import React, { useState, useEffect } from 'react';
import { AppRoute, Property, Lead, BotConfig } from './types';
import { INITIAL_PROPERTIES, INITIAL_LEADS, INITIAL_BOT_CONFIG } from './data/mockData';
import { AuthProvider } from './context/AuthContext';
import { useDeviceType } from './hooks/useDeviceType';
import { DesktopView } from './components/desktop/DesktopView';
import { MobileView } from './components/mobile/MobileView';
import { DeviceSwitcherBadge } from './components/common/DeviceSwitcherBadge';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('marketing');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [botConfig, setBotConfig] = useState<BotConfig>(INITIAL_BOT_CONFIG);
  const [selectedLeadForChat, setSelectedLeadForChat] = useState<string | undefined>(undefined);

  // Device detection hook
  const { isMobile, deviceType, forcedDevice, overrideDevice, screenWidth } = useDeviceType();

  // Fetch initial state from server API
  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setProperties(data.data);
      })
      .catch(() => {});

    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setLeads(data.data);
      })
      .catch(() => {});

    fetch('/api/bot-config')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setBotConfig(data.data);
      })
      .catch(() => {});
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

  const commonProps = {
    currentRoute,
    onRouteChange: setCurrentRoute,
    properties,
    leads,
    botConfig,
    selectedLeadForChat,
    onClearSelectedLead: () => setSelectedLeadForChat(undefined),
    onInterveneLead: handleInterveneLead,
    onAddProperty: handleAddProperty,
    onUpdateLeadStatus: handleUpdateLeadStatus,
    onUpdateBotConfig: handleUpdateBotConfig,
  };

  return (
    <AuthProvider onRouteChange={setCurrentRoute}>
      {isMobile ? (
        <MobileView {...commonProps} />
      ) : (
        <DesktopView {...commonProps} />
      )}

      {/* Floating Device Switcher Pill for seamless testing of both interfaces */}
      <DeviceSwitcherBadge
        deviceType={deviceType}
        forcedDevice={forcedDevice}
        overrideDevice={overrideDevice}
        screenWidth={screenWidth}
      />
    </AuthProvider>
  );
}

