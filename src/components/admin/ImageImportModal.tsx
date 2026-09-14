"use client";

import React, { useState } from "react";
import {
  Search,
  Globe,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Upload,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { DbProduct, ScrapedImageCandidate } from "@/lib/db/types";

interface ImageImportModalProps {
  product: DbProduct;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedProduct: DbProduct) => void;
}

export function ImageImportModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: ImageImportModalProps) {
  const [manualUrl, setManualUrl] = useState("");
  const [customQuery, setCustomQuery] = useState(
    product.modelNumber ? `${product.name} ${product.modelNumber}` : product.name
  );

  const [candidates, setCandidates] = useState<ScrapedImageCandidate[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [primaryId, setPrimaryId] = useState<string | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchedUrl, setSearchedUrl] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (overrideUrl?: string) => {
    setIsSearching(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/scraper/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          manualUrl: overrideUrl || manualUrl || undefined,
          customQuery: customQuery || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCandidates(data.candidates || []);
        setSearchedUrl(data.targetUrl || null);
        setPageTitle(data.pageTitle || null);

        // Pre-select high confidence candidates (>80%)
        const highConfidenceIds = (data.candidates || [])
          .filter((c: ScrapedImageCandidate) => c.confidenceScore >= 80)
          .map((c: ScrapedImageCandidate) => c.id);

        setSelectedIds(highConfidenceIds);

        if (data.candidates?.length > 0) {
          setPrimaryId(data.candidates[0].id);
        }
      } else {
        setErrorMsg(data.error || "No official product images found.");
        setCandidates([]);
      }
    } catch {
      setErrorMsg("Failed to search manufacturer website.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleImportSubmit = async () => {
    const selected = candidates.filter((c) => selectedIds.includes(c.id));
    if (selected.length === 0) {
      setErrorMsg("Please select at least one image to import.");
      return;
    }

    setIsImporting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/scraper/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          selectedCandidates: selected,
          primaryCandidateId: primaryId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onSuccess(data.product);
        onClose();
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to import images.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred during import.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12151a] border border-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 font-sans text-slate-100">
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="font-display font-bold uppercase tracking-tight text-base text-white">
                Official Image Import Engine
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Product: <strong className="text-amber-400">{product.name}</strong> (Brand: {product.brandName || "SmokeDefense"} | Model: {product.modelNumber || "N/A"})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* SEARCH CONTROLS */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Direct Official Product Page URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={manualUrl}
                    onChange={(e) => setManualUrl(e.target.value)}
                    placeholder="https://www.belimo.com/en/products/actuators/..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-500/50 placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleSearch(manualUrl)}
                    disabled={isSearching || !manualUrl.trim()}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold rounded-md transition-colors shrink-0"
                  >
                    Scrape Page
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Automated Official Search Query
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Belimo LMV-D3-MP"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs font-sans text-slate-100 focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    disabled={isSearching}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono text-xs font-bold rounded-md transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <Search className="h-3.5 w-3.5" />
                    {isSearching ? "Searching..." : "Auto Search"}
                  </button>
                </div>
              </div>
            </div>

            {searchedUrl && (
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800">
                <Globe className="h-3.5 w-3.5 text-emerald-400" />
                <span>Source:</span>
                <a
                  href={searchedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline truncate max-w-lg"
                >
                  {pageTitle || searchedUrl} ↗
                </a>
              </div>
            )}
          </div>

          {/* ERROR ALERT */}
          {errorMsg && (
            <div className="p-4 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center justify-between">
              <span>{errorMsg}</span>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-rose-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* RESULTS GRID */}
          {candidates.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-300">
                  Found <strong className="text-white">{candidates.length} candidate images</strong>. Select images to import:
                </span>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    High Confidence &gt; 80%
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Manual Review &lt; 60%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates.map((cand) => {
                  const isSelected = selectedIds.includes(cand.id);
                  const isPrimary = primaryId === cand.id;
                  const isHighConf = cand.confidenceScore >= 80;

                  return (
                    <div
                      key={cand.id}
                      className={`relative border rounded-lg p-3 flex flex-col justify-between transition-all ${
                        isSelected
                          ? "bg-slate-900/90 border-amber-500/60 ring-1 ring-amber-500/30"
                          : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {/* TOP BADGES */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                            cand.confidenceScore >= 90
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : cand.confidenceScore >= 70
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {cand.confidenceScore}% Confidence
                        </span>

                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(cand.id)}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                      </div>

                      {/* IMAGE PREVIEW */}
                      <div className="h-40 w-full rounded bg-slate-950 border border-slate-800 flex items-center justify-center p-2 overflow-hidden my-2">
                        <img
                          src={cand.url}
                          alt={cand.alt}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2364748b'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='12'>No Preview</text></svg>";
                          }}
                        />
                      </div>

                      {/* DETAILS & MATCH REASONS */}
                      <div className="space-y-2 mt-2">
                        <p className="text-[11px] font-sans text-slate-300 line-clamp-2 leading-tight">
                          {cand.alt || "Product graphic"}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {cand.matchReasons.map((reason, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>

                        {/* PRIMARY IMAGE CONTROL */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => {
                              if (!isSelected) handleToggleSelect(cand.id);
                              setPrimaryId(cand.id);
                            }}
                            className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                              isPrimary
                                ? "bg-amber-500 text-slate-950 font-bold"
                                : "text-slate-400 hover:text-slate-200 bg-slate-800"
                            }`}
                          >
                            {isPrimary ? "✓ Primary Image" : "Set Primary"}
                          </button>

                          <a
                            href={cand.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 hover:text-amber-400 p-1"
                            title="Open full size"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            !isSearching && (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg space-y-2">
                <Search className="h-8 w-8 text-slate-600 mx-auto" />
                <div className="text-xs font-mono text-slate-400">
                  Click <strong className="text-white">Auto Search</strong> or paste an official product URL above to extract images.
                </div>
              </div>
            )
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            {selectedIds.length} image(s) selected
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImportSubmit}
              disabled={isImporting || selectedIds.length === 0}
              className="px-5 py-2 rounded text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Upload className="h-4 w-4" />
              {isImporting ? "Importing & Saving..." : "Import Selected Images"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
