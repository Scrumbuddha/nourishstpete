"use client";

import { useState } from "react";

export interface EligibilityFilters {
  hasSNAP: boolean;
  hasWIC: boolean;
  isStudent: boolean;
  isSenior: boolean;
  isFormerlyIncarcerated: boolean;
  needsNoID: boolean;
}

interface BenefitCheckerProps {
  onFiltersChange: (filters: EligibilityFilters) => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

export function BenefitEligibilityChecker({
  onFiltersChange,
  isExpanded,
  onExpandChange,
}: BenefitCheckerProps) {
  const [filters, setFilters] = useState<EligibilityFilters>({
    hasSNAP: false,
    hasWIC: false,
    isStudent: false,
    isSenior: false,
    isFormerlyIncarcerated: false,
    needsNoID: false,
  });

  const handleChange = (key: keyof EligibilityFilters, value: boolean) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <>
      <button
        onClick={() => onExpandChange(!isExpanded)}
        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
          isExpanded
            ? "border-blue-700 bg-blue-700 text-white"
            : "border-stone-300 bg-white text-stone-700 hover:border-blue-600"
        }`}
        aria-expanded={isExpanded}
      >
        📋 Personalize Your Results
      </button>

      {isExpanded && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-3">
          <p className="text-sm text-blue-800">
            Tell us about yourself (optional). Your info stays on your phone — nothing is saved or shared.
          </p>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasSNAP}
                onChange={(e) => handleChange("hasSNAP", e.target.checked)}
                className="rounded"
                aria-label="I receive SNAP/EBT benefits"
              />
              <span className="text-sm text-blue-900">I receive SNAP/EBT benefits</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasWIC}
                onChange={(e) => handleChange("hasWIC", e.target.checked)}
                className="rounded"
                aria-label="I receive WIC benefits"
              />
              <span className="text-sm text-blue-900">I receive WIC benefits</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isStudent}
                onChange={(e) => handleChange("isStudent", e.target.checked)}
                className="rounded"
                aria-label="I'm a college/university student"
              />
              <span className="text-sm text-blue-900">I'm a college/university student</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isSenior}
                onChange={(e) => handleChange("isSenior", e.target.checked)}
                className="rounded"
                aria-label="I'm 60 years old or older"
              />
              <span className="text-sm text-blue-900">I'm 60 years old or older</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isFormerlyIncarcerated}
                onChange={(e) => handleChange("isFormerlyIncarcerated", e.target.checked)}
                className="rounded"
                aria-label="I've been formerly incarcerated or experienced homelessness"
              />
              <span className="text-sm text-blue-900">
                I've been formerly incarcerated or experienced homelessness
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.needsNoID}
                onChange={(e) => handleChange("needsNoID", e.target.checked)}
                className="rounded"
                aria-label="I can't provide photo ID"
              />
              <span className="text-sm text-blue-900">I can't provide photo ID</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilters({
                  hasSNAP: false,
                  hasWIC: false,
                  isStudent: false,
                  isSenior: false,
                  isFormerlyIncarcerated: false,
                  needsNoID: false,
                });
                onFiltersChange({
                  hasSNAP: false,
                  hasWIC: false,
                  isStudent: false,
                  isSenior: false,
                  isFormerlyIncarcerated: false,
                  needsNoID: false,
                });
              }}
              className="text-xs text-blue-700 hover:text-blue-900 underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </>
  );
}
