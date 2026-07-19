"use client";
import { Search, Filter } from "lucide-react";

interface Props {
  tabs: { key: string; label: string; count: number }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  categories: { name: string; count: number }[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
}

export default function FlashcardFilter({
  tabs, activeTab, onTabChange,
  categories, activeCategory, onCategoryChange,
  search, onSearchChange,
}: Props) {
  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="So'z qidirish..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all btn-macos ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs ${activeTab === tab.key ? "text-white/70" : "text-gray-400"}`}>
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => onCategoryChange("all")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-macos whitespace-nowrap ${
            activeCategory === "all"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          }`}
        >
          <Filter className="w-3 h-3" /> Barchasi
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-macos whitespace-nowrap ${
              activeCategory === cat.name
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>
    </div>
  );
}
