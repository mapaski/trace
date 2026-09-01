import React, { useState } from 'react';
import { ActiveView, Navbar } from './components/Navbar';
import { CitizenPortal } from './components/CitizenPortal';
import { InvestigationConsole } from './components/InvestigationConsole';
import { ThreatGraphCanvas } from './components/ThreatGraphCanvas';
import { CampaignEvolutionView } from './components/CampaignEvolutionView';
import { EvidenceVault } from './components/EvidenceVault';
import { ReportDossierModal } from './components/ReportDossierModal';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_GRAPH_EDGES,
  INITIAL_GRAPH_NODES,
  INITIAL_INCIDENTS
} from './data/mockData';
import { Campaign, GraphEdge, GraphNode, Incident } from './types';
import { Shield, Sparkles, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>({
    role: 'citizen',
    citizenTab: 'scanner',
    investigatorTab: 'campaigns_stream',
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>(INITIAL_GRAPH_NODES);
  const [graphEdges, setGraphEdges] = useState<GraphEdge[]>(INITIAL_GRAPH_EDGES);

  const [selectedCampaignForEvolution, setSelectedCampaignForEvolution] = useState<string>('CAMP-2841');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleChangeView = (newView: Partial<ActiveView>) => {
    setCurrentView((prev) => ({ ...prev, ...newView }));
  };

  // When a new incident is analyzed and created in the Citizen Portal
  const handleIncidentCreated = (newIncident: Incident) => {
    setIncidents((prev) => [newIncident, ...prev]);

    // Update campaign tally
    if (newIncident.campaignId) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === newIncident.campaignId
            ? { ...c, incidentCount: c.incidentCount + 1 }
            : c
        )
      );
    }

    // Add new incident node & edges to Threat Graph
    const newNode: GraphNode = {
      id: newIncident.id,
      label: `${newIncident.id} (${newIncident.channel})`,
      type: 'INCIDENT',
      risk: newIncident.riskLevel,
      campaignId: newIncident.campaignId,
      x: 350 + Math.floor(Math.random() * 200),
      y: 320 + Math.floor(Math.random() * 140),
    };

    const newEdges: GraphEdge[] = [];
    if (newIncident.campaignId) {
      newEdges.push({
        id: `e-${Date.now()}-camp`,
        source: newIncident.id,
        target: newIncident.campaignId,
        type: 'BELONGS_TO_CAMPAIGN',
        label: 'BELONGS_TO',
      });
    }

    setGraphNodes((prev) => [...prev, newNode]);
    setGraphEdges((prev) => [...prev, ...newEdges]);

    showToast(`✓ Ingested & Anchored: ${newIncident.id} correlated to ${newIncident.campaignId || 'Campaign'}`);
  };

  const handleSelectCampaignForGraph = (campaignId: string) => {
    setCurrentView({
      role: 'investigator',
      citizenTab: 'scanner',
      investigatorTab: 'threat_graph',
    });
    showToast(`Filtering Threat Graph for ${campaignId}`);
  };

  const handleSelectCampaignForEvolution = (campaignId: string) => {
    setSelectedCampaignForEvolution(campaignId);
    setCurrentView({
      role: 'investigator',
      citizenTab: 'scanner',
      investigatorTab: 'vector_evolution',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Role-Aware Navigation Bar */}
      <Navbar
        currentView={currentView}
        onChangeView={handleChangeView}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        stats={{
          activeCampaigns: campaigns.length,
          totalIncidents: incidents.length + 310,
          monitoredIOCs: 58,
          verifiedBlocks: incidents.length,
        }}
      />

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-slideUp border border-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Role & Tab Content Router */}
      <main className="flex-1">
        {currentView.role === 'citizen' ? (
          <CitizenPortal
            activeSubTab={currentView.citizenTab}
            onIncidentCreated={handleIncidentCreated}
            onNavigateToCampaign={(campId) => handleSelectCampaignForEvolution(campId)}
            incidentsHistory={incidents}
          />
        ) : (
          <>
            {currentView.investigatorTab === 'campaigns_stream' && (
              <InvestigationConsole
                campaigns={campaigns}
                incidents={incidents}
                onSelectCampaignForGraph={handleSelectCampaignForGraph}
                onSelectCampaignForEvolution={handleSelectCampaignForEvolution}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            )}

            {currentView.investigatorTab === 'threat_graph' && (
              <ThreatGraphCanvas
                nodes={graphNodes}
                edges={graphEdges}
              />
            )}

            {currentView.investigatorTab === 'vector_evolution' && (
              <CampaignEvolutionView
                campaigns={campaigns}
                selectedCampaignId={selectedCampaignForEvolution}
              />
            )}

            {currentView.investigatorTab === 'evidence_vault' && (
              <EvidenceVault
                incidents={incidents}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <ReportDossierModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        campaigns={campaigns}
        incidents={incidents}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
              T
            </div>
            <div>
              <span className="font-bold text-slate-800">TRACE Platform</span>
              <span className="text-slate-400 text-xs ml-1.5">— Threat Relationship Analysis & Cryptographic Evidence</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            1. Ingest & Detect • 2. Connect & Correlate • 3. Predict Evolution • 4. Cryptographic Proof
          </div>
        </div>
      </footer>
    </div>
  );
}
