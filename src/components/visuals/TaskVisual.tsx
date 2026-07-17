"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  BarChartVisual,
  LineChartVisual,
  PieChartVisual,
  type ChartData,
} from "./ChartComponents";
import {
  ProcessDiagram,
  MapComparison,
  TableVisual,
} from "./StaticVisuals";

export interface TaskVisualData {
  visualType: string | null;
  chartData: ChartData | null;
  imageUrl: string | null;
  processData?: { title?: string; steps: { label: string; description?: string }[] };
  mapData?: { title?: string; map1Label: string; map2Label: string; features: { name: string; x1: number; y1: number; x2: number; y2: number; color: string }[] };
  tableData?: { title?: string; headers: string[]; rows: string[][] };
  caption?: string;
}

const visualLabels: Record<string, string> = {
  bar_chart: "Ustunli grafik (Bar chart)",
  line_chart: "Chiziqli grafik (Line chart)",
  pie_chart: "Doiraviy diagramma (Pie chart)",
  process_diagram: "Jarayon sxemasi (Process diagram)",
  map: "Xarita solishtirish (Map)",
  table: "Jadval (Table)",
};

export default function TaskVisual({ data }: { data: TaskVisualData }) {
  const [zoomed, setZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!data.visualType) return null;

  const renderVisual = () => {
    switch (data.visualType) {
      case "bar_chart":
        return data.chartData ? <BarChartVisual data={data.chartData} /> : null;
      case "line_chart":
        return data.chartData ? <LineChartVisual data={data.chartData} /> : null;
      case "pie_chart":
        return data.chartData ? <PieChartVisual data={data.chartData} /> : null;
      case "process_diagram":
        return data.processData ? <ProcessDiagram data={data.processData} /> : null;
      case "map":
        return data.mapData ? <MapComparison data={data.mapData} /> : null;
      case "table":
        return data.tableData ? <TableVisual data={data.tableData} /> : null;
      default:
        if (data.imageUrl) {
          return (
            <img
              src={data.imageUrl}
              alt="Writing task visual"
              className="w-full max-w-xl mx-auto rounded-lg"
              style={{ aspectRatio: "16/10", objectFit: "contain" }}
            />
          );
        }
        return null;
    }
  };

  const visual = renderVisual();
  if (!visual) return null;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 relative group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
            {visualLabels[data.visualType] || "Vizual ma'lumot"}
          </span>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
            title="Kattalashtirish"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex justify-center">{visual}</div>
        {data.caption && (
          <p className="text-center text-xs text-gray-500 mt-3 italic">{data.caption}</p>
        )}
      </div>

      {/* Lightbox zoom */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-auto p-6"
            >
              <div className="flex items-center justify-between mb-3 sticky top-0 bg-white z-10 pb-2">
                <span className="text-sm font-medium text-gray-700">{data.caption || visualLabels[data.visualType]}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((l) => Math.min(l + 0.25, 3))}
                    className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((l) => Math.max(l - 0.25, 0.5))}
                    className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomed(false)}
                    className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                className="flex justify-center transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {visual}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
