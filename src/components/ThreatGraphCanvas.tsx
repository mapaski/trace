import React, { useState, useRef, useEffect } from 'react';
import {
  GraphNode,
  GraphEdge,
  NodeType,
  RiskLevel
} from '../types';
import {
  GitGraph,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Search,
  Layers,
  Sparkles,
  ShieldAlert,
  Server,
  Globe,
  Phone,
  Tag,
  Info,
  X,
  Play,
  RotateCcw,
  Network
} from 'lucide-react';

interface ThreatGraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onTriggerDemo2Collapse?: () => void;
  selectedCampaignFilter?: string | null;
}

export const ThreatGraphCanvas: React.FC<ThreatGraphCanvasProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  onTriggerDemo2Collapse,
  selectedCampaignFilter,
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialNodes);
  const [edges, setEdges] = useState<GraphEdge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [collapseDemoActive, setCollapseDemoActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  // Filter nodes based on selected type and search
  const visibleNodes = nodes.filter((n) => {
    if (filterType !== 'ALL' && n.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q);
    }
    return true;
  });

  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );

  // Helper to color nodes
  const getNodeColor = (type: NodeType, risk: RiskLevel) => {
    switch (type) {
      case 'CAMPAIGN':
        return '#6366f1'; // Indigo-500
      case 'BRAND':
        return '#0284c7'; // Sky-600
      case 'DOMAIN':
        return '#e11d48'; // Rose-600
      case 'IP':
        return '#ea580c'; // Orange-600
      case 'PHONE':
        return '#d97706'; // Amber-600
      case 'INCIDENT':
        return risk === 'CRITICAL' ? '#e11d48' : '#d97706';
      case 'REPORTER':
        return '#059669'; // Emerald-600
      default:
        return '#64748b';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (draggedNodeId) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      setNodes((prev) =>
        prev.map((n) => (n.id === draggedNodeId ? { ...n, x: mouseX, y: mouseY } : n))
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNodeId(null);
  };

  const handleNodeClick = (node: GraphNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(node);
  };

  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggedNodeId(nodeId);
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Demo 2: Trigger Campaign Discovery & Graph Collapse Simulation
  const handleRunCollapseSimulation = () => {
    setCollapseDemoActive(true);
    const targetX = 400;
    const targetY = 280;

    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === 'INC-2026-8801') return { ...n, x: targetX - 110, y: targetY + 70 };
        if (n.id === 'INC-2026-8802') return { ...n, x: targetX + 40, y: targetY + 110 };
        if (n.id === 'INC-2026-8803') return { ...n, x: targetX + 120, y: targetY + 50 };
        if (n.id === 'DOM-yono-xyz') return { ...n, x: targetX - 130, y: targetY - 40 };
        if (n.id === 'DOM-sbikyc-online') return { ...n, x: targetX - 20, y: targetY - 100 };
        if (n.id === 'IP-198-51') return { ...n, x: targetX - 110, y: targetY - 110 };
        return n;
      })
    );

    setTimeout(() => {
      setCollapseDemoActive(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Network className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Threat Relationship & Entity Graph
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                {nodes.length} Nodes • {edges.length} Edges
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              GRAPH ENGINE: D3 FORCE-DIRECTED • AUTO-CLUSTERING ENABLED
            </p>
          </div>
        </div>

        {/* Campaign Clustering Simulation */}
        <button
          id="btn-run-demo-collapse"
          onClick={handleRunCollapseSimulation}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Simulate Campaign Cluster Collapse</span>
        </button>
      </div>

      {/* Graph Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 text-xs font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
          </span>
          {[
            { label: 'All Entities', value: 'ALL' },
            { label: 'Campaigns', value: 'CAMPAIGN' },
            { label: 'Incidents', value: 'INCIDENT' },
            { label: 'Domains', value: 'DOMAIN' },
            { label: 'IPs', value: 'IP' },
            { label: 'Phones', value: 'PHONE' },
            { label: 'Brands', value: 'BRAND' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilterType(item.value)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterType === item.value
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search & Zoom */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search node or label..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 w-44 font-sans"
            />
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
              className="p-1.5 text-slate-700 hover:bg-white rounded-md transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))}
              className="p-1.5 text-slate-700 hover:bg-white rounded-md transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 text-slate-700 hover:bg-white rounded-md transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 h-[560px] overflow-hidden relative shadow-sm cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

          {/* SVG Canvas */}
          <svg
            className="w-full h-full absolute inset-0 transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="14"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
              </marker>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Edges */}
            {visibleEdges.map((edge) => {
              const sourceNode = nodes.find((n) => n.id === edge.source);
              const targetNode = nodes.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const isHighlighted =
                selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

              const sx = sourceNode.x || 300;
              const sy = sourceNode.y || 200;
              const tx = targetNode.x || 500;
              const ty = targetNode.y || 300;

              const midX = (sx + tx) / 2;
              const midY = (sy + ty) / 2;

              return (
                <g key={edge.id}>
                  <line
                    x1={sx}
                    y1={sy}
                    x2={tx}
                    y2={ty}
                    stroke={isHighlighted ? '#818cf8' : edge.type === 'SIMILAR_TO' ? '#38bdf8' : '#475569'}
                    strokeWidth={isHighlighted ? 2.5 : edge.type === 'SIMILAR_TO' ? 1.5 : 1}
                    strokeDasharray={edge.type === 'SIMILAR_TO' ? '4 3' : undefined}
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="sans-serif"
                    className="select-none pointer-events-none uppercase font-semibold"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {visibleNodes.map((node) => {
              const x = node.x || 300;
              const y = node.y || 200;
              const isSelected = selectedNode?.id === node.id;
              const nodeColor = getNodeColor(node.type, node.risk);
              const isCampaign = node.type === 'CAMPAIGN';

              return (
                <g
                  key={node.id}
                  transform={`translate(${x}, ${y})`}
                  onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
                  onClick={(e) => handleNodeClick(node, e)}
                  className="cursor-pointer group"
                >
                  {/* Pulse Ring */}
                  {(isCampaign || isSelected) && (
                    <circle
                      r={isCampaign ? 32 : 24}
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth="2"
                      opacity="0.4"
                      className="animate-pulse"
                    />
                  )}

                  {/* Body */}
                  <circle
                    r={isCampaign ? 24 : 16}
                    fill={nodeColor}
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:scale-110"
                    filter={isCampaign ? 'url(#glow)' : undefined}
                  />

                  {/* Label */}
                  <text
                    y={isCampaign ? 38 : 28}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize={isCampaign ? '12' : '10'}
                    fontWeight={isCampaign ? 'bold' : 'normal'}
                    className="select-none pointer-events-none font-sans drop-shadow"
                  >
                    {node.label}
                  </text>

                  {/* Type */}
                  <text
                    y={isCampaign ? 50 : 38}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="8"
                    className="select-none pointer-events-none font-mono uppercase font-semibold"
                  >
                    {node.type}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 rounded-xl p-2.5 text-[10px] text-slate-300 flex flex-wrap items-center gap-3 shadow-lg">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Campaign Hub
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Phishing Domain
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> IP Host
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Phone / SIM
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Target Brand
            </span>
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>Entity Relationship Inspector</span>
            </h3>
            {selectedNode && (
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white inline-block"
                  style={{ backgroundColor: getNodeColor(selectedNode.type, selectedNode.risk) }}
                >
                  {selectedNode.type} Node
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">{selectedNode.label}</h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {selectedNode.id}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium">Threat Risk Level:</span>
                  <span
                    className={`font-bold uppercase px-2 py-0.5 rounded-full text-[10px] ${
                      selectedNode.risk === 'CRITICAL'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : selectedNode.risk === 'HIGH'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {selectedNode.risk}
                  </span>
                </div>
                {selectedNode.campaignId && (
                  <div className="flex justify-between items-center text-slate-700 border-t border-slate-200/80 pt-2">
                    <span className="font-medium">Campaign Cluster:</span>
                    <span className="font-semibold text-indigo-700">{selectedNode.campaignId}</span>
                  </div>
                )}
              </div>

              {/* Connected Relationships */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-700">
                  Connected Graph Relationships:
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {edges
                    .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((edge) => {
                      const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = nodes.find((n) => n.id === otherId);
                      return (
                        <div
                          key={edge.id}
                          className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                        >
                          <div>
                            <span className="text-indigo-600 font-mono text-[10px] font-semibold block uppercase">
                              {edge.label}
                            </span>
                            <span className="text-slate-900 font-medium">{otherNode?.label || otherId}</span>
                          </div>
                          <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-semibold uppercase">
                            {otherNode?.type}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs space-y-2">
              <Layers className="w-8 h-8 mx-auto opacity-40 text-slate-500" />
              <p className="leading-relaxed">Click any node or relationship line on the graph canvas to inspect correlated IOCs, risk metadata, and campaign links.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
